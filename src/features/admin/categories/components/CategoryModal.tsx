import React from 'react';
import { Category } from '../../shared/utils/supabase';
import { Plus, CheckCircle2, Loader } from 'lucide-react';
import Modal from '../../shared/components/Modal';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Partial<Category> | null;
    onCategoryChange: (category: Partial<Category>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
    filterGroups: string[];
    parentCategories: Category[];
    activeFilterGroup: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose,
    category,
    onCategoryChange,
    onSubmit,
    isSubmitting,
    filterGroups,
    parentCategories,
    activeFilterGroup
}) => {
    if (!category) return null;

    const isEditing = !!category.id;
    const isCreatingSubcategory = !!category.parent_id;
    const isCreatingNewFilterGroup = category.filter_group === '__new__';

    const getModalTitle = () => {
        if (isEditing) return 'Edit Category';
        if (isCreatingSubcategory) {
            const parentName = parentCategories.find(p => p.id === category.parent_id)?.name || 'Parent';
            return `New Subcategory under "${parentName}"`;
        }
        return 'New Category';
    };

    const groupLabels: Record<string, string> = {
        'content-types': 'Content Types',
        'digital-perspectives': 'Digital Perspectives',
        'digital-streams': 'Digital Streams',
        'digital-sectors': 'Digital Sectors',
        'content-format': 'Content Format',
        'popularity-tags': 'Popularity Tags',
        'dbp-domains': 'DBP Domains'
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => !isSubmitting && onClose()}
            title={getModalTitle()}
            footer={(
                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={onClose}
                        className="text-xs font-medium text-gray-400 hover:text-black"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                        {isSubmitting ? <Loader className="animate-spin" size={14} /> : (isEditing ? <CheckCircle2 size={14} /> : <Plus size={14} />)}
                        {isSubmitting ? 'Saving...' : (isEditing ? 'Update Category' : 'Create Category')}
                    </button>
                </div>
            )}
        >
            <form className="space-y-6" onSubmit={onSubmit}>
                {/* Filter Group Selection */}
                <div className="space-y-2">
                    <label className="text-xs text-gray-600 font-medium">Filter Group</label>
                    <div className="flex gap-2">
                        <select
                            value={category.filter_group || ''}
                            onChange={e => {
                                const newGroup = e.target.value;
                                const hierarchicalGroups = ['content-types', 'digital-streams', 'dbp-domains'];
                                const isNewGroupHierarchical = hierarchicalGroups.includes(newGroup);
                                
                                onCategoryChange({ 
                                    ...category,
                                    filter_group: newGroup,
                                    // Reset parent_id if switching to flat group
                                    parent_id: isNewGroupHierarchical ? category.parent_id : null
                                });
                            }}
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
                        >
                            <option value="">Select Filter Group</option>
                            {filterGroups.map(group => (
                                <option key={group} value={group}>
                                    {groupLabels[group] || group}
                                </option>
                            ))}
                            <option value="__new__">+ Create New Filter Group</option>
                        </select>
                    </div>
                    
                    {/* New Filter Group Input */}
                    {isCreatingNewFilterGroup && (
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Enter new filter group name (e.g., 'content-difficulty')"
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
                                onChange={e => {
                                    const newGroupName = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                    onCategoryChange({ 
                                        ...category,
                                        filter_group: newGroupName || '__new__'
                                    });
                                }}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                This will create a new tab. Use lowercase with dashes (e.g., 'content-difficulty')
                            </p>
                        </div>
                    )}
                </div>

                {/* Filter Group Display */}
                {category.filter_group && !isCreatingNewFilterGroup && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium">
                            Filter Group: <span className="font-bold">{category.filter_group}</span>
                        </p>
                    </div>
                )}

                {/* Parent Selection (only for hierarchical groups) */}
                {(!category.id || category.parent_id !== undefined) && 
                 category.filter_group && 
                 ['content-types', 'digital-streams', 'dbp-domains'].includes(category.filter_group) && (
                    <div className="space-y-2 p-4 bg-gray-50/50 rounded-lg border border-gray-100">
                        <label className="text-xs text-gray-600 font-medium">Category Type</label>
                        {category.parent_id ? (
                            // Show selected parent (when creating subcategory)
                            <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm">
                                <span className="text-green-700 font-medium">
                                    Creating subcategory under: {parentCategories.find(p => p.id === category.parent_id)?.name || 'Selected Parent'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onCategoryChange({ ...category, parent_id: null })}
                                    className="ml-2 text-green-600 hover:text-green-800 text-xs underline"
                                >
                                    Change to Parent Category
                                </button>
                            </div>
                        ) : (
                            // Show parent selection dropdown
                            <select
                                value={category.parent_id || ''}
                                onChange={e => onCategoryChange({ 
                                    ...category,
                                    parent_id: e.target.value || null 
                                })}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
                            >
                                <option value="">Parent Category</option>
                                {/* Show parents from the selected filter group */}
                                {category.filter_group === activeFilterGroup ? (
                                    parentCategories.map(parent => (
                                        <option key={parent.id} value={parent.id}>
                                            Subcategory under "{parent.name}"
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Switch to "{category.filter_group}" tab to see parent options</option>
                                )}
                            </select>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Name</label>
                        <input
                            type="text"
                            value={category.name || ''}
                            onChange={e => {
                                const val = e.target.value;
                                const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                onCategoryChange({ ...category, name: val, slug });
                            }}
                            className="w-full px-0 py-1 bg-transparent border-b border-gray-100 focus:border-black text-sm font-semibold outline-none transition-all placeholder:text-gray-200"
                            placeholder="e.g. Technology & Innovation"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Slug</label>
                        <div className="flex items-center border-b border-gray-100 focus-within:border-black transition-all">
                            <span className="text-xs text-gray-300 mr-1">/</span>
                            <input
                                type="text"
                                value={category.slug || ''}
                                onChange={e => onCategoryChange({ ...category, slug: e.target.value })}
                                className="w-full px-0 py-1 bg-transparent text-xs font-mono outline-none transition-all placeholder:text-gray-200"
                                placeholder="tech-innovation"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs text-gray-500">Description</label>
                    <textarea
                        value={category.description || ''}
                        onChange={e => onCategoryChange({ ...category, description: e.target.value })}
                        rows={4}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs leading-relaxed focus:ring-1 focus:ring-gray-200 outline-none transition-all"
                        placeholder="Describe what this category encompasses..."
                    />
                </div>
            </form>
        </Modal>
    );
};

export default CategoryModal;