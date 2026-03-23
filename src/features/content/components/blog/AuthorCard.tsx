import { useNavigate, Link } from 'react-router-dom';
import { Linkedin, Clock, Calendar } from 'lucide-react';
import { Blog } from '../../../admin/shared/utils/supabase';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface AuthorCardProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    linkedIn?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
  relatedPosts?: Blog[];
}

export function AuthorCard({ author, relatedPosts = [] }: AuthorCardProps) {
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    const authorSlug = author.name
      .toLowerCase()
      .replace(/[éè]/g, 'e')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    navigate(`/authors/${authorSlug}`);
  };

  return (
    <div className="mt-6 pt-6">
      <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <button onClick={handleAvatarClick} className="group">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105 cursor-pointer"
              />
            </button>
          </div>

          <div className="flex-1">
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{author.name}</h3>
              <p className="text-primary font-medium">{author.role}</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">{author.bio}</p>

            <div className="flex gap-3">
              {author.linkedIn && (
                <a
                  href={author.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-[#0077B5] hover:text-[#0077B5] rounded-lg transition-all text-sm font-medium text-gray-700"
                >
                  <Linkedin size={16} className="text-[#0077B5]" />
                  LinkedIn
                </a>
              )}
              {author.twitter && (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-black hover:text-black rounded-lg transition-all text-sm font-medium text-gray-700"
                >
                  <XIcon />
                  X
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* More from this author */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">More from {author.name}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {post.heroImage && (
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-36 object-cover group-hover:opacity-90 transition-opacity"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </p>
                  <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
                    {post.publishDate && (
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime} min
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
