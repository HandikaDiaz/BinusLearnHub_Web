'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/context/filter-context';
import { X } from 'lucide-react';

export default function ActiveFilters() {
    const {
        selectedCategory,
        selectedDifficulties,
        selectedDurations,
        resetFilters,
    } = useFilter();

    const hasActiveFilters =
        selectedCategory !== 'all' ||
        selectedDifficulties.length > 0 ||
        selectedDurations.length > 0;

    if (!hasActiveFilters) return null;

    return (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Filter Aktif:</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategory !== 'all' && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                Kategori: {selectedCategory}
                            </Badge>
                        )}

                        {selectedDifficulties.map(difficulty => (
                            <Badge key={difficulty} className="bg-green-100 text-green-800 hover:bg-green-100">
                                Tingkat: {difficulty}
                            </Badge>
                        ))}

                        {selectedDurations.map(duration => (
                            <Badge key={duration} className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                {duration}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <X className="h-4 w-4 mr-1" />
                    Hapus Semua
                </Button>
            </div>
        </div>
    );
}