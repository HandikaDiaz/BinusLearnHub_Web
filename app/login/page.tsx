'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useLogin';
import { BookOpen, ChevronLeft, Eye, EyeOff, Loader2Icon, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function LoginPage() {
    const { submit, errors, isSubmitting, register } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <div className="lg:hidden p-4 bg-gradient-to-r from-blue-600 to-indigo-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <h1 className="text-xl font-bold">BINUSLearnHub</h1>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Link href="/register">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Daftar
                    </Link>
                </Button>
            </div>

            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-blue-600 to-indigo-800 text-white p-8 lg:p-12 flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-8">
                        <BookOpen className="h-8 w-8" />
                        <h1 className="text-2xl font-bold">BINUSLearnHub</h1>
                    </div>

                    <div className="mt-8 lg:mt-24">
                        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
                            Selamat Datang Kembali!
                        </h2>
                        <p className="text-blue-100 text-sm lg:text-lg">
                            Masuk untuk melanjutkan persiapan ujian akhir Anda. Akses semua materi
                            pembelajaran, latihan soal, dan progress belajar.
                        </p>
                    </div>

                    <div className="mt-8 lg:mt-16 p-4 lg:p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                        <h3 className="text-lg lg:text-xl font-semibold mb-3">Materi Terbaru</h3>
                        <ul className="space-y-2 text-sm lg:text-base">
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <span>Pembahasan Soal UN Matematika 2026</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <span>Strategi Menjawab Soal HOTS Fisika</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                                <span>Tips Efektif Belajar Bahasa Inggris</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-sm text-blue-200">
                    <p>Belum punya akun? <Link href="/register" className="text-white font-semibold hover:underline">Daftar disini</Link></p>
                </div>
            </div>

            <div className="flex-1 bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="hidden lg:block mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                            <h1 className="text-xl font-bold text-blue-600">BINUSLearnHub</h1>
                        </div>
                        <p className="text-gray-600">Platform Persiapan Ujian untuk Siswa SMA</p>
                    </div>

                    <Card className="shadow-lg border-gray-200">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl lg:text-2xl">Masuk ke Akun</CardTitle>
                            <CardDescription className="text-sm lg:text-base">
                                Gunakan email dan password yang sudah terdaftar
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={submit}>
                            <CardContent className="space-y-4 lg:space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm lg:text-base">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            {...register('email')}
                                            name="email"
                                            type="email"
                                            placeholder="nama@email.com"
                                            className="pl-10 text-sm lg:text-base"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email.message}</div>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password" className="text-sm lg:text-base">Password</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs lg:text-sm text-blue-600 hover:underline"
                                        >
                                            Lupa password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            {...register('password')}
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Masukkan password"
                                            className="pl-10 pr-10 text-sm lg:text-base"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password.message}</div>}
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4 mt-10">
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-sm lg:text-base">
                                    {isSubmitting ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : 'Masuk'}
                                </Button>

                                <div className="text-center text-sm">
                                    <span className="text-gray-600">Belum punya akun? </span>
                                    <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                                        Daftar disini
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>

                    <div className="lg:hidden mt-6 text-center text-xs text-gray-500">
                        <p>© 2026 BINUSLearnHub. Platform Persiapan Ujian untuk Siswa SMA.</p>
                        <p className="mt-1">
                            <Link href="#" className="hover:underline">Kebijakan Privasi</Link> •
                            <Link href="#" className="hover:underline ml-1">Syarat Layanan</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}