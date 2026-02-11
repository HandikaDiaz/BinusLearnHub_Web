'use client';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { materials } from '@/constants/type';

interface RelatedMaterialsProps {
    relatedMaterials: typeof materials;
}

export function RelatedMaterials({ relatedMaterials }: RelatedMaterialsProps) {
    const router = useRouter();

    return (
        <div className="bg-white rounded-xl lg:rounded-2xl border p-4 lg:p-6 mb-4 lg:mb-6">
            <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 flex items-center">
                <BookOpen className="mr-2 h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                Materi Terkait
            </h3>

            <div className="space-y-3 lg:space-y-4">
                {relatedMaterials.map((material) => (
                    <div
                        key={material.id}
                        className="p-3 border rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => router.push(`/detail/${material.id}`)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className="text-xs">
                                {material.category}
                            </Badge>
                            <Clock className="h-3 w-3 text-gray-400" />
                        </div>
                        <h4 className="font-medium text-sm line-clamp-2 mb-2">{material.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{material.duration} menit</span>
                            <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{material.views.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {relatedMaterials.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-4">Tidak ada materi terkait</p>
            )}
        </div>
    );
}