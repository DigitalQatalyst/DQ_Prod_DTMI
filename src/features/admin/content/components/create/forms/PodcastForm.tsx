import React from "react";
import { Hash, Image as ImageIcon, Upload, Save, Loader, Plus, X, CheckCircle2, Mic, Star } from "lucide-react";
import { Blog, Category } from "../../../../shared/utils/supabase";
import { PodcastData } from "../../../types/create.types";
import RichTextEditor from "../../RichTextEditor";
import { AuthorSelector } from "../../AuthorSelector";

interface Props {
  formData: Partial<Blog>;
  podcastData: PodcastData;
  setPodcastData: React.Dispatch<React.SetStateAction<PodcastData>>;
  categories: Category[];
  groupedCategories: Category[];
  selectedParentId: string;
  heroPreview: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onHeroChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthorSelect: (author: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  formatDuration: (seconds: number) => string;
  getAudioDuration: (file: File) => Promise<number>;
}

export function PodcastForm({
  formData, podcastData, setPodcastData, categories, groupedCategories, selectedParentId,
  heroPreview, isSubmitting,
  onChange, onHeroChange, onAuthorSelect, onSubmit, formatDuration, getAudioDuration,
}: Props) {
  const updateEpisode = (idx: number, field: string, value: any) => {
    const episodes = [...podcastData.episodes];
    (episodes[idx] as any)[field] = value;
    setPodcastData((prev) => ({ ...prev, episodes }));
  };

  return (
    <form id="content-form" onSubmit={onSubmit} className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main */}
        <div className="lg:col-span-8 space-y-8">
          {/* Show Info */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-10 rounded-3xl border border-orange-100 shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">Podcast Title</label>
                <input type="text" name="title" value={formData.title} onChange={onChange}
                  placeholder="e.g. Digital Transformation Series"
                  className="w-full text-4xl font-bold bg-transparent border-none focus:ring-0 text-gray-900 placeholder-orange-200 p-0" />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-orange-900 uppercase tracking-widest">Show Title (Internal)</label>
                <input type="text" value={podcastData.showTitle}
                  onChange={(e) => setPodcastData((p) => ({ ...p, showTitle: e.target.value }))}
                  placeholder="The Forward Thinkers"
                  className="w-full px-4 py-2 bg-white border border-orange-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400/60 bg-white/50 px-3 py-1.5 rounded-lg border border-orange-100 w-fit">
              <Hash size={12} />
              <input type="text" name="slug" value={formData.slug} onChange={onChange}
                className="bg-transparent border-none focus:ring-0 p-0 text-orange-600 min-w-[200px]" placeholder="url-slug" />
            </div>
          </div>

          {/* Episodes */}
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                <Mic size={24} className="text-orange-600" /> Episodes
              </h3>
              <button type="button"
                onClick={() => setPodcastData((p) => ({ ...p, episodes: [...p.episodes, { title: "", episodeNumber: p.episodes.length + 1, duration: "", showNotes: "", audioUrl: "", audioFile: null, thumbnailUrl: "", thumbnailFile: null, thumbnailPreview: "" }] }))}
                className="px-6 py-3 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 flex items-center gap-2 shadow-lg shadow-orange-100">
                <Plus size={16} /> Add New Episode
              </button>
            </div>

            <div className="space-y-12">
              {podcastData.episodes.map((episode, idx) => (
                <div key={idx} className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:border-orange-200 hover:shadow-xl transition-all">
                  <div className="absolute top-4 right-4 z-10">
                    <button type="button"
                      onClick={() => setPodcastData((p) => ({ ...p, episodes: p.episodes.filter((_, i) => i !== idx) }))}
                      className="p-2 bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 rounded-full shadow-sm">
                      <X size={16} />
                    </button>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-1 flex items-center justify-center">
                        <span className="text-3xl font-black text-orange-100">#{idx + 1}</span>
                      </div>
                      <div className="md:col-span-7 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Episode Title</label>
                        <input type="text" value={episode.title}
                          onChange={(e) => updateEpisode(idx, "title", e.target.value)}
                          placeholder="Episode title..."
                          className="w-full text-xl font-bold border-none focus:ring-0 p-0 placeholder-gray-200" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Number</label>
                        <input type="number" value={episode.episodeNumber}
                          onChange={(e) => updateEpisode(idx, "episodeNumber", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-orange-500" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Duration</label>
                        <input type="text" value={episode.duration}
                          onChange={(e) => updateEpisode(idx, "duration", e.target.value)}
                          placeholder="45 min"
                          className="w-full px-3 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-orange-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Audio */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                          <Mic size={14} /> Audio File
                        </label>
                        <div onClick={() => document.getElementById(`audio-upload-${idx}`)?.click()}
                          className="relative bg-orange-50/50 rounded-2xl border-2 border-dashed border-orange-100 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-all">
                          {episode.audioFile ? (
                            <div className="text-center">
                              <CheckCircle2 className="mx-auto text-green-500 mb-2" size={24} />
                              <span className="text-xs font-bold text-gray-700 block truncate max-w-[200px]">{episode.audioFile.name}</span>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto text-orange-200 mb-2" size={24} />
                              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Upload Audio</span>
                            </div>
                          )}
                          <input type="file" id={`audio-upload-${idx}`} className="hidden" accept="audio/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                updateEpisode(idx, "audioFile", file);
                                try {
                                  const secs = await getAudioDuration(file);
                                  updateEpisode(idx, "duration", formatDuration(secs));
                                } catch (err) { console.error("Error getting audio duration:", err); }
                              }
                            }} />
                        </div>
                        <input type="url" value={episode.audioUrl}
                          onChange={(e) => updateEpisode(idx, "audioUrl", e.target.value)}
                          placeholder="Or provide external Audio URL..."
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:ring-1 focus:ring-orange-500 outline-none" />
                      </div>

                      {/* Thumbnail */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                          <ImageIcon size={14} /> Episode Thumbnail
                        </label>
                        <div onClick={() => document.getElementById(`thumbnail-upload-${idx}`)?.click()}
                          className="relative aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-orange-50 transition-all group">
                          {episode.thumbnailPreview ? (
                            <>
                              <img src={episode.thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-orange-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Upload className="text-white" size={24} />
                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto text-gray-200 mb-2" size={24} />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upload Thumbnail</span>
                            </div>
                          )}
                          <input type="file" id={`thumbnail-upload-${idx}`} className="hidden" accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  updateEpisode(idx, "thumbnailFile", file);
                                  updateEpisode(idx, "thumbnailPreview", reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }} />
                        </div>
                      </div>
                    </div>

                    {/* Show Notes */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Show Notes</label>
                      <RichTextEditor valueHtml={episode.showNotes}
                        onChange={(_j, html) => updateEpisode(idx, "showNotes", html)} />
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
                className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400 text-sm uppercase tracking-widest">
                {isSubmitting ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                {isSubmitting ? "Publishing..." : "Publish Podcast"}
              </button>

              <div className="space-y-5 pt-4 border-t border-gray-50">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Host (Author)</label>
                  <AuthorSelector selectedAuthorId={formData.authorId} onAuthorSelect={onAuthorSelect} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                  <select name="parentCategoryId" value={selectedParentId} onChange={onChange}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 outline-none">
                    <option value="">Select Type</option>
                    {groupedCategories.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  {selectedParentId && (
                    <select name="categoryId" value={formData.categoryId} onChange={onChange}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 outline-none">
                      <option value="">Select Subcategory</option>
                      {(groupedCategories.find((p) => p.id === selectedParentId)?.subcategories ?? []).map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Show Description</label>
                  <textarea value={podcastData.showDescription} rows={3}
                    onChange={(e) => setPodcastData((p) => ({ ...p, showDescription: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Spotify URL</label>
                  <input type="url" value={podcastData.spotifyUrl}
                    onChange={(e) => setPodcastData((p) => ({ ...p, spotifyUrl: e.target.value }))}
                    placeholder="https://open.spotify.com/..."
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Download URL</label>
                  <input type="url" value={podcastData.downloadUrl}
                    onChange={(e) => setPodcastData((p) => ({ ...p, downloadUrl: e.target.value }))}
                    placeholder="https://example.com/download"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Show Branding</h3>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand Color</label>
                <div className="flex items-center gap-3">
                  <input type="color" value={podcastData.showColor}
                    onChange={(e) => setPodcastData((p) => ({ ...p, showColor: e.target.value }))}
                    className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer" />
                  <input type="text" value={podcastData.showColor}
                    onChange={(e) => setPodcastData((p) => ({ ...p, showColor: e.target.value }))}
                    placeholder="#f97316"
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-mono focus:ring-1 focus:ring-orange-500 outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
