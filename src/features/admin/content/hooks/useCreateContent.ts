import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  blogService,
  categoryService,
  Category,
  Blog,
  mediaService,
} from "../../shared/utils/supabase";
import { ToastType } from "../../shared/components/Toast";
import { getDomainsForStream } from "../../shared/utils/filterConfig";
import {
  ContentType,
  InterviewData,
  ResearchData,
  PodcastData,
  PredictionData,
  WhitepaperData,
} from "../types/create.types";

const stripHtml = (html: string) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const formatDuration = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const getAudioDuration = (file: File): Promise<number> =>
  new Promise((resolve) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src);
      resolve(audio.duration);
    };
  });

export function useCreateContent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialTab = (searchParams.get("tab")?.toLowerCase() as ContentType) || "blog";
  const [activeTab, setActiveTab] = useState<ContentType>(initialTab);

  const [formData, setFormData] = useState<Partial<Blog>>({
    title: "", slug: "", excerpt: "", content: "",
    categoryId: "", tags: [],
    publishDate: new Date().toISOString().split("T")[0],
    readTime: 0, authorId: "", featured: false, type: "blog",
    digital_perspective: "", digital_stream: "", digital_domain: "",
    digital_sector: "", content_type: "", format: "", popularity: "",
  });

  const [interviewData, setInterviewData] = useState<InterviewData>({
    introduction: "", insights: [""],
    sections: [{ question: "", answer: "" }],
    conclusion: "", location: "",
    interviewDate: new Date().toISOString().split("T")[0],
  });

  const [researchData, setResearchData] = useState<ResearchData>({
    authors: [""], publicationDate: new Date().toISOString().split("T")[0],
    journalName: "", pages: 0, citations: 0, views: 0,
    abstract: "", keywords: "", introduction: "", literatureReview: "",
    methodology: "", results: "", discussion: "", conclusion: "",
    references: "", appendices: "",
  });

  const [podcastData, setPodcastData] = useState<PodcastData>({
    showTitle: "",
    episodes: [{
      title: "", episodeNumber: 1, duration: "", showNotes: "",
      audioUrl: "", audioFile: null, thumbnailUrl: "",
      thumbnailFile: null, thumbnailPreview: "",
    }],
    topicsCovered: [""], spotifyUrl: "", downloadUrl: "",
    isNew: false, showDescription: "", showColor: "#f97316", thumbnailUrl: "",
  });

  const [predictionData, setPredictionData] = useState<PredictionData>({
    introduction: "",
    visualSummary: {
      title: "", subtitle: "",
      stats: [
        { icon: "users", value: "", label: "", trend: "" },
        { icon: "dollar", value: "", label: "", trend: "" },
        { icon: "target", value: "", label: "", trend: "" },
        { icon: "clock", value: "", label: "", trend: "" },
      ],
      keyTakeaway: "",
    },
    executiveSummary: { summary: "", keyInsights: [""] },
    metrics: [{ title: "", value: "", percentage: 0, trend: "up", description: "" }],
    timeline: [{ year: "", title: "", description: "", milestones: [""], adoptionRate: 0 }],
    scenarios: [
      { id: "optimistic", name: "Accelerated Adoption", probability: 0, description: "", timeline: "", keyDrivers: [""], outcomes: { positive: [""], negative: [""] } },
      { id: "conservative", name: "Measured Progression", probability: 0, description: "", timeline: "", keyDrivers: [""], outcomes: { positive: [""], negative: [""] } },
      { id: "disruptive", name: "Regulatory Resistance", probability: 0, description: "", timeline: "", keyDrivers: [""], outcomes: { positive: [""], negative: [""] } },
    ],
    signals: [{ title: "", category: "Technology", strength: "Strong", impact: "High Impact", description: "", keyIndicators: [""] }],
    detailedSections: [{ title: "", content: "" }],
  });

  const [whitepaperData, setWhitepaperData] = useState<WhitepaperData>({
    hero: { title: "", subtitle: "", volumeLabel: "", heroImage: null, heroImagePreview: "" },
    hookText: "",
    foreword: {
      title: "", content: "", heroImage: null, heroImagePreview: "",
      author: { name: "", title: "", image: null, imagePreview: "" },
    },
    executiveSummary: { title: "", content: "", heroImage: null, heroImagePreview: "" },
    chapters: [],
    conclusion: { title: "", content: "", heroImage: null, heroImagePreview: "" },
    references: { title: "", heroImage: null, heroImagePreview: "", items: [] },
    footer: { copyright: "" },
  });

  const [availableDomains, setAvailableDomains] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [groupedCategories, setGroupedCategories] = useState<Category[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<string>("");
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "" });
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Sync type with active tab
  useEffect(() => {
    setFormData((prev) => ({ ...prev, type: activeTab }));
  }, [activeTab]);

  // Domain filtering
  useEffect(() => {
    if (formData.digital_stream) {
      const domains = getDomainsForStream(formData.digital_stream);
      setAvailableDomains(domains);
      if (!domains.find((d: any) => d.value === formData.digital_domain)) {
        setFormData((prev) => ({ ...prev, digital_domain: "" }));
      }
    } else {
      setAvailableDomains([]);
    }
  }, [formData.digital_stream]);

  const fetchCategories = async () => {
    try {
      // Use content-types filter group for blog categories
      const grouped = await categoryService.getCategoriesGroupedByFilterGroup('content-types');
      setGroupedCategories(grouped);
      // flat list for legacy usage (e.g. quick-add selects the created category)
      const flat = grouped.flatMap((p) => [p, ...(p.subcategories || [])]);
      setCategories(flat);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === "title") {
      const timestamp = Date.now().toString().slice(-6);
      const baseSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const slug = baseSlug ? `${baseSlug}-${timestamp}` : timestamp;
      setFormData((prev) => ({ ...prev, title: value, slug }));
    } else if (name === "readTime") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else if (name === "parentCategoryId") {
      setSelectedParentId(value);
      setFormData((prev) => ({ ...prev, categoryId: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setHeroFile(file); setHeroPreview(URL.createObjectURL(file)); }
  };

  const handleFilterChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.slug) {
      setToast({ message: "Category name and slug are required", type: "error" });
      return;
    }
    setIsCreatingCategory(true);
    try {
      const created = await categoryService.createCategory(newCategory);
      await fetchCategories();
      setFormData((prev) => ({ ...prev, categoryId: created.id }));
      setToast({ message: "Category created successfully", type: "success" });
      setIsCategoryModalOpen(false);
      setNewCategory({ name: "", slug: "", description: "" });
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setIsCreatingCategory(false);
    }
  };

  // Prediction helpers
  const updatePredictionVisualSummary = (field: string, value: any) =>
    setPredictionData((prev) => ({ ...prev, visualSummary: { ...prev.visualSummary, [field]: value } }));

  const updatePredictionStat = (index: number, field: string, value: any) =>
    setPredictionData((prev) => {
      const stats = [...prev.visualSummary.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, visualSummary: { ...prev.visualSummary, stats } };
    });

  const updatePredictionExecutiveSummary = (field: string, value: any) =>
    setPredictionData((prev) => ({ ...prev, executiveSummary: { ...prev.executiveSummary, [field]: value } }));

  const updatePredictionTimelinePhase = (index: number, field: string, value: any) =>
    setPredictionData((prev) => {
      const timeline = [...prev.timeline];
      timeline[index] = { ...timeline[index], [field]: value };
      return { ...prev, timeline };
    });

  const updatePredictionMetric = (index: number, field: string, value: any) =>
    setPredictionData((prev) => {
      const metrics = [...prev.metrics];
      metrics[index] = { ...metrics[index], [field]: value };
      return { ...prev, metrics };
    });

  const updatePredictionScenario = (index: number, field: string, value: any) =>
    setPredictionData((prev) => {
      const scenarios = [...prev.scenarios];
      scenarios[index] = { ...scenarios[index], [field]: value };
      return { ...prev, scenarios };
    });

  const updatePredictionSignal = (index: number, field: string, value: any) =>
    setPredictionData((prev) => {
      const signals = [...prev.signals];
      signals[index] = { ...signals[index], [field]: value };
      return { ...prev, signals };
    });

  const updatePredictionDetailedSection = (index: number, field: string, value: any) =>
    setPredictionData((prev) => {
      const sections = [...prev.detailedSections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, detailedSections: sections };
    });

  // Whitepaper helpers
  const handleWhitepaperChange = (path: string, value: any) => {
    setWhitepaperData((prev) => {
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev)); // deep clone (no Files)
      let cursor: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        cursor = cursor[k];
      }
      const lastKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      cursor[lastKey] = value;
      return next;
    });
  };

  const handleWhitepaperImageUpload = (path: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handleWhitepaperChange(path, file);
      handleWhitepaperChange(path.replace("heroImage", "heroImagePreview").replace(/\.image$/, ".imagePreview"), reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Validation
  const validate = () => {
    if (!formData.title) return "Title is required";
    if (!formData.slug) return "Slug is required";
    if (activeTab === "blog" || activeTab === "case-study") {
      if (!formData.content) return "Content is required";
      if (!formData.authorId) return "Author is required";
      if (!formData.categoryId) return "Category is required";
    }
    return null;
  };

  const validateInterview = () => {
    if (!formData.title) return "Title is required";
    if (!formData.slug) return "Slug is required";
    if (!formData.authorId) return "Expert is required";
    if (!interviewData.introduction) return "Introduction is required";
    if (interviewData.sections.some((s) => !s.question || !s.answer)) return "All Q&A sections must be filled";
    return null;
  };

  const validateResearch = () => {
    if (!formData.title) return "Title is required";
    if (!formData.slug) return "Slug is required";
    if (researchData.authors.filter((a) => a.trim()).length === 0) return "At least one author is required";
    if (!researchData.abstract) return "Abstract is required";
    if (!researchData.keywords) return "Keywords are required";
    return null;
  };

  const validatePodcast = () => {
    if (!formData.title) return "Podcast title is required";
    if (!formData.slug) return "Slug is required";
    if (!podcastData.showTitle) return "Show title is required";
    if (!formData.authorId) return "Host (Author) is required";
    if (podcastData.episodes.length === 0) return "At least one episode is required";
    if (podcastData.episodes.some((e) => !e.title || !e.showNotes)) return "All episodes must have a title and show notes";
    return null;
  };

  const validatePrediction = () => {
    if (!formData.title) return "Title is required";
    if (!formData.slug) return "Slug is required";
    if (!predictionData.visualSummary.title) return "Visual Summary title is required";
    if (!predictionData.visualSummary.subtitle) return "Visual Summary subtitle is required";
    if (!predictionData.visualSummary.keyTakeaway) return "Visual Summary key takeaway is required";
    if (!predictionData.executiveSummary.summary) return "Executive Summary is required";
    if (predictionData.visualSummary.stats.some((s) => !s.value || !s.label)) return "All visual summary stats must have a value and label";
    if (predictionData.metrics.some((m) => !m.title || !m.value)) return "All prediction metrics must have a title and value";
    return null;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const isInterview = activeTab === "expert-interview";
    const isResearch = activeTab === "research";
    const isPodcast = activeTab === "podcast";
    const isPrediction = activeTab === "prediction-analysis";

    const err = isInterview ? validateInterview()
      : isResearch ? validateResearch()
      : isPodcast ? validatePodcast()
      : isPrediction ? validatePrediction()
      : validate();

    if (err) { setToast({ message: err, type: "error" }); return; }

    setIsSubmitting(true);
    try {
      let heroImageUrl = "";
      if (heroFile) heroImageUrl = await blogService.uploadHeroImage(heroFile);

      const selectedCategory = categories.find((c) => c.id === formData.categoryId);
      let finalContent = formData.content;
      let finalExcerpt = formData.excerpt;

      if (isInterview) {
        finalContent = JSON.stringify({
          introduction: interviewData.introduction,
          insights: interviewData.insights.filter((i) => i.trim()),
          sections: interviewData.sections,
          conclusion: interviewData.conclusion,
          location: interviewData.location,
          interviewDate: interviewData.interviewDate,
        });
        finalExcerpt = interviewData.introduction.slice(0, 160) + (interviewData.introduction.length > 160 ? "..." : "");
      } else if (isResearch) {
        finalContent = JSON.stringify({ ...researchData, authors: researchData.authors.filter((a) => a.trim()) });
        finalExcerpt = researchData.abstract.slice(0, 200) + (researchData.abstract.length > 200 ? "..." : "");
      } else if (isPodcast) {
        const episodes = await Promise.all(
          podcastData.episodes.map(async (ep) => {
            let audioUrl = ep.audioUrl;
            if (ep.audioFile) audioUrl = await blogService.uploadAudioFile(ep.audioFile);
            let epThumbnailUrl = ep.thumbnailUrl;
            if (ep.thumbnailFile) epThumbnailUrl = await blogService.uploadHeroImage(ep.thumbnailFile);
            return { title: ep.title, episodeNumber: ep.episodeNumber, duration: ep.duration, showNotes: ep.showNotes, audioUrl, thumbnailUrl: epThumbnailUrl };
          }),
        );
        finalContent = JSON.stringify({ ...podcastData, episodes, topicsCovered: podcastData.topicsCovered.filter((t) => t.trim()) });
        const firstNotes = episodes[0]?.showNotes || podcastData.showDescription || "";
        finalExcerpt = stripHtml(firstNotes).slice(0, 160) + (stripHtml(firstNotes).length > 160 ? "..." : "");
      } else if (isPrediction) {
        finalContent = JSON.stringify({
          header: { title: formData.title, subtitle: formData.excerpt, category: "Prediction Analysis", author: selectedCategory?.name || "DigitalQatalyst", publishDate: formData.publishDate, readTime: `${formData.readTime} min` },
          ...predictionData,
        });
        finalExcerpt = formData.excerpt;
      }

      await mediaService.createMediaItem({
        ...formData,
        excerpt: finalExcerpt,
        heroImage: heroImageUrl,
        categoryName: selectedCategory?.name,
        type: activeTab,
        content: finalContent,
        location: isInterview ? interviewData.location : undefined,
        interviewDate: isInterview ? interviewData.interviewDate : undefined,
        tags: typeof formData.tags === "string" ? (formData.tags as string).split(",").map((s) => s.trim()) : formData.tags,
      });

      setToast({ message: `${activeTab.replace(/-/g, " ")} posted successfully!`, type: "success" });
      setTimeout(() => navigate("/admin-ui/media"), 1500);
    } catch (err: any) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhitepaperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const uploadImg = async (file: File | null) => file ? await blogService.uploadHeroImage(file) : "";

      const heroImageUrl = await uploadImg(whitepaperData.hero.heroImage);
      const forewordImageUrl = await uploadImg(whitepaperData.foreword.heroImage);
      const executiveSummaryImageUrl = await uploadImg(whitepaperData.executiveSummary.heroImage);
      const authorImageUrl = await uploadImg(whitepaperData.foreword.author.image);
      const conclusionImageUrl = await uploadImg(whitepaperData.conclusion.heroImage);
      const referencesImageUrl = await uploadImg(whitepaperData.references.heroImage);

      const chaptersWithUrls = await Promise.all(
        whitepaperData.chapters.map(async (ch) => ({ ...ch, heroImageUrl: await uploadImg(ch.heroImage) })),
      );

      const finalContent = JSON.stringify({
        hero: { ...whitepaperData.hero, heroImageUrl },
        hookText: whitepaperData.hookText,
        foreword: { ...whitepaperData.foreword, heroImageUrl: forewordImageUrl, author: { ...whitepaperData.foreword.author, imageUrl: authorImageUrl } },
        executiveSummary: { ...whitepaperData.executiveSummary, heroImageUrl: executiveSummaryImageUrl },
        chapters: chaptersWithUrls,
        conclusion: { ...whitepaperData.conclusion, heroImageUrl: conclusionImageUrl },
        references: { ...whitepaperData.references, heroImageUrl: referencesImageUrl },
        footer: whitepaperData.footer,
      });

      // Generate unique slug for whitepaper
      const timestamp = Date.now().toString().slice(-6);
      const baseSlug = whitepaperData.hero.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const uniqueSlug = baseSlug ? `${baseSlug}-${timestamp}` : timestamp;

      await blogService.createBlog({
        title: whitepaperData.hero.title, slug: formData.slug || uniqueSlug,
        excerpt: whitepaperData.hookText.slice(0, 200) + "...",
        content: finalContent, categoryId: formData.categoryId,
        tags: formData.tags, publishDate: formData.publishDate,
        readTime: formData.readTime, authorId: formData.authorId,
        featured: formData.featured, type: "whitepaper",
      });

      setToast({ message: "Whitepaper published successfully!", type: "success" });
      setTimeout(() => navigate("/admin-ui/media"), 2000);
    } catch (error) {
      console.error("Error publishing whitepaper:", error);
      setToast({ message: "Failed to publish whitepaper", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    activeTab, setActiveTab,
    formData, setFormData,
    interviewData, setInterviewData,
    researchData, setResearchData,
    podcastData, setPodcastData,
    predictionData, setPredictionData,
    whitepaperData, setWhitepaperData,
    availableDomains,
    categories,
    groupedCategories,
    selectedParentId, setSelectedParentId,
    heroFile, heroPreview,
    isSubmitting,
    toast, setToast,
    isCategoryModalOpen, setIsCategoryModalOpen,
    newCategory, setNewCategory,
    isCreatingCategory,
    // Handlers
    handleChange,
    handleHeroChange,
    handleFilterChange,
    handleCreateCategory,
    handleSubmit,
    handleWhitepaperSubmit,
    handleWhitepaperChange,
    handleWhitepaperImageUpload,
    // Prediction helpers
    updatePredictionVisualSummary,
    updatePredictionStat,
    updatePredictionExecutiveSummary,
    updatePredictionTimelinePhase,
    updatePredictionMetric,
    updatePredictionScenario,
    updatePredictionSignal,
    updatePredictionDetailedSection,
    // Utils
    formatDuration,
    getAudioDuration,
  };
}
