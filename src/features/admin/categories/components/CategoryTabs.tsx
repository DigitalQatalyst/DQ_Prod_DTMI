import React from 'react';

interface CategoryTabsProps {
    filterGroups: string[];
    activeFilterGroup: string;
    onFilterGroupChange: (group: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
    filterGroups,
    activeFilterGroup,
    onFilterGroupChange
}) => {
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
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
                {filterGroups.map((group) => {
                    const isActive = group === activeFilterGroup;
                    
                    return (
                        <button
                            key={group}
                            onClick={() => onFilterGroupChange(group)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                isActive
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {groupLabels[group] || group}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default CategoryTabs;