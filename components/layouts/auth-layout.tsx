'use client'
import Cookies from 'js-cookie';
import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@/store/authStore';
import { User } from '@/constants/type';
import { useRouter } from 'next/navigation';

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const decodedPayload = JSON.parse(atob(payloadBase64));
                setUser(decodedPayload);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            Cookies.remove('token');
        } finally {
            setIsLoading(false);
        }
    };

    const login = (token: string) => {
        Cookies.set('token', token, { expires: 7 });
        checkAuth();
        router.push('/');
    };

    const logout = () => {
        Cookies.remove('token');
        router.push('/login');
        toast.info("You have been logged out.");
        setUser(null);
    };

    const updateUser = (userData: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...userData } : null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
