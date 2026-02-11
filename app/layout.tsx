import AuthProvider from '@/components/layouts/auth-layout';
import ReactQueryProvider from '@/context/query-client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BINUSLearnHub - Platform Persiapan Ujian SMA',
  description: 'Platform pembelajaran untuk persiapan ujian akhir siswa SMA kelas 12',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReactQueryProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={750}
          hideProgressBar={false}
          closeOnClick draggable
          pauseOnHover />
      </body>
    </html>
  );
}