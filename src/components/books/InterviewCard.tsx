import { Interview } from "../../types/book";
import { Clock, ArrowRight } from "lucide-react";

interface InterviewCardProps {
  interview: Interview;
  onReadMore?: (interview: Interview) => void;
}

export function InterviewCard({ interview, onReadMore }: InterviewCardProps) {
  const handleReadMore = () => {
    if (onReadMore) {
      onReadMore(interview);
    } else {
      window.open(interview.url, "_blank");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
          <div className="text-center text-gray-600">
            <div className="w-16 h-16 mx-auto mb-2 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl text-white">🎤</span>
            </div>
            <p className="text-sm font-medium">Interview</p>
          </div>
        </div>

        {/* Read Time Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {interview.readTime} min
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-gray-600">
              {interview.expert.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm">
              {interview.expert.name}
            </h4>
            <p className="text-xs text-gray-600 truncate">
              {interview.expert.title}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {interview.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {interview.snippet}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {formatDate(interview.publishDate)}
          </span>
          <button
            onClick={handleReadMore}
            className="flex items-center gap-1 text-primary-500 hover:text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all duration-300"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
