import React from "react";
import { Hash, FileText } from "lucide-react";
import { Blog, Category } from "../../../../shared/utils/supabase";
import RichTextEditor from "../../RichTextEditor";
import { PostMetaSidebar } from "../PostMetaSidebar";

interface Props {
  formData: Partial<Blog>;
  categories: Category[];
  groupedCategories: Category[];
  selectedParentId: string;
  availableDomains: any[];
  heroPreview: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onAuthorSelect: (author: any) => void;
  onHeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCategoryModal: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onContentChange: (html: string) => void;
  onFilterChange: (name: string, value: string) => void;
}

export function BlogForm({
  formData, categories, groupedCategories, selectedParentId, availableDomains,
  heroPreview, isSubmitting,
  onChange, onAuthorSelect, onHeroChange, onOpenCategoryModal, onSubmit, onContentChange, onFilterChange,
}: Props) {
  return (
    <form id="content-form" onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Main */}
      <div className="lg:col-span-8 space-y-8">
        <div className="space-y-4">
          <input
            type="text" name="title" value={formData.title} onChange={onChange}
            placeholder="Post title"
            className="w-full text-4xl font-black border-none focus:ring-0 placeholder-gray-200 p-0 bg-transparent"
            autoFocus
          />
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-gray-50/50 p-2 rounded border border-gray-100 w-fit">
            <Hash size={12} />
            <input type="text" name="slug" value={formData.slug} onChange={onChange}
              className="bg-transparent border-none focus:ring-0 p-0 text-gray-500 min-w-[200px]"
              placeholder="url-slug" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} /> Excerpt
          </label>
          <textarea name="excerpt" value={formData.excerpt} onChange={onChange} rows={3}
            className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:ring-1 focus:ring-black outline-none leading-relaxed"
            placeholder="Summarize your story in one or two sentences..." />
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Editor</label>
          <div className="min-h-[600px] border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-1 focus-within:ring-black">
            <RichTextEditor
              valueHtml={formData.content || ""}
              onChange={(_json, html) => onContentChange(html)}
            />
          </div>
        </div>
      </div>

      <PostMetaSidebar
        formData={formData} categories={categories} groupedCategories={groupedCategories}
        selectedParentId={selectedParentId} availableDomains={availableDomains}
        heroPreview={heroPreview} isSubmitting={isSubmitting}
        submitLabel="Publish Post"
        onSubmit={onSubmit} onChange={onChange} onAuthorSelect={onAuthorSelect}
        onHeroChange={onHeroChange} onOpenCategoryModal={onOpenCategoryModal}
        onFilterChange={onFilterChange}
      />
    </form>
  );
}
