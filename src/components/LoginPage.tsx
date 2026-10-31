import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types/crop';
import { getRoleMeta } from '../services/authService';
import {
  Sprout,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  Building,
  MapPin,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound
} from 'lucide-react';

interface LoginPageProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  isOpen = true,
  onClose,
  isStandalone = false
}) => {
  const { login, register, switchQuickDemoUser } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('farmer_ramesh');
  const [password, setPassword] = useState('Farmer@123');
  const [showPassword, setShowPassword] = useState(false);

  // Register Fields
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('farmer');
  const [regOrganization, setRegOrganization] = useState('');
  const [regDistrict, setRegDistrict] = useState('');

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isStandalone && !isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await login(username, password);
      if (res.success) {
        setSuccessMessage('Authentication successful! Welcome back.');
        if (onClose) setTimeout(onClose, 400);
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Authentication error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await register({
        username: regUsername,
        password: regPassword,
        fullName: regFullName,
        email: regEmail,
        role: regRole,
        organization: regOrganization,
        district: regDistrict
      });

      if (res.success) {
        setSuccessMessage('Account registered and authenticated successfully!');
        if (onClose) setTimeout(onClose, 500);
      } else {
        setErrorMessage(res.error || 'Registration failed.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Registration error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await switchQuickDemoUser(role);
      setSuccessMessage(`Logged in as ${getRoleMeta(role).label}!`);
      if (onClose) setTimeout(onClose, 400);
    } catch {
      setErrorMessage('Failed to log in with demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-w-xl w-full mx-auto my-auto flex flex-col">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 relative">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white m-0">
                AgroGuide DSS Portal
              </h2>
              <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/40">
                RBAC Security
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 m-0 mt-0.5">
              Role-Based Authentication &amp; Authorization Gateway
            </p>
          </div>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex bg-black/20 p-1 rounded-xl mt-5 border border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'login' ? 'bg-white text-emerald-950 shadow-sm' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Sign In to Account</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'register' ? 'bg-white text-emerald-950 shadow-sm' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Create New Profile</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 overflow-y-auto max-h-[75vh] space-y-5">
        {/* Quick Demo Accounts Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              1-Click Demo Verification Accounts
            </span>
            <span className="text-[10px] font-mono text-slate-500">Hackathon Presets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('farmer')}
              disabled={isLoading}
              className="p-2.5 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-xl text-left transition cursor-pointer hover:border-emerald-400 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-900">🌾 Farmer</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">User</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-1">Rameshwar Yadav</div>
              <div className="text-[9px] text-emerald-700 font-mono mt-0.5">Farmer@123</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('agronomist')}
              disabled={isLoading}
              className="p-2.5 bg-white hover:bg-blue-50 border border-blue-200 rounded-xl text-left transition cursor-pointer hover:border-blue-400 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-900">🔬 Agronomist</span>
                <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-semibold">Officer</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-1">Dr. Ananya Sharma</div>
              <div className="text-[9px] text-blue-700 font-mono mt-0.5">Agro@2026</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              disabled={isLoading}
              className="p-2.5 bg-white hover:bg-purple-50 border border-purple-200 rounded-xl text-left transition cursor-pointer hover:border-purple-400 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-900">⚙️ Admin</span>
                <span className="text-[9px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-semibold">Director</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-1">Rajesh Verma</div>
              <div className="text-[9px] text-purple-700 font-mono mt-0.5">Admin@Agro2026</div>
            </button>
          </div>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-xs animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="font-semibold">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-emerald-800 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="font-semibold">{successMessage}</div>
          </div>
        )}

        {/* SIGN IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Username or Official Email
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. farmer_ramesh or officer_sharma"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <span className="text-[11px] text-slate-400 font-medium">Verify credentials</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>Verifying Authentication...</span>
              ) : (
                <>
                  <span>Sign In &amp; Verify Identity</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Rameshwar Yadav"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="e.g. ramesh_kisan"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password (min 6 chars)</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role &amp; Clearances</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value as UserRole)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none focus:bg-white focus:border-emerald-600"
              >
                <option value="farmer">🌾 Farmer (Field Input, Recommendations, Weather Sync)</option>
                <option value="agronomist">🔬 Agronomist (Model Evaluation, Test Reports, SHC Verification)</option>
                <option value="admin">⚙️ Administrator (Full Cloud Config, Database Management)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">District / Field Region</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    placeholder="e.g. Varanasi, UP"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization / FPO</label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={regOrganization}
                    onChange={(e) => setRegOrganization(e.target.value)}
                    placeholder="e.g. Kisan Morcha / ICAR"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {isLoading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create Account &amp; Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Authorization Breakdown Matrix */}
        <div className="pt-3 border-t border-slate-200">
          <div className="text-[11px] font-bold text-slate-600 mb-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Role-Based Access Control (RBAC) Entitlements:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
            <div className="p-2 bg-emerald-50/60 border border-emerald-200 rounded-lg">
              <strong className="text-emerald-900 block">🌾 Farmer</strong>
              <div className="text-slate-600 mt-0.5">• 9-factor soil input</div>
              <div className="text-slate-600">• Weather sync</div>
              <div className="text-slate-600">• Audit archival</div>
            </div>
            <div className="p-2 bg-blue-50/60 border border-blue-200 rounded-lg">
              <strong className="text-blue-900 block">🔬 Agronomist</strong>
              <div className="text-slate-600 mt-0.5">• ML benchmark evaluation</div>
              <div className="text-slate-600">• Automated 8-test report</div>
              <div className="text-slate-600">• Soil Health Card sync</div>
            </div>
            <div className="p-2 bg-purple-50/60 border border-purple-200 rounded-lg">
              <strong className="text-purple-900 block">⚙️ Administrator</strong>
              <div className="text-slate-600 mt-0.5">• Cloud database keys</div>
              <div className="text-slate-600">• Database purge authority</div>
              <div className="text-slate-600">• All system privileges</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      {content}
    </div>
  );
};
