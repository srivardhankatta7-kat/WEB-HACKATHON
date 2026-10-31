import React, { useState } from 'react';
import type { User, UserRole, AppPermission } from '../types/crop';
import { AuthContext, type AuthContextType } from './AuthContext';
import {
  getActiveSession,
  authenticateUser,
  registerUser,
  endActiveSession,
  checkPermission,
  PREDEFINED_USERS
} from '../services/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getActiveSession());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = async (username: string, password: string) => {
    const res = await authenticateUser(username, password);
    if (res.success && res.user) {
      setUser(res.user);
      setIsLoginModalOpen(false);
      return { success: true };
    }
    return { success: false, error: res.error || 'Authentication failed' };
  };

  const register = async (params: {
    username: string;
    password: string;
    fullName: string;
    email: string;
    role: UserRole;
    organization?: string;
    district?: string;
  }) => {
    const res = await registerUser(params);
    if (res.success && res.user) {
      setUser(res.user);
      setIsLoginModalOpen(false);
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed' };
  };

  const logout = () => {
    endActiveSession();
    setUser(null);
  };

  const switchQuickDemoUser = async (targetRole: UserRole) => {
    const demo = PREDEFINED_USERS.find((u) => u.role === targetRole);
    if (demo) {
      let pwd = 'Farmer@123';
      if (targetRole === 'agronomist') pwd = 'Agro@2026';
      if (targetRole === 'admin') pwd = 'Admin@Agro2026';
      await login(demo.username, pwd);
    }
  };

  const hasPermission = (permission: AppPermission): boolean => {
    const activeRole: UserRole = user ? user.role : 'guest';
    return checkPermission(activeRole, permission);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: Boolean(user),
    role: user ? user.role : 'guest',
    isLoginModalOpen,
    openLoginModal: () => setIsLoginModalOpen(true),
    closeLoginModal: () => setIsLoginModalOpen(false),
    login,
    register,
    logout,
    switchQuickDemoUser,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
