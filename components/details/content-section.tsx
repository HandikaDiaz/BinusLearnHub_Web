'use client';
import { Button } from '@/components/ui/button';
import { FileText, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ContentSectionProps {
    content: string;
}

export function ContentSection({ content }: ContentSectionProps) {
    const [showFullContent, setShowFullContent] = useState(false);

    return (
        <div className="bg-white rounded-xl lg:rounded-2xl border p-4 lg:p-6 mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg lg:text-2xl font-bold">Isi Materi</h2>
                <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500">
                    <FileText className="h-4 w-4" />
                    <span>8 Bagian</span>
                </div>
            </div>

            <div className="prose prose-sm lg:prose-base max-w-none">
                <div
                    className={`${!showFullContent
                            ? 'max-h-[300px] lg:max-h-[400px] overflow-hidden relative'
                            : ''
                        }`}
                >
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />

                    {!showFullContent && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                    )}
                </div>

                {!showFullContent && (
                    <div className="text-center mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowFullContent(true)}
                            className="text-sm"
                        >
                            Tampilkan Selengkapnya
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}

                {showFullContent && (
                    <div className="text-center mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowFullContent(false)}
                            className="text-sm"
                        >
                            Sembunyikan
                            <ChevronDown className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}