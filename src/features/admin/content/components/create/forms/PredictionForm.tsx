import React from "react";
import { Hash, Save, Loader, Plus, X, Trash2, Calendar, TrendingUp, Lightbulb, BarChart3, Zap, Users, DollarSign, Target, Clock, Star } from "lucide-react";
import { Blog, Category } from "../../../../shared/utils/supabase";
import { PredictionData } from "../../../types/create.types";
import RichTextEditor from "../../RichTextEditor";

interface Props {
  formData: Partial<Blog>;
  predictionData: PredictionData;
  setPredictionData: React.Dispatch<React.SetStateAction<PredictionData>>;
  categories: Category[];
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  updatePredictionVisualSummary: (field: string, value: any) => void;
  updatePredictionStat: (index: number, field: string, value: any) => void;
  updatePredictionExecutiveSummary: (field: string, value: any) => void;
  updatePredictionTimelinePhase: (index: number, field: string, value: any) => void;
  updatePredictionMetric: (index: number, field: string, value: any) => void;
  updatePredictionScenario: (index: number, field: string, value: any) => void;
}

const StatIcon = ({ icon }: { icon: string }) => {
  if (icon === "users") return <Users size={16} />;
  if (icon === "dollar") return <DollarSign size={16} />;
  if (icon === "target") return <Target size={16} />;
  return <Clock size={16} />;
};

export function PredictionForm({
  formData, predictionData, setPredictionData, categories, isSubmitting,
  onChange, onSubmit,
  updatePredictionVisualSummary, updatePredictionStat, updatePredictionExecutiveSummary,
  updatePredictionTimelinePhase, updatePredictionMetric, updatePredictionScenario,
}: Props) {
  return (
    <form id="content-form" onSubmit={onSubmit} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Header */}
          <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Prediction Title</label>
              <input type="text" name="title" value={formData.title} onChange={onChange}
                placeholder="e.g. The Road to 2030: AI Revolution"
                className="w-full text-4xl font-bold bg-transparent border-none focus:ring-0 text-white placeholder-slate-700 p-0" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Introduction Paragraph</label>
              <textarea value={predictionData.introduction}
                onChange={(e) => setPredictionData((p) => ({ ...p, introduction: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="A comprehensive forecast exploring the evolution, key drivers, adoption rates..." />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-rose-400/60 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
              <Hash size={12} />
              <input type="text" name="slug" value={formData.slug} onChange={onChange}
                className="bg-transparent border-none focus:ring-0 p-0 text-rose-300 min-w-[200px]" placeholder="url-slug" />
            </div>
          </div>

          {/* Visual Dashboard Stats */}
          <div className="bg-gradient-to-br from-slate-50 to-rose-50 p-10 rounded-3xl border border-rose-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-rose-500" size={24} />
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Visual Dashboard Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { field: "title", placeholder: "DCO 2030 Executive Dashboard", label: "Dashboard Title" },
                { field: "subtitle", placeholder: "Enterprise transformation metrics", label: "Dashboard Subtitle" },
              ].map(({ field, placeholder, label }) => (
                <div key={field} className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
                  <input type="text" value={(predictionData.visualSummary as any)[field]}
                    onChange={(e) => updatePredictionVisualSummary(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-white border border-rose-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {predictionData.visualSummary.stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-rose-100 space-y-3">
                  <div className="p-2 bg-rose-50 text-rose-500 rounded-lg w-fit"><StatIcon icon={stat.icon} /></div>
                  <input type="text" value={stat.value} onChange={(e) => updatePredictionStat(idx, "value", e.target.value)}
                    placeholder="Value (e.g. 85%)" className="w-full text-lg font-bold border-none focus:ring-0 p-0" />
                  <input type="text" value={stat.label} onChange={(e) => updatePredictionStat(idx, "label", e.target.value)}
                    placeholder="Label (e.g. Adoption)" className="w-full text-xs font-medium text-gray-500 border-none focus:ring-0 p-0" />
                  <input type="text" value={stat.trend} onChange={(e) => updatePredictionStat(idx, "trend", e.target.value)}
                    placeholder="Trend (By 2030)" className="w-full text-[10px] text-rose-400 font-mono border-none focus:ring-0 p-0" />
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Takeaway</label>
              <textarea value={predictionData.visualSummary.keyTakeaway}
                onChange={(e) => updatePredictionVisualSummary("keyTakeaway", e.target.value)}
                rows={3}
                className="w-full p-4 bg-white border border-rose-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="The central message for executives..." />
            </div>
          </div>

          {/* Executive Summary */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="text-yellow-500" size={24} />
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Executive Summary</h3>
            </div>
            <RichTextEditor valueHtml={predictionData.executiveSummary.summary}
              onChange={(_j, html) => updatePredictionExecutiveSummary("summary", html)} />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Key Insights List</label>
                <button type="button"
                  onClick={() => updatePredictionExecutiveSummary("keyInsights", [...predictionData.executiveSummary.keyInsights, ""])}
                  className="text-xs font-bold text-rose-600 flex items-center gap-1"><Plus size={14} /> Add Insight</button>
              </div>
              {predictionData.executiveSummary.keyInsights.map((insight, idx) => (
                <div key={idx} className="flex gap-2">
                  <input type="text" value={insight}
                    onChange={(e) => { const ins = [...predictionData.executiveSummary.keyInsights]; ins[idx] = e.target.value; updatePredictionExecutiveSummary("keyInsights", ins); }}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:ring-1 focus:ring-rose-500"
                    placeholder="Insight description..." />
                  <button type="button"
                    onClick={() => updatePredictionExecutiveSummary("keyInsights", predictionData.executiveSummary.keyInsights.filter((_, i) => i !== idx))}
                    className="p-2 text-gray-300 hover:text-red-500"><X size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="text-rose-500" size={24} />
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Evolution Timeline</h3>
              </div>
              <button type="button"
                onClick={() => setPredictionData((p) => ({ ...p, timeline: [...p.timeline, { year: "", title: "", description: "", milestones: [""], adoptionRate: 0 }] }))}
                className="px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-100 flex items-center gap-2">
                <Plus size={14} /> Add Phase
              </button>
            </div>
            <div className="space-y-8">
              {predictionData.timeline.map((phase, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 relative">
                  <button type="button"
                    onClick={() => setPredictionData((p) => ({ ...p, timeline: p.timeline.filter((_, i) => i !== idx) }))}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Year Range</label>
                      <input type="text" value={phase.year}
                        onChange={(e) => updatePredictionTimelinePhase(idx, "year", e.target.value)}
                        placeholder="e.g. 2025-2026"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phase Title</label>
                      <input type="text" value={phase.title}
                        onChange={(e) => updatePredictionTimelinePhase(idx, "title", e.target.value)}
                        placeholder="e.g. Initial Adoption"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                    <RichTextEditor valueHtml={phase.description}
                      onChange={(_j, html) => updatePredictionTimelinePhase(idx, "description", html)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex justify-between">
                      Adoption Rate <span className="text-rose-500 font-bold">{phase.adoptionRate}%</span>
                    </label>
                    <input type="range" min="0" max="100" value={phase.adoptionRate}
                      onChange={(e) => updatePredictionTimelinePhase(idx, "adoptionRate", parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-rose-500" size={24} />
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Prediction Metrics</h3>
              </div>
              <button type="button"
                onClick={() => setPredictionData((p) => ({ ...p, metrics: [...p.metrics, { title: "", value: "", percentage: 0, trend: "up", description: "" }] }))}
                className="text-xs font-bold text-rose-600 flex items-center gap-1"><Plus size={14} /> Add Metric</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictionData.metrics.map((metric, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-gray-100 space-y-4 relative group">
                  <button type="button"
                    onClick={() => setPredictionData((p) => ({ ...p, metrics: p.metrics.filter((_, i) => i !== idx) }))}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} /></button>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metric Title</label>
                    <input type="text" value={metric.title}
                      onChange={(e) => updatePredictionMetric(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm" placeholder="e.g. Adoption" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Value</label>
                      <input type="text" value={metric.value}
                        onChange={(e) => updatePredictionMetric(idx, "value", e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm" placeholder="85%" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Percentage</label>
                      <input type="number" value={metric.percentage}
                        onChange={(e) => updatePredictionMetric(idx, "percentage", parseInt(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                    <RichTextEditor valueHtml={metric.description}
                      onChange={(_j, html) => updatePredictionMetric(idx, "description", html)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scenarios */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="text-rose-500" size={24} />
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Scenario Analysis</h3>
            </div>
            <div className="space-y-8">
              {predictionData.scenarios.map((scenario, idx) => (
                <div key={idx} className={`p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 bg-white ${scenario.id === "optimistic" ? "border-l-4 border-l-teal-500" : scenario.id === "conservative" ? "border-l-4 border-l-gray-500" : "border-l-4 border-l-rose-500"}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-lg text-gray-900 uppercase tracking-widest">{scenario.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase">Probability</span>
                      <input type="number" value={scenario.probability}
                        onChange={(e) => updatePredictionScenario(idx, "probability", parseInt(e.target.value))}
                        className="w-16 px-3 py-1 bg-gray-50 border border-gray-100 rounded text-sm font-bold text-rose-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Timeline Forecast</label>
                      <input type="text" value={scenario.timeline}
                        onChange={(e) => updatePredictionScenario(idx, "timeline", e.target.value)}
                        placeholder="e.g. Maturity by 2028"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                      <RichTextEditor valueHtml={scenario.description}
                        onChange={(_j, html) => updatePredictionScenario(idx, "description", html)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-[88px] space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <button type="submit" disabled={isSubmitting}
                className="w-full py-4 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 shadow-lg shadow-rose-100 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 text-sm uppercase tracking-widest">
                {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                {isSubmitting ? "Publishing..." : "Publish Analysis"}
              </button>
              <div className="space-y-5 pt-4 border-t border-gray-50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                  <select name="categoryId" value={formData.categoryId} onChange={onChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-rose-500 outline-none">
                    <option value="">Select Category</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                  <label className="text-xs font-bold text-rose-800 flex items-center gap-2">
                    <Star size={14} className={formData.featured ? "text-rose-500 fill-rose-500" : "text-rose-300"} />
                    Spotlight Hub Feature
                  </label>
                  <input type="checkbox" name="featured" checked={!!formData.featured} onChange={onChange}
                    className="w-4 h-4 rounded accent-rose-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
