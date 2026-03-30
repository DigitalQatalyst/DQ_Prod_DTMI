import { useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../shared/AdminLayout";
import RichTextEditor from "../shared/components/RichTextEditor";
import HierarchicalFilterSelect from "./components/HierarchicalFilterSelect";
import {
  fetchAdminAuthorOptions,
  fetchBlogSidebarFilterOptions,
  fetchCategoryOptionsBySection,
  fetchSectionOptions,
  getCategoryNameById,
  uploadBlogHeroImage,
  type AdminContentItem,
  type HierarchicalCategory,
  type UpsertAdminContentInput,
} from "./api/blogCms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const FILTER_TAG_PREFIX = "filter";

type FilterKey =
  | "perspective"
  | "stream"
  | "sector"
  | "format"
  | "popularity"
  | "domain";

type ContentType = "blog" | "article";


type FormFilterValues = Pick<
  FormValues,
  | "sectionId"
  | "categoryId"
  | "contentTypeCategoryId"
  | "sectorId"
  | "contentFormatId"
  | "popularityTagId"
  | "dbpDomainId"
>;

interface FilterOptionSets {
  sectionOptions: readonly HierarchicalCategory[];
  categoryOptions: readonly HierarchicalCategory[];
  sidebarFilters?: {
    contentTypes: readonly HierarchicalCategory[];
    digitalSectors: readonly HierarchicalCategory[];
    contentFormats: readonly HierarchicalCategory[];
    popularityTags: readonly HierarchicalCategory[];
    dbpDomains: readonly HierarchicalCategory[];
  };
}

interface ContentEditorPageProps {
  readonly contentType: ContentType;
  readonly contentLabel: string;
  readonly fetchById: (id: string) => Promise<AdminContentItem | null>;
  readonly createItem: (
    input: UpsertAdminContentInput,
  ) => Promise<AdminContentItem>;
  readonly updateItem: (
    id: string,
    input: UpsertAdminContentInput,
  ) => Promise<AdminContentItem>;
}

function toFilterTag(key: FilterKey, value: string): string {
  return `${FILTER_TAG_PREFIX}:${key}:${value}`;
}

function parseTags(tags: string[]): {
  customTags: string[];
  filters: Partial<Record<FilterKey, string>>;
} {
  const customTags: string[] = [];
  const filters: Partial<Record<FilterKey, string>> = {};

  for (const tag of tags) {
    const parts = tag.split(":");
    if (parts.length === 3 && parts[0] === FILTER_TAG_PREFIX) {
      const key = parts[1] as FilterKey;
      const value = parts[2];
      if (value) filters[key] = value;
      continue;
    }

    customTags.push(tag);
  }

  return { customTags, filters };
}

function buildFilterCategoryIds(values: FormFilterValues): string[] {
  const ids: string[] = [];

  if (values.contentTypeCategoryId) ids.push(values.contentTypeCategoryId);
  if (values.sectionId) ids.push(values.sectionId);
  if (values.categoryId) ids.push(values.categoryId);
  if (values.sectorId) ids.push(values.sectorId);
  if (values.contentFormatId) ids.push(values.contentFormatId);
  if (values.popularityTagId) ids.push(values.popularityTagId);
  if (values.dbpDomainId) ids.push(values.dbpDomainId);

  return ids;
}

function buildFilterTags(values: FormFilterValues): string[] {
  return [
    values.sectionId && toFilterTag("perspective", values.sectionId),
    values.categoryId && toFilterTag("stream", values.categoryId),
    values.sectorId && toFilterTag("sector", values.sectorId),
    values.contentFormatId && toFilterTag("format", values.contentFormatId),
    values.popularityTagId && toFilterTag("popularity", values.popularityTagId),
    values.dbpDomainId && toFilterTag("domain", values.dbpDomainId),
  ].filter((tag): tag is string => Boolean(tag));
}

function flattenIds(nodes: readonly HierarchicalCategory[]): Set<string> {
  const ids = new Set<string>();
  const walk = (items: readonly HierarchicalCategory[]) => {
    items.forEach((item) => {
      ids.add(item.id);
      if (item.children && item.children.length > 0) {
        walk(item.children);
      }
    });
  };

  walk(nodes);
  return ids;
}

function collectDepthById(
  nodes: readonly HierarchicalCategory[],
  depth: number = 0,
  map: Map<string, number> = new Map(),
): Map<string, number> {
  for (const node of nodes) {
    map.set(node.id, depth);
    if (node.children && node.children.length > 0) {
      collectDepthById(node.children, depth + 1, map);
    }
  }
  return map;
}

function resolveFiltersFromCategoryIds(
  filterCategoryIds: string[] | undefined,
  options: FilterOptionSets,
): Partial<FormFilterValues> {
  if (!filterCategoryIds || filterCategoryIds.length === 0) return {};

  const sectionDepths = collectDepthById(options.sectionOptions);
  const categoryDepths = collectDepthById(options.categoryOptions);
  const sectorDepths = collectDepthById(
    options.sidebarFilters?.digitalSectors || [],
  );
  const formatDepths = collectDepthById(
    options.sidebarFilters?.contentFormats || [],
  );
  const popularityDepths = collectDepthById(
    options.sidebarFilters?.popularityTags || [],
  );
  const domainDepths = collectDepthById(
    options.sidebarFilters?.dbpDomains || [],
  );

  const candidates: Array<{
    field: keyof FormFilterValues;
    ids: Set<string>;
    depthById: Map<string, number>;
  }> = [
    {
      field: "sectionId",
      ids: new Set(options.sectionOptions.map((item) => item.id)),
      depthById: sectionDepths,
    },
    {
      field: "contentTypeCategoryId",
      ids: flattenIds(options.sidebarFilters?.contentTypes || []),
      depthById: collectDepthById(options.sidebarFilters?.contentTypes || []),
    },
    {
      field: "categoryId",
      ids: flattenIds(options.categoryOptions),
      depthById: categoryDepths,
    },
    {
      field: "sectorId",
      ids: flattenIds(options.sidebarFilters?.digitalSectors || []),
      depthById: sectorDepths,
    },
    {
      field: "contentFormatId",
      ids: flattenIds(options.sidebarFilters?.contentFormats || []),
      depthById: formatDepths,
    },
    {
      field: "popularityTagId",
      ids: flattenIds(options.sidebarFilters?.popularityTags || []),
      depthById: popularityDepths,
    },
    {
      field: "dbpDomainId",
      ids: flattenIds(options.sidebarFilters?.dbpDomains || []),
      depthById: domainDepths,
    },
  ];

  const resolved: Partial<FormFilterValues> = {};
  for (const candidate of candidates) {
    let bestId: string | null = null;
    let bestDepth = -1;

    for (const categoryId of filterCategoryIds) {
      if (!candidate.ids.has(categoryId)) continue;
      const depth = candidate.depthById.get(categoryId) ?? 0;
      if (depth > bestDepth) {
        bestDepth = depth;
        bestId = categoryId;
      }
    }

    if (bestId) {
      resolved[candidate.field] = bestId;
    }
  }

  return resolved;
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z.string().trim().optional().or(z.literal("")),
  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters.")
    .max(500, "Excerpt must be at most 500 characters."),
  content: z.string().min(20, "Content is required."),
  heroImage: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\//.test(value),
      "Hero image URL must start with http:// or https://",
    ),
  authorId: z.string().min(1, "Author is required."),
  contentTypeCategoryId: z.string().optional().or(z.literal("")),
  sectionId: z.string().optional().or(z.literal("")),
  categoryId: z.string().min(1, "Category is required."),
  sectorId: z.string().optional().or(z.literal("")),
  contentFormatId: z.string().optional().or(z.literal("")),
  popularityTagId: z.string().optional().or(z.literal("")),
  dbpDomainId: z.string().optional().or(z.literal("")),
  readTime: z
    .string()
    .min(1, "Read time is required.")
    .refine((value) => {
      const minutes = Number(value);
      return Number.isInteger(minutes) && minutes >= 1 && minutes <= 120;
    }, "Read time must be between 1 and 120 minutes."),
  featured: z.boolean(),
  tagsCsv: z.string().trim().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContentEditorPage({
  contentType,
  contentLabel,
  fetchById,
  createItem,
  updateItem,
}: Readonly<ContentEditorPageProps>) {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toastRef = useRef<string | number | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const initializedForItemRef = useRef<string | null>(null);
  const initializedAuthorForItemRef = useRef<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      heroImage: "",
      authorId: "",
      contentTypeCategoryId: "",
      sectionId: "",
      categoryId: "",
      sectorId: "",
      contentFormatId: "",
      popularityTagId: "",
      dbpDomainId: "",
      readTime: "5",
      featured: false,
      tagsCsv: "",
    },
  });

  const selectedAuthorId = useWatch({
    control: form.control,
    name: "authorId",
  });

  const { data: item, isLoading: isLoadingItem } = useQuery({
    queryKey: ["admin-content", contentType, id],
    queryFn: () => (id ? fetchById(id) : Promise.resolve(null)),
    enabled: isEdit,
  });

  const { data: authorOptions = [] } = useQuery({
    queryKey: ["admin-content-authors"],
    queryFn: fetchAdminAuthorOptions,
  });

  // Use item.authorId as the ground truth for building the option list so the
  // Select always has a matching item even while authorOptions is loading.
  const effectiveAuthorId =
    item?.authorId?.trim() || selectedAuthorId?.trim() || "";

  let authorOptionsWithCurrent = authorOptions;
  if (effectiveAuthorId) {
    const exists = authorOptions.some(
      (option) => option.id === effectiveAuthorId,
    );
    if (!exists) {
      authorOptionsWithCurrent = [
        {
          id: effectiveAuthorId,
          name: "Loading author...",
          avatarUrl: null,
          title: null,
        },
        ...authorOptions,
      ];
    }
  }

  const { data: sectionOptions = [], isLoading: isLoadingSections } = useQuery({
    queryKey: ["admin-content-sections"],
    queryFn: fetchSectionOptions,
  });

  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useQuery({
      queryKey: ["admin-content-categories"],
      queryFn: () => fetchCategoryOptionsBySection(),
      enabled: true,
    });

  const { data: sidebarFilters, isLoading: isLoadingSidebarFilters } = useQuery(
    {
      queryKey: ["admin-content-sidebar-filters"],
      queryFn: fetchBlogSidebarFilterOptions,
    },
  );

  // Set authorId as soon as item loads — don't wait for filter options.
  // Using setValue keeps the rest of the form intact.
  useEffect(() => {
    if (!item?.authorId) return;
    if (initializedAuthorForItemRef.current === item.id) return;

    form.setValue("authorId", item.authorId.trim(), {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
    initializedAuthorForItemRef.current = item.id;
  }, [item?.id, item?.authorId, form]);

  // Full population: set all fields once filter options are ready so that every
  // filter select is correctly pre-populated. Uses setValue (not reset) to
  // avoid briefly clearing field values between renders.
  useEffect(() => {
    if (!item) return;
    if (isLoadingSections || isLoadingCategories || isLoadingSidebarFilters) return;
    if (initializedForItemRef.current === item.id) return;

    const { customTags, filters } = parseTags(item.tags);
    const mappedFilters = resolveFiltersFromCategoryIds(
      item.filterCategoryIds,
      { sectionOptions, categoryOptions, sidebarFilters },
    );

    const opts = { shouldDirty: false, shouldValidate: false, shouldTouch: false };

    form.setValue("title", item.title, opts);
    form.setValue("slug", item.slug, opts);
    form.setValue("excerpt", item.excerpt, opts);
    form.setValue("content", item.content, opts);
    form.setValue("heroImage", item.heroImage, opts);
    form.setValue("authorId", item.authorId?.trim() || "", opts);
    form.setValue("contentTypeCategoryId", mappedFilters.contentTypeCategoryId || "", opts);
    form.setValue(
      "sectionId",
      mappedFilters.sectionId || item.sectionId || filters.perspective || "",
      opts,
    );
    form.setValue(
      "categoryId",
      mappedFilters.categoryId || item.categoryId || filters.stream || "",
      opts,
    );
    form.setValue("sectorId", mappedFilters.sectorId || filters.sector || "", opts);
    form.setValue("contentFormatId", mappedFilters.contentFormatId || filters.format || "", opts);
    form.setValue("popularityTagId", mappedFilters.popularityTagId || filters.popularity || "", opts);
    form.setValue("dbpDomainId", mappedFilters.dbpDomainId || filters.domain || "", opts);
    form.setValue("readTime", String(item.readTime), opts);
    form.setValue("featured", item.featured, opts);
    form.setValue("tagsCsv", customTags.join(", "), opts);

    initializedForItemRef.current = item.id;
    initializedAuthorForItemRef.current = item.id;
  }, [
    item,
    form,
    sectionOptions,
    categoryOptions,
    sidebarFilters,
    isLoadingSections,
    isLoadingCategories,
    isLoadingSidebarFilters,
  ]);

  const selectedAuthor = useMemo(() => {
    return authorOptionsWithCurrent.find(
      (option) => option.id === selectedAuthorId,
    );
  }, [authorOptionsWithCurrent, selectedAuthorId]);

  const saveMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const selectedCategoryName = getCategoryNameById(
        categoryOptions,
        values.categoryId,
      );

      if (!selectedCategoryName) {
        throw new Error("Please select a valid category.");
      }

      let heroImageUrl = values.heroImage || null;
      if (heroImageFile) {
        heroImageUrl = await uploadBlogHeroImage(heroImageFile);
      }

      const customTags = (values.tagsCsv || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);

      const filterCategoryIds = buildFilterCategoryIds(values);
      const filterTags = buildFilterTags(values);

      const payload: UpsertAdminContentInput = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        heroImage: heroImageUrl,
        readTime: Number(values.readTime),
        featured: values.featured,
        tags: [...customTags, ...filterTags],
        authorId: values.authorId,
        categoryId: values.categoryId,
        categoryName: selectedCategoryName,
        filterCategoryIds,
      };

      if (isEdit && id) {
        return updateItem(id, payload);
      }

      return createItem(payload);
    },
    onMutate: (values) => {
      toastRef.current = toast.loading(
        isEdit
          ? `Updating ${values.title || contentLabel.toLowerCase()}...`
          : `Creating ${values.title || contentLabel.toLowerCase()}...`,
      );
    },
    onSuccess: async (_data, values) => {
      await queryClient.invalidateQueries({ queryKey: ["admin-library"] });
      if (id) {
        await queryClient.invalidateQueries({
          queryKey: ["admin-content", contentType, id],
        });
      }

      if (toastRef.current !== null) {
        toast.dismiss(toastRef.current);
        toastRef.current = null;
      }

      toast.success(
        isEdit
          ? `${contentLabel} updated: ${values.title}`
          : `${contentLabel} created: ${values.title}`,
      );
      navigate("/admin/library");
    },
    onError: (error, values) => {
      if (toastRef.current !== null) {
        toast.dismiss(toastRef.current);
        toastRef.current = null;
      }

      const message =
        error instanceof Error
          ? error.message
          : `Failed to save ${contentLabel.toLowerCase()}`;

      toast.error(
        isEdit
          ? `Could not update ${values.title || contentLabel.toLowerCase()}: ${message}`
          : `Could not create ${values.title || contentLabel.toLowerCase()}: ${message}`,
      );
    },
  });

  const submitLabel = useMemo(() => {
    if (saveMutation.isPending) return "Saving...";
    return isEdit ? `Update ${contentLabel}` : `Create ${contentLabel}`;
  }, [contentLabel, isEdit, saveMutation.isPending]);

  const handleHeroImageChange = (file?: File) => {
    if (!file) return;
    setHeroImageFile(file);
    const preview = URL.createObjectURL(file);
    form.setValue("heroImage", preview, { shouldValidate: false });
  };

  const actions = (
    <Button asChild variant="outline">
      <Link to="/admin/library">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Library
      </Link>
    </Button>
  );

  if (isEdit && isLoadingItem) {
    return (
      <AdminLayout title={`Edit ${contentLabel}`} actions={actions}>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading {contentLabel.toLowerCase()}...
        </div>
      </AdminLayout>
    );
  }

  const formId = `${contentType}-form`;
  const imageInputId = `${contentType}-hero-image`;

  return (
    <AdminLayout
      title={isEdit ? `Edit ${contentLabel}` : `New ${contentLabel}`}
      actions={actions}
    >
      <form
        id={formId}
        onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Main {contentLabel.toLowerCase()} content area,
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="content-title">Title</FieldLabel>
                        <Input
                          {...field}
                          id="content-title"
                          placeholder={`${contentLabel} title`}
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="slug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="content-slug">
                          Slug (optional)
                        </FieldLabel>
                        <Input
                          {...field}
                          id="content-slug"
                          placeholder="auto-generated-from-title"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Leave empty to auto-generate from title.
                        </FieldDescription>
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="excerpt"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="content-excerpt">
                          Excerpt
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="content-excerpt"
                          rows={4}
                          placeholder="Short summary used in listing cards and SEO snippets"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="heroImage"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={imageInputId}>
                          Hero Image
                        </FieldLabel>
                        <div className="space-y-3">
                          <div className="h-44 w-full overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center">
                            {field.value ? (
                              <img
                                src={field.value}
                                alt="Hero preview"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                No image selected
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline" asChild>
                              <label className="cursor-pointer">
                                <Camera className="h-4 w-4 mr-2" />
                                Upload Hero Image
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(event) =>
                                    handleHeroImageChange(
                                      event.target.files?.[0],
                                    )
                                  }
                                />
                              </label>
                            </Button>
                            {field.value && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => {
                                  setHeroImageFile(null);
                                  field.onChange("");
                                }}
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <Input
                            {...field}
                            id={imageInputId}
                            placeholder="or paste image URL"
                            aria-invalid={fieldState.invalid}
                            onChange={(event) => {
                              setHeroImageFile(null);
                              field.onChange(event.target.value);
                            }}
                          />
                        </div>
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="content"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Content Body</FieldLabel>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={`Write the full ${contentLabel.toLowerCase()} content...`}
                          minHeightClassName="min-h-[380px]"
                        />
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Placement Filter</CardTitle>
                <CardDescription>
                  Select where this content should appear in the hierarchical
                  system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Controller
                    name="contentTypeCategoryId"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Content Type Group</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select content type group"
                          items={sidebarFilters?.contentTypes || []}
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Author &amp; Publishing</CardTitle>
              </CardHeader>
              <CardContent>
                <FieldGroup>

                  {/* ── Author ── */}
                  <Controller
                    name="authorId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Author</FieldLabel>
                        <Select
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="content-author-select"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select author" />
                          </SelectTrigger>
                          <SelectContent>
                            {authorOptionsWithCurrent.map((author) => (
                              <SelectItem key={author.id} value={author.id}>
                                <span className="flex items-center gap-2">
                                  <Avatar size="sm">
                                    <AvatarImage
                                      src={author.avatarUrl || undefined}
                                      alt={author.name}
                                    />
                                    <AvatarFallback>
                                      {initialsFromName(author.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{author.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedAuthor ? (
                          <div className="flex items-center gap-2 rounded-md border border-border p-2">
                            <Avatar>
                              <AvatarImage
                                src={selectedAuthor.avatarUrl || undefined}
                                alt={selectedAuthor.name}
                              />
                              <AvatarFallback>
                                {initialsFromName(selectedAuthor.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium">
                                {selectedAuthor.name}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                {selectedAuthor.title || "Contributor"}
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="readTime"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="content-read-time">
                          Read Time (minutes)
                        </FieldLabel>
                        <Input
                          id="content-read-time"
                          type="number"
                          min={1}
                          max={120}
                          value={field.value}
                          onChange={(event) =>
                            field.onChange(event.target.value)
                          }
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="featured"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(Boolean(checked))
                            }
                            aria-invalid={fieldState.invalid}
                          />
                          <FieldLabel>Featured on homepage</FieldLabel>
                        </div>
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="tagsCsv"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="content-tags">
                          Custom Tags
                        </FieldLabel>
                        <Input
                          {...field}
                          id="content-tags"
                          placeholder="comma,separated,tags"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Filter tags are generated from filter selections.
                        </FieldDescription>
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>
                  Select taxonomy filters explicitly for this item.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  {/* ── Category (Digital Stream) — required ── */}
                  <Controller
                    name="categoryId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Category (Digital Stream)</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select category"
                          items={categoryOptions}
                          disabled={isLoadingCategories}
                        />
                        <FieldDescription>
                          Primary digital execution area (required)
                        </FieldDescription>
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="sectionId"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Digital Perspective</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select perspective"
                          items={sectionOptions}
                        />
                        <FieldDescription>
                          Primary digital strategy (optional)
                        </FieldDescription>
                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : null}
                      </Field>
                    )}
                  />

                  <Controller
                    name="sectorId"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Digital Sector</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select digital sector"
                          items={sidebarFilters?.digitalSectors || []}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name="contentFormatId"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Content Format</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select content format"
                          items={sidebarFilters?.contentFormats || []}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name="popularityTagId"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>Popularity Tag</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select popularity tag"
                          items={sidebarFilters?.popularityTags || []}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name="dbpDomainId"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>DBP Domain</FieldLabel>
                        <HierarchicalFilterSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select DBP domain"
                          items={sidebarFilters?.dbpDomains || []}
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardFooter className="flex items-center justify-end gap-2 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/admin/library")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={formId}
              disabled={saveMutation.isPending}
            >
              {submitLabel}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AdminLayout>
  );
}
