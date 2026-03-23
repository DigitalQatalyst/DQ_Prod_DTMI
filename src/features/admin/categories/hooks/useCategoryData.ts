import { useState, useEffect } from 'react';
import { categoryService, Category } from '../../shared/utils/supabase';

export interface CategoryData {
    items: Category[];
    isHierarchical: boolean;
    filterGroup: string;
}

export const useCategoryData = (activeFilterGroup: string) => {
    const [data, setData] = useState<CategoryData>({
        items: [],
        isHierarchical: false,
        filterGroup: activeFilterGroup
    });
    const [filterGroups, setFilterGroups] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const hierarchicalGroups = ['content-types', 'digital-streams', 'dbp-domains'];

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const groups = await categoryService.getFilterGroups();
            setFilterGroups(groups);
            
            const isHier = hierarchicalGroups.includes(activeFilterGroup);
            
            if (isHier) {
                const grouped = await categoryService.getCategoriesGroupedByFilterGroup(activeFilterGroup);
                setData({
                    items: grouped,
                    isHierarchical: true,
                    filterGroup: activeFilterGroup
                });
            } else {
                const flat = await categoryService.getCategoriesByFilterGroup(activeFilterGroup);
                setData({
                    items: flat,
                    isHierarchical: false,
                    filterGroup: activeFilterGroup
                });
            }
        } catch (error) {
            console.error('Failed to load categories:', error);
            setData({ items: [], isHierarchical: false, filterGroup: activeFilterGroup });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [activeFilterGroup]);

    return {
        data,
        filterGroups,
        loading,
        refetch: fetchCategories
    };
};