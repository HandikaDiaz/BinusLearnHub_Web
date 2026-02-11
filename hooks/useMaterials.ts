import { Material } from '@/constants/type';
import { useMemo } from 'react';

export const useFilteredMaterials = (
    materials: Material[],
    searchQuery: string,
    selectedCategory: string,
    selectedDifficulties: string[],
    selectedDurations: string[]
) => {
    return useMemo(() => {
        return materials.filter(material => {
            const matchesSearch = searchQuery === '' ||
                material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                material.author.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;

            const matchesDifficulty = selectedDifficulties?.length === 0 ||
                selectedDifficulties.includes(material.difficulty);

            const matchesDuration = selectedDurations?.length === 0 ||
                selectedDurations.some(duration => {
                    if (duration === '< 30 menit') return material.duration <= 30;
                    if (duration === '30-60 menit') return material.duration > 30 && material.duration <= 60;
                    if (duration === '> 60 menit') return material.duration > 60;
                    return true;
                });

            return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration;
        });
    }, [materials, searchQuery, selectedCategory, selectedDifficulties, selectedDurations]);
};

export const useSortedMaterials = (
    materials: Material[],
    sortBy: string = 'popular'
) => {
    return useMemo(() => {
        const sorted = [...materials];

        switch (sortBy) {
            case 'popular':
                return sorted.sort((a, b) => b.views - a.views);
            case 'newest':
                return sorted.sort((a, b) =>
                    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
                );
            case 'likes':
                return sorted.sort((a, b) => b.likes - a.likes);
            case 'duration':
                return sorted.sort((a, b) => a.duration - b.duration);
            case 'alphabetical':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sorted;
        }
    }, [materials, sortBy]);
};