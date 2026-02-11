'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { learningProgress, studyStatistics } from '@/constants/type';

interface ProgressStatsProps {
    learningProgress: typeof learningProgress;
    studyStatistics: typeof studyStatistics;
}

export default function ProgressStats({ learningProgress, studyStatistics }: ProgressStatsProps) {
    const totalMaterials = learningProgress.length;
    const totalCompleted = learningProgress.filter(p => p.completed).length;
    const totalInProgress = learningProgress.filter(p => !p.completed && p.progress > 0).length;
    const totalTimeSpent = learningProgress.reduce((sum, p) => sum + p.timeSpent, 0);
    const averageProgress = learningProgress.reduce((sum, p) => sum + p.progress, 0) / totalMaterials;

    const stats = [
        {
            title: 'Progress Rata-rata',
            value: `${averageProgress.toFixed(0)}%`,
            icon: TrendingUp,
            iconColor: 'text-blue-500',
            progress: averageProgress,
            subtitle: null
        },
        {
            title: 'Materi Selesai',
            value: `${totalCompleted}/${totalMaterials}`,
            icon: CheckCircle,
            iconColor: 'text-green-500',
            progress: null,
            subtitle: `${totalInProgress} dalam proses`
        },
        {
            title: 'Total Waktu Belajar',
            value: `${Math.floor(totalTimeSpent / 60)} jam`,
            icon: Clock,
            iconColor: 'text-orange-500',
            progress: null,
            subtitle: `${totalTimeSpent % 60} menit`
        },
        {
            title: 'Rata-rata Nilai Kuis',
            value: studyStatistics.averageQuizScore,
            icon: BarChart3,
            iconColor: 'text-purple-500',
            progress: null,
            subtitle: 'Dari 100 poin'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="p-4 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs lg:text-sm text-gray-500">{stat.title}</p>
                                <p className="text-xl lg:text-2xl font-bold">{stat.value}</p>
                            </div>
                            <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.iconColor}`} />
                        </div>
                        {stat.progress !== null && (
                            <Progress value={stat.progress} className="mt-3 h-2" />
                        )}
                        {stat.subtitle && (
                            <div className="mt-3 text-xs lg:text-sm">
                                <span className="text-gray-600">{stat.subtitle}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}