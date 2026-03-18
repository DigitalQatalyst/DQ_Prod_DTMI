import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MediaCard } from "../Cards/MediaCard";
import {
  Play,
  Volume2,
  Calendar,
  Clock,
  FileText,
  BookOpen,
  Users,
} from "lucide-react";
import { VideoDurationInfo } from "../../../utils/videoUtils";
import {
  getAudioUrl,
  getVideoUrl,
  getPosterUrl,
  getDuration,
  isVideoItem,
} from "../../../utils/mediaSelectors";
import {
  enhanceCardMetadata,
  formatPublishedDate,
} from "../../../utils/cardMetadataEnhancer";

export interface KnowledgeHubItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    mediaType?: string;
    provider: {
      name: string;
      logoUrl: string;
    };
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
    processedAudioUrl?: string;
    tags?: string[];
    date?: string;
    downloadCount?: number;
    fileSize?: string;
    duration?: string;
    location?: string;
    category?: string;
    format?: string;
    popularity?: string;
    episodes?: number;
    lastUpdated?: string;
    domain?: string;
    businessStage?: string;
    [key: string]: any;
  };
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onAddToComparison?: () => void;
  onQuickView?: () => void;
}

// Utility function to get the details href for an item
const slugify = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");

// Try to infer a media type when it's missing
const inferMediaType = (item: KnowledgeHubItemProps["item"]): string => {
  const direct = (item.mediaType ?? "").toString().trim();
  if (direct) return direct;
  const fromFormat = (item.format ?? "").toString().toLowerCase();
  if (fromFormat.includes("event")) return "event";
  if (fromFormat.includes("podcast")) return "podcast";
  if (fromFormat.includes("video") || fromFormat.includes("recorded"))
    return "video";
  if (fromFormat.includes("template") || fromFormat.includes("tool"))
    return "toolkits & templates";
  if (fromFormat.includes("report")) return "report";
  if (fromFormat.includes("guide")) return "guide";
  // Last resort: look at tags
  const tagsJoined = Array.isArray(item.tags)
    ? item.tags.map((t) => String(t).toLowerCase()).join(" ")
    : "";
  if (tagsJoined.includes("event")) return "event";
  if (tagsJoined.includes("podcast")) return "podcast";
  if (tagsJoined.includes("video")) return "video";
  if (tagsJoined.includes("report")) return "report";
  if (tagsJoined.includes("guide")) return "guide";
  return "resource";
};

const getDetailsHref = (item: KnowledgeHubItemProps["item"]): string => {
  // If item has a custom articleUrl, use that instead (for DTMI articles)
  if (item.articleUrl) {
    return item.articleUrl;
  }
  // Check for other custom URLs
  if (item.blogUrl) {
    return item.blogUrl;
  }
  if (item.newsUrl) {
    return item.newsUrl;
  }
  if (item.guideUrl) {
    return item.guideUrl;
  }
  if (item.expertInterviewUrl) {
    return item.expertInterviewUrl;
  }
  if (item.podcastUrl) {
    return item.podcastUrl;
  }
  if (item.whitepaperUrl) {
    return item.whitepaperUrl;
  }
  if (item.detailsUrl) {
    return item.detailsUrl;
  }

  if (item.researchReportUrl) {
    return item.researchReportUrl;
  }

  const type = (inferMediaType(item) || "").toLowerCase();
  const typeSlug = slugify(type);

  if (type.includes("research") || type.includes("report")) {
    return `/research-report/${item.slug || item.id}`;
  }

  return `/media/${typeSlug}/${item.id}`;
};

export const KnowledgeHubCard: React.FC<KnowledgeHubItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const [, setVideoDuration] = useState<VideoDurationInfo>({
    seconds: 0,
    formatted: "",
    available: false,
  });
  const detailsHref = getDetailsHref(item);

  // Get video duration on component mount
  useEffect(() => {
    if (isVideoItem(item)) {
      const durationInfo = getDuration(item);
      setVideoDuration(durationInfo);
    }
  }, [item]);

  // Format date to display as "Jan 12, 2024"
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      return "";
    }
  };

  // Ensure description is plain text (strip any visible HTML)
  const plainDescription = (item.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Determine the card type based on mediaType
  const getCardType = () => {
    const mt = inferMediaType(item).toLowerCase();
    switch (mt) {
      case "article":
        return "news";
      case "news":
        return "news";
      case "blog":
        return "blog";
      case "event":
        return "event";
      case "video":
        return "video";
      case "podcast":
        return "podcast";
      case "report":
      case "guide":
      case "toolkits & templates":
      case "infographic":
      case "prediction analysis":
      case "whitepaper":
        return "report";
      case "announcement":
        return "announcement";
      case "expert interview":
        return "news";
      default:
        return "report";
    }
  };

  // Get primary CTA text based on mediaType
  const getPrimaryCTA = () => {
    const mt = inferMediaType(item).toLowerCase();
    switch (mt) {
      case "article":
      case "news":
      case "blog":
        return "Read Article";
      case "video":
        return "Watch Now";
      case "podcast":
        return "Listen Now";
      case "report":
      case "guide":
      case "toolkits & templates":
      case "infographic":
      case "prediction analysis":
      case "whitepaper":
        return "Download PDF";
      case "event":
        return "Register Now";
      case "announcement":
        return "View Announcement";
      case "expert interview":
        return "Read Interview";
      default:
        return "View Details";
    }
  };

  // Get appropriate icon for the content type
  const getContentTypeIcon = () => {
    const mt = inferMediaType(item).toLowerCase();
    switch (mt) {
      case "article":
      case "news":
      case "blog":
      case "toolkits & templates":
        return <FileText size={16} className="mr-1 text-blue-600" />;
      case "video":
        return <Play size={16} className="mr-1 text-blue-600" />;
      case "podcast":
        return <Volume2 size={16} className="mr-1 text-blue-600" />;
      case "report":
      case "guide":
      case "prediction analysis":
        return <BookOpen size={16} className="mr-1 text-blue-600" />;
      case "event":
        return <Calendar size={16} className="mr-1 text-blue-600" />;
      case "expert interview":
        return <Users size={16} className="mr-1 text-blue-600" />;
      default:
        return <FileText size={16} className="mr-1 text-blue-600" />;
    }
  };

  // Build metadata and badges for MediaCard to render
  const buildMetadataAndBadges = () => {
    // Get enhanced metadata based on audit requirements
    const enhanced = enhanceCardMetadata(item);

    const dateToUse = item.lastUpdated || item.date;
    const formattedDate = formatPublishedDate(dateToUse || "");
    const author = item.provider?.name;

    const baseMeta: Record<string, any> = {};
    if (formattedDate) baseMeta.date = formattedDate;
    if (author) baseMeta.author = author;

    // Add reading time from enhanced metadata
    baseMeta.readingTime = enhanced.readingTime;

    const type = getCardType();
    if (type === "event") {
      if (item.location) baseMeta.location = item.location;
    }
    if (type === "report") {
      if (item.fileSize) baseMeta.fileSize = item.fileSize;
      if (item.downloadCount) baseMeta.downloadCount = item.downloadCount;
    }
    if (type === "video" || type === "podcast") {
      const durationInfo = getDuration(item);
      if (durationInfo?.available && durationInfo.formatted) {
        baseMeta.duration = durationInfo.formatted;
      } else if (item.duration) {
        baseMeta.duration = item.duration;
      }
    }

    // Build badges with knowledge depth + content type + topic tags
    const badges: string[] = [];

    // Add knowledge depth badge (CRITICAL FIX #1)
    badges.push(`${enhanced.depthLabel} • ${enhanced.contentTypeDisplay}`);

    // Add topic tags (CRITICAL FIX #2)
    badges.push(...enhanced.topicTags);

    // Add category/domain if available
    const category = item.domain || item.category;
    if (category && !enhanced.topicTags.includes(category)) {
      badges.push(category);
    }

    // Add business stage if available
    const stage = item.businessStage;
    if (stage) {
      badges.push(stage);
    }

    return { metadata: baseMeta, badges: badges.filter(Boolean) };
  };

  // Build media-specific URLs and icon for MediaCard
  const getMediaProps = () => {
    const type = getCardType();
    const props: Record<string, any> = { icon: getContentTypeIcon() };
    if (type === "video") props.videoUrl = getVideoUrl(item);
    if (type === "podcast") props.audioUrl = getAudioUrl(item);
    return props;
  };

  const handleCardClick = () => {
    navigate(detailsHref);
  };

  const { metadata, badges } = buildMetadataAndBadges();

  return (
    <div className="h-full group" onClick={handleCardClick}>
      <MediaCard
        type={getCardType()}
        title={item.title}
        description={plainDescription}
        image={getPosterUrl(item)}
        {...getMediaProps()}
        metadata={metadata}
        badges={badges}
        cta={{
          label: getPrimaryCTA(),
          href: detailsHref || "#",
        }}
      />
    </div>
  );
};
