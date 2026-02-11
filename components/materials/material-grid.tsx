'use client';

import { Button } from '@/components/ui/button';
import { Material } from '@/constants/type';
import { Grid, List, Search } from 'lucide-react';
import { useState } from 'react';
import MaterialCard from './material-card';

interface MaterialGridProps {
    materials: Material[];
    bookmarkedIds: string[];
    onBookmarkToggle: (materialId: string) => void;
    onEmptyState?: () => void;
}

export default function MaterialGrid({
    materials,
    bookmarkedIds,
    onBookmarkToggle,
    onEmptyState
}: MaterialGridProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    if (materials.length === 0) {
        return (
            <div className="text-center py-8 lg:py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-medium mb-2">
                    Tidak ada materi yang ditemukan
                </h3>
                <p className="text-gray-500 text-sm lg:text-base mb-6 max-w-md mx-auto">
                    Coba ubah kata kunci pencarian atau filter yang Anda gunakan untuk menemukan materi yang sesuai.
                </p>
                {onEmptyState && (
                    <Button onClick={onEmptyState}>
                        Reset Pencarian
                    </Button>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className="text-sm text-gray-600">
                    Menampilkan {materials.length} materi
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 hidden lg:block">Tampilan:</span>
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('grid')}
                        className="h-8 w-8"
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('list')}
                        className="h-8 w-8"
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {materials.map((material) => (
                        <MaterialCard
                            key={material.id}
                            material={material}
                            isBookmarked={bookmarkedIds.includes(material.id)}
                            onBookmarkToggle={onBookmarkToggle}
                            viewMode="grid"
                        />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {materials.map((material) => (
                        <MaterialCard
                            key={material.id}
                            material={material}
                            isBookmarked={bookmarkedIds.includes(material.id)}
                            onBookmarkToggle={onBookmarkToggle}
                            viewMode="list"
                        />
                    ))}
                </div>
            )}
        </>
    );
}