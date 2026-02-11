import { AuthContextType } from "@/components/layouts/auth-layout";
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within AuthProvider');
    }
    return context;
};