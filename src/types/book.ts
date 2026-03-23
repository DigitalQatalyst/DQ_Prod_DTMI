export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  shortDescription: string;
  perspectiveOn: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  category: BookCategory;
  tags: string[];
  isbn: string;
  publishDate: string;
  pageCount: number;
  format: BookFormat[];
  availability: "available" | "featured" | "coming-soon";
  keyFocusArea?: string;
  reviewSummary?: string;
  // New prototype fields
  transformationImpactScore?: number;
  actionabilityScore?: number;
  strategicDepthScore?: number;
  sixDDimensions?: string[];
}

export interface BookBundle {
  id: string;
  title: string;
  description: string;
  books: Book[];
  dimensions: string[];
  curatedBy?: string;
  targetAudience?: string;
}

export interface BookCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  credentials: string[];
  bookCount: number;
  followerCount: number;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  avatar?: string;
}

export interface Interview {
  id: string;
  title: string;
  expert: {
    name: string;
    title: string;
    avatar: string;
  };
  thumbnail: string;
  snippet: string;
  readTime: number;
  publishDate: string;
  url: string;
}

export type BookFormat = "hardcover" | "paperback" | "ebook" | "audiobook";

export interface BrieflyNotedBook {
  id: string;
  title: string;
  author: string;
  briefReview: string;
}

export interface FrameworkRanking {
  id: string;
  name: string;
  author: string;
  description: string;
  adoptionRate: number;
  slug: string;
}
