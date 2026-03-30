import { Fragment, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  Layers,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../shared/AdminLayout";
import {
  type AdminCategory,
  type UpsertAdminCategoryInput,
  createAdminCategory,
  deleteAdminCategories,
  fetchCategoriesByFilterGroup,
  fetchCategoryFilterGroups,
  updateAdminCategory,
} from "./api/categoriesAdmin";
import {
  DEFAULT_GROUP_ORDER,
  GROUP_LABELS,
  HIERARCHICAL_GROUPS,
} from "./constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
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

interface CategoryFormState {
  id: string | null;
  name: string;
  slug: string;
  description: string;
  filterGroup: string;
  newFilterGroup: string;
  parentId: string | null;
  filterDisplayOrder: number;
  isFilterEnabled: boolean;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function groupLabel(group: string): string {
  return GROUP_LABELS[group] || group;
}

function toFormState(
  category: AdminCategory | null,
  activeGroup: string,
): CategoryFormState {
  if (!category) {
    return {
      id: null,
      name: "",
      slug: "",
      description: "",
      filterGroup: activeGroup,
      newFilterGroup: "",
      parentId: null,
      filterDisplayOrder: 0,
      isFilterEnabled: true,
    };
  }

  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    filterGroup: category.filterGroup,
    newFilterGroup: "",
    parentId: category.parentId,
    filterDisplayOrder: category.filterDisplayOrder,
    isFilterEnabled: category.isFilterEnabled,
  };
}

function resolveFilterGroup(form: CategoryFormState): string {
  if (form.filterGroup !== "__new__") return form.filterGroup;
  return slugify(form.newFilterGroup);
}

function buildUpsertPayload(form: CategoryFormState): UpsertAdminCategoryInput {
  const resolvedGroup = resolveFilterGroup(form);

  return {
    name: form.name.trim(),
    slug: form.slug.trim(),
    description: form.description.trim() || null,
    parentId: form.parentId || null,
    filterGroup: resolvedGroup,
    filterDisplayOrder: form.filterDisplayOrder,
    isFilterEnabled: form.isFilterEnabled,
  };
}

function withVisibleSelection(
  previous: string[],
  visibleIds: string[],
  shouldSelect: boolean,
): string[] {
  if (shouldSelect) {
    return Array.from(new Set([...previous, ...visibleIds]));
  }

  return previous.filter((id) => !visibleIds.includes(id));
}

export default function CategoriesPage() {
  const queryClient = useQueryClient();

  const [activeGroup, setActiveGroup] = useState<string>("");
  const [search, setSearch] = useState("");
  const [expandedParents, setExpandedParents] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dialogState, setDialogState] = useState<CategoryFormState>(
    toFormState(null, "content-types"),
  );
  const [singleDelete, setSingleDelete] = useState<AdminCategory | null>(null);

  const { data: fetchedGroups = [], isLoading: groupsLoading } = useQuery({
    queryKey: ["admin-category-groups"],
    queryFn: fetchCategoryFilterGroups,
    staleTime: 60 * 1000,
  });

  const groups = useMemo(() => {
    const all = new Set<string>([...DEFAULT_GROUP_ORDER, ...fetchedGroups]);
    return Array.from(all).sort((a, b) => {
      const ia = DEFAULT_GROUP_ORDER.indexOf(
        a as (typeof DEFAULT_GROUP_ORDER)[number],
      );
      const ib = DEFAULT_GROUP_ORDER.indexOf(
        b as (typeof DEFAULT_GROUP_ORDER)[number],
      );
      const pa = ia === -1 ? Number.MAX_SAFE_INTEGER : ia;
      const pb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib;
      return pa - pb || a.localeCompare(b);
    });
  }, [fetchedGroups]);

  const currentGroup = groups.includes(activeGroup)
    ? activeGroup
    : (groups[0] ?? "");

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["admin-categories", currentGroup],
    queryFn: () => fetchCategoriesByFilterGroup(currentGroup),
    enabled: currentGroup.length > 0,
    staleTime: 30 * 1000,
  });

  const isHierarchical = HIERARCHICAL_GROUPS.has(currentGroup);

  const parents = useMemo(
    () => categories.filter((category) => !category.parentId),
    [categories],
  );

  const childrenByParent = useMemo(() => {
    const map = new Map<string, AdminCategory[]>();

    for (const category of categories) {
      if (!category.parentId) continue;
      const list = map.get(category.parentId) || [];
      list.push(category);
      map.set(category.parentId, list);
    }

    for (const [key, list] of map) {
      list.sort((a, b) => a.name.localeCompare(b.name));
      map.set(key, list);
    }

    return map;
  }, [categories]);

  const effectiveExpandedParents = useMemo(() => {
    if (!isHierarchical) return [] as string[];
    if (expandedParents.length === 0) {
      return parents.map((parent) => parent.id);
    }

    const parentIds = new Set(parents.map((parent) => parent.id));
    return expandedParents.filter((id) => parentIds.has(id));
  }, [isHierarchical, expandedParents, parents]);

  const visibleRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!isHierarchical) {
      return categories.filter((category) => {
        if (!query) return true;
        const haystack =
          `${category.name} ${category.slug} ${category.description || ""}`.toLowerCase();
        return haystack.includes(query);
      });
    }

    return parents
      .map((parent) => {
        const parentMatches =
          query.length === 0 ||
          `${parent.name} ${parent.slug} ${parent.description || ""}`
            .toLowerCase()
            .includes(query);

        const children = childrenByParent.get(parent.id) || [];
        const matchingChildren =
          query.length === 0
            ? children
            : children.filter((child) =>
                `${child.name} ${child.slug} ${child.description || ""}`
                  .toLowerCase()
                  .includes(query),
              );

        if (!parentMatches && matchingChildren.length === 0) return null;

        return {
          parent,
          children: parentMatches ? children : matchingChildren,
        };
      })
      .filter(Boolean) as Array<{
      parent: AdminCategory;
      children: AdminCategory[];
    }>;
  }, [categories, isHierarchical, search, parents, childrenByParent]);

  const visibleSelectableIds = useMemo(() => {
    if (!isHierarchical) {
      return (visibleRows as AdminCategory[]).map((row) => row.id);
    }

    return (
      visibleRows as Array<{ parent: AdminCategory; children: AdminCategory[] }>
    ).flatMap((row) => [
      row.parent.id,
      ...row.children.map((child) => child.id),
    ]);
  }, [isHierarchical, visibleRows]);

  const allVisibleSelected =
    visibleSelectableIds.length > 0 &&
    visibleSelectableIds.every((id) => selectedIds.includes(id));

  const upsertMutation = useMutation({
    mutationFn: async (
      payload: UpsertAdminCategoryInput & { id?: string | null },
    ) => {
      if (payload.id) {
        return updateAdminCategory(payload.id, payload);
      }

      return createAdminCategory(payload);
    },
    onSuccess: async (_result, payload) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-category-groups"] }),
      ]);

      const group = payload.filterGroup;
      if (group && group !== currentGroup) {
        setActiveGroup(group);
      }

      toast.success(payload.id ? "Category updated" : "Category created");
      setDialogOpen(false);
      setDialogState(toFormState(null, currentGroup));
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Failed to save category";
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminCategories,
    onSuccess: async (_, ids) => {
      await queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success(
        ids.length === 1
          ? "Category deleted"
          : `${ids.length} categories deleted`,
      );
      setDeleteOpen(false);
      setSingleDelete(null);
      setSelectedIds([]);
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Failed to delete categories";
      toast.error(message);
    },
  });

  const openCreateDialog = (parentId: string | null = null) => {
    setDialogState({
      ...toFormState(null, currentGroup),
      parentId,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (category: AdminCategory) => {
    setDialogState(toFormState(category, currentGroup));
    setDialogOpen(true);
  };

  const toggleExpanded = (parentId: string) => {
    setExpandedParents((prev) => {
      const base =
        prev.length === 0 ? parents.map((parent) => parent.id) : prev;
      if (base.includes(parentId)) {
        return base.filter((id) => id !== parentId);
      }
      return [...base, parentId];
    });
  };

  const toggleSelected = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      return;
    }

    setSelectedIds((prev) => prev.filter((value) => value !== id));
  };

  const submitDialog = () => {
    const resolvedGroup = resolveFilterGroup(dialogState);

    if (!dialogState.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!dialogState.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    if (!resolvedGroup) {
      toast.error("Filter group is required");
      return;
    }

    const payload = buildUpsertPayload(dialogState);
    upsertMutation.mutate({
      ...payload,
      id: dialogState.id,
    });
  };

  const submitDelete = () => {
    let ids: string[] = [];
    if (selectedIds.length > 0) {
      ids = selectedIds;
    } else if (singleDelete) {
      ids = [singleDelete.id];
    }

    if (ids.length === 0) return;
    deleteMutation.mutate(ids);
  };

  const tableContent = () => {
    if (categoriesLoading || groupsLoading) {
      return (
        <div className="space-y-3 py-2">
          {[1, 2, 3, 4].map((row) => (
            <Skeleton key={row} className="h-11 w-full" />
          ))}
        </div>
      );
    }

    if (visibleSelectableIds.length === 0) {
      return (
        <div className="text-center py-14 text-muted-foreground">
          No categories found for this filter group.
        </div>
      );
    }

    if (!isHierarchical) {
      const rows = visibleRows as AdminCategory[];

      return (
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              <TableHead className="w-10">
                <Checkbox
                  checked={allVisibleSelected}
                  onCheckedChange={(checked) => {
                    setSelectedIds((prev) =>
                      withVisibleSelection(
                        prev,
                        visibleSelectableIds,
                        Boolean(checked),
                      ),
                    );
                  }}
                  aria-label="Select all visible categories"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Slug</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="w-38 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className="border-border/30">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onCheckedChange={(checked) =>
                      toggleSelected(row.id, Boolean(checked))
                    }
                    aria-label={`Select ${row.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{row.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-xs font-mono text-muted-foreground">
                    /{row.slug}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[34ch] truncate">
                  {row.description || "No description"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => openEditDialog(row)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setSingleDelete(row);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }

    const rows = visibleRows as Array<{
      parent: AdminCategory;
      children: AdminCategory[];
    }>;

    return (
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/20">
            <TableHead className="w-10">
              <Checkbox
                checked={allVisibleSelected}
                onCheckedChange={(checked) => {
                  setSelectedIds((prev) =>
                    withVisibleSelection(
                      prev,
                      visibleSelectableIds,
                      Boolean(checked),
                    ),
                  );
                }}
                aria-label="Select all visible categories"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Slug</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="w-44 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ parent, children }) => {
            const expanded = effectiveExpandedParents.includes(parent.id);

            return (
              <Fragment key={parent.id}>
                <TableRow className="bg-muted/10 border-border/30">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(parent.id)}
                      onCheckedChange={(checked) =>
                        toggleSelected(parent.id, Boolean(checked))
                      }
                      aria-label={`Select ${parent.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpanded(parent.id)}
                        aria-label={expanded ? "Collapse" : "Expand"}
                      >
                        {expanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <Layers className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">
                        {parent.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({children.length})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-xs font-mono text-muted-foreground">
                      /{parent.slug}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[34ch] truncate">
                    {parent.description || "No description"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => openCreateDialog(parent.id)}
                      aria-label="Add subcategory"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => openEditDialog(parent)}
                      aria-label="Edit category"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        setSingleDelete(parent);
                        setDeleteOpen(true);
                      }}
                      aria-label="Delete category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {expanded
                  ? children.map((child) => (
                      <TableRow key={child.id} className="border-border/20">
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(child.id)}
                            onCheckedChange={(checked) =>
                              toggleSelected(child.id, Boolean(checked))
                            }
                            aria-label={`Select ${child.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 pl-11">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">
                              {child.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <span className="text-xs font-mono text-muted-foreground pl-11">
                            /{child.slug}
                          </span>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[34ch] truncate">
                          {child.description || "No description"}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => openEditDialog(child)}
                            aria-label="Edit subcategory"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => {
                              setSingleDelete(child);
                              setDeleteOpen(true);
                            }}
                            aria-label="Delete subcategory"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const parentOptions = dialogState.filterGroup
    ? categories.filter((row) => !row.parentId)
    : [];

  const actions = (
    <Button onClick={() => openCreateDialog()}>
      <Plus className="h-4 w-4 mr-2" />
      Add Category
    </Button>
  );

  return (
    <AdminLayout title="Categories" actions={actions}>
      <div className="space-y-5">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Tabs
              value={currentGroup}
              onValueChange={(value) => {
                setActiveGroup(value);
                setExpandedParents([]);
                setSelectedIds([]);
              }}
            >
              {groups.length > 0 ? (
                <TabsList
                  variant="line"
                  className="w-full justify-start overflow-x-auto"
                >
                  {groups.map((group) => (
                    <TabsTrigger key={group} value={group}>
                      {groupLabel(group)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              ) : (
                <div className="w-full flex gap-2">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-28" />
                </div>
              )}
            </Tabs>

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
              <div className="relative w-full md:max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="pl-9"
                  placeholder="Filter categories by name, slug, description"
                />
              </div>

              {selectedIds.length > 0 ? (
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSingleDelete(null);
                    setDeleteOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedIds.length})
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 overflow-x-auto">
            {tableContent()}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {dialogState.id
                ? "Edit Category"
                : dialogState.parentId
                  ? "New Subcategory"
                  : "New Category"}
            </DialogTitle>
            <DialogDescription>
              Configure taxonomy and filter metadata for content organization.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-filter-group">Filter Group</Label>
              <Select
                value={dialogState.filterGroup || ""}
                onValueChange={(value) =>
                  setDialogState((prev) => ({
                    ...prev,
                    filterGroup: value,
                    parentId: HIERARCHICAL_GROUPS.has(value)
                      ? prev.parentId
                      : null,
                  }))
                }
              >
                <SelectTrigger id="category-filter-group">
                  <SelectValue placeholder="Select filter group" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {groupLabel(group)}
                    </SelectItem>
                  ))}
                  <SelectItem value="__new__">
                    + Create New Filter Group
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dialogState.filterGroup === "__new__" ? (
              <div className="space-y-2">
                <Label htmlFor="new-filter-group">New Filter Group Name</Label>
                <Input
                  id="new-filter-group"
                  value={dialogState.newFilterGroup}
                  onChange={(event) =>
                    setDialogState((prev) => ({
                      ...prev,
                      newFilterGroup: event.target.value,
                    }))
                  }
                  placeholder="e.g. content-difficulty"
                />
              </div>
            ) : null}

            {HIERARCHICAL_GROUPS.has(dialogState.filterGroup) ? (
              <div className="space-y-2">
                <Label htmlFor="parent-category">Category Type</Label>
                <Select
                  value={dialogState.parentId || "__parent__"}
                  onValueChange={(value) =>
                    setDialogState((prev) => ({
                      ...prev,
                      parentId: value === "__parent__" ? null : value,
                    }))
                  }
                >
                  <SelectTrigger id="parent-category">
                    <SelectValue placeholder="Parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__parent__">Parent Category</SelectItem>
                    {parentOptions.map((parent) => (
                      <SelectItem key={parent.id} value={parent.id}>
                        Subcategory under "{parent.name}"
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="category-name">Name</Label>
                <Input
                  id="category-name"
                  value={dialogState.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    setDialogState((prev) => ({
                      ...prev,
                      name,
                      slug: prev.id ? prev.slug : slugify(name),
                    }));
                  }}
                  placeholder="Category name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-slug">Slug</Label>
                <Input
                  id="category-slug"
                  value={dialogState.slug}
                  onChange={(event) =>
                    setDialogState((prev) => ({
                      ...prev,
                      slug: slugify(event.target.value),
                    }))
                  }
                  placeholder="category-slug"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                value={dialogState.description}
                onChange={(event) =>
                  setDialogState((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                rows={4}
                placeholder="Describe this category"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={upsertMutation.isPending}
            >
              Cancel
            </Button>
            <Button onClick={submitDialog} disabled={upsertMutation.isPending}>
              {upsertMutation.isPending
                ? "Saving..."
                : dialogState.id
                  ? "Update Category"
                  : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete categories?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedIds.length > 0
                ? `This will permanently remove ${selectedIds.length} selected categories.`
                : `This will permanently remove "${singleDelete?.name || "this category"}".`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                submitDelete();
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
