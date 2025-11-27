import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: ["http://localhost:8080"] }));
app.use(express.json());

// Mock accounts
const mockAccounts = [
  { account_number: "10001111", balance: 5234.56, last_transaction: "2025-11-25" },
  { account_number: "10002222", balance: 1200.0, last_transaction: "2025-11-20" },
  { account_number: "10003333", balance: 9876.50, last_transaction: "2025-11-15" },
];

app.get("/health", (_req, res) => {
  return res.json({ status: "ok" });
});

// Root page for info
app.get("/", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><title>Mock Backend</title></head>
      <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;margin:40px;color:#0f172a;">
        <h1>Mock Backend — Banking RAG</h1>
        <p>This mock server exposes the following endpoints for local development:</p>
        <ul>
          <li><strong>GET /health</strong> — Returns <code>{"status": "ok"}</code></li>
          <li><strong>POST /query</strong> — Accepts JSON: { account_number, query } and returns a QueryResult JSON object</li>
          <li><strong>GET /accounts</strong> — Returns all mock accounts</li>
        </ul>
        <p>Use <code>npm run mock:server</code> to start the server and then call these endpoints from the frontend.</p>
      </body>
    </html>
  `);
});

// Get all accounts
app.get("/accounts", (_req, res) => {
  res.json(mockAccounts);
});

// Query endpoint
app.post("/query", (req, res) => {
  const { account_number, query } = req.body || {};
  const account = mockAccounts.find(a => a.account_number === account_number);

  if (!account) {
    return res.status(404).json({ error: "Account not found" });
  }

  const response = {
    context_documents: [
      {
        content: `Account ${account.account_number}\nBalance: $${account.balance}\nLast transaction: ${account.last_transaction}`,
        metadata: { score: 0.95 },
      },
    ],
    rag_prompt: `You are a helpful assistant. Context: Account ${account.account_number}`,
    llm_response: `Mock LLM answer — account ${account.account_number} — query: ${query}`,
  };

  setTimeout(() => res.json(response), 300);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
});
