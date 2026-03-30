import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, Pencil, Plus, Search, Trash2, User } from "lucide-react";
import AdminLayout from "../shared/AdminLayout";
import {
  type AdminAuthor,
  fetchAdminAuthors,
  deleteAdminAuthor,
  deleteAdminAuthors,
} from "./api/authorsAdmin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function AuthorManagementPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [singleDelete, setSingleDelete] = useState<AdminAuthor | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-authors", search],
    queryFn: () => fetchAdminAuthors(search),
    staleTime: 60 * 1000,
  });

  const deleteOneMutation = useMutation({
    mutationFn: deleteAdminAuthor,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
      setSingleDelete(null);
      setSelectedIds([]);
    },
  });

  const deleteManyMutation = useMutation({
    mutationFn: deleteAdminAuthors,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
      setBulkDeleteOpen(false);
      setSelectedIds([]);
    },
  });

  const allSelected = useMemo(() => {
    return data.length > 0 && selectedIds.length === data.length;
  }, [data.length, selectedIds.length]);

  const toggleSelection = (authorId: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, authorId]);
      return;
    }

    setSelectedIds((prev) =>
      prev.filter((currentId) => currentId !== authorId),
    );
  };

  const renderBodyRows = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={5}>
            <div className="space-y-2 py-2">
              {[1, 2, 3, 4].map((row) => (
                <Skeleton key={row} className="h-10 w-full" />
              ))}
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center py-12 text-muted-foreground"
          >
            No authors found.
          </TableCell>
        </TableRow>
      );
    }

    return data.map((author) => (
      <TableRow key={author.id} className="border-border/25">
        <TableCell>
          <Checkbox
            checked={selectedIds.includes(author.id)}
            onCheckedChange={(checked) =>
              toggleSelection(author.id, Boolean(checked))
            }
            aria-label={`Select ${author.name}`}
          />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full border border-border/70 shadow-sm overflow-hidden bg-muted flex items-center justify-center shrink-0">
              {author.avatarUrl ? (
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <div className="font-medium text-sm">{author.name}</div>
              <div className="text-xs text-muted-foreground">
                {author.title || "No title"}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <p className="text-xs text-muted-foreground max-w-[36ch] line-clamp-1">
            {author.bio || "No bio available."}
          </p>
        </TableCell>
        <TableCell className="text-sm">{author.worksCount}</TableCell>
        <TableCell>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Author actions"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => navigate(`/admin/authors/${author.id}/edit`)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setSingleDelete(author)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  const actions = (
    <Button asChild>
      <Link to="/admin/authors/new">
        <Plus className="h-4 w-4 mr-2" />
        Add Author
      </Link>
    </Button>
  );

  return (
    <AdminLayout title="Authors" actions={actions}>
      <div className="space-y-5">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="pl-9"
                  placeholder="Search by author name or title"
                />
              </div>

              {selectedIds.length > 0 ? (
                <Button
                  variant="destructive"
                  onClick={() => setBulkDeleteOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedIds.length})
                </Button>
              ) : null}
            </div>

            <div className="rounded-lg border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/10 border-border/30">
                    <TableHead className="w-10">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedIds(data.map((author) => author.id));
                          } else {
                            setSelectedIds([]);
                          }
                        }}
                        aria-label="Select all authors"
                      />
                    </TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Biography
                    </TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{renderBodyRows()}</TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog
        open={Boolean(singleDelete)}
        onOpenChange={(open) => !open && setSingleDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete author profile?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              {singleDelete ? `"${singleDelete.name}"` : "this author"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteOneMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteOneMutation.isPending || !singleDelete}
              onClick={(event) => {
                event.preventDefault();
                if (!singleDelete) return;
                deleteOneMutation.mutate(singleDelete.id);
              }}
            >
              {deleteOneMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete selected authors?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {selectedIds.length} selected
              authors.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteManyMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={
                deleteManyMutation.isPending || selectedIds.length === 0
              }
              onClick={(event) => {
                event.preventDefault();
                if (selectedIds.length === 0) return;
                deleteManyMutation.mutate(selectedIds);
              }}
            >
              {deleteManyMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
