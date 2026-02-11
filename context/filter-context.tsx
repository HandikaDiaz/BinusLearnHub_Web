'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;

    selectedDifficulties: string[];
    setSelectedDifficulties: (difficulties: string[]) => void;

    selectedDurations: string[];
    setSelectedDurations: (durations: string[]) => void;

    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;

    sortBy: string;
    setSortBy: (sort: string) => void;

    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;

    resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedDifficulties([]);
        setSelectedDurations([]);
        setSelectedTags([]);
        setSortBy('popular');
        setViewMode('grid');
    };

    return (
        <FilterContext.Provider value={{
            selectedCategory,
            setSelectedCategory,
            selectedDifficulties,
            setSelectedDifficulties,
            selectedDurations,
            setSelectedDurations,
            selectedTags,
            setSelectedTags,
            sortBy,
            setSortBy,
            viewMode,
            setViewMode,
            resetFilters,
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
};