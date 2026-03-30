import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, X, Users, ChevronDown, ChevronUp, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { AuthorCard } from "./components/AuthorCard";
import { useAuthors } from "./hooks/useAuthors";
import { CONTRIBUTOR_TYPES } from "./api/authors";

const WORKS_BUCKETS = [
  { id: "0-5", label: "0–5 works", matches: (n: number) => n <= 5 },
  { id: "6-10", label: "6–10 works", matches: (n: number) => n >= 6 && n <= 10 },
  { id: "11+", label: "11+ works", matches: (n: number) => n >= 11 },
];

const STANDARD_TYPES = CONTRIBUTOR_TYPES.map((t) => ({ id: t.id, label: t.label }));

interface Filters {
  search: string;
  types: string[];
  tags: string[];
  worksRange: string[];
}

const DEFAULT_FILTERS: Filters = { search: "", types: [], tags: [], worksRange: [] };

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground"
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2">
              <Checkbox
                id={`filter-${opt.id}`}
                checked={selected.includes(opt.id)}
                onCheckedChange={() => onToggle(opt.id)}
              />
              <Label htmlFor={`filter-${opt.id}`} className="text-sm font-normal cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarFilters({
  filters,
  tagOptions,
  hasActive,
  onTypeToggle,
  onTagToggle,
  onWorksToggle,
  onReset,
}: {
  filters: Filters;
  tagOptions: { id: string; label: string }[];
  hasActive: boolean;
  onTypeToggle: (id: string) => void;
  onTagToggle: (id: string) => void;
  onWorksToggle: (id: string) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-semibold text-foreground">Filters</h2>
        {hasActive && (
          <button onClick={onReset} className="text-xs text-primary hover:underline">
            Reset
          </button>
        )}
      </div>
      <Separator />
      <FilterSection title="Contributor Type" options={STANDARD_TYPES} selected={filters.types} onToggle={onTypeToggle} />
      {tagOptions.length > 0 && (
        <>
          <Separator />
          <FilterSection title="Interests / Tags" options={tagOptions} selected={filters.tags} onToggle={onTagToggle} />
        </>
      )}
      <Separator />
      <FilterSection title="Contribution Volume" options={WORKS_BUCKETS} selected={filters.worksRange} onToggle={onWorksToggle} />
    </div>
  );
}

export default function AuthorListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(() => {
    const type = searchParams.get("type");
    return { ...DEFAULT_FILTERS, types: type ? [type] : [] };
  });

  const { data: allAuthors = [], isLoading } = useAuthors();

  const tagOptions = useMemo(() => {
    const all = new Set(allAuthors.flatMap((a) => a.tags ?? []));
    return [...all].sort().map((t) => ({ id: t, label: t }));
  }, [allAuthors]);

  const hasActive = filters.types.length > 0 || filters.tags.length > 0 || filters.worksRange.length > 0 || filters.search.trim() !== "";

  const toggle = (key: keyof Omit<Filters, "search">, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    setFilters((prev) => ({ ...prev, [key]: next }));
    if (key === "types") {
      if (next.length === 1) setSearchParams({ type: next[0] });
      else setSearchParams({});
    }
  };

  const reset = () => { setFilters(DEFAULT_FILTERS); setSearchParams({}); };

  const filtered = useMemo(() => {
    return allAuthors.filter((a) => {
      const q = filters.search.toLowerCase();
      const matchSearch = !q || a.name.toLowerCase().includes(q) || (a.expertise || "").toLowerCase().includes(q) || (a.bio || "").toLowerCase().includes(q);
      const matchType = filters.types.length === 0 || filters.types.includes(a.contributorType ?? "");
      const matchTag = filters.tags.length === 0 || filters.tags.some((t) => (a.tags ?? []).includes(t));
      const matchWorks = filters.worksRange.length === 0 || filters.worksRange.some((id) => WORKS_BUCKETS.find((b) => b.id === id)?.matches(a.worksCount));
      return matchSearch && matchType && matchTag && matchWorks;
    });
  }, [allAuthors, filters]);

  const activeTypeName = filters.types.length === 1 ? filters.types[0] : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
            <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5" /> Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/contributors" className="hover:text-foreground transition-colors">Contributors</Link>
            {activeTypeName && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-foreground">{activeTypeName}</span>
              </>
            )}
          </nav>

          {/* Page header */}
          <div className="mb-6">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Explore DTMI Contributors
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Browse the collective intelligence powering DTMI, filter by contributor type, discover topical tags, and dive into their biographies, areas of expertise, and portfolio of published works.
            </p>
          </div>

          {/* Search + mobile filter trigger */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={filters.search}
                onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                placeholder="Search by name, expertise, or interest..."
                className="pl-9"
              />
              {filters.search && (
                <button onClick={() => setFilters((p) => ({ ...p, search: "" }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Mobile filter sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="xl:hidden gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {hasActive && <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5">{filters.types.length + filters.tags.length + filters.worksRange.length}</span>}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-5">
                <SheetHeader className="mb-4">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <SidebarFilters filters={filters} tagOptions={tagOptions} hasActive={hasActive}
                  onTypeToggle={(v) => toggle("types", v)} onTagToggle={(v) => toggle("tags", v)}
                  onWorksToggle={(v) => toggle("worksRange", v)} onReset={reset} />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
                <SidebarFilters filters={filters} tagOptions={tagOptions} hasActive={hasActive}
                  onTypeToggle={(v) => toggle("types", v)} onTagToggle={(v) => toggle("tags", v)}
                  onWorksToggle={(v) => toggle("worksRange", v)} onReset={reset} />
              </div>
            </aside>

            {/* Content */}
            <section className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <span>
                  {isLoading ? "Loading contributors…" : `Showing ${filtered.length} of ${allAuthors.length} contributors`}
                </span>
                {hasActive && (
                  <button onClick={reset} className="text-primary hover:underline font-medium">
                    Clear filters
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
                </div>
              ) : filtered.length === 0 ? (
                <div className="border border-dashed border-border rounded-xl p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No contributors found</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {hasActive ? "Try adjusting your filters or search term." : "Contributors will appear here once added."}
                  </p>
                  {hasActive && <Button variant="ghost" onClick={reset}>Reset Filters</Button>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((author) => (
                    <AuthorCard key={author.id} author={author} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
