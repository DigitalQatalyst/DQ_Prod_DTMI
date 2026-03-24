import { useState } from 'react';
import { categoryService, Category } from '../../shared/utils/supabase';
import { ToastType } from '../../shared/components/Toast';

export const useCategoryActions = (onSuccess: () => void, onToast: (message: string, type: ToastType) => void) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createCategory = async (categoryData: Partial<Category>) => {
        if (!categoryData.name || !categoryData.slug || !categoryData.filter_group || categoryData.filter_group === '__new__') {
            onToast('Name, Slug, and Filter Group are required', 'error');
            return false;
        }

        setIsSubmitting(true);
        try {
            await categoryService.createCategory(categoryData);
            onToast('Category created successfully', 'success');
            onSuccess();
            return true;
        } catch (error: any) {
            onToast(error.message || 'Failed to create category', 'error');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateCategory = async (id: string, categoryData: Partial<Category>) => {
        if (!categoryData.name || !categoryData.slug || !categoryData.filter_group || categoryData.filter_group === '__new__') {
            onToast('Name, Slug, and Filter Group are required', 'error');
            return false;
        }

        setIsSubmitting(true);
        try {
            await categoryService.updateCategory(id, categoryData);
            onToast('Category updated successfully', 'success');
            onSuccess();
            return true;
        } catch (error: any) {
            onToast(error.message || 'Failed to update category', 'error');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteCategories = async (ids: string[]) => {
        try {
            for (const id of ids) {
                await categoryService.deleteCategory(id);
            }
            onToast(`${ids.length} ${ids.length === 1 ? 'category' : 'categories'} deleted successfully`, 'success');
            onSuccess();
            return true;
        } catch (error: any) {
            onToast(error.message || 'Failed to delete categories', 'error');
            return false;
        }
    };

    return {
        createCategory,
        updateCategory,
        deleteCategories,
        isSubmitting
    };
};