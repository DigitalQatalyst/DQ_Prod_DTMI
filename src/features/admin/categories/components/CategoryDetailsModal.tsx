import React from 'react';
import { Category, Blog } from '../../shared/utils/supabase';
import { Tag, BookOpen, Loader } from 'lucide-react';
import Modal from '../../shared/components/Modal';

interface CategoryDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category | null;
    posts: Blog[];
    loadingPosts: boolean;
}

const CategoryDetailsModal: React.FC<CategoryDetailsModalProps> = ({
    isOpen,
    onClose,
    category,
    posts,
    loadingPosts
}) => {
    if (!category) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Category Insight"
            size="lg"
        >
            <div className="space-y-8 pb-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-black border border-gray-100 shadow-sm">
                            <Tag size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                            <p className="text-xs font-mono text-gray-500 mt-1">/{category.slug}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-gray-100 pl-4">
                        {category.description || 'No description provided for this category.'}
                    </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-medium text-gray-900 flex items-center gap-2">
                        <BookOpen size={12} className="text-indigo-500" /> Associated Publications
                    </h3>

                    {loadingPosts ? (
                        <div className="flex items-center gap-2 text-xs text-gray-400 animate-pulse">
                            <Loader size={12} className="animate-spin" /> Retrieving associates...
                        </div>
                    ) : posts.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">No publications documented under this taxonomy yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {posts.slice(0, 4).map(post => (
                                <div key={post.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 group hover:border-black/10 transition-colors">
                                    <p className="text-xs font-semibold text-gray-900 line-clamp-1 group-hover:underline">{post.title}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-500">{post.author?.name}</span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(post.publishDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default CategoryDetailsModal;