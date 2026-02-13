'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRegister } from '@/hooks/useRegister';
import { BookOpen, ChevronLeft, Eye, EyeOff, Loader2Icon, Lock, Mail, School, User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function RegisterPage() {
    const { submit, errors, isSubmitting, register } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        school: '',
        grade: '',
        agreeToTerms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="lg:hidden p-4 bg-gradient-to-r from-blue-600 to-indigo-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <h1 className="text-xl font-bold">BINUSLearnHub</h1>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Link href="/login">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Masuk
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
                            Persiapan Ujian Akhir SMA Kelas 12
                        </h2>
                        <p className="text-blue-100 text-sm lg:text-lg">
                            Akses materi lengkap, latihan soal, dan panduan belajar untuk sukses
                            menghadapi Ujian Nasional dan UTBK.
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2 lg:p-3 rounded-full">
                            <BookOpen className="h-4 w-4 lg:h-6 lg:w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm lg:text-base">500+ Materi Pembelajaran</h3>
                            <p className="text-xs lg:text-sm text-blue-100">Dari pengajar berkompeten</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-white/20 p-2 lg:p-3 rounded-full">
                            <School className="h-4 w-4 lg:h-6 lg:w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm lg:text-base">Ribuan Siswa Terdaftar</h3>
                            <p className="text-xs lg:text-sm text-blue-100">Dari seluruh Indonesia</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-sm text-blue-200">
                    <p>Sudah punya akun? <Link href="/login" className="text-white font-semibold hover:underline">Masuk disini</Link></p>
                </div>
            </div>

            <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="hidden lg:block mb-8">
                        <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                            <h1 className="text-xl font-bold text-blue-600">BINUSLearnHub</h1>
                        </div>
                        <p className="text-gray-600">Platform Persiapan Ujian untuk Siswa SMA</p>
                    </div>

                    <Card className="w-full shadow-xl">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl lg:text-2xl">Buat Akun Baru</CardTitle>
                            <CardDescription className="text-sm lg:text-base">
                                Daftar untuk mengakses semua materi pembelajaran
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={submit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm lg:text-base">Nama Lengkap</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="name"
                                            {...register('name')}
                                            name="name"
                                            placeholder="Masukkan nama lengkap"
                                            className="pl-10 text-sm lg:text-base"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    {errors.name && (<div className="text-sm text-red-600">{errors.name.message}</div>)}
                                </div>

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
                                    {errors.email && (<div className="text-sm text-red-600">{errors.email.message}</div>)}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="school" className="text-sm lg:text-base">Sekolah</Label>
                                        <Input
                                            id="school"
                                            {...register('school')}
                                            name="school"
                                            placeholder="Nama sekolah"
                                            className="text-sm lg:text-base"
                                            value={formData.school}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        {errors.school && (<div className="text-sm text-red-600">{errors.school.message}</div>)}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="grade" className="text-sm lg:text-base">Kelas</Label>
                                        <select
                                            id="grade"
                                            {...register('grade')}
                                            name="grade"
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm lg:text-base ring-offset-background"
                                            value={formData.grade}
                                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                            required
                                        >
                                            <option value="">Pilih Kelas</option>
                                            <option value="12 IPA">12 IPA</option>
                                            <option value="12 IPS">12 IPS</option>
                                            <option value="12 Bahasa">12 Bahasa</option>
                                        </select>
                                        {errors.grade && (<div className="text-sm text-red-600">{errors.grade.message}</div>)}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm lg:text-base">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            {...register('password')}
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Minimal 4 karakter"
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
                                    {errors.password && (<div className="text-sm text-red-600">{errors.password.message}</div>)}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm lg:text-base">Konfirmasi Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Ulangi password"
                                            className="pl-10 pr-10 text-sm lg:text-base"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full px-3"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4 mt-10">
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-sm lg:text-base">
                                    {isSubmitting ? <Loader2Icon className="h-4 w-4 animate-spin" /> : 'Daftar Sekarang'}
                                </Button>

                                <div className="relative w-full">
                                    <div className="absolute inset-0 flex items-center">
                                        <Separator className="w-full" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-background px-2 text-muted-foreground">
                                            Sudah punya akun?
                                        </span>
                                    </div>
                                </div>

                                <Button asChild variant="outline" className="w-full text-sm lg:text-base">
                                    <Link href="/login">
                                        Masuk ke Akun Saya
                                    </Link>
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>

                    <div className="lg:hidden mt-6 text-center text-sm text-gray-600">
                        <p>Dengan mendaftar, Anda menyetujui Syarat Layanan dan Kebijakan Privasi kami.</p>
                        <p className="mt-2">
                            © 2026 BINUSLearnHub. Platform Persiapan Ujian.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}