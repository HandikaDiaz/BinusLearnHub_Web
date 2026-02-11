'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Star, MessageCircle, Download } from 'lucide-react';

export function AdditionalFeatures() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl border border-blue-100 p-4 lg:p-6">
            <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4">Fitur Lainnya</h3>

            <div className="space-y-2 lg:space-y-3">
                <Button variant="outline" className="w-full justify-start text-sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Unduh Materi PDF
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm">
                    <Star className="mr-2 h-4 w-4" />
                    Latihan Soal
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Diskusi dengan Pengajar
                </Button>

                <Button variant="outline" className="w-full justify-start text-sm">
                    <Download className="mr-2 h-4 w-4" />
                    Kumpulan Soal Tambahan
                </Button>
            </div>

            <Separator className="my-4 lg:my-6" />

            <div className="text-center">
                <p className="text-xs lg:text-sm text-gray-600 mb-3">
                    Bagikan materi ini kepada teman Anda
                </p>
                <div className="flex justify-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <span className="text-blue-600 font-bold text-sm">f</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <span className="text-blue-400 font-bold text-sm">t</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <span className="text-green-600 font-bold text-sm">in</span>
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <span className="text-red-500 font-bold text-base">📌</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}