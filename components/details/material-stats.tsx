'use client';
import { BarChart3 } from 'lucide-react';

interface MaterialStatsProps {
    material: {
        likes: number;
        publishedDate: Date;
    };
}

export function MaterialStats({ material }: MaterialStatsProps) {
    return (
        <div className="bg-white rounded-xl lg:rounded-2xl border p-4 lg:p-6 mb-4 lg:mb-6">
            <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                Statistik Materi
            </h3>

            <div className="space-y-3 lg:space-y-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tingkat Penyelesaian</span>
                    <span className="font-semibold">78%</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rata-rata Nilai Kuis</span>
                    <span className="font-semibold">8.5/10</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Siswa yang Menyukai</span>
                    <span className="font-semibold">{material.likes.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Diunggah Pada</span>
                    <span className="font-semibold">
                        {material.publishedDate.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}