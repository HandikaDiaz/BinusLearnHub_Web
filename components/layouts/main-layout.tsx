'use client'
import { SearchProvider } from '@/context/search-context';
import { ReactNode } from 'react';
import Footer from '../main/footer';
import Navbar from '../main/navbar';

interface MainLayoutProps {
    children: ReactNode;
    showSearch?: boolean;
}

export default function MainLayout({ children, showSearch = true }: MainLayoutProps) {
    return (
        <SearchProvider>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Navbar showSearch={showSearch} />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </SearchProvider>
    );
}