/**
 * PodcastLayout
 * For: Podcast, Expert Interview (audio)
 * Structure: hero → audio player → transcript/notes → related
 */
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ContentHeader } from "../components/shared/ContentHeader";
import { AuthorCard } from "../components/shared/AuthorCard";
import { ShareSidebar } from "../components/shared/ShareSidebar";
import { RelatedContent } from "../components/shared/RelatedContent";
import type { ContentDetail } from "../api/types";

function sanitize(html: string): string {
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("script,style,iframe,object,embed").forEach((n) => n.remove());
    return doc.body.innerHTML;
  } catch { return ""; }
}

function formatTime(s: number): string {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
}

interface PodcastLayoutProps {
  content: ContentDetail;
}

export function PodcastLayout({ content }: PodcastLayoutProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!content.audioUrl) return;
    const audio = new Audio(content.audioUrl);
    audio.volume = volume;
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => setPlaying(false));
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, [content.audioUrl]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const seek = (val: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = val[0];
    setCurrentTime(val[0]);
  };

  const skip = (secs: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + secs));
  };

  const changeVolume = (val: number[]) => {
    const v = val[0];
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setMuted(v === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !muted;
    audioRef.current.volume = newMuted ? 0 : volume;
    setMuted(newMuted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <ContentHeader content={content} />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-8">
              {/* Audio Player */}
              {content.audioUrl ? (
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={content.heroImage} alt={content.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-card-foreground line-clamp-1">{content.title}</p>
                        <p className="text-sm text-muted-foreground">{content.author?.name ?? "DTMI"}</p>
                      </div>
                    </div>

                    {/* Progress */}
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={1}
                      onValueChange={seek}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mb-4">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => skip(-10)} className="text-muted-foreground hover:text-foreground transition-colors">
                          <SkipBack className="h-5 w-5" />
                        </button>
                        <button
                          onClick={toggle}
                          className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md"
                        >
                          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                        </button>
                        <button onClick={() => skip(10)} className="text-muted-foreground hover:text-foreground transition-colors">
                          <SkipForward className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Volume */}
                      <div className="flex items-center gap-2">
                        <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground transition-colors">
                          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        <Slider value={[muted ? 0 : volume]} max={1} step={0.05} onValueChange={changeVolume} className="w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Audio not available yet.
                  </CardContent>
                </Card>
              )}

              {/* Show notes / transcript */}
              {content.body && (
                <div
                  className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: sanitize(content.body) }}
                />
              )}

              {content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {content.tags.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
                </div>
              )}

              {content.author && <AuthorCard author={content.author} />}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <ShareSidebar title={content.title} slug={content.slug} contentType={content.type} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <RelatedContent currentId={content.id} category={content.category} />
      <Footer />
    </div>
  );
}
