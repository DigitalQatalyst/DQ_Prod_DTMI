import React, { useCallback } from "react";
import { FileText, User as UserIcon, FileSearch, Book, CheckCircle2, Tag, BookOpen, Plus, Trash2, Save, Loader } from "lucide-react";
import { Blog } from "../../../../shared/utils/supabase";
import { WhitepaperData } from "../../../types/create.types";
import RichTextEditor from "../../RichTextEditor";

interface Props {
  formData: Partial<Blog>;
  whitepaperData: WhitepaperData;
  setWhitepaperData: React.Dispatch<React.SetStateAction<WhitepaperData>>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (path: string, value: any) => void;
  onImageUpload: (path: string, file: File) => void;
}

function ImageUpload({ preview, onUpload, inputId, color = "blue" }: { preview: string; onUpload: (f: File) => void; inputId: string; color?: string }) {
  return (
    <div className="space-y-3">
      {preview && <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg border border-gray-200" />}
      <input type="file" id={inputId} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
      <label htmlFor={inputId}
        className={`block w-full p-3 border border-gray-200 rounded-lg text-sm cursor-pointer text-center text-gray-500 hover:bg-${color}-50 transition-all`}>
        {preview ? "Change Image" : "Upload Image"}
      </label>
    </div>
  );
}

export const WhitepaperForm = React.memo(function WhitepaperForm({
  formData, whitepaperData, setWhitepaperData, isSubmitting, onSubmit, onChange, onImageUpload,
}: Props) {
  const addChapter = useCallback(() => {
    setWhitepaperData((prev) => ({
      ...prev,
      chapters: [...prev.chapters, {
        id: `chapter-${prev.chapters.length + 1}`,
        title: "", content: "", heroImage: null, heroImagePreview: "",
      }],
    }));
  }, [setWhitepaperData]);

  const removeChapter = useCallback((index: number) => {
    setWhitepaperData((prev) => ({ ...prev, chapters: prev.chapters.filter((_, i) => i !== index) }));
  }, [setWhitepaperData]);

  const addReference = useCallback(() => {
    setWhitepaperData((prev) => ({
      ...prev,
      references: { ...prev.references, items: [...prev.references.items, { text: "", url: "", authors: "", year: "", title: "", source: "" }] },
    }));
  }, [setWhitepaperData]);

  const removeReference = useCallback((index: number) => {
    setWhitepaperData((prev) => ({
      ...prev,
      references: { ...prev.references, items: prev.references.items.filter((_, i) => i !== index) },
    }));
  }, [setWhitepaperData]);

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="text-blue-600" /> Hero Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subtitle</label>
            <input type="text" value={whitepaperData.hero.subtitle}
              onChange={(e) => onChange("hero.subtitle", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm"
              placeholder="Digital Transformation Management Book | Volume 0" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Volume Label</label>
            <input type="text" value={whitepaperData.hero.volumeLabel}
              onChange={(e) => onChange("hero.volumeLabel", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="D1" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Title</label>
          <input type="text" value={whitepaperData.hero.title}
            onChange={(e) => onChange("hero.title", e.target.value)}
            className="w-full p-4 text-2xl font-bold border border-gray-200 rounded-lg" placeholder="Digital Economy 4.0" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Image</label>
          <ImageUpload preview={whitepaperData.hero.heroImagePreview} inputId="wp-hero-img"
            onUpload={(f) => onImageUpload("hero.heroImage", f)} />
        </div>
      </div>

      {/* Hook Text */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-green-600" /> Hook Text
        </h3>
        <RichTextEditor valueHtml={whitepaperData.hookText}
          onChange={(_j, html) => onChange("hookText", html)} />
      </div>

      {/* Foreword */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <UserIcon className="text-purple-600" /> Foreword
        </h3>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
          <input type="text" value={whitepaperData.foreword.title}
            onChange={(e) => onChange("foreword.title", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="Foreword" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Image</label>
          <ImageUpload preview={whitepaperData.foreword.heroImagePreview} inputId="wp-foreword-img"
            onUpload={(f) => onImageUpload("foreword.heroImage", f)} color="purple" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Author Name</label>
            <input type="text" value={whitepaperData.foreword.author.name}
              onChange={(e) => onChange("foreword.author.name", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="Dr. Stephane Niango" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Author Title</label>
            <input type="text" value={whitepaperData.foreword.author.title}
              onChange={(e) => onChange("foreword.author.title", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="CEO | Chief Architect" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Author Image</label>
            <div className="space-y-2">
              {whitepaperData.foreword.author.imagePreview && (
                <img src={whitepaperData.foreword.author.imagePreview} alt="Author" className="w-20 h-20 object-cover rounded-full border border-gray-200" />
              )}
              <ImageUpload preview="" inputId="wp-author-img"
                onUpload={(f) => onImageUpload("foreword.author.image", f)} color="purple" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Content</label>
          <RichTextEditor valueHtml={whitepaperData.foreword.content}
            onChange={(_j, html) => onChange("foreword.content", html)} />
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileSearch className="text-orange-600" /> Executive Summary
        </h3>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
          <input type="text" value={whitepaperData.executiveSummary.title}
            onChange={(e) => onChange("executiveSummary.title", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="Executive Summary" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Image</label>
          <ImageUpload preview={whitepaperData.executiveSummary.heroImagePreview} inputId="wp-exec-img"
            onUpload={(f) => onImageUpload("executiveSummary.heroImage", f)} color="orange" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Content</label>
          <RichTextEditor valueHtml={whitepaperData.executiveSummary.content}
            onChange={(_j, html) => onChange("executiveSummary.content", html)} />
        </div>
      </div>

      {/* Chapters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Book className="text-indigo-600" /> Chapters
          </h3>
          <button type="button" onClick={addChapter}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
            <Plus size={16} /> Add Chapter
          </button>
        </div>
        {whitepaperData.chapters.map((chapter, chapterIndex) => (
          <div key={chapter.id || chapterIndex} className="border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Chapter {chapterIndex + 1}</h4>
              {whitepaperData.chapters.length > 0 && (
                <button type="button" onClick={() => removeChapter(chapterIndex)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Chapter Title</label>
              <input type="text" value={chapter.title}
                onChange={(e) => {
                  const chapters = [...whitepaperData.chapters];
                  chapters[chapterIndex].title = e.target.value;
                  setWhitepaperData((p) => ({ ...p, chapters }));
                }}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm"
                placeholder="The Evolution of Economic Logics" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hero Image</label>
              <ImageUpload preview={chapter.heroImagePreview} inputId={`wp-chapter-img-${chapterIndex}`}
                onUpload={(file) => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const chapters = [...whitepaperData.chapters];
                    chapters[chapterIndex].heroImage = file;
                    chapters[chapterIndex].heroImagePreview = reader.result as string;
                    setWhitepaperData((p) => ({ ...p, chapters }));
                  };
                  reader.readAsDataURL(file);
                }} color="indigo" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Content</label>
              <RichTextEditor valueHtml={chapter.content}
                onChange={(_j, html) => {
                  const chapters = [...whitepaperData.chapters];
                  chapters[chapterIndex].content = html;
                  setWhitepaperData((p) => ({ ...p, chapters }));
                }} />
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <CheckCircle2 className="text-teal-600" /> Conclusion
        </h3>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
          <input type="text" value={whitepaperData.conclusion.title}
            onChange={(e) => onChange("conclusion.title", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="Conclusion" />
        </div>
        <ImageUpload preview={whitepaperData.conclusion.heroImagePreview} inputId="wp-conclusion-img"
          onUpload={(f) => onImageUpload("conclusion.heroImage", f)} color="teal" />
        <RichTextEditor valueHtml={whitepaperData.conclusion.content}
          onChange={(_j, html) => onChange("conclusion.content", html)} />
      </div>

      {/* References */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Tag className="text-yellow-600" /> References
          </h3>
          <button type="button" onClick={addReference}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 flex items-center gap-2">
            <Plus size={16} /> Add Reference
          </button>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section Title</label>
          <input type="text" value={whitepaperData.references.title}
            onChange={(e) => onChange("references.title", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="References" />
        </div>
        {whitepaperData.references.items.map((ref, index) => (
          <div key={index} className="border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">Reference {index + 1}</h4>
              {whitepaperData.references.items.length > 1 && (
                <button type="button" onClick={() => removeReference(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Text</label>
                <textarea value={ref.text}
                  onChange={(e) => onChange(`references.items.${index}.text`, e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm" rows={3}
                  placeholder="Boston Consulting Group. (2020)..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">URL</label>
                <input type="url" value={ref.url}
                  onChange={(e) => onChange(`references.items.${index}.url`, e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder="https://..." />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { field: "authors", placeholder: "Boston Consulting Group" },
                { field: "year", placeholder: "2020" },
                { field: "title", placeholder: "Article title" },
                { field: "source", placeholder: "BCG" },
              ].map(({ field, placeholder }) => (
                <div key={field} className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">{field}</label>
                  <input type="text" value={(ref as any)[field]}
                    onChange={(e) => onChange(`references.items.${index}.${field}`, e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm" placeholder={placeholder} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileText className="text-gray-600" /> Footer
        </h3>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Copyright Text</label>
          <input type="text" value={whitepaperData.footer.copyright}
            onChange={(e) => onChange("footer.copyright", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm"
            placeholder="© 2025 DigitalQatalyst. All rights reserved." />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting}
          className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 shadow-xl shadow-gray-100 transition-all flex items-center gap-2 disabled:bg-gray-400">
          {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
          {isSubmitting ? "Publishing Whitepaper..." : "Publish Whitepaper"}
        </button>
      </div>
    </form>
  );
});
