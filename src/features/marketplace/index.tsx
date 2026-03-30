import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ListFilter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { TabNav } from "./components/TabNav";
import { ContentGrid } from "./components/ContentGrid";
import { HierarchicalFilterSidebar } from "./components/HierarchicalFilterSidebar";
import { useContentItems } from "./hooks/useContentItems";
import { useCategoryTreeGroups } from "./hooks/useCategoryTreeGroups";
import { flattenCategoryTree } from "./api/hierarchicalFilters";
import { TAB_META } from "./api/types";
import type { ContentTab } from "./api/types";

function parseFilterSlugs(searchParams: URLSearchParams): string[] {
  const repeated = searchParams.getAll("filter").filter(Boolean);
  if (repeated.length > 0) return [...new Set(repeated)];

  const csv = searchParams.get("filters");
  if (!csv) return [];

  return [
    ...new Set(
      csv
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
}

export function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive active tab from URL, default to "signals"
  const tabParam = searchParams.get("tab") as ContentTab | null;
  const activeTab: ContentTab =
    tabParam && ["signals", "insights", "deep-analysis"].includes(tabParam)
      ? tabParam
      : "signals";

  const selectedFilterSlugs = useMemo(
    () => parseFilterSlugs(searchParams),
    [searchParams],
  );

  const {
    data: treeGroups = [],
    isLoading: isLoadingTreeGroups,
    error: treeGroupsError,
  } = useCategoryTreeGroups();

  const {
    data = [],
    isLoading,
    error,
  } = useContentItems(activeTab, selectedFilterSlugs);

  const slugToLabel = useMemo(() => {
    const map = new Map<string, string>();
    flattenCategoryTree(treeGroups).forEach((node) =>
      map.set(node.slug, node.name),
    );
    return map;
  }, [treeGroups]);

  const handleTabChange = (tab: ContentTab) => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", tab);
    setSearchParams(next);
  };

  const setSelectedSlugs = (nextSlugs: string[]) => {
    const next = new URLSearchParams(searchParams);
    next.delete("filter");

    [...new Set(nextSlugs)]
      .sort((a, b) => a.localeCompare(b))
      .forEach((slug) => next.append("filter", slug));

    if (!next.get("tab")) {
      next.set("tab", activeTab);
    }

    setSearchParams(next, { replace: true });
  };

  const clearAllFilters = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("filter");
    setSearchParams(next, { replace: true });
  };

  const activeFilterCount = selectedFilterSlugs.length;
  const meta = TAB_META[activeTab];
  let resultLabel = "Loading...";
  if (!isLoading) {
    const suffix = data.length === 1 ? "" : "s";
    resultLabel = `${data.length} result${suffix}`;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <p className="text-secondary-foreground/60 text-sm font-medium uppercase tracking-wider mb-2">
            Marketplace
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            {meta.emoji} {meta.label}
          </h1>
          <p className="text-secondary-foreground/80 text-lg max-w-2xl">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} onChange={handleTabChange} />

      {/* Toolbar */}
      <div className="border-b border-border bg-background py-3 sticky top-[72px+49px] z-20">
        <div className="container mx-auto px-4 flex items-center gap-3 flex-wrap">
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" size="sm" className="">
                <ListFilter className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 ? (
                  <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] leading-none text-primary-foreground">
                    {activeFilterCount}
                  </span>
                ) : null}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[86vw] max-w-sm p-0">
              <SheetHeader className="border-b border-border px-4 py-3">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(100%-56px)] overflow-y-auto p-4">
                <HierarchicalFilterSidebar
                  groups={treeGroups}
                  selectedSlugs={selectedFilterSlugs}
                  isLoading={isLoadingTreeGroups}
                  hasError={Boolean(treeGroupsError)}
                  onChange={setSelectedSlugs}
                  onClearAll={clearAllFilters}
                  compact
                  hideTitle
                  className="border-0 p-0"
                />
              </div>
            </SheetContent>
          </Sheet>

          <span className="text-sm text-muted-foreground ml-auto">
            {resultLabel}
          </span>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="container mx-auto px-4 pt-2 flex items-center gap-2 flex-wrap">
            {selectedFilterSlugs.map((slug) => (
              <Badge
                key={slug}
                variant="secondary"
                className="gap-1 cursor-pointer"
                onClick={() =>
                  setSelectedSlugs(
                    selectedFilterSlugs.filter((value) => value !== slug),
                  )
                }
              >
                {slugToLabel.get(slug) || slug} <X className="h-3 w-3" />
              </Badge>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div>
          <ContentGrid items={data} isLoading={isLoading} error={error} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MarketplacePage;
