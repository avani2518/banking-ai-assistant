import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryForm from "@/components/QueryForm";
import ResultsSection from "@/components/ResultsSection";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";

interface QueryResult {
  context_documents: Array<{ content: string; metadata?: Record<string, any> }>;
  rag_prompt: string;
  llm_response: string;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [apiStatus, setApiStatus] = useState<'unknown'|'online'|'offline'>('unknown');
  const [history, setHistory] = useState<Array<{ id: string; account: string; query: string; llm_response?: string; createdAt: string }>>([]);
  const { toast } = useToast();

  const handleQuery = async (accountNumber: string, query: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const apiBase = (import.meta.env as any).VITE_API_BASE_URL || "http://localhost:8000";
      const endpoint = `${apiBase.replace(/\/$/, "")}/query`;

      const response = await axios.post<QueryResult>(
        endpoint,
        {
          account_number: accountNumber,
          query: query,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );

      setResult(response.data);
      toast({
        title: "Query Successful",
        description: "Your banking query has been processed successfully.",
      });

      // Save successful queries to localStorage (most recent first)
      try {
        const item = {
          id: String(Date.now()),
          account: accountNumber,
          query,
          llm_response: response.data.llm_response,
          createdAt: new Date().toISOString(),
        };
        const cur = JSON.parse(localStorage.getItem('query_history') || '[]');
        const list = Array.isArray(cur) ? cur : [];
        list.unshift(item);
        const trimmed = list.slice(0, 25);
        localStorage.setItem('query_history', JSON.stringify(trimmed));
        setHistory(trimmed);
      } catch (e) {
        // ignore storage errors
      }
    } catch (error) {
      console.error("Query error:", error);

      // Show mock data for demo purposes when backend is not available
      const mockResult: QueryResult = {
        context_documents: [
          {
            content: `Account Number: ${accountNumber}\nBalance: $5,234.56\nAccount Type: Checking\nStatus: Active\nLast Transaction: 2025-11-25`,
            metadata: { score: 0.95 },
          },
          {
            content: `Transaction History:\n- 2025-11-25: Deposit +$1,000.00\n- 2025-11-23: Withdrawal -$250.00\n- 2025-11-20: Purchase -$45.32`,
            metadata: { score: 0.87 },
          },
        ],
        rag_prompt: `You are a helpful banking assistant. Use the following context to answer the user's question.\n\nContext:\n${accountNumber}\nBalance: $5,234.56\n\nUser Question: ${query}\n\nProvide a clear and concise answer based on the context provided.`,
        llm_response: `Based on your account information, here's what I found:\n\nYour current account balance for account ${accountNumber} is $5,234.56. The account is active and in good standing. Your most recent transaction was a deposit of $1,000.00 on November 25th, 2025.\n\nIs there anything else you'd like to know about your account?`,
      };

      setResult(mockResult);

      toast({
        title: "Demo Mode",
        description: "Backend unavailable. Showing sample data for demonstration.",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // load history from localstorage
    try {
      const cur = JSON.parse(localStorage.getItem('query_history') || '[]');
      setHistory(Array.isArray(cur) ? cur : []);
    } catch (e) {
      setHistory([]);
    }

    // Ping API health
    (async () => {
      const apiBase = (import.meta.env as any).VITE_API_BASE_URL || "http://localhost:8000";
      const endpoint = `${apiBase.replace(/\/$/, "")}/health`;
      try {
        const r = await axios.get(endpoint, { timeout: 3000 });
        if (r?.data?.status === 'ok') setApiStatus('online');
        else setApiStatus('online');
      } catch (err) {
        setApiStatus('offline');
      }
    })();
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('query_history');
    setHistory([]);
  };

  const runFromHistory = (account: string, query: string) => {
    handleQuery(account, query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <section className="hero-background p-8 rounded-xl mb-6 card-elevated w-full">
          <div className="flex flex-col items-stretch gap-4 w-full">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#0b2545] w-full">Banking RAG System - Context-Aware Financial Assistant</h2>
              <p className="text-muted-foreground mt-2 w-full max-w-full">Securely access account data and receive clear, explainable insights powered by context-aware retrieval and AI.</p>

              <div className="flex items-center gap-2 mt-4 flex-wrap w-full">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">Secure</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">Contextual</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">Explainable</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground">Quick to integrate</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Ask about an account</h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${apiStatus==='online' ? 'bg-success text-success-foreground' : apiStatus==='offline' ? 'bg-destructive text-destructive-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {apiStatus === 'online' ? 'API Online' : apiStatus === 'offline' ? 'API Offline' : 'Checking…'}
                </span>
              </div>
            </div>

            <QueryForm onSubmit={handleQuery} isLoading={isLoading} />

            <div className="bg-card rounded-xl shadow-sm border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Query History</h3>
                <button onClick={clearHistory} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
              </div>

              <div className="mt-3 max-h-[260px] overflow-y-auto space-y-2">
                {history.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No recent queries</p>
                ) : (
                  history.map((h) => (
                    <div key={h.id} className="p-3 rounded-md bg-muted/40 border border-border flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-xs font-semibold truncate">{h.account}</div>
                        <div className="text-sm text-muted-foreground leading-snug whitespace-pre-wrap">{h.query}</div>
                        <div className="text-xs text-muted-foreground mt-2">{new Date(h.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="pl-3 flex-shrink-0 flex flex-col gap-2">
                        <button onClick={() => runFromHistory(h.account, h.query)} className="btn btn-sm rounded px-3 py-1 text-xs bg-primary text-primary-foreground">Run</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {result ? (
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <ResultsSection result={result} />
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-sm border border-border p-10 text-center">
                <h3 className="text-xl font-semibold mb-2">No query run yet</h3>
                <p className="text-muted-foreground">Enter an account number and prompt to run a contextual banking query. ~Demo data appears if the backend is unavailable.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
