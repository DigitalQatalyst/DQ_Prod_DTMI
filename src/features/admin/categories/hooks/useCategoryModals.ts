import { useState } from 'react';
import { Category, Blog, blogService } from '../../shared/utils/supabase';

export const useCategoryModals = () => {
    const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
    const [categoryPosts, setCategoryPosts] = useState<Blog[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);

    const openUpsertModal = (category: Category | null = null, parentId: string | null = null, filterGroup: string = 'content-types') => {
        setCurrentCategory(category ? { ...category } : { 
            name: '', 
            slug: '', 
            description: '', 
            parent_id: parentId,
            filter_group: category ? category.filter_group : filterGroup,
            is_filter_enabled: true,
            filter_display_order: 0
        });
        setIsUpsertModalOpen(true);
    };

    const openDeleteModal = (category: Category | null = null) => {
        setCurrentCategory(category);
        setIsDeleteModalOpen(true);
    };

    const openDetailsModal = async (category: Category) => {
        setCurrentCategory(category);
        setIsDetailsModalOpen(true);
        setLoadingPosts(true);
        try {
            const result = await blogService.getBlogs({ category: category.name });
            setCategoryPosts(Array.isArray(result) ? result : (result as any).data ?? []);
        } catch {
            setCategoryPosts([]);
        } finally {
            setLoadingPosts(false);
        }
    };

    const closeModals = () => {
        setIsUpsertModalOpen(false);
        setIsDeleteModalOpen(false);
        setIsDetailsModalOpen(false);
        setCurrentCategory(null);
        setCategoryPosts([]);
    };

    return {
        // Modal states
        isUpsertModalOpen,
        isDeleteModalOpen,
        isDetailsModalOpen,
        currentCategory,
        categoryPosts,
        loadingPosts,
        
        // Actions
        openUpsertModal,
        openDeleteModal,
        openDetailsModal,
        closeModals,
        setCurrentCategory
    };
};