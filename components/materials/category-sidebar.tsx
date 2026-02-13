'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { categories, materials } from '@/constants/type';
import { useFilter } from '@/context/filter-context';
import { BookOpen, Bookmark, ChevronDown, Filter, X } from 'lucide-react';
import { useState } from 'react';

interface CategorySidebarProps {
    bookmarkedIds: string[];
    onMaterialClick: (materialId: string) => void;
}

export default function CategorySidebar({
    bookmarkedIds,
    onMaterialClick
}: CategorySidebarProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {
        selectedCategory,
        setSelectedCategory,
        selectedDifficulties,
        setSelectedDifficulties,
        selectedDurations,
        setSelectedDurations,
        resetFilters,
    } = useFilter();

    const bookmarkedMaterials = materials.filter(m => bookmarkedIds.includes(m.id));

    const handleDifficultyToggle = (difficulty: string) => {
        if (selectedDifficulties.includes(difficulty)) {
            setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty));
        } else {
            setSelectedDifficulties([...selectedDifficulties, difficulty]);
        }
    };

    const handleDurationToggle = (duration: string) => {
        if (selectedDurations.includes(duration)) {
            setSelectedDurations(selectedDurations.filter(d => d !== duration));
        } else {
            setSelectedDurations([...selectedDurations, duration]);
        }
    };

    const applyFilters = () => {
        setIsFilterOpen(false);
    };

    return (
        <div className="lg:w-1/4">
            <Button
                variant="outline"
                className="w-full lg:hidden mb-4"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <Filter className="mr-2 h-4 w-4" />
                Filter & Kategori
                <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>

            <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
                <Card>
                    <CardHeader className="p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base lg:text-lg">Filter</CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetFilters}
                                className="text-xs text-blue-600 hover:text-blue-700"
                            >
                                <X className="h-3 w-3 mr-1" />
                                Reset
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0 space-y-6">
                        <div>
                            <h3 className="font-medium text-sm lg:text-base mb-3">Kategori</h3>
                            <div className="space-y-2">
                                <Button
                                    variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                                    className="w-full justify-start text-sm"
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Semua Materi
                                    <Badge className="ml-auto">{materials.length}</Badge>
                                </Button>

                                {categories.slice(0, 6).map((category) => (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.name ? 'default' : 'ghost'}
                                        className="w-full justify-start text-sm"
                                        onClick={() => setSelectedCategory(category.name)}
                                    >
                                        <span className="mr-2">{category.icon}</span>
                                        {category.name}
                                        <Badge className="ml-auto">{category.count}</Badge>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Difficulty Filter */}
                        <div>
                            <h3 className="font-medium text-sm lg:text-base mb-3">Tingkat Kesulitan</h3>
                            <div className="space-y-2">
                                {['Pemula', 'Menengah', 'Lanjutan'].map((level) => (
                                    <div key={level} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`level-${level}`}
                                            className="mr-2 h-4 w-4"
                                            checked={selectedDifficulties.includes(level)}
                                            onChange={() => handleDifficultyToggle(level)}
                                        />
                                        <label htmlFor={`level-${level}`} className="text-sm">{level}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        {/* Duration Filter */}
                        <div>
                            <h3 className="font-medium text-sm lg:text-base mb-3">Durasi</h3>
                            <div className="space-y-2">
                                {['< 30 menit', '30-60 menit', '> 60 menit'].map((duration) => (
                                    <div key={duration} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`duration-${duration}`}
                                            className="mr-2 h-4 w-4"
                                            checked={selectedDurations.includes(duration)}
                                            onChange={() => handleDurationToggle(duration)}
                                        />
                                        <label htmlFor={`duration-${duration}`} className="text-sm">{duration}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 lg:p-6 pt-0">
                        <Button
                            variant="outline"
                            className="w-full text-sm"
                            onClick={applyFilters}
                        >
                            <Filter className="mr-2 h-4 w-4" />
                            Terapkan Filter
                        </Button>
                    </CardFooter>
                </Card>

                {/* Bookmarks */}
                <Card>
                    <CardHeader className="p-4 lg:p-6">
                        <CardTitle className="flex items-center text-base lg:text-lg">
                            <Bookmark className="mr-2 h-4 w-4 text-blue-500" />
                            Bookmark Saya
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 lg:p-6 pt-0">
                        {bookmarkedMaterials.length > 0 ? (
                            <div className="space-y-3">
                                {bookmarkedMaterials.slice(0, 3).map(material => (
                                    <div
                                        key={material.id}
                                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                        onClick={() => onMaterialClick(material.id)}
                                    >
                                        <p className="font-medium text-sm truncate">{material.title}</p>
                                        <p className="text-xs text-gray-500 mt-1">{material.category}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 text-center py-4">
                                Belum ada materi yang dibookmark
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}