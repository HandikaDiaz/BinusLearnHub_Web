import { categories } from '@/constants/type';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-8 lg:mt-12 border-t bg-gray-50">
            <div className="container mx-auto px-4 py-6 lg:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                            <h3 className="text-lg lg:text-xl font-bold text-blue-600">BINUSLearnHub</h3>
                        </div>
                        <p className="text-gray-600 text-xs lg:text-sm">
                            Platform pembelajaran untuk persiapan ujian akhir siswa SMA kelas 12.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Kategori</h4>
                        <ul className="space-y-2 text-xs lg:text-sm text-gray-600">
                            {categories.slice(0, 4).map(category => (
                                <li key={category.id}>{category.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Tautan Cepat</h4>
                        <ul className="space-y-2 text-xs lg:text-sm text-gray-600">
                            <li><Link href="/" className="hover:text-blue-600">Beranda</Link></li>
                            <li><Link href="/materials" className="hover:text-blue-600">Materi</Link></li>
                            <li><Link href="/progress" className="hover:text-blue-600">Progress Belajar</Link></li>
                            <li><Link href="/achievements" className="hover:text-blue-600">Prestasi</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Kontak</h4>
                        <ul className="space-y-2 text-xs lg:text-sm text-gray-600">
                            <li>Email: support@BINUSLearnHub.com</li>
                            <li>Telepon: (021) 1234-5678</li>
                            <li>Jam Operasional: 08:00 - 17:00</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t text-center text-xs lg:text-sm text-gray-500">
                    <p>© 2026 BINUSLearnHub. Semua hak dilindungi undang-undang.</p>
                </div>
            </div>
        </footer>
    );
}