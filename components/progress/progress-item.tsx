'use client';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, BarChart3, Calendar, BookOpen, PlayCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProgressItemProps {
    progress: {
        id: string;
        materialId: string;
        materialTitle: string;
        category: string;
        progress: number;
        completed: boolean;
        timeSpent: number;
        quizScore?: number;
        lastAccessed: Date;
        completionDate?: Date;
    };
    onContinueLearning: (materialId: string) => void;
}

export default function ProgressItem({ progress, onContinueLearning }: ProgressItemProps) {
    const router = useRouter();

    return (
        <div className="p-4 border rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-lg lg:text-xl font-bold">{progress.progress}%</span>
                                <div className="text-xs text-gray-500">
                                    {progress.completed ? 'Selesai' : 'Progress'}
                                </div>
                            </div>
                        </div>
                        <svg className="w-16 h-16 transform -rotate-90">
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                className="text-gray-200"
                            />
                            <circle
                                cx="32"
                                cy="32"
                                r="28"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress.progress / 100)}`}
                                className="text-blue-600"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                    {progress.category}
                                </Badge>
                                {progress.completed && (
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Selesai
                                    </Badge>
                                )}
                            </div>
                            <h3 className="font-semibold text-sm lg:text-base truncate">
                                {progress.materialTitle}
                            </h3>
                        </div>

                        <div className="text-xs lg:text-sm text-gray-500">
                            {progress.lastAccessed.toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
                            <span className="text-xs lg:text-sm">{progress.timeSpent} menit</span>
                        </div>

                        {progress.quizScore !== undefined && (
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
                                <span className="text-xs lg:text-sm">Nilai: {progress.quizScore}</span>
                            </div>
                        )}

                        {progress.completionDate && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3 lg:h-4 lg:w-4 text-gray-400" />
                                <span className="text-xs lg:text-sm">
                                    {progress.completionDate.toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress Belajar</span>
                            <span>{progress.progress}%</span>
                        </div>
                        <Progress value={progress.progress} className="h-2" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        {!progress.completed ? (
                            <>
                                <Button
                                    size="sm"
                                    className="text-xs lg:text-sm"
                                    onClick={() => onContinueLearning(progress.materialId)}
                                >
                                    <PlayCircle className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                                    {progress.progress > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
                                </Button>

                                {progress.progress > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs lg:text-sm"
                                        onClick={() => router.push(`/detail/${progress.materialId}`)}
                                    >
                                        <RefreshCw className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                                        Ulangi Materi
                                    </Button>
                                )}
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs lg:text-sm"
                                    onClick={() => router.push(`/detail/${progress.materialId}`)}
                                >
                                    <BookOpen className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                                    Review Materi
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs lg:text-sm"
                                >
                                    <BarChart3 className="mr-2 h-3 w-3 lg:h-4 lg:w-4" />
                                    Lihat Nilai
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}