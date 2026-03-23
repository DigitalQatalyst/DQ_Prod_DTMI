import React from "react";
import { Hash, FileText, Star, Calendar, Image as ImageIcon, Upload, Save, Loader, Plus, X, Trash2, CheckCircle2 } from "lucide-react";
import { Blog } from "../../../../shared/utils/supabase";
import { InterviewData } from "../../../types/create.types";
import RichTextEditor from "../../RichTextEditor";
import { AuthorSelector } from "../../AuthorSelector";

interface Props {
  formData: Partial<Blog>;
  interviewData: InterviewData;
  setInterviewData: React.Dispatch<React.SetStateAction<InterviewData>>;
  heroPreview: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onHeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthorSelect: (author: any) => void;
  onSubmit: (e?: React.FormEvent) => void;
}

export function InterviewForm({
  formData, interviewData, setInterviewData, heroPreview, isSubmitting,
  onChange, onHeroChange, onAuthorSelect, onSubmit,
}: Props) {
  const update = (field: keyof InterviewData, value: any) =>
    setInterviewData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header */}
          <div className="space-y-6 bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Interview Title</label>
              <input type="text" name="title" value={formData.title} onChange={onChange}
                placeholder="e.g. The Future of Cognitive Organizations"
                className="w-full text-4xl font-bold bg-transparent border-none focus:ring-0 text-white placeholder-slate-700 p-0" />
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/60 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-800">
                <Hash size={12} />
                <input type="text" name="slug" value={formData.slug} onChange={onChange}
                  className="bg-transparent border-none focus:ring-0 p-0 text-cyan-300 min-w-[150px]" placeholder="url-slug" />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-800/30 px-3 py-1.5 rounded-lg border border-slate-800">
                <Calendar size={12} />
                <input type="date" value={interviewData.interviewDate}
                  onChange={(e) => update("interviewDate", e.target.value)}
                  className="bg-transparent border-none focus:ring-0 p-0 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600"><FileText size={18} /></div>
              <h3 className="font-bold text-gray-900">Introduction</h3>
            </div>
            <RichTextEditor valueHtml={interviewData.introduction} onChange={(_j, html) => update("introduction", html)} />
          </div>

          {/* Key Insights */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600"><Star size={18} /></div>
                <h3 className="font-bold text-gray-900">Key Insights</h3>
              </div>
              <button type="button" onClick={() => update("insights", [...interviewData.insights, ""])}
                className="text-xs font-bold text-cyan-600 flex items-center gap-1"><Plus size={14} /> Add Insight</button>
            </div>
            <div className="space-y-3">
              {interviewData.insights.map((insight, idx) => (
                <div key={idx} className="flex gap-3">
                  <input type="text" value={insight}
                    onChange={(e) => { const ins = [...interviewData.insights]; ins[idx] = e.target.value; update("insights", ins); }}
                    className="flex-1 p-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-yellow-500"
                    placeholder="A core takeaway from this interview..." />
                  <button type="button" onClick={() => update("insights", interviewData.insights.filter((_, i) => i !== idx))}
                    className="p-3 text-gray-300 hover:text-red-500"><X size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Q&A Sections */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                Structured Dialogue
              </h3>
              <button type="button"
                onClick={() => update("sections", [...interviewData.sections, { question: "", answer: "" }])}
                className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg text-xs font-bold hover:bg-cyan-100 flex items-center gap-2">
                <Plus size={14} /> New Question Block
              </button>
            </div>
            <div className="space-y-10">
              {interviewData.sections.map((section, idx) => (
                <div key={idx} className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:border-cyan-200 hover:shadow-xl transition-all">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button"
                      onClick={() => update("sections", interviewData.sections.filter((_, i) => i !== idx))}
                      className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Question {idx + 1} (Host)</span>
                      <textarea value={section.question}
                        onChange={(e) => { const s = [...interviewData.sections]; s[idx].question = e.target.value; update("sections", s); }}
                        placeholder="Type the interviewer's question..."
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-slate-900 min-h-[80px]" />
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest italic">Response (Expert)</span>
                      <RichTextEditor valueHtml={section.answer}
                        onChange={(_j, html) => { const s = [...interviewData.sections]; s[idx].answer = html; update("sections", s); }} />
                    </div>
                  </div>
                  <div className="px-8 py-3 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <span>Q&A Block {idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><CheckCircle2 size={18} /></div>
              <h3 className="font-bold text-gray-900">Key Takeaways (Conclusion)</h3>
            </div>
            <RichTextEditor valueHtml={interviewData.conclusion} onChange={(_j, html) => update("conclusion", html)} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-[88px] space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <button type="button" onClick={() => onSubmit()} disabled={isSubmitting}
                className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 text-sm uppercase tracking-widest">
                {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                {isSubmitting ? "Submitting..." : "Save Interview"}
              </button>

              <div className="space-y-5 pt-4 border-t border-gray-50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">The Expert (Guest)</label>
                  <AuthorSelector selectedAuthorId={formData.authorId} onAuthorSelect={onAuthorSelect} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</label>
                  <input type="text" value={interviewData.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="e.g. Abu Dhabi, UAE"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Read Time</label>
                  <input type="number" name="readTime" value={formData.readTime} onChange={onChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tags</label>
                  <input type="text" name="tags" value={formData.tags as string} onChange={onChange}
                    placeholder="DCO, Economy 4.0, AI..."
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="flex items-center justify-between p-3 bg-cyan-50/50 rounded-lg border border-cyan-100">
                  <label className="text-xs font-bold text-cyan-800 flex items-center gap-2">
                    <Star size={14} className={formData.featured ? "text-cyan-500 fill-cyan-500" : "text-cyan-300"} />
                    Spotlight Hub Feature
                  </label>
                  <input type="checkbox" name="featured" checked={!!formData.featured} onChange={onChange}
                    className="w-4 h-4 rounded accent-cyan-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={14} /> Narrative Visualization
              </label>
              <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-100/50 transition-all group"
                onClick={() => document.getElementById("hero-upload-interview")?.click()}>
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
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Header Media</span>
                  </div>
                )}
                <input type="file" id="hero-upload-interview" className="hidden" accept="image/*" onChange={onHeroChange} />
              </div>
              <p className="text-[10px] text-gray-400 italic text-center">Recommended: 1200x800px or larger</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
