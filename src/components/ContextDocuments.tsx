import { FileText } from "lucide-react";

interface Document {
  content: string;
  metadata?: Record<string, any>;
}

interface ContextDocumentsProps {
  documents: Document[];
}

const ContextDocuments = ({ documents }: ContextDocumentsProps) => {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Retrieved Context Documents</h3>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {documents.length === 0 ? (
          <p className="text-muted-foreground text-sm">No documents retrieved</p>
        ) : (
          documents.map((doc, index) => (
            <div
              key={index}
              className="bg-muted/50 rounded-lg p-4 border border-border"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Document {index + 1}
                </span>
                {doc.metadata && (
                  <span className="text-xs text-muted-foreground">
                    Score: {doc.metadata.score?.toFixed(3) || "N/A"}
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap">
                {doc.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContextDocuments;
