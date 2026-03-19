import React from "react";
import { Hash, FileText, Tag, Image as ImageIcon, Upload, Star, Save, Loader, Plus, X, BookOpen } from "lucide-react";
import { Blog, Category } from "../../../../shared/utils/supabase";
import { ResearchData } from "../../../types/create.types";
import RichTextEditor from "../../RichTextEditor";

interface Props {
  formData: Partial<Blog>;
  researchData: ResearchData;
  setResearchData: React.Dispatch<React.SetStateAction<ResearchData>>;
  categories: Category[];
  heroPreview: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onHeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SECTIONS: { key: keyof ResearchData; label: string }[] = [
  { key: "introduction", label: "Introduction" },
  { key: "literatureReview", label: "Literature Review" },
  { key: "methodology", label: "Methodology" },
  { key: "results", label: "Results" },
  { key: "discussion", label: "Discussion" },
  { key: "conclusion", label: "Conclusion" },
  { key: "references", label: "References" },
  { key: "appendices", label: "Appendices" },
];

export function ResearchForm({
  formData, researchData, setResearchData, categories, heroPreview, isSubmitting,
  onChange, onHeroChange, onSubmit,
}: Props) {
  const update = (field: keyof ResearchData, value: any) =>
    setResearchData((prev) => ({ ...prev, [field]: value }));

  return (
    <form id="content-form" onSubmit={onSubmit} className="space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-3xl border border-blue-100 shadow-lg space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Research Title</label>
          <input type="text" name="title" value={formData.title} onChange={onChange} autoFocus
            placeholder="e.g. The Impact of AI on Modern Healthcare Diagnostics"
            className="w-full text-4xl font-bold bg-transparent border-none focus:ring-0 text-gray-900 placeholder-blue-200 p-0" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400/60 bg-white/50 px-3 py-1.5 rounded-lg border border-blue-100 w-fit">
          <Hash size={12} />
          <input type="text" name="slug" value={formData.slug} onChange={onChange}
            className="bg-transparent border-none focus:ring-0 p-0 text-blue-600 min-w-[200px]" placeholder="url-slug" />
        </div>

        {/* Authors */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-blue-900 uppercase tracking-widest">Research Authors</label>
            <button type="button" onClick={() => update("authors", [...researchData.authors, ""])}
              className="text-xs font-bold text-blue-600 flex items-center gap-1"><Plus size={14} /> Add Author</button>
          </div>
          <div className="space-y-2">
            {researchData.authors.map((author, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={author}
                  onChange={(e) => { const a = [...researchData.authors]; a[idx] = e.target.value; update("authors", a); }}
                  className="flex-1 px-4 py-2 bg-white border border-blue-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Dr. Sarah Chen" />
                {researchData.authors.length > 1 && (
                  <button type="button" onClick={() => update("authors", researchData.authors.filter((_, i) => i !== idx))}
                    className="p-2 text-gray-300 hover:text-red-500"><X size={16} /></button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Publication Date", type: "date", field: "publicationDate" as keyof ResearchData },
            { label: "Journal Name", type: "text", field: "journalName" as keyof ResearchData, placeholder: "Journal of Medical AI Research" },
            { label: "Pages", type: "number", field: "pages" as keyof ResearchData, placeholder: "42" },
          ].map(({ label, type, field, placeholder }) => (
            <div key={field} className="space-y-2">
              <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{label}</label>
              <input type={type} value={researchData[field] as any}
                onChange={(e) => update(field, type === "number" ? parseInt(e.target.value) || 0 : e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 bg-white border border-blue-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Citations", field: "citations" as keyof ResearchData, placeholder: "2847" },
            { label: "Views", field: "views" as keyof ResearchData, placeholder: "15200" },
          ].map(({ label, field, placeholder }) => (
            <div key={field} className="space-y-2">
              <label className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{label}</label>
              <input type="number" value={researchData[field] as any}
                onChange={(e) => update(field, parseInt(e.target.value) || 0)}
                placeholder={placeholder}
                className="w-full px-4 py-2 bg-white border border-blue-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Abstract */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><FileText size={18} /></div>
          <h3 className="font-bold text-gray-900">Abstract</h3>
          <span className="text-xs text-red-500">*Required</span>
        </div>
        <RichTextEditor valueHtml={researchData.abstract} onChange={(_j, html) => update("abstract", html)} />
      </div>

      {/* Keywords */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600"><Tag size={18} /></div>
          <h3 className="font-bold text-gray-900">Keywords</h3>
          <span className="text-xs text-red-500">*Required</span>
        </div>
        <input type="text" value={researchData.keywords}
          onChange={(e) => update("keywords", e.target.value)}
          placeholder="Artificial Intelligence, Healthcare Diagnostics, Machine Learning"
          className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-yellow-500 outline-none" />
        <p className="text-xs text-gray-400 italic">Separate keywords with commas</p>
      </div>

      {/* Content Sections */}
      {SECTIONS.map(({ key, label }) => (
        <div key={key} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <BookOpen size={18} className="text-green-600" /> {label}
          </h3>
          <RichTextEditor valueHtml={researchData[key] as string} onChange={(_j, html) => update(key, html)} />
        </div>
      ))}

      {/* Bottom action bar */}
      <div className="sticky bottom-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-xl space-y-4">
        <button type="submit" disabled={isSubmitting}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 uppercase tracking-widest text-sm">
          {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
          {isSubmitting ? "Publishing..." : "Publish Research Report"}
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={onChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold focus:ring-1 focus:ring-blue-500 outline-none">
              <option value="">Select</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={14} /> Hero Image
            </label>
            <div className="relative aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-blue-50 transition-all group"
              onClick={() => document.getElementById("hero-upload-research")?.click()}>
              {heroPreview ? (
                <img src={heroPreview} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center"><Upload className="mx-auto text-gray-200 mb-1" size={20} />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Upload</span></div>
              )}
              <input type="file" id="hero-upload-research" className="hidden" accept="image/*" onChange={onHeroChange} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100">
          <label className="text-xs font-bold text-blue-900 flex items-center gap-2">
            <Star size={14} className={formData.featured ? "text-blue-500 fill-blue-500" : "text-blue-300"} />
            Feature Report
          </label>
          <input type="checkbox" name="featured" checked={!!formData.featured} onChange={onChange}
            className="w-4 h-4 rounded accent-blue-600" />
        </div>
      </div>
    </form>
  );
}
