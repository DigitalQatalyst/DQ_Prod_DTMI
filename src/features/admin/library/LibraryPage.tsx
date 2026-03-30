import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Archive,
  FilePlus2,
  ExternalLink,
  FolderOpen,
  MoreVertical,
  Pencil,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TYPE_LABELS } from "@/features/marketplace/api/types";
import AdminLayout from "../shared/AdminLayout";
import {
  fetchLibraryItems,
  deleteLibraryItem,
  type AdminLibraryItem,
} from "./api/library";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PAGE_SIZE = 12;

function buildPublicLink(item: AdminLibraryItem): string {
  return item.slug ? `/${item.type}/${item.slug}` : `/${item.type}/${item.id}`;
}

function formatDate(date: string | null): string {
  if (!date) return "Draft";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LibraryPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemToDelete, setItemToDelete] = useState<AdminLibraryItem | null>(
    null,
  );

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-library"],
    queryFn: fetchLibraryItems,
    staleTime: 2 * 60 * 1000,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLibraryItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-library"] });
      setItemToDelete(null);
    },
  });

  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const item of data) unique.add(item.category);
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const types = useMemo(() => {
    const unique = new Set<string>();
    for (const item of data) unique.add(item.type);
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return data.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.authorName.toLowerCase().includes(q);

      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [data, search, typeFilter, categoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const actions = (
    <Button asChild>
      <Link to="/admin/library/new">
        <FilePlus2 className="h-4 w-4 mr-2" />
        New Content
      </Link>
    </Button>
  );

  const renderTableContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((row) => (
            <Skeleton key={row} className="h-12 w-full" />
          ))}
        </div>
      );
    }

    if (pageItems.length === 0) {
      return (
        <div className="py-14 text-center text-muted-foreground">
          <FolderOpen className="h-8 w-8 mx-auto mb-3" />
          No library items match your filters.
        </div>
      );
    }

    return (
      <>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border bg-muted/20">
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-border/70 last:border-b-0"
                >
                  <TableCell>
                    <div className="h-12 w-20 rounded-md overflow-hidden border border-border bg-muted">
                      {item.heroImage ? (
                        <img
                          src={item.heroImage}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <div className="font-medium max-w-[36ch] truncate">
                        {item.title}
                      </div>
                      {item.featured && (
                        <Star className="h-3.5 w-3.5 text-amber-500 mt-1 shrink-0" />
                      )}
                    </div>
                    {item.excerpt ? (
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-[42ch]">
                        {item.excerpt}
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {TYPE_LABELS[item.type] || item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.authorName}</TableCell>
                  <TableCell>{formatDate(item.publishDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            buildPublicLink(item),
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Preview
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="Open row actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          {item.type === "blog" || item.type === "article" ? (
                            <DropdownMenuItem
                              onSelect={() =>
                                navigate(
                                  `/admin/library/${item.type}/${item.id}/edit`,
                                )
                              }
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem disabled>
                              <Pencil className="h-4 w-4" />
                              Edit (paused)
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem disabled>
                            <Archive className="h-4 w-4" />
                            Archive (paused)
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setItemToDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= pageCount}
              onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <AdminLayout title="Library" actions={actions}>
      <div className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Restructure mode</AlertTitle>
          <AlertDescription>
            Blog CMS is now active. Other content types remain paused while they
            are being rebuilt into the same production architecture.
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="relative lg:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search by title, excerpt, or author"
                  className="pl-9"
                />
              </div>

              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  setTypeFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {TYPE_LABELS[type] || type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={categoryFilter}
                onValueChange={(value) => {
                  setCategoryFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filtered.length} item{filtered.length === 1 ? "" : "s"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">{renderTableContent()}</CardContent>
        </Card>
      </div>

      <AlertDialog
        open={Boolean(itemToDelete)}
        onOpenChange={(open) => !open && setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete library item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              {itemToDelete ? `"${itemToDelete.title}"` : "this item"} from
              content_items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending || !itemToDelete}
              onClick={(event) => {
                event.preventDefault();
                if (!itemToDelete) return;
                deleteMutation.mutate(itemToDelete.id);
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
