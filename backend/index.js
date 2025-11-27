import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import cors from "cors";
import { searchDocuments } from "./query.js";
import { generateResponse } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (_req, res) => {
  return res.json({ status: "ok" });
});

// Main query endpoint for real data mode
app.post("/query", async (req, res) => {
  try {
    let { account_number, query } = req.body;
    
    // Trim whitespace from inputs
    if (account_number) account_number = account_number.trim();
    if (query) query = query.trim();

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Search for relevant documents in Qdrant
    const matches = await searchDocuments(query, account_number);

    // Build context from matched documents
    const context_documents = matches.map(match => ({
      content: match.content || match.payload?.content || "",
      metadata: {
        score: match.score,
        ...match.metadata
      }
    }));

    // Create RAG prompt with context
    const contextText = context_documents
      .map(doc => doc.content)
      .join("\n\n");

    console.log("📄 Context preview (first 500 chars):", contextText.substring(0, 500));
    console.log("📄 Total context length:", contextText.length, "characters");

    const rag_prompt = `You are a helpful banking assistant. Use the following context to answer the user's question.

Context:
${contextText}

User Question: ${query}

Please provide a helpful and accurate response based on the context above.`;

    // Generate AI response using Claude
    console.log("🤖 Generating AI response...");
    const llm_response = await generateResponse(rag_prompt, query);

    // For now, return the prompt and context
    // You can integrate with an LLM API here (OpenAI, Anthropic, etc.)
    const response = {
      context_documents,
      rag_prompt,
      llm_response,
      query,
      account_number
    };

    res.json(response);
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).json({ 
      error: "Something went wrong.",
      details: err.message 
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);