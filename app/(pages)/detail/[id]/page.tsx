'use client';
import { AdditionalFeatures } from '@/components/details/additional-features';
import { Breadcrumb } from '@/components/details/breadcrumb';
import { CommentsSection } from '@/components/details/comment-section';
import { ContentSection } from '@/components/details/content-section';
import { MaterialHeader } from '@/components/details/material-header';
import { MaterialStats } from '@/components/details/material-stats';
import { ProgressSection } from '@/components/details/progress-section';
import { RelatedMaterials } from '@/components/details/related-materials';
import { Button } from '@/components/ui/button';
import { materials } from '@/constants/type';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DetailPage() {
    const params = useParams();
    const router = useRouter();
    const [progress, setProgress] = useState(35);

    const materialId = params.id as string;
    const material = materials.find((m) => m.id === materialId);

    if (!material) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <h1 className="text-xl lg:text-2xl font-bold mb-4">Materi Tidak Ditemukan</h1>
                    <p className="text-gray-600 mb-6">Materi yang Anda cari tidak tersedia.</p>
                    <Button onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Beranda
                    </Button>
                </div>
            </div>
        );
    }

    const relatedMaterials = materials
        .filter((m) => m.category === material.category && m.id !== material.id)
        .slice(0, 3);

    const handleStartLearning = () => {
        console.log('Memulai belajar materi:', material.id);
        setProgress(Math.min(100, progress + 20));
    };

    const handleCompleteMaterial = () => {
        setProgress(100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <main className="container mx-auto px-4 py-4 lg:py-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                    <div className="lg:w-2/3">
                        <Breadcrumb category={material.category} subject={material.subject} />
                        <MaterialHeader material={material} />
                        <ProgressSection
                            progress={progress}
                            onStartLearning={handleStartLearning}
                            onCompleteMaterial={handleCompleteMaterial}
                        />
                        <ContentSection content={material.content} />
                        <CommentsSection />
                    </div>

                    <div className="lg:w-1/3 mt-6 lg:mt-0">
                        <RelatedMaterials
                            relatedMaterials={relatedMaterials}
                        />
                        <MaterialStats material={material} />
                        <AdditionalFeatures />
                    </div>
                </div>
            </main>
        </div>
    );
}