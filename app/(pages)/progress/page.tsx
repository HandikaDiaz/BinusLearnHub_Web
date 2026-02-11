'use client';
import ProgressItem from '@/components/progress/progress-item';
import ProgressStats from '@/components/progress/progress-stats';
import ProgressSummary from '@/components/progress/progress-summary';
import ProgressTips from '@/components/progress/progress-tips';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { learningProgress, mockUser, studyStatistics } from '@/constants/type';
import { BookOpen, ChevronRight, Download, Filter, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProgressPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('all');

    const completedProgress = learningProgress.filter(p => p.completed);
    const inProgress = learningProgress.filter(p => !p.completed && p.progress > 0);
    const notStarted = learningProgress.filter(p => p.progress === 0);

    const getProgressItems = () => {
        switch (activeTab) {
            case 'completed': return completedProgress;
            case 'in-progress': return inProgress;
            case 'not-started': return notStarted;
            default: return learningProgress;
        }
    };

    const handleContinueLearning = (materialId: string) => {
        router.push(`/detail/${materialId}`);
    };

    const handleExportData = () => {
        console.log('Export progress data');
    };

    const progressItems = getProgressItems();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white container mx-auto px-4 py-4 lg:py-6">
            <div className="mb-6 lg:mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                            Progress Belajar
                        </h1>
                        <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">
                            Pantau perkembangan belajar Anda dan capai target persiapan ujian
                        </p>
                    </div>

                    <div className="mt-4 lg:mt-0 flex gap-3">
                        <Button variant="outline" className="text-sm" onClick={handleExportData}>
                            <Download className="mr-2 h-4 w-4" />
                            Ekspor
                        </Button>
                        <Button variant="outline" className="text-sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            Bagikan
                        </Button>
                    </div>
                </div>

                <ProgressStats
                    learningProgress={learningProgress}
                    studyStatistics={studyStatistics}
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                    <ProgressSummary
                        mockUser={mockUser}
                        learningProgress={learningProgress}
                    />
                </div>

                <div className="lg:w-2/3">
                    <Card>
                        <CardHeader className="p-4 lg:p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-lg lg:text-xl">Daftar Progress Belajar</CardTitle>
                                    <CardDescription className="text-sm">Kelola dan lanjutkan materi yang sedang dipelajari</CardDescription>
                                </div>

                                <Tabs defaultValue="all" className="w-full lg:w-auto">
                                    <TabsList className="grid grid-cols-4 lg:flex lg:flex-row">
                                        <TabsTrigger value="all" className="text-xs lg:text-sm" onClick={() => setActiveTab('all')}>
                                            Semua
                                        </TabsTrigger>
                                        <TabsTrigger value="completed" className="text-xs lg:text-sm" onClick={() => setActiveTab('completed')}>
                                            Selesai
                                        </TabsTrigger>
                                        <TabsTrigger value="in-progress" className="text-xs lg:text-sm" onClick={() => setActiveTab('in-progress')}>
                                            Dalam Proses
                                        </TabsTrigger>
                                        <TabsTrigger value="not-started" className="text-xs lg:text-sm" onClick={() => setActiveTab('not-started')}>
                                            Belum Dimulai
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </CardHeader>

                        <CardContent className="p-4 lg:p-6 pt-0">
                            <div className="lg:hidden mb-4">
                                <div className="flex items-center justify-between">
                                    <Button variant="outline" size="sm" className="text-xs">
                                        <Filter className="mr-2 h-3 w-3" />
                                        Filter
                                    </Button>
                                    <p className="text-xs text-gray-500">
                                        {progressItems.length} materi ditemukan
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {progressItems.map((progress) => (
                                    <ProgressItem
                                        key={progress.id}
                                        progress={progress}
                                        onContinueLearning={handleContinueLearning}
                                    />
                                ))}

                                {progressItems.length === 0 && (
                                    <div className="text-center py-8 lg:py-12">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                            <BookOpen className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg lg:text-xl font-medium mb-2">
                                            Tidak ada materi {activeTab === 'completed' ? 'yang selesai' :
                                                activeTab === 'in-progress' ? 'dalam proses' :
                                                    'yang belum dimulai'}
                                        </h3>
                                        <p className="text-gray-500 text-sm lg:text-base mb-6">
                                            {activeTab === 'completed' ?
                                                'Mulailah belajar materi untuk menyelesaikan pertama Anda!' :
                                                activeTab === 'in-progress' ?
                                                    'Semua materi sudah selesai atau belum dimulai' :
                                                    'Semua materi sudah dimulai'}
                                        </p>
                                        <Button onClick={() => router.push('/')}>
                                            <ChevronRight className="mr-2 h-4 w-4" />
                                            Jelajahi Materi
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 lg:p-6 pt-0">
                            <div className="w-full text-center">
                                <p className="text-sm text-gray-600">
                                    Menampilkan {progressItems.length} dari {learningProgress.length} materi
                                </p>
                            </div>
                        </CardFooter>
                    </Card>

                    <ProgressTips />
                </div>
            </div>
        </div>
    );
}