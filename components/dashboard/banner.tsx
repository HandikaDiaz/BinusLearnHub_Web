import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/authStore';
import { ChevronRight } from 'lucide-react';

interface WelcomeBannerProps {
    onContinueLearning?: () => void;
}

export default function WelcomeBanner({ onContinueLearning }: WelcomeBannerProps) {
    const { user } = useAuth();
    return (
        <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl border border-blue-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div>
                    <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
                        Selamat belajar, <span className="text-blue-600">{user?.name}!</span>
                    </h1>
                    <p className="text-gray-600 mt-1 lg:mt-2 text-sm lg:text-base">
                        Siap hadapi ujian akhir dengan materi terbaik dari pengajar berpengalaman.
                    </p>
                </div>
                <div className="mt-3 lg:mt-0">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-sm lg:text-base"
                        onClick={onContinueLearning}
                    >
                        Lanjutkan Belajar
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}