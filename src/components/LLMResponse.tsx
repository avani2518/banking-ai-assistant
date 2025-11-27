import { MessageSquare, CheckCircle } from "lucide-react";

interface LLMResponseProps {
  response: string;
}

const LLMResponse = ({ response }: LLMResponseProps) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl shadow-sm border-2 border-primary/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">AI Response</h3>
          <p className="text-xs text-muted-foreground">Generated using RAG context</p>
        </div>
        <CheckCircle className="w-5 h-5 text-success" />
      </div>

      <div className="bg-card rounded-lg p-5 border border-border">
        <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">
          {response || "No response generated"}
        </p>
      </div>
    </div>
  );
};

export default LLMResponse;
