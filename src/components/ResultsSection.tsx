import ContextDocuments from "./ContextDocuments";
import RAGPrompt from "./RAGPrompt";
import LLMResponse from "./LLMResponse";

interface QueryResult {
  context_documents: Array<{ content: string; metadata?: Record<string, any> }>;
  rag_prompt: string;
  llm_response: string;
}

interface ResultsSectionProps {
  result: QueryResult | null;
}

const ResultsSection = ({ result }: ResultsSectionProps) => {
  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Query Results</h2>
      </div>

      <ContextDocuments documents={result.context_documents || []} />
      
      <RAGPrompt prompt={result.rag_prompt || ""} />
      
      <LLMResponse response={result.llm_response || ""} />
    </div>
  );
};

export default ResultsSection;
