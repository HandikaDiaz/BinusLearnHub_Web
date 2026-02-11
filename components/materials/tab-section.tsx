'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Material } from '@/constants/type';
import MaterialGrid from './material-grid';

interface TabsSectionProps {
    materials: Material[];
    bookmarkedIds: string[];
    onBookmarkToggle: (materialId: string) => void;
    onResetSearch?: () => void;
}

export default function TabsSection({
    materials,
    bookmarkedIds,
    onBookmarkToggle,
    onResetSearch
}: TabsSectionProps) {
    const popularMaterials = [...materials]
        .sort((a, b) => b.views - a.views)
        .slice(0, 9);

    const newestMaterials = [...materials]
        .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
        .slice(0, 9);

    const recommendedMaterials = [...materials]
        .filter(m => m.difficulty === 'Menengah' || m.difficulty === 'Pemula')
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 9);

    return (
        <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 gap-3">
                <TabsList className="w-full sm:w-auto grid grid-cols-2 lg:flex lg:flex-row">
                    <TabsTrigger value="all" className="text-xs lg:text-sm">
                        Semua
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="text-xs lg:text-sm">
                        Populer
                    </TabsTrigger>
                    <TabsTrigger value="new" className="text-xs lg:text-sm">
                        Terbaru
                    </TabsTrigger>
                    <TabsTrigger value="recommended" className="text-xs lg:text-sm">
                        Rekomendasi
                    </TabsTrigger>
                </TabsList>

                <div className="text-xs lg:text-sm text-gray-500">
                    Menampilkan {materials.length} materi
                </div>
            </div>

            <TabsContent value="all" className="mt-0">
                <MaterialGrid
                    materials={materials}
                    bookmarkedIds={bookmarkedIds}
                    onBookmarkToggle={onBookmarkToggle}
                    onEmptyState={onResetSearch}
                />
            </TabsContent>

            <TabsContent value="popular" className="mt-0">
                <MaterialGrid
                    materials={popularMaterials}
                    bookmarkedIds={bookmarkedIds}
                    onBookmarkToggle={onBookmarkToggle}
                    onEmptyState={onResetSearch}
                />
            </TabsContent>

            <TabsContent value="new" className="mt-0">
                <MaterialGrid
                    materials={newestMaterials}
                    bookmarkedIds={bookmarkedIds}
                    onBookmarkToggle={onBookmarkToggle}
                    onEmptyState={onResetSearch}
                />
            </TabsContent>

            <TabsContent value="recommended" className="mt-0">
                <MaterialGrid
                    materials={recommendedMaterials}
                    bookmarkedIds={bookmarkedIds}
                    onBookmarkToggle={onBookmarkToggle}
                    onEmptyState={onResetSearch}
                />
            </TabsContent>
        </Tabs>
    );
}