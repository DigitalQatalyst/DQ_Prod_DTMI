import { useEffect, useMemo, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../shared/AdminLayout";
import {
  createAdminAuthor,
  fetchAdminAuthorById,
  updateAdminAuthor,
  uploadAuthorAvatar,
  type UpsertAuthorInput,
} from "./api/authorsAdmin";
import RichTextEditor from "../shared/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const contributorTypes = [
  "Research Leadership",
  "Human Intelligence Analysts",
  "AI Research Agents",
  "Editorial Publication Team",
] as const;

const formSchema = z.object({
  name: z.string().min(2, "Author name must be at least 2 characters."),
  title: z.string().min(2, "Professional title is required."),
  bio: z
    .string()
    .min(20, "Short bio must be at least 20 characters.")
    .max(500, "Short bio must be at most 500 characters."),
  bioHtml: z.string().min(20, "Detailed bio is required."),
  linkedinUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\//.test(value),
      "LinkedIn URL must start with http:// or https://",
    ),
  twitterUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^https?:\/\//.test(value),
      "X URL must start with http:// or https://",
    ),
  affiliation: z.string().trim().optional().or(z.literal("")),
  contributorType: z.string().trim().optional().or(z.literal("")),
  subCategory: z.string().trim().optional().or(z.literal("")),
  expertise: z.string().trim().optional().or(z.literal("")),
  tagsCsv: z.string().trim().optional().or(z.literal("")),
});

type AuthorFormValues = z.infer<typeof formSchema>;

function mapValuesToPayload(
  values: AuthorFormValues,
  avatarUrl: string | null,
): UpsertAuthorInput {
  return {
    name: values.name,
    title: values.title,
    bio: values.bio,
    bioHtml: values.bioHtml,
    avatarUrl,
    linkedinUrl: values.linkedinUrl || null,
    twitterUrl: values.twitterUrl || null,
    affiliation: values.affiliation || null,
    contributorType: values.contributorType || null,
    subCategory: values.subCategory || null,
    expertise: values.expertise || null,
    tags: (values.tagsCsv || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

export default function AuthorFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const pendingToastIdRef = useRef<string | number | null>(null);

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      bio: "",
      bioHtml: "",
      linkedinUrl: "",
      twitterUrl: "",
      affiliation: "DigitalQatalyst",
      contributorType: "",
      subCategory: "",
      expertise: "",
      tagsCsv: "",
    },
  });

  const { data: author, isLoading: isLoadingAuthor } = useQuery({
    queryKey: ["admin-author", id],
    queryFn: () => (id ? fetchAdminAuthorById(id) : Promise.resolve(null)),
    enabled: isEdit,
  });

  useEffect(() => {
    if (!author) return;

    form.reset({
      name: author.name,
      title: author.title || "",
      bio: author.bio || "",
      bioHtml: author.bioHtml || author.bio || "",
      linkedinUrl: author.linkedinUrl || "",
      twitterUrl: author.twitterUrl || "",
      affiliation: author.affiliation || "",
      contributorType: author.contributorType || "",
      subCategory: author.subCategory || "",
      expertise: author.expertise || "",
      tagsCsv: author.tags.join(", "),
    });
  }, [author, form]);

  const saveMutation = useMutation({
    mutationFn: async (values: AuthorFormValues) => {
      let nextAvatar = author?.avatarUrl || null;
      if (avatarFile) {
        nextAvatar = await uploadAuthorAvatar(avatarFile);
      }

      const payload = mapValuesToPayload(values, nextAvatar);

      if (isEdit && id) {
        return updateAdminAuthor(id, payload);
      }

      return createAdminAuthor(payload);
    },
    onMutate: (values) => {
      pendingToastIdRef.current = toast.loading(
        isEdit
          ? `Updating ${values.name || "author"}...`
          : `Creating ${values.name || "author"}...`,
      );
    },
    onSuccess: async (_data, values) => {
      await queryClient.invalidateQueries({ queryKey: ["admin-authors"] });
      if (pendingToastIdRef.current !== null) {
        toast.dismiss(pendingToastIdRef.current);
        pendingToastIdRef.current = null;
      }
      toast.success(
        isEdit
          ? `Author updated: ${values.name}`
          : `Author created: ${values.name}`,
      );
      navigate("/admin/authors");
    },
    onError: (error, values) => {
      if (pendingToastIdRef.current !== null) {
        toast.dismiss(pendingToastIdRef.current);
        pendingToastIdRef.current = null;
      }
      const message =
        error instanceof Error ? error.message : "Failed to save author";
      toast.error(
        isEdit
          ? `Could not update ${values.name || "author"}: ${message}`
          : `Could not create ${values.name || "author"}: ${message}`,
      );
    },
  });

  const submitLabel = useMemo(() => {
    if (saveMutation.isPending) return "Saving...";
    return isEdit ? "Update Author" : "Create Author";
  }, [isEdit, saveMutation.isPending]);

  const handleAvatarChange = (file?: File) => {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const displayAvatar = avatarPreview || author?.avatarUrl || "";

  const onSubmit = (values: AuthorFormValues) => {
    saveMutation.mutate(values);
  };

  const actions = (
    <Button asChild variant="outline">
      <Link to="/admin/authors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Authors
      </Link>
    </Button>
  );

  if (isEdit && isLoadingAuthor) {
    return (
      <AdminLayout title="Edit Author" actions={actions}>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading author...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={isEdit ? "Edit Author" : "New Author"}
      actions={actions}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {isEdit ? "Update Author Profile" : "Create Author Profile"}
          </CardTitle>
          <CardDescription>
            Use structured fields for identity and social metadata, plus rich
            text for the detailed author biography.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="author-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel>Profile Photo</FieldLabel>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-xl border border-border bg-muted overflow-hidden flex items-center justify-center">
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt="Author avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        No image
                      </span>
                    )}
                  </div>
                  <Button type="button" variant="outline" asChild>
                    <label className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Avatar
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(event) =>
                          handleAvatarChange(event.target.files?.[0])
                        }
                      />
                    </label>
                  </Button>
                </div>
                <FieldDescription>
                  Recommended square image for best display in author cards.
                </FieldDescription>
              </Field>

              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="author-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Elena Vance"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-title">
                      Professional Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Lead Technologist"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-short-bio">
                      Short Bio
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="author-short-bio"
                        rows={4}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                        placeholder="A concise summary of this author's expertise..."
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/240
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Shown in author cards and listings.
                    </FieldDescription>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="bioHtml"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Detailed Bio</FieldLabel>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write a detailed professional biography..."
                    />
                    <FieldDescription>
                      Reusable rich-text block powered by Tiptap for future
                      forms.
                    </FieldDescription>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="contributorType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-contributor-type">
                      Contributor Type
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-contributor-type"
                      list="contributor-types"
                      placeholder="Select or type contributor type"
                      aria-invalid={fieldState.invalid}
                    />
                    <datalist id="contributor-types">
                      {contributorTypes.map((type) => (
                        <option key={type} value={type} />
                      ))}
                    </datalist>
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="subCategory"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-sub-category">
                      Sub Category
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-sub-category"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. Research Director"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="affiliation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-affiliation">
                      Affiliation
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-affiliation"
                      aria-invalid={fieldState.invalid}
                      placeholder="DigitalQatalyst"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="expertise"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-expertise">
                      Expertise
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-expertise"
                      aria-invalid={fieldState.invalid}
                      placeholder="AI, Strategy, Digital Transformation"
                    />
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
                    <FieldLabel htmlFor="author-tags">
                      Tags (comma separated)
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-tags"
                      aria-invalid={fieldState.invalid}
                      placeholder="Visionary, Analyst, DTMI"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="linkedinUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-linkedin">
                      LinkedIn URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-linkedin"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://linkedin.com/in/username"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />

              <Controller
                name="twitterUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="author-twitter">
                      X (Twitter) URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id="author-twitter"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://x.com/username"
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="justify-between">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button
            type="submit"
            form="author-form"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : null}
            {submitLabel}
          </Button>
        </CardFooter>
      </Card>
    </AdminLayout>
  );
}
