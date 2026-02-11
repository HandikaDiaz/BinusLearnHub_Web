'use client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, CheckCircle } from 'lucide-react';

interface ProgressSectionProps {
    progress: number;
    onStartLearning: () => void;
    onCompleteMaterial: () => void;
}

export function ProgressSection({
    progress,
    onStartLearning,
    onCompleteMaterial,
}: ProgressSectionProps) {
    return (
        <div className="bg-blue-50 p-4 lg:p-6 rounded-xl lg:rounded-2xl mb-6 lg:mb-8 border border-blue-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 lg:mb-4">
                <div>
                    <h3 className="font-semibold text-base lg:text-lg mb-1">Progress Belajar</h3>
                    <p className="text-gray-600 text-xs lg:text-sm">
                        Anda telah menyelesaikan {progress}% dari materi ini
                    </p>
                </div>
                <div className="mt-2 lg:mt-0">
                    <span className="text-xl lg:text-2xl font-bold text-blue-600">{progress}%</span>
                </div>
            </div>

            <Progress value={progress} className="h-2 mb-4" />

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    className="bg-blue-600 hover:bg-blue-700 flex-1 text-sm lg:text-base"
                    onClick={onStartLearning}
                >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {progress === 0 ? 'Mulai Belajar' : 'Lanjutkan Belajar'}
                </Button>

                {progress < 100 ? (
                    <Button variant="outline" onClick={onCompleteMaterial} className="text-sm lg:text-base">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Tandai Selesai
                    </Button>
                ) : (
                    <Button variant="outline" disabled className="text-sm lg:text-base">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Telah Diselesaikan
                    </Button>
                )}
            </div>
        </div>
    );
}