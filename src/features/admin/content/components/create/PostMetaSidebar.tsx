import React from "react";
import { Save, Star, Tag, Calendar, Clock, Image as ImageIcon, Upload, Plus, Loader } from "lucide-react";
import { Category, Blog } from "../../../shared/utils/supabase";
import { AuthorSelector } from "../AuthorSelector";
import DynamicFilters from "../DynamicFilters";

interface Props {
  formData: Partial<Blog>;
  categories: Category[];
  groupedCategories: Category[];
  selectedParentId: string;
  availableDomains: any[];
  heroPreview: string;
  isSubmitting: boolean;
  submitLabel?: string;
  submitColor?: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFilterChange: (name: string, value: string) => void;
  onAuthorSelect: (author: any) => void;
  onHeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCategoryModal: () => void;
  heroInputId?: string;
  showFilters?: boolean;
}

export function PostMetaSidebar({
  formData, categories, groupedCategories, selectedParentId, availableDomains,
  heroPreview, isSubmitting,
  submitLabel = "Publish", submitColor = "bg-black hover:bg-gray-800",
  onSubmit, onChange, onFilterChange, onAuthorSelect, onHeroChange, onOpenCategoryModal,
  heroInputId = "hero-upload", showFilters = true,
}: Props) {
  const activeParent = groupedCategories.find((p) => p.id === selectedParentId);
  const subcategories = activeParent?.subcategories ?? [];
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 sticky top-[88px]">
        {/* Publish */}
        <button
          type="submit"
          form="content-form"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 ${submitColor} text-white rounded-lg font-bold shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400`}
        >
          {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
          {isSubmitting ? "Publishing..." : submitLabel}
        </button>

        <div className="space-y-5 pt-4 border-t border-gray-50">
          {/* Featured */}
          <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-lg">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-2">
              <Star size={14} className={formData.featured ? "text-yellow-500 fill-yellow-500" : "text-gray-400"} />
              Feature this post
            </label>
            <input type="checkbox" name="featured" checked={!!formData.featured} onChange={onChange}
              className="w-4 h-4 rounded accent-black" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
              <button type="button" onClick={onOpenCategoryModal}
                className="text-[10px] font-black text-black hover:underline uppercase tracking-widest flex items-center gap-1">
                <Plus size={10} /> Quick Add
              </button>
            </div>
            {/* Step 1: parent */}
            <select
              name="parentCategoryId"
              value={selectedParentId}
              onChange={onChange}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
            >
              <option value="">Select Type</option>
              {groupedCategories.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {/* Step 2: subcategory — only shown once a parent is picked */}
            {selectedParentId && (
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={onChange}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</label>
            <AuthorSelector selectedAuthorId={formData.authorId} onAuthorSelect={onAuthorSelect} />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Tag size={12} /> Tags
            </label>
            <input type="text" name="tags" value={formData.tags as string} onChange={onChange}
              placeholder="Comma separated tags..."
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none" />
          </div>

          {/* Hero Image */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={14} /> Hero Image
            </label>
            <div className="relative aspect-video bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100/50 transition-all group"
              onClick={() => document.getElementById(heroInputId)?.click()}>
              {heroPreview ? (
                <>
                  <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="text-white" size={24} />
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto text-gray-200 mb-2" size={24} />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Cover</span>
                </div>
              )}
              <input type="file" id={heroInputId} className="hidden" accept="image/*" onChange={onHeroChange} />
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-3 pt-2 border-t border-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-2 font-medium"><Calendar size={12} /> Date</span>
              <input type="date" name="publishDate" value={formData.publishDate} onChange={onChange}
                className="text-xs border-none focus:ring-0 font-bold bg-transparent p-0 cursor-pointer" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 flex items-center gap-2 font-medium"><Clock size={12} /> Read Time</span>
              <div className="flex items-center">
                <input type="number" name="readTime" value={formData.readTime} onChange={onChange}
                  className="w-10 text-xs border-none focus:ring-0 font-bold bg-transparent p-0 text-right" />
                <span className="text-[10px] text-gray-400 ml-1 font-bold">MIN</span>
              </div>
            </div>
          </div>

          {/* Dynamic Marketplace Filters */}
          {showFilters && (
            <DynamicFilters
              formData={formData}
              onChange={onFilterChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
