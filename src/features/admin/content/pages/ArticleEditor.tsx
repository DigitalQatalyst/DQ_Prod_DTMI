import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, ArrowLeft, Eye, Trash2, Loader } from "lucide-react";
import AppLayout from "../../shared/components/AppLayout";
import {
  blogService,
  categoryService,
  Category,
  Blog,
} from "../../shared/utils/supabase";
import { Toast, ToastType } from "../../shared/components/Toast";
import RichTextEditor from "../components/RichTextEditor";
import { AuthorSelector } from "../components/AuthorSelector";
import Modal from "../../shared/components/Modal";
import {
  DIGITAL_PERSPECTIVES,
  DIGITAL_STREAMS,
  DIGITAL_SECTORS,
  FORMATS,
  POPULARITY_TAGS,
} from "../../shared/utils/filterConfig";

/**
 * ArticleEditor - Dedicated CMS editor for creating/editing Articles
 * Content Type is automatically set to "article" - no manual selection needed
 */
export const ArticleEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Partial<Blog>>({
    type: "article", // Auto-set to article
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [articleCategory, setArticleCategory] = useState<Category | null>(null);
  const [articleSubcategories, setArticleSubcategories] = useState<Category[]>(
    [],
  );
  const [dbpDomains, setDbpDomains] = useState<Category[]>([]);

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [catsData, groupedCatsData, dbpDomainsData] = await Promise.all([
          categoryService.getCategories(),
          categoryService.getCategoriesGroupedByFilterGroup("content-types"),
          categoryService.getCategoriesByFilterGroup("dbp-domains"),
        ]);

        setCategories(catsData);
        setDbpDomains(dbpDomainsData);

        // Find "Articles" parent category automatically
        const articlesParent = groupedCatsData.find(
          (cat) => cat.name.toLowerCase() === "articles",
        );

        if (articlesParent) {
          setArticleCategory(articlesParent);
          setArticleSubcategories(articlesParent.subcategories || []);
        }

        // If editing existing article, load it
        if (id) {
          const blogData = await blogService.getBlogById(id);
          setFormData(blogData);
          setHeroPreview(blogData.heroImage || "");
        }
      } catch (err: any) {
        setToast({
          message: err.message || "Failed to load data",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === "readTime") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleContentChange = (
    _json: any,
    html: string,
    _plainText: string,
  ) => {
    setFormData((prev) => ({ ...prev, content: html }));
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      setToast({ message: "Title is required", type: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      let heroImageUrl = formData.heroImage || "";
      if (heroFile) {
        heroImageUrl = await blogService.uploadHeroImage(heroFile);
      }

      const selectedCategory = categories.find(
        (c) => c.id === formData.categoryId,
      );

      const finalExcerpt =
        formData.excerpt || formData.content?.substring(0, 200) + "...";

      if (id) {
        // Update existing article
        await blogService.updateBlog(id, {
          ...formData,
          type: "article", // Ensure type is always "article"
          excerpt: finalExcerpt,
          heroImage: heroImageUrl,
          categoryName: selectedCategory?.name || formData.categoryName,
          tags:
            typeof formData.tags === "string"
              ? (formData.tags as string).split(",").map((s) => s.trim())
              : formData.tags,
        });

        setToast({
          message: "Article updated successfully!",
          type: "success",
        });
      } else {
        // Create new article
        await blogService.createBlog({
          ...formData,
          type: "article", // Ensure type is always "article"
          excerpt: finalExcerpt,
          heroImage: heroImageUrl,
          categoryName: selectedCategory?.name || "Uncategorized",
          tags:
            typeof formData.tags === "string"
              ? (formData.tags as string).split(",").map((s) => s.trim())
              : formData.tags || [],
        } as Blog);

        setToast({
          message: "Article created successfully!",
          type: "success",
        });

        // Navigate to articles list after creation
        setTimeout(() => navigate("/admin/content"), 1500);
      }
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await blogService.deleteBlog(id);
      setToast({ message: "Article deleted successfully!", type: "success" });
      setTimeout(() => navigate("/admin/content"), 1500);
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <AppLayout title={id ? "Edit Article" : "Create Article"}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="animate-spin" size={48} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={id ? "Edit Article" : "Create Article"}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/admin/content")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold">
                    {id ? "Edit Article" : "Create New Article"}
                  </h1>
                  <p className="text-sm text-gray-500">
                    Content Type: Articles (Auto-set)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {id && (
                  <>
                    <button
                      onClick={() =>
                        window.open(`/article/${formData.slug || id}`, "_blank")
                      }
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Eye size={16} />
                      Preview
                    </button>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </>
                )}
                <button
                  form="article-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      {id ? "Update Article" : "Publish Article"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <form
            id="article-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  placeholder="Article Title"
                  className="w-full text-4xl font-bold border-none focus:ring-0 placeholder-gray-300 p-0 bg-transparent"
                  autoFocus
                  required
                />
              </div>

              {/* Hero Image */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Hero Image
                </label>
                {heroPreview ? (
                  <div className="relative">
                    <img
                      src={heroPreview}
                      alt="Hero preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setHeroPreview("");
                        setHeroFile(null);
                        setFormData((prev) => ({ ...prev, heroImage: "" }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <Eye size={48} />
                      <span className="mt-2 text-sm">
                        Click to upload hero image
                      </span>
                    </div>
                  </label>
                )}
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt || ""}
                  onChange={handleChange}
                  placeholder="Brief summary of the article..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none transition-all"
                />
              </div>

              {/* Rich Text Editor */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Article Content
                </label>
                <RichTextEditor
                  valueHtml={formData.content || ""}
                  onChange={handleContentChange}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Author */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Author
                </label>
                <AuthorSelector
                  selectedAuthorId={formData.authorId}
                  onAuthorSelect={(author) => {
                    setFormData((prev) => ({ ...prev, authorId: author.id }));
                  }}
                />
              </div>

              {/* Article Subcategory */}
              {articleSubcategories.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Article Category
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {articleSubcategories.map((subcat) => (
                      <option key={subcat.id} value={subcat.id}>
                        {subcat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Metadata */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Metadata
                </h3>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug || ""}
                    onChange={handleChange}
                    placeholder="article-url-slug"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  />
                </div>

                {/* Read Time */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime || ""}
                    onChange={handleChange}
                    placeholder="5"
                    min="1"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  />
                </div>

                {/* Publish Date */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured || false}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label className="text-xs font-medium text-gray-600">
                    Featured Article
                  </label>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={
                      typeof formData.tags === "string"
                        ? formData.tags
                        : formData.tags?.join(", ") || ""
                    }
                    onChange={handleChange}
                    placeholder="digital transformation, innovation"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  />
                </div>
              </div>

              {/* Marketplace Filters */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Marketplace Filters
                </h3>

                {/* Content Format */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Content Format
                  </label>
                  <select
                    name="format"
                    value={formData.format || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Format</option>
                    {FORMATS.map((fmt) => (
                      <option key={fmt.id} value={fmt.value}>
                        {fmt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Digital Perspectives */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Digital Perspectives
                  </label>
                  <select
                    name="digital_perspective"
                    value={formData.digital_perspective || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Perspective</option>
                    {DIGITAL_PERSPECTIVES.map((dp) => (
                      <option key={dp.id} value={dp.value}>
                        {dp.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Digital Streams */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Digital Streams
                  </label>
                  <select
                    name="digital_stream"
                    value={formData.digital_stream || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Stream</option>
                    {DIGITAL_STREAMS.map((ds) => (
                      <option key={ds.id} value={ds.value}>
                        {ds.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DBP Domains */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    DBP Domains
                  </label>
                  <select
                    name="digital_domain"
                    value={formData.digital_domain || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Domain</option>
                    {dbpDomains.map((domain) => (
                      <option key={domain.id} value={domain.name}>
                        {domain.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Digital Sectors */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Digital Sectors
                  </label>
                  <select
                    name="digital_sector"
                    value={formData.digital_sector || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Sector</option>
                    {DIGITAL_SECTORS.map((ds) => (
                      <option key={ds.id} value={ds.value}>
                        {ds.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Popularity Tags */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Popularity Tags
                  </label>
                  <select
                    name="popularity"
                    value={formData.popularity || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-black outline-none"
                  >
                    <option value="">Select Tag</option>
                    {POPULARITY_TAGS.map((pt) => (
                      <option key={pt.id} value={pt.value}>
                        {pt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Article"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this article? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        {/* Toast Notifications */}
        {toast && (
          <div className="fixed top-4 right-4 z-50 max-w-md">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
};
