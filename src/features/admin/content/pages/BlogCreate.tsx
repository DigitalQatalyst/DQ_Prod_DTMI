import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AppLayout from "../../shared/components/AppLayout";
import { Toast } from "../../shared/components/Toast";
import { useCreateContent } from "../hooks/useCreateContent";
import { ContentTypeTabs } from "../components/create/ContentTypeTabs";
import { QuickCategoryModal } from "../components/create/QuickCategoryModal";
import { BlogForm } from "../components/create/forms/BlogForm";
import { ArticleForm } from "../components/create/forms/ArticleForm";
import { ResearchForm } from "../components/create/forms/ResearchForm";
import { InterviewForm } from "../components/create/forms/InterviewForm";
import { PodcastForm } from "../components/create/forms/PodcastForm";
import { PredictionForm } from "../components/create/forms/PredictionForm";
import { WhitepaperForm } from "../components/create/forms/WhitepaperForm";
import { TABS } from "../components/create/ContentTypeTabs";

export const BlogCreate: React.FC = () => {
  const navigate = useNavigate();
  const ctx = useCreateContent();

  const sharedFormProps = {
    formData: ctx.formData,
    categories: ctx.categories,
    groupedCategories: ctx.groupedCategories,
    selectedParentId: ctx.selectedParentId,
    availableDomains: ctx.availableDomains,
    heroPreview: ctx.heroPreview,
    isSubmitting: ctx.isSubmitting,
    onChange: ctx.handleChange,
    onAuthorSelect: (a: any) => ctx.setFormData((prev) => ({ ...prev, authorId: a.id })),
    onHeroChange: ctx.handleHeroChange,
    onOpenCategoryModal: () => ctx.setIsCategoryModalOpen(true),
    onSubmit: ctx.handleSubmit,
    onFilterChange: ctx.handleFilterChange,
  };

  return (
    <AppLayout title="Create Media">
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        {/* Top bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to library
          </button>
          <ContentTypeTabs activeTab={ctx.activeTab} onChange={ctx.setActiveTab} />
        </div>

        {ctx.toast && (
          <Toast message={ctx.toast.message} type={ctx.toast.type} onClose={() => ctx.setToast(null)} />
        )}

        {/* Form routing */}
        {(ctx.activeTab === "blog" || ctx.activeTab === "case-study") && (
          <BlogForm {...sharedFormProps}
            onContentChange={(html) => ctx.setFormData((p) => ({ ...p, content: html }))} />
        )}

        {ctx.activeTab === "article" && (
          <ArticleForm {...sharedFormProps}
            onContentChange={(html) => ctx.setFormData((p) => ({ ...p, content: html }))} />
        )}

        {ctx.activeTab === "research" && (
          <ResearchForm {...sharedFormProps}
            researchData={ctx.researchData}
            setResearchData={ctx.setResearchData} />
        )}

        {ctx.activeTab === "expert-interview" && (
          <InterviewForm
            formData={ctx.formData}
            interviewData={ctx.interviewData}
            setInterviewData={ctx.setInterviewData}
            heroPreview={ctx.heroPreview}
            isSubmitting={ctx.isSubmitting}
            onChange={ctx.handleChange}
            onHeroChange={ctx.handleHeroChange}
            onAuthorSelect={(a) => ctx.setFormData((p) => ({ ...p, authorId: a.id }))}
            onSubmit={ctx.handleSubmit}
          />
        )}

        {ctx.activeTab === "podcast" && (
          <PodcastForm {...sharedFormProps}
            podcastData={ctx.podcastData}
            setPodcastData={ctx.setPodcastData}
            formatDuration={ctx.formatDuration}
            getAudioDuration={ctx.getAudioDuration}
          />
        )}

        {ctx.activeTab === "prediction-analysis" && (
          <PredictionForm
            formData={ctx.formData}
            predictionData={ctx.predictionData}
            setPredictionData={ctx.setPredictionData}
            categories={ctx.categories}
            groupedCategories={ctx.groupedCategories}
            selectedParentId={ctx.selectedParentId}
            isSubmitting={ctx.isSubmitting}
            onChange={ctx.handleChange}
            onSubmit={ctx.handleSubmit}
            updatePredictionVisualSummary={ctx.updatePredictionVisualSummary}
            updatePredictionStat={ctx.updatePredictionStat}
            updatePredictionExecutiveSummary={ctx.updatePredictionExecutiveSummary}
            updatePredictionTimelinePhase={ctx.updatePredictionTimelinePhase}
            updatePredictionMetric={ctx.updatePredictionMetric}
            updatePredictionScenario={ctx.updatePredictionScenario}
          />
        )}

        {ctx.activeTab === "whitepaper" && (
          <WhitepaperForm
            formData={ctx.formData}
            whitepaperData={ctx.whitepaperData}
            setWhitepaperData={ctx.setWhitepaperData}
            isSubmitting={ctx.isSubmitting}
            onSubmit={ctx.handleWhitepaperSubmit}
            onChange={ctx.handleWhitepaperChange}
            onImageUpload={ctx.handleWhitepaperImageUpload}
          />
        )}

        {/* Fallback for any unimplemented tab */}
        {!["blog", "case-study", "article", "research", "expert-interview", "podcast", "prediction-analysis", "whitepaper"].includes(ctx.activeTab) && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center space-y-8 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center mx-auto text-gray-200 border border-gray-100">
              {(() => { const T = TABS.find((t) => t.id === ctx.activeTab); return T ? <T.icon size={40} /> : null; })()}
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{ctx.activeTab.replace(/-/g, " ")} Creator</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                The specialized schema for <strong>{ctx.activeTab}</strong> is being architected. Use this placeholder for high-level registration.
              </p>
            </div>
            <div className="max-w-xl mx-auto space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Document Title</label>
                  <input type="text" value={ctx.formData.title} onChange={ctx.handleChange} name="title"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none" placeholder="Enter title..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Classification</label>
                  <input type="text" disabled value={ctx.activeTab.toUpperCase()}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold tracking-widest text-gray-400 cursor-not-allowed" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reference Abstract</label>
                <textarea rows={4} value={ctx.formData.excerpt} onChange={ctx.handleChange} name="excerpt"
                  className="w-full p-4 bg-white border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-black outline-none leading-relaxed"
                  placeholder="Enter a brief abstract..." />
              </div>
            </div>
            <div className="pt-8">
              <button onClick={() => ctx.handleSubmit()} disabled={ctx.isSubmitting}
                className="px-8 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-100 disabled:bg-gray-400">
                {ctx.isSubmitting ? "Registering..." : `Register ${ctx.activeTab}`}
              </button>
            </div>
          </div>
        )}
      </div>

      <QuickCategoryModal
        isOpen={ctx.isCategoryModalOpen}
        isCreating={ctx.isCreatingCategory}
        newCategory={ctx.newCategory}
        onChange={(updates) => ctx.setNewCategory((prev) => ({ ...prev, ...updates }))}
        onClose={() => ctx.setIsCategoryModalOpen(false)}
        onSubmit={ctx.handleCreateCategory}
      />
    </AppLayout>
  );
};

export default BlogCreate;
