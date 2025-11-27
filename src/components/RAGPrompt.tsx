import { useState } from "react";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";

interface RAGPromptProps {
  prompt: string;
}

const RAGPrompt = ({ prompt }: RAGPromptProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">RAG Prompt</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 animate-accordion-down">
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <pre className="text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
              {prompt || "No prompt generated"}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RAGPrompt;
