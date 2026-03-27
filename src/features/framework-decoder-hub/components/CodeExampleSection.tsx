import { Copy } from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";

interface CodeExampleProps {
  title: string;
  code: string;
  language: string;
}

const CodeExampleSection = ({ title, code }: CodeExampleProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container max-w-5xl mx-auto px-6 py-20">
      <SectionHeading
        label="05 · Code Example"
        title="See It in Action"
        description="A practical demonstration of framework's syntax and patterns."
      />
      <div className="rounded-xl overflow-hidden border border-border bg-code-bg">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <div className="w-3 h-3 rounded-full bg-primary/20" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">{title}</span>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm font-mono text-foreground/90 leading-relaxed">{code}</code>
        </pre>
      </div>
    </section>
  );
};

export default CodeExampleSection;
