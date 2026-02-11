import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, BarChart3, Award } from 'lucide-react';

export default function ProgressTips() {
    const tips = [
        {
            title: 'Tetapkan Target Harian',
            description: 'Sisihkan minimal 60 menit per hari untuk belajar materi baru atau mengulang.',
            icon: Target,
            iconColor: 'text-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
            borderColor: 'border-blue-200'
        },
        {
            title: 'Review Mingguan',
            description: 'Setiap akhir minggu, review materi yang sudah dipelajari untuk memperkuat pemahaman.',
            icon: BarChart3,
            iconColor: 'text-green-600',
            bgGradient: 'from-green-50 to-green-100',
            borderColor: 'border-green-200'
        },
        {
            title: 'Ikuti Kuis',
            description: 'Selesaikan kuis setelah setiap materi untuk menguji pemahaman dan dapatkan poin XP.',
            icon: Award,
            iconColor: 'text-purple-600',
            bgGradient: 'from-purple-50 to-purple-100',
            borderColor: 'border-purple-200'
        }
    ];

    return (
        <Card>
            <CardHeader className="p-4 lg:p-6">
                <CardTitle className="text-lg lg:text-xl">Tips Meningkatkan Progress</CardTitle>
                <CardDescription className="text-sm">Raih progress optimal dengan tips berikut</CardDescription>
            </CardHeader>

            <CardContent className="p-4 lg:p-6 pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {tips.map((tip, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-gradient-to-br ${tip.bgGradient} rounded-xl border ${tip.borderColor}`}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white rounded-lg">
                                    <tip.icon className={`h-5 w-5 ${tip.iconColor}`} />
                                </div>
                                <h4 className="font-semibold text-sm lg:text-base">{tip.title}</h4>
                            </div>
                            <p className="text-xs lg:text-sm text-gray-700">
                                {tip.description}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}