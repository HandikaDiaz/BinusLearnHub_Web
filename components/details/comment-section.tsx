'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export function CommentsSection() {
    const [comment, setComment] = useState('');

    const comments = [
        {
            id: 1,
            name: 'Siswa 1',
            time: '2 hari lalu',
            content:
                'Materi ini sangat membantu! Penjelasannya jelas dan contoh soalnya relevan dengan ujian.',
            likes: 12,
        },
        {
            id: 2,
            name: 'Siswa 2',
            time: '3 hari lalu',
            content: 'Sangat mudah dipahami, terutama bagian contoh kasusnya.',
            likes: 8,
        },
        {
            id: 3,
            name: 'Siswa 3',
            time: '5 hari lalu',
            content: 'Pengajar sangat kompeten, menjawab semua pertanyaan dengan detail.',
            likes: 15,
        },
    ];

    return (
        <div className="bg-white rounded-xl lg:rounded-2xl border p-4 lg:p-6">
            <h2 className="text-lg lg:text-2xl font-bold mb-4 lg:mb-6">Komentar</h2>

            <div className="space-y-4 lg:space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="pb-4 lg:pb-6 border-b last:border-0 last:pb-0">
                        <div className="flex gap-3 mb-3">
                            <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                                <AvatarImage
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Commenter${comment.id}`}
                                />
                                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h4 className="font-semibold text-sm lg:text-base">{comment.name}</h4>
                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                </div>
                                <p className="text-gray-600 mt-1 text-sm lg:text-base">{comment.content}</p>
                                <div className="flex gap-3 lg:gap-4 mt-2 lg:mt-3">
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        <span>{comment.likes}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Balas
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 lg:mt-6">
                <textarea
                    placeholder="Tulis komentar Anda..."
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-end mt-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-sm lg:text-base">
                        Kirim Komentar
                    </Button>
                </div>
            </div>
        </div>
    );
}