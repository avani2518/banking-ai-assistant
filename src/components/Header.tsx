import { Database } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">

          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-lg border border-border flex items-center justify-center">
              <Database className="w-7 h-7 text-primary" />
            </div>
            <div className="leading-tight">
              <h1 className="text-lg md:text-2xl font-semibold text-[#07143a]">
                Banking RAG
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Intelligent contextual assistant
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-l border-border h-6 mx-4"></div>

          {/* Right side: Date and Version */}
          <div className="flex flex-col items-end text-right gap-0.5">
            <div className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="text-xs text-muted-foreground">v1.0.0</div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
