'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Material } from '@/constants/type';
import { Bookmark, BookOpen, Clock, Eye, Star } from 'lucide-react';
import Link from 'next/link';

interface MaterialCardProps {
    material: Material;
    isBookmarked: boolean;
    onBookmarkToggle: (materialId: string) => void;
    viewMode?: 'grid' | 'list';
}

export default function MaterialCard({
    material,
    isBookmarked,
    onBookmarkToggle,
    viewMode = 'grid'
}: MaterialCardProps) {
    const getDifficultyBadgeColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Pemula': return 'default';
            case 'Menengah': return 'secondary';
            case 'Lanjutan': return 'destructive';
            default: return 'outline';
        }
    };

    if (viewMode === 'list') {
        return (
            <Link href={`/detail/${material.id}`}>
                <div className="p-4 lg:p-6 border rounded-xl hover:border-blue-300 hover:shadow-sm cursor-pointer group">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="lg:w-1/4">
                            <div className="aspect-video lg:aspect-auto lg:h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <BookOpen className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <Badge variant={getDifficultyBadgeColor(material.difficulty)}>
                                        {material.difficulty}
                                    </Badge>
                                    <div className="mt-2 text-xs text-gray-600">
                                        {material.duration} menit
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/4">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className="text-xs">
                                            {material.category}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                            {material.subject}
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-semibold mb-2">
                                        {material.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm lg:text-base mb-4">
                                        {material.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onBookmarkToggle(material.id);
                                        }}
                                    >
                                        <Bookmark
                                            className={`h-4 w-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`}
                                        />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {material.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 lg:mb-0">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback>{material.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{material.author}</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            <span>{(material.views / 1000).toFixed(1)}K dilihat</span>
                                        </div>

                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span>{material.likes} suka</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/detail/${material.id}`;
                                    }}
                                >
                                    Pelajari Materi
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/detail/${material.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="p-4 lg:p-6 h-50">
                    <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs">
                            {material.category}
                        </Badge>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                                e.preventDefault();
                                onBookmarkToggle(material.id);
                            }}
                        >
                            <Bookmark
                                className={`h-4 w-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`}
                            />
                        </Button>
                    </div>

                    <CardTitle className="text-sm lg:text-lg line-clamp-2 mt-3">
                        {material.title}
                    </CardTitle>

                    <CardDescription className="line-clamp-2 text-xs lg:text-sm mt-2">
                        {material.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-4 lg:p-6 pt-0">
                    <div className="flex flex-wrap gap-1 lg:gap-2 mb-4">
                        {material.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                            </Badge>
                        ))}
                        {material.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                                +{material.tags.length - 3}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-xs lg:text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                                <span>{material.duration} mnt</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                                <span>{(material.views / 1000).toFixed(1)}K</span>
                            </div>
                        </div>

                        <Badge variant={getDifficultyBadgeColor(material.difficulty)}>
                            {material.difficulty}
                        </Badge>
                    </div>
                </CardContent>

                <CardFooter className="p-4 lg:p-6 border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback>{material.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs lg:text-sm">{material.author.split(',')[0]}</span>
                        </div>

                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-3 w-3 lg:h-4 lg:w-4 fill-current" />
                            <span className="text-xs lg:text-sm font-medium">{material.likes}</span>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}