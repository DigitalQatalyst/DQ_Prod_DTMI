import React from 'react';
import { Plus, Trash2, Search } from 'lucide-react';

interface CategoryActionsProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    selectedIds: string[];
    onDeleteSelected: () => void;
    onNewFilterGroup: () => void;
    onAddCategory: () => void;
    isHierarchical: boolean;
}

const CategoryActions: React.FC<CategoryActionsProps> = ({
    searchTerm,
    onSearchChange,
    selectedIds,
    onDeleteSelected,
    onNewFilterGroup,
    onAddCategory,
    isHierarchical
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80 lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                    type="text"
                    placeholder="Filter categories..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                {selectedIds.length > 0 && (
                    <button
                        onClick={onDeleteSelected}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-medium text-xs rounded-lg hover:bg-red-100 transition-colors border border-red-100"
                    >
                        <Trash2 size={14} /> Delete Selected ({selectedIds.length})
                    </button>
                )}
                <button
                    onClick={onAddCategory}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white font-medium text-xs rounded-lg hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap"
                >
                    <Plus size={16} /> Add {isHierarchical ? 'Category' : 'Filter Option'}
                </button>
            </div>
        </div>
    );
};

export default CategoryActions;