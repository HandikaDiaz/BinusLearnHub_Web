'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import { materials } from '@/constants/type';

interface MaterialHeaderProps {
    material: typeof materials[0];
}

export function MaterialHeader({ material }: MaterialHeaderProps) {
    return (
        <div className="mb-6 lg:mb-8">
            <div className="flex flex-wrap gap-2 mb-3 lg:mb-4">
                <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs lg:text-sm">
                    {material.category}
                </Badge>
                <Badge
                    variant={
                        material.difficulty === 'Pemula'
                            ? 'default'
                            : material.difficulty === 'Menengah'
                                ? 'secondary'
                                : 'destructive'
                    }
                    className="text-xs lg:text-sm"
                >
                    {material.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs lg:text-sm">
                    <Clock className="mr-1 h-3 w-3" />
                    {material.duration} menit
                </Badge>
            </div>

            <h1 className="text-xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                {material.title}
            </h1>

            <p className="text-gray-600 text-sm lg:text-lg mb-4 lg:mb-6">
                {material.description}
            </p>

            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4 lg:mb-6">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{material.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-sm lg:text-base">{material.author}</p>
                        <p className="text-xs text-gray-500">Pengajar</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 lg:gap-4 text-xs lg:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{material.views.toLocaleString()} dilihat</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>{material.likes} suka</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span>24 komentar</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 lg:mb-8">
                {material.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs lg:text-sm">
                        #{tag}
                    </Badge>
                ))}
            </div>
        </div>
    );
}