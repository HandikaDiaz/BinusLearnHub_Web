'use client';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbProps {
    category: string;
    subject: string;
}

export function Breadcrumb({ category, subject }: BreadcrumbProps) {
    return (
        <div className="flex items-center text-xs lg:text-sm text-gray-500 mb-4 lg:mb-6 overflow-x-auto">
            <Link href="/" className="hover:text-blue-600 whitespace-nowrap">
                Beranda
            </Link>
            <ChevronRight className="h-3 w-3 mx-1 lg:mx-2 flex-shrink-0" />
            <Link href="/" className="hover:text-blue-600 whitespace-nowrap">
                {category}
            </Link>
            <ChevronRight className="h-3 w-3 mx-1 lg:mx-2 flex-shrink-0" />
            <span className="text-gray-800 font-medium whitespace-nowrap">{subject}</span>
        </div>
    );
}