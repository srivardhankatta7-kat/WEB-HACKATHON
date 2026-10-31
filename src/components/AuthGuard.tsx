import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { AppPermission } from '../types/crop';
import { getRoleMeta } from '../services/authService';
import { ShieldAlert, Lock, ArrowRight, UserCheck } from 'lucide-react';

interface AuthGuardProps {
  permission: AppPermission;
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  permission,
  children,
  fallbackTitle = 'Restricted Feature: Specialized Authorization Required',
  fallbackDescription = 'This module is restricted by Role-Based Access Control (RBAC) security policies.'
}) => {
  const { user, role, hasPermission, openLoginModal, switchQuickDemoUser } = useAuth();

  const isAuthorized = hasPermission(permission);

  if (isAuthorized) {
    return <>{children}</>;
  }

  const roleMeta = getRoleMeta(role);

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-5 animate-in fade-in">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
        <Lock className="w-8 h-8" />
      </div>

      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          <span>RBAC Security Clearance: 403 Forbidden</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 m-0">{fallbackTitle}</h3>
        <p className="text-xs text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
          {fallbackDescription}
        </p>
      </div>

      {/* Current User Clearance Badge */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-xs text-slate-700 space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-500">Your Current Session:</div>
        <div className="font-bold text-slate-900 text-sm">
          {user ? user.fullName : 'Guest Visitor (Unauthenticated)'}
        </div>
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleMeta.badgeBg} ${roleMeta.badgeText}`}>
            {roleMeta.label}
          </span>
          {user?.organization && (
            <span className="text-[11px] text-slate-500">• {user.organization}</span>
          )}
        </div>
      </div>

      {/* Quick Elevate Credentials */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => switchQuickDemoUser('agronomist')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 cursor-pointer"
        >
          <UserCheck className="w-4 h-4" />
          <span>Switch to Agronomist Officer Account</span>
        </button>

        <button
          type="button"
          onClick={openLoginModal}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>Sign In / Switch User</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
