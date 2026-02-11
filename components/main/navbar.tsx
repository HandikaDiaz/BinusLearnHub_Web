'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSearch } from '@/context/search-context';
import { useAuth } from '@/store/authStore';
import {
    Award,
    BookOpen,
    GraduationCap,
    Home,
    LogOut,
    Menu,
    Search,
    TrendingUp,
    X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface NavbarProps {
    showSearch?: boolean;
}

export default function Navbar({ showSearch = true }: NavbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { searchQuery, setSearchQuery } = useSearch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>

                        <Link href="/" className="flex items-center gap-2">
                            <BookOpen className="h-7 w-7 lg:h-8 lg:w-8 text-blue-600" />
                            <div className="hidden sm:block">
                                <h1 className="text-lg lg:text-xl font-bold text-blue-600">BINUSLearnHub</h1>
                                <p className="text-xs text-gray-500 hidden lg:block">Platform Persiapan Ujian</p>
                            </div>
                        </Link>

                        <nav className="hidden lg:flex ml-6 space-x-6">
                            <Link
                                href="/"
                                className={`flex items-center gap-2 ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                            >
                                <Home className="h-4 w-4" />
                                Beranda
                            </Link>
                            <Link
                                href="/materials"
                                className={`flex items-center gap-2 ${isActive('/materials') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                            >
                                <GraduationCap className="h-4 w-4" />
                                Materi
                            </Link>
                            <Link
                                href="/progress"
                                className={`flex items-center gap-2 ${isActive('/progress') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                            >
                                <TrendingUp className="h-4 w-4" />
                                Progress
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 lg:gap-4">
                        {showSearch && (
                            <div className="hidden sm:block relative w-48 lg:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Cari materi..."
                                    className="pl-10 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-2 lg:gap-3">
                            <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
                                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="hidden lg:block">
                                <p className="font-medium text-sm">{user?.name}</p>
                                <p className="text-xs text-gray-500">{user?.grade}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleLogout}
                                className="hidden lg:flex text-gray-500 hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {showSearch && (
                    <div className="mt-3 sm:hidden">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Cari materi pembelajaran..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t pt-4">
                        <div className="flex flex-col space-y-3">
                            <Link
                                href="/"
                                className={`flex items-center gap-3 py-2 ${isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home className="h-5 w-5" />
                                Beranda
                            </Link>
                            <Link
                                href="/materials"
                                className={`flex items-center gap-3 py-2 ${isActive('/materials') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <GraduationCap className="h-5 w-5" />
                                Materi
                            </Link>
                            <Link
                                href="/progress"
                                className={`flex items-center gap-3 py-2 ${isActive('/progress') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <TrendingUp className="h-5 w-5" />
                                Progress
                            </Link>
                            <Link
                                href="/achievements"
                                className={`flex items-center gap-3 py-2 ${isActive('/achievements') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Award className="h-5 w-5" />
                                Prestasi
                            </Link>
                            <Separator />``
                            <Button
                                variant="ghost"
                                className="justify-start text-red-600 hover:text-red-700"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-5 w-5 mr-3" />
                                Keluar
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}