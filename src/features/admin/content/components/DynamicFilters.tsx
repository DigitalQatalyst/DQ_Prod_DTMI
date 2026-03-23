import React, { useState, useEffect } from 'react';
import { useDynamicFilters, FilterGroup } from '../hooks/useDynamicFilters';
import { Loader } from 'lucide-react';

interface DynamicFiltersProps {
    formData: any;
    onChange: (name: string, value: string) => void;
    className?: string;
}

const DynamicFilters: React.FC<DynamicFiltersProps> = ({
    formData,
    onChange,
    className = ""
}) => {
    const { filterGroups, loading, getChildOptions } = useDynamicFilters();
    const [childOptionsCache, setChildOptionsCache] = useState<Record<string, any[]>>({});

    // Handle hierarchical filter changes
    const handleHierarchicalChange = (groupName: string, level: 'parent' | 'child', value: string) => {
        if (level === 'parent') {
            // Clear child selection when parent changes
            onChange(`${groupName}_parent`, value);
            onChange(groupName, '');
            
            // Update child options cache
            if (value) {
                const childOptions = getChildOptions(groupName, value);
                setChildOptionsCache(prev => ({
                    ...prev,
                    [groupName]: childOptions
                }));
            } else {
                setChildOptionsCache(prev => ({
                    ...prev,
                    [groupName]: []
                }));
            }
        } else {
            onChange(groupName, value);
        }
    };

    // Load child options when parent is already selected
    useEffect(() => {
        filterGroups.forEach(group => {
            if (group.isHierarchical) {
                const parentValue = formData[`${group.name}_parent`];
                if (parentValue && group.parentOptions) {
                    const parentOption = group.parentOptions.find(p => p.value === parentValue);
                    if (parentOption) {
                        const childOptions = getChildOptions(group.name, parentOption.id);
                        setChildOptionsCache(prev => ({
                            ...prev,
                            [group.name]: childOptions
                        }));
                    }
                }
            }
        });
    }, [filterGroups, formData, getChildOptions]);

    if (loading) {
        return (
            <div className={`border-t border-gray-100 pt-5 space-y-4 ${className}`}>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Marketplace Filters</h4>
                <div className="flex items-center justify-center py-8">
                    <Loader className="animate-spin text-gray-400" size={20} />
                    <span className="ml-2 text-sm text-gray-400">Loading filters...</span>
                </div>
            </div>
        );
    }

    const renderFlatFilter = (group: FilterGroup) => (
        <div key={group.name} className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                {group.label}
            </label>
            <select
                value={formData[group.name] || ''}
                onChange={(e) => onChange(group.name, e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
            >
                <option value="">Select {group.label}</option>
                {group.options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    const renderHierarchicalFilter = (group: FilterGroup) => {
        const parentValue = formData[`${group.name}_parent`] || '';
        const childValue = formData[group.name] || '';
        const childOptions = childOptionsCache[group.name] || [];

        return (
            <div key={group.name} className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {group.label}
                </label>
                
                {/* Parent Selection */}
                <select
                    value={parentValue}
                    onChange={(e) => handleHierarchicalChange(group.name, 'parent', e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-black outline-none"
                >
                    <option value="">Select {group.label} Type</option>
                    {group.parentOptions?.map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Child Selection - only show when parent is selected */}
                {parentValue && childOptions.length > 0 && (
                    <select
                        value={childValue}
                        onChange={(e) => handleHierarchicalChange(group.name, 'child', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-blue-200 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-blue-50/30"
                    >
                        <option value="">Select Specific {group.label}</option>
                        {childOptions.map((option) => (
                            <option key={option.id} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        );
    };

    // Organize filters by priority
    const priorityOrder = [
        'content-types',
        'digital-perspectives', 
        'digital-streams',
        'dbp-domains',
        'digital-sectors',
        'content-format',
        'popularity-tags'
    ];

    const sortedGroups = [...filterGroups]
        .filter(group => group.name !== 'content-types') // Exclude content-types since it's handled by category selection
        .sort((a, b) => {
            const aIndex = priorityOrder.indexOf(a.name);
            const bIndex = priorityOrder.indexOf(b.name);
            if (aIndex === -1 && bIndex === -1) return a.label.localeCompare(b.label);
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;
            return aIndex - bIndex;
        });

    return (
        <div className={`border-t border-gray-100 pt-5 space-y-4 ${className}`}>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Marketplace Filters
            </h4>

            {sortedGroups.map((group) => 
                group.isHierarchical 
                    ? renderHierarchicalFilter(group)
                    : renderFlatFilter(group)
            )}

            {filterGroups.length === 0 && !loading && (
                <div className="text-center py-4">
                    <p className="text-sm text-gray-400">No filters available</p>
                </div>
            )}
        </div>
    );
};

export default DynamicFilters;