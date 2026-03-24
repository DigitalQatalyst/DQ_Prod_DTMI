import React from "react";
import { Hash, FileText, Tag, Image as ImageIcon, Upload, Star, Save, Loader, Plus } from "lucide-react";
import { Blog, Category } from "../../../../shared/utils/supabase";
import RichTextEditor from "../../RichTextEditor";
import { AuthorSelector } from "../../AuthorSelector";

interface Props {
  formData: Partial<Blog>;
  categories: Category[];
  groupedCategories: Category[];
  selectedParentId: string;
  heroPreview: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onAuthorSelect: (author: any) => void;
  onHeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCategoryModal: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onContentChange: (html: string) => void;
}

export function ArticleForm({
  formData, categories, groupedCategories, selectedParentId, heroPreview, isSubmitting,
  onChange, onAuthorSelect, onHeroChange, onOpenCategoryModal, onSubmit, onContentChange,
}: Props) {
  return (
    <form id="content-form" onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Main */}
      <div className="lg:col-span-8 space-y-8">
        <div className="space-y-6 bg-indigo-50/30 p-8 rounded-3xl border border-indigo-100 shadow-sm">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Article Title</label>
            <input type="text" name="title" value={formData.title} onChange={onChange}
              placeholder="e.g. The Evolution of Digital Strategy"
              className="w-full text-4xl font-black border-none focus:ring-0 placeholder-indigo-100 p-0 bg-transparent" autoFocus />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400/60 bg-white/50 w-fit px-3 py-1.5 rounded-lg border border-indigo-100">
            <Hash size={12} />
            <input type="text" name="slug" value={formData.slug} onChange={onChange}
              className="bg-transparent border-none focus:ring-0 p-0 text-indigo-500 min-w-[200px]" placeholder="url-slug" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} /> Narrative Summary
          </label>
          <textarea name="excerpt" value={formData.excerpt} onChange={onChange} rows={3}
            className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed"
            placeholder="Summarize the core theme of this article..." />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Article Content</label>
            <span className="text-[10px] text-gray-400 font-bold italic">Rich Text Engine Active</span>
          </div>
          <div className="min-h-[600px]">
            <RichTextEditor valueHtml={formData.content || ""} onChange={(_json, html) => onContentChange(html)} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 sticky top-[88px]">
          <button type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 uppercase tracking-widest text-sm">
            {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>

          <div className="space-y-5 pt-6 border-t border-gray-50">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                <button type="button" onClick={onOpenCategoryModal}
                  className="text-[10px] font-black text-indigo-600 hover:underline uppercase tracking-widest flex items-center gap-1">
                  <Plus size={10} /> Quick Add
                </button>
              </div>
              <select name="parentCategoryId" value={selectedParentId} onChange={onChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none">
                <option value="">Select Type</option>
                {groupedCategories.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {selectedParentId && (
                <select name="categoryId" value={formData.categoryId} onChange={onChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option value="">Select Subcategory</option>
                  {(groupedCategories.find((p) => p.id === selectedParentId)?.subcategories ?? []).map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</label>
              <AuthorSelector selectedAuthorId={formData.authorId} onAuthorSelect={onAuthorSelect} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Tag size={12} /> Featured Topics
              </label>
              <input type="text" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(", ") : (formData.tags as string | undefined) ?? ""} onChange={onChange}
                placeholder="e.g. Digital Economy 4.0, AI Strategy"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Hero Media
              </label>
              <div className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-indigo-50 transition-all group"
                onClick={() => document.getElementById("hero-upload-article")?.click()}>
                {heroPreview ? (
                  <>
                    <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="text-white" size={24} />
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto text-gray-200 mb-2" size={24} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Header</span>
                  </div>
                )}
                <input type="file" id="hero-upload-article" className="hidden" accept="image/*" onChange={onHeroChange} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Read Time</label>
                <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg">
                  <input type="number" name="readTime" value={formData.readTime} onChange={onChange}
                    className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold p-0" />
                  <span className="text-[8px] font-black text-gray-400 uppercase">Min</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</label>
                <input type="date" name="publishDate" value={formData.publishDate} onChange={onChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:ring-1 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
              <label className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                <Star size={14} className={formData.featured ? "text-indigo-500 fill-indigo-500" : "text-indigo-300"} />
                Highlight in Hub
              </label>
              <input type="checkbox" name="featured" checked={!!formData.featured} onChange={onChange}
                className="w-4 h-4 rounded accent-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
