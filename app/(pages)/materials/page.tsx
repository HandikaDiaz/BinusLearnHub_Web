'use client';
import ActiveFilters from '@/components/materials/active-filter';
import CategorySidebar from '@/components/materials/category-sidebar';
import TabsSection from '@/components/materials/tab-section';
import { materials } from '@/constants/type';
import { useFilter } from '@/context/filter-context';
import { useSearch } from '@/context/search-context';
import { useFilteredMaterials, useSortedMaterials } from '@/hooks/useMaterials';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MaterialsPage() {
    const router = useRouter();
    const { searchQuery } = useSearch();
    const {
        selectedCategory,
        selectedDifficulties,
        selectedDurations,
        sortBy,
        resetFilters
    } = useFilter();

    const [bookmarkedMaterials, setBookmarkedMaterials] = useState<string[]>(
        materials.filter(m => m.isBookmarked).map(m => m.id)
    );

    const filteredMaterials = useFilteredMaterials(
        materials,
        searchQuery,
        selectedCategory,
        selectedDifficulties,
        selectedDurations
    );

    const sortedMaterials = useSortedMaterials(filteredMaterials, sortBy);

    const handleBookmarkToggle = (materialId: string) => {
        setBookmarkedMaterials(prev =>
            prev.includes(materialId)
                ? prev.filter(id => id !== materialId)
                : [...prev, materialId]
        );
    };

    const handleMaterialClick = (materialId: string) => {
        router.push(`/detail/${materialId}`);
    };

    const handleResetSearch = () => {
        resetFilters();
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                    Koleksi Materi Pembelajaran
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                    Temukan {materials.length}+ materi pembelajaran untuk persiapan ujian akhir
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs lg:text-sm text-gray-600">Total Materi</p>
                            <p className="text-xl lg:text-2xl font-bold text-blue-700">{materials.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs lg:text-sm text-gray-600">Kategori</p>
                            <p className="text-xl lg:text-2xl font-bold text-green-700">8</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs lg:text-sm text-gray-600">Total Durasi</p>
                            <p className="text-xl lg:text-2xl font-bold text-amber-700">
                                {Math.floor(materials.reduce((sum, m) => sum + m.duration, 0) / 60)} jam
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs lg:text-sm text-gray-600">Total Dilihat</p>
                            <p className="text-xl lg:text-2xl font-bold text-purple-700">
                                {(materials.reduce((sum, m) => sum + m.views, 0) / 1000).toFixed(1)}K
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ActiveFilters />

            <div className="flex flex-col lg:flex-row gap-6">
                <CategorySidebar
                    bookmarkedIds={bookmarkedMaterials}
                    onMaterialClick={handleMaterialClick}
                />

                <div className="lg:w-3/4">
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                                <h3 className="font-medium text-sm lg:text-base mb-2">Hasil Pencarian</h3>
                                <p className="text-xs lg:text-sm text-gray-600">
                                    {filteredMaterials.length} materi ditemukan berdasarkan filter Anda
                                </p>
                            </div>

                            <div className="text-sm text-gray-600">
                                Urutkan berdasarkan: {sortBy === 'popular' ? 'Populer' :
                                    sortBy === 'newest' ? 'Terbaru' :
                                        sortBy === 'likes' ? 'Paling Disukai' :
                                            sortBy === 'duration' ? 'Durasi Terpendek' : 'Abjad'}
                            </div>
                        </div>
                    </div>

                    <TabsSection
                        materials={sortedMaterials}
                        bookmarkedIds={bookmarkedMaterials}
                        onBookmarkToggle={handleBookmarkToggle}
                        onResetSearch={handleResetSearch}
                    />

                    <div className="mt-8">
                        <h3 className="text-lg lg:text-xl font-bold mb-4">Kategori Populer</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                                { name: 'Matematika', icon: '📐', count: 24, color: 'from-blue-50 to-blue-100 border-blue-200' },
                                { name: 'Fisika', icon: '⚛️', count: 18, color: 'from-green-50 to-green-100 border-green-200' },
                                { name: 'Kimia', icon: '🧪', count: 15, color: 'from-purple-50 to-purple-100 border-purple-200' },
                                { name: 'Biologi', icon: '🧬', count: 22, color: 'from-amber-50 to-amber-100 border-amber-200' },
                            ].map(category => (
                                <div
                                    key={category.name}
                                    className={`p-4 rounded-xl border bg-gradient-to-br ${category.color} cursor-pointer hover:shadow-md transition-shadow`}
                                    onClick={() => {
                                        resetFilters();
                                    }}
                                >
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">{category.icon}</div>
                                        <h4 className="font-medium text-sm">{category.name}</h4>
                                        <p className="text-xs text-gray-600 mt-1">{category.count} materi</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}