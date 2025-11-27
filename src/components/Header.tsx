import { Database } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground leading-tight">Banking RAG</h1>
              <p className="text-xs text-muted-foreground -mt-1">AI-powered contextual assistant</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#">Dashboard</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#">Docs</a>
            <a className="text-sm text-muted-foreground hover:text-foreground" href="#">Integration</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="text-sm px-4 py-2 rounded-md border border-border bg-muted text-foreground hover:bg-primary/10">Sign in</button>
            <button className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground">Get started</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
