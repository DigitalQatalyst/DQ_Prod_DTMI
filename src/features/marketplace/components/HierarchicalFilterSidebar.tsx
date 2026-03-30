import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type {
  CategoryNode,
  CategoryTreeGroup,
} from "../api/hierarchicalFilters";
import { collectBranchSlugs } from "../api/hierarchicalFilters";

interface HierarchicalFilterSidebarProps {
  groups: CategoryTreeGroup[];
  selectedSlugs: string[];
  isLoading: boolean;
  hasError: boolean;
  onChange: (nextSlugs: string[]) => void;
  onClearAll: () => void;
  compact?: boolean;
  hideTitle?: boolean;
  className?: string;
}

function labelForGroup(value: string): string {
  const labels: Record<string, string> = {
    "content-types": "Content Type",
    "digital-sectors": "Sector",
    "digital-streams": "Stream",
    "dbp-domains": "DBP Domain",
    "content-format": "Format",
    "popularity-tags": "Popularity",
  };
  return labels[value] || value.replaceAll("-", " ");
}

interface TreeNodeRowProps {
  node: CategoryNode;
  depth: number;
  selectedSet: Set<string>;
  onToggleBranch: (node: CategoryNode) => void;
}

function TreeNodeRow({
  node,
  depth,
  selectedSet,
  onToggleBranch,
}: Readonly<TreeNodeRowProps>) {
  const [expanded, setExpanded] = useState(true);
  const branchSlugs = useMemo(() => collectBranchSlugs(node), [node]);
  const selectedCount = branchSlugs.reduce(
    (total, slug) => total + (selectedSet.has(slug) ? 1 : 0),
    0,
  );

  let checked: boolean | "indeterminate" = false;
  if (selectedCount === branchSlugs.length) {
    checked = true;
  } else if (selectedCount > 0) {
    checked = "indeterminate";
  }

  const hasChildren = node.children.length > 0;

  return (
    <div className="space-y-1">
      <div
        className="flex items-center gap-2 rounded-md py-1 pr-2"
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        ) : (
          <span className="w-4" />
        )}

        <Checkbox
          id={`category-${node.id}`}
          checked={checked}
          onCheckedChange={() => onToggleBranch(node)}
        />
        <label
          htmlFor={`category-${node.id}`}
          className="cursor-pointer text-sm leading-none text-foreground"
        >
          {node.name}
        </label>
      </div>

      {hasChildren && expanded && (
        <div>
          {node.children.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedSet={selectedSet}
              onToggleBranch={onToggleBranch}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function HierarchicalFilterSidebar({
  groups,
  selectedSlugs,
  isLoading,
  hasError,
  onChange,
  onClearAll,
  compact = false,
  hideTitle = false,
  className,
}: Readonly<HierarchicalFilterSidebarProps>) {
  const selectedSet = useMemo(() => new Set(selectedSlugs), [selectedSlugs]);

  const toggleBranch = (node: CategoryNode) => {
    const branch = collectBranchSlugs(node);
    const allSelected = branch.every((slug) => selectedSet.has(slug));
    const next = new Set(selectedSet);

    if (allSelected) {
      branch.forEach((slug) => next.delete(slug));
    } else {
      branch.forEach((slug) => next.add(slug));
    }

    onChange(Array.from(next));
  };

  return (
    <aside
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        compact ? "p-3" : null,
        className,
      )}
    >
      {hideTitle ? null : (
        <div
          className={cn(
            "mb-4 flex items-center justify-between",
            compact ? "mb-3" : null,
          )}
        >
          <h2
            className={cn(
              "font-heading text-base font-semibold",
              compact ? "text-sm" : null,
            )}
          >
            Filters
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            disabled={selectedSlugs.length === 0}
            className="h-8 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {!isLoading && hasError && (
        <p className="text-sm text-muted-foreground">
          Failed to load filter categories.
        </p>
      )}

      {!isLoading && !hasError && groups.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No filter categories found.
        </p>
      )}

      {!isLoading && !hasError && groups.length > 0 && (
        <div className={cn("space-y-5", compact ? "space-y-4" : null)}>
          {groups.map((group) => (
            <section key={group.filterType} className="space-y-2">
              <h3
                className={cn(
                  "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                  compact ? "text-[11px]" : null,
                )}
              >
                {labelForGroup(group.filterType)}
              </h3>
              <div className="space-y-1">
                {group.roots.map((root) => (
                  <TreeNodeRow
                    key={root.id}
                    node={root}
                    depth={0}
                    selectedSet={selectedSet}
                    onToggleBranch={toggleBranch}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </aside>
  );
}
