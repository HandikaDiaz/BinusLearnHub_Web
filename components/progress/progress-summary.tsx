'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar, Target, Award } from 'lucide-react';
import { mockUser, learningProgress } from '@/constants/type';
import { useRouter } from 'next/navigation';

interface ProgressSummaryProps {
    mockUser: typeof mockUser;
    learningProgress: typeof learningProgress;
}

export default function ProgressSummary({ mockUser, learningProgress }: ProgressSummaryProps) {
    const router = useRouter();

    return (
        <Card className="sticky top-24">
            <CardHeader className="p-4 lg:p-6">
                <CardTitle className="text-lg lg:text-xl">Ringkasan Progress</CardTitle>
                <CardDescription className="text-sm">Progress belajar Anda per kategori</CardDescription>
            </CardHeader>

            <CardContent className="p-4 lg:p-6 pt-0">
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-sm font-medium">Level {mockUser.level}</p>
                            <p className="text-xs text-gray-600">Siswa Berpengalaman</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">XP: {mockUser.experience}</Badge>
                    </div>
                    <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progress ke Level {mockUser.level + 1}</span>
                            <span>{mockUser.experience}/{mockUser.nextLevelExp}</span>
                        </div>
                        <Progress
                            value={(mockUser.experience / mockUser.nextLevelExp) * 100}
                            className="h-2"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Butuh {mockUser.nextLevelExp - mockUser.experience} XP lagi untuk naik level
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Calendar className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">7 Hari</p>
                                <p className="text-xs text-gray-500">Berturut-turut</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Target className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Peringkat 15</p>
                                <p className="text-xs text-gray-500">Top 10%</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Award className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">1250 Poin</p>
                                <p className="text-xs text-gray-500">Total Poin</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <div>
                    <h3 className="font-medium text-sm lg:text-base mb-4">Progress per Kategori</h3>
                    <div className="space-y-4">
                        {['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Indonesia', 'Bahasa Inggris'].map(category => {
                            const catProgress = learningProgress.filter(p => p.category === category);
                            const completed = catProgress.filter(p => p.completed).length;
                            const total = catProgress.length;
                            const progress = total > 0 ? (completed / total) * 100 : 0;

                            return (
                                <div key={category}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium">{category}</span>
                                        <span>{completed}/{total}</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 lg:p-6 pt-0">
                <Button className="w-full" onClick={() => router.push('/achievements')}>
                    <Award className="mr-2 h-4 w-4" />
                    Lihat Prestasi
                </Button>
            </CardFooter>
        </Card>
    );
}