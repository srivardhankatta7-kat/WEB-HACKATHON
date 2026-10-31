import { createContext, useContext } from 'react';
import type { User, UserRole, AppPermission } from '../types/crop';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (params: {
    username: string;
    password: string;
    fullName: string;
    email: string;
    role: UserRole;
    organization?: string;
    district?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchQuickDemoUser: (role: UserRole) => Promise<void>;
  hasPermission: (permission: AppPermission) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
