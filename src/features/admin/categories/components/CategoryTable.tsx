import React, { useState } from 'react';
import { Category } from '../../shared/utils/supabase';
import { Hash, Tag, Edit, Trash2, Plus, ChevronDown, ChevronRight, Layers } from 'lucide-react';

interface CategoryTableProps {
    data: Category[];
    isHierarchical: boolean;
    searchTerm: string;
    selectedIds: string[];
    onSelectOne: (id: string) => void;
    onSelectAll: (checked: boolean) => void;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onAddSubcategory: (parentId: string) => void;
    onViewDetails: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    data,
    isHierarchical,
    searchTerm,
    selectedIds,
    onSelectOne,
    onSelectAll,
    onEdit,
    onDelete,
    onAddSubcategory,
    onViewDetails
}) => {
    const [expandedParents, setExpandedParents] = useState<string[]>([]);

    // Initialize expanded parents
    React.useEffect(() => {
        if (isHierarchical) {
            setExpandedParents(data.map(p => p.id));
        }
    }, [data, isHierarchical]);

    const toggleParent = (parentId: string) => {
        setExpandedParents(prev => 
            prev.includes(parentId) 
                ? prev.filter(id => id !== parentId)
                : [...prev, parentId]
        );
    };

    const getFilteredData = () => {
        if (!searchTerm) return data;
        
        if (isHierarchical) {
            return data.map(parent => ({
                ...parent,
                subcategories: (parent.subcategories || []).filter(sub =>
                    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    sub.slug.toLowerCase().includes(searchTerm.toLowerCase())
                )
            })).filter(parent => 
                parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                parent.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (parent.subcategories && parent.subcategories.length > 0)
            );
        } else {
            return data.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.slug.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    };

    const filteredData = getFilteredData();
    const allItems = isHierarchical 
        ? filteredData.flatMap(p => [p, ...(p.subcategories || [])])
        : filteredData;

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectAll(e.target.checked);
    };

    if (isHierarchical) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 w-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === allItems.length && allItems.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                                    />
                                </th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-500">Category Name</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-500 hidden md:table-cell">Slug</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center text-gray-400 text-sm">No categories found.</td>
                                </tr>
                            ) : (
                                filteredData.map((parent) => (
                                    <React.Fragment key={parent.id}>
                                        {/* Parent Row */}
                                        <tr className="group hover:bg-blue-50/20 transition-colors bg-blue-50/10">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(parent.id)}
                                                    onChange={() => onSelectOne(parent.id)}
                                                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => toggleParent(parent.id)}
                                                        className="p-1 hover:bg-white rounded transition-colors"
                                                    >
                                                        {expandedParents.includes(parent.id) ? 
                                                            <ChevronDown size={16} className="text-gray-400" /> : 
                                                            <ChevronRight size={16} className="text-gray-400" />
                                                        }
                                                    </button>
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200">
                                                        <Layers size={14} />
                                                    </div>
                                                    <div className="cursor-pointer" onClick={() => onViewDetails(parent)}>
                                                        <p className="text-sm font-bold text-gray-900 group-hover:underline underline-offset-4 decoration-blue-500/20">
                                                            {parent.name}
                                                            <span className="ml-2 text-xs text-blue-600 font-normal">
                                                                ({(parent.subcategories || []).length} subcategories)
                                                            </span>
                                                        </p>
                                                        {parent.description && <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{parent.description}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell">
                                                <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">/{parent.slug}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => onAddSubcategory(parent.id)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        title="Add Subcategory to this parent"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => onEdit(parent)}
                                                        className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100"
                                                        title="Edit Category"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(parent)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                        title="Remove"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        
                                        {/* Subcategory Rows */}
                                        {expandedParents.includes(parent.id) && (parent.subcategories || []).map((sub) => (
                                            <tr key={sub.id} className="group hover:bg-gray-50/20 transition-colors">
                                                <td className="px-6 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(sub.id)}
                                                        onChange={() => onSelectOne(sub.id)}
                                                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                                                    />
                                                </td>
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-3 ml-8">
                                                        <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
                                                            <Tag size={12} />
                                                        </div>
                                                        <div className="cursor-pointer" onClick={() => onViewDetails(sub)}>
                                                            <p className="text-sm font-medium text-gray-700 group-hover:underline underline-offset-4 decoration-gray-300">{sub.name}</p>
                                                            {sub.description && <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{sub.description}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 hidden md:table-cell">
                                                    <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded ml-8">/{sub.slug}</span>
                                                </td>
                                                <td className="px-6 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <button
                                                            onClick={() => onEdit(sub)}
                                                            className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100"
                                                            title="Edit Subcategory"
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => onDelete(sub)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                            title="Remove"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                        Showing {filteredData.length} parent categories with {filteredData.reduce((acc, p) => acc + (p.subcategories?.length || 0), 0)} subcategories
                    </p>
                </div>
            </div>
        );
    }

    // Flat table rendering
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 w-10">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                                />
                            </th>
                            <th className="px-6 py-4 text-xs font-medium text-gray-500">Filter Option</th>
                            <th className="px-6 py-4 text-xs font-medium text-gray-500 hidden md:table-cell">Slug</th>
                            <th className="px-6 py-4 text-xs font-medium text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-20 text-center text-gray-400 text-sm">No filter options found.</td>
                            </tr>
                        ) : (
                            filteredData.map((item) => (
                                <tr key={item.id} className="group hover:bg-gray-50/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item.id)}
                                            onChange={() => onSelectOne(item.id)}
                                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black accent-black"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
                                                <Hash size={14} />
                                            </div>
                                            <div className="cursor-pointer" onClick={() => onViewDetails(item)}>
                                                <p className="text-sm font-medium text-gray-900 group-hover:underline underline-offset-4 decoration-gray-300">{item.name}</p>
                                                {item.description && <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.description}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded">/{item.slug}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100"
                                                title="Edit Filter Option"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(item)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Remove"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                    Showing {filteredData.length} filter options
                </p>
            </div>
        </div>
    );
};

export default CategoryTable;