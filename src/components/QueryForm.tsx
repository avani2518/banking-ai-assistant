import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface QueryFormProps {
  onSubmit: (accountNumber: string, query: string) => void;
  isLoading: boolean;
}

const QueryForm = ({ onSubmit, isLoading }: QueryFormProps) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber.trim() && query.trim()) {
      onSubmit(accountNumber, query);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="accountNumber" className="text-base font-semibold">
            Account Number
          </Label>
          <Input
            id="accountNumber"
            type="text"
            placeholder="Enter account number (e.g., 12345)"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="h-12"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="query" className="text-base font-semibold">
            Query / Prompt
          </Label>
          <Textarea
            id="query"
            placeholder="Enter your banking query here... (e.g., What is my account balance?)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[120px] resize-none"
            required
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold"
          disabled={isLoading || !accountNumber.trim() || !query.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Query...
            </>
          ) : (
            "Run Query"
          )}
        </Button>
      </form>
    </div>
  );
};

export default QueryForm;
