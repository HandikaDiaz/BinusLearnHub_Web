import { BookOpen, Clock, TrendingUp } from 'lucide-react';

export default function StatsCards() {
    const stats = [
        {
            title: 'Materi Dipelajari',
            value: '12',
            icon: BookOpen,
            color: 'text-blue-500',
            bgColor: 'text-blue-500',
        },
        {
            title: 'Progress Belajar',
            value: '68%',
            icon: TrendingUp,
            color: 'text-green-500',
            bgColor: 'text-green-500',
        },
        {
            title: 'Hari Menuju Ujian',
            value: '45',
            icon: Clock,
            color: 'text-orange-500',
            bgColor: 'text-orange-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mt-4 lg:mt-6">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-3 lg:p-4 rounded-lg lg:rounded-xl border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs lg:text-sm text-gray-500">{stat.title}</p>
                            <p className="text-xl lg:text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${stat.color}`} />
                    </div>
                </div>
            ))}
        </div>
    );
}