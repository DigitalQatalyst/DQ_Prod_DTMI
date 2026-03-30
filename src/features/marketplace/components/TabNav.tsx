import { cn } from "@/lib/utils";
import type { ContentTab } from "../api/types";
import { TAB_META } from "../api/types";

interface TabNavProps {
  activeTab: ContentTab;
  onChange: (tab: ContentTab) => void;
}

const TABS: ContentTab[] = ["signals", "insights", "deep-analysis"];

export function TabNav({ activeTab, onChange }: TabNavProps) {
  return (
    <div className="border-b border-border bg-background sticky top-[72px] z-30">
      <div className="container mx-auto px-4">
        <div className="flex gap-0 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const meta = TAB_META[tab];
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onChange(tab)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                <span>{meta.emoji}</span>
                <span>{meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
