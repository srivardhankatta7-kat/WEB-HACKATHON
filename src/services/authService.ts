import type { User, UserRole, AppPermission } from '../types/crop';

const SESSION_KEY = 'agroguide_auth_session';
const USERS_DB_KEY = 'agroguide_registered_users';

interface StoredUserRecord extends User {
  passwordHash: string; // Base64 pseudo-hash for demonstration security
}

// Simple deterministic hash for password verification in frontend demo
const hashPassword = (password: string): string => {
  return btoa(`salt_agroguide_2026:${password.trim()}`);
};

// Built-in verified system accounts
export const PREDEFINED_USERS: StoredUserRecord[] = [
  {
    id: 'USR-FARMER-01',
    username: 'farmer_ramesh',
    passwordHash: hashPassword('Farmer@123'),
    fullName: 'Rameshwar Yadav',
    email: 'rameshwar.farmer@agroguide.in',
    role: 'farmer',
    district: 'Varanasi / Patna Basin, Gangetic Plains',
    organization: 'Purvanchal Progressive Farmers FPO',
    createdAt: '2026-01-15T09:00:00.000Z'
  },
  {
    id: 'USR-AGRO-02',
    username: 'officer_sharma',
    passwordHash: hashPassword('Agro@2026'),
    fullName: 'Dr. Ananya Sharma',
    email: 'ananya.sharma@icar-kvk.gov.in',
    role: 'agronomist',
    organization: 'ICAR - Krishi Vigyan Kendra (KVK)',
    district: 'Gangetic Agro-Climatic Zone VII',
    createdAt: '2026-01-10T10:30:00.000Z'
  },
  {
    id: 'USR-ADMIN-03',
    username: 'admin_agro',
    passwordHash: hashPassword('Admin@Agro2026'),
    fullName: 'Director Rajesh Verma',
    email: 'admin.directorate@agroguide.gov.in',
    role: 'admin',
    organization: 'National Agricultural Decision Support Directorate',
    district: 'HQ / New Delhi',
    createdAt: '2025-11-01T08:00:00.000Z'
  }
];

// Role-Based Access Control (RBAC) Permission Matrix
export const ROLE_PERMISSIONS: Record<UserRole, AppPermission[]> = {
  admin: [
    'VIEW_RECOMMENDATIONS',
    'SAVE_AUDITS',
    'UPLOAD_SOIL_CARDS',
    'VIEW_MODEL_EVALUATION',
    'RUN_TEST_SUITE',
    'CONFIGURE_CLOUD_STORAGE',
    'CLEAR_DATABASE',
    'EXPORT_OFFICIAL_REPORTS'
  ],
  agronomist: [
    'VIEW_RECOMMENDATIONS',
    'SAVE_AUDITS',
    'UPLOAD_SOIL_CARDS',
    'VIEW_MODEL_EVALUATION',
    'RUN_TEST_SUITE',
    'CONFIGURE_CLOUD_STORAGE',
    'EXPORT_OFFICIAL_REPORTS'
  ],
  farmer: [
    'VIEW_RECOMMENDATIONS',
    'SAVE_AUDITS',
    'UPLOAD_SOIL_CARDS'
  ],
  guest: [
    'VIEW_RECOMMENDATIONS'
  ]
};

// Check if a specific role possesses a permission
export const checkPermission = (role: UserRole, permission: AppPermission): boolean => {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

// Role styling and meta helpers
export const getRoleMeta = (role: UserRole): {
  label: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  description: string;
} => {
  switch (role) {
    case 'admin':
      return {
        label: 'System Administrator',
        badgeBg: 'bg-purple-100',
        badgeText: 'text-purple-800',
        border: 'border-purple-300',
        description: 'Full administrative authority: cloud settings, user RBAC, database purge, and model calibration'
      };
    case 'agronomist':
      return {
        label: 'Agronomist / Extension Officer',
        badgeBg: 'bg-blue-100',
        badgeText: 'text-blue-800',
        border: 'border-blue-300',
        description: 'Scientific authority: model benchmarking, 8-suite automated test execution, soil report verification'
      };
    case 'farmer':
      return {
        label: 'Verified Farmer',
        badgeBg: 'bg-emerald-100',
        badgeText: 'text-emerald-800',
        border: 'border-emerald-300',
        description: 'Farm operator: 9-parameter soil entry, live weather sync, crop recommendations, and audit archival'
      };
    case 'guest':
    default:
      return {
        label: 'Guest Visitor',
        badgeBg: 'bg-slate-100',
        badgeText: 'text-slate-700',
        border: 'border-slate-300',
        description: 'Read-only evaluation mode: parameter exploration and recommendation preview'
      };
  }
};

// Retrieve registered users database
export const getAllUsers = (): StoredUserRecord[] => {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    const customUsers: StoredUserRecord[] = raw ? JSON.parse(raw) : [];
    // Merge predefined with custom registered users
    const map = new Map<string, StoredUserRecord>();
    PREDEFINED_USERS.forEach((u) => map.set(u.username.toLowerCase(), u));
    customUsers.forEach((u) => map.set(u.username.toLowerCase(), u));
    return Array.from(map.values());
  } catch {
    return PREDEFINED_USERS;
  }
};

/**
 * Verify Authentication Credentials (Username & Password)
 */
export const authenticateUser = async (
  usernameInput: string,
  passwordInput: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  // Simulate 200ms secure cryptographic verification
  await new Promise((res) => setTimeout(res, 200));

  const cleanUsername = usernameInput.trim().toLowerCase();
  const cleanPassword = passwordInput.trim();

  if (!cleanUsername) {
    return { success: false, error: 'Username or email is required.' };
  }
  if (!cleanPassword) {
    return { success: false, error: 'Password is required.' };
  }

  const users = getAllUsers();
  const matchedUser = users.find(
    (u) => u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanUsername
  );

  if (!matchedUser) {
    return { success: false, error: 'No account found with that username or email.' };
  }

  const expectedHash = matchedUser.passwordHash;
  const providedHash = hashPassword(cleanPassword);

  if (expectedHash !== providedHash) {
    return { success: false, error: 'Incorrect password. Please verify your credentials.' };
  }

  // Generate session token
  const token = `AGRO-SEC-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const authenticatedUser: User = {
    id: matchedUser.id,
    username: matchedUser.username,
    fullName: matchedUser.fullName,
    email: matchedUser.email,
    role: matchedUser.role,
    organization: matchedUser.organization,
    district: matchedUser.district,
    token,
    createdAt: matchedUser.createdAt
  };

  // Persist session
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(authenticatedUser));
  } catch (err) {
    console.error('Failed to persist auth session', err);
  }

  return { success: true, user: authenticatedUser };
};

/**
 * Register a new user account
 */
export const registerUser = async (params: {
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: UserRole;
  organization?: string;
  district?: string;
}): Promise<{ success: boolean; user?: User; error?: string }> => {
  await new Promise((res) => setTimeout(res, 250));

  const cleanUsername = params.username.trim().toLowerCase();
  const cleanEmail = params.email.trim().toLowerCase();

  if (!cleanUsername || cleanUsername.length < 3) {
    return { success: false, error: 'Username must be at least 3 characters long.' };
  }
  if (!params.password || params.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Please provide a valid email address.' };
  }
  if (!params.fullName.trim()) {
    return { success: false, error: 'Full name is required.' };
  }

  const allUsers = getAllUsers();
  const exists = allUsers.some(
    (u) => u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanEmail
  );

  if (exists) {
    return { success: false, error: 'An account with that username or email already exists.' };
  }

  const newRecord: StoredUserRecord = {
    id: `USR-${Date.now().toString(36).toUpperCase()}`,
    username: cleanUsername,
    passwordHash: hashPassword(params.password),
    fullName: params.fullName.trim(),
    email: cleanEmail,
    role: params.role,
    organization: params.organization?.trim() || undefined,
    district: params.district?.trim() || undefined,
    createdAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    const list: StoredUserRecord[] = raw ? JSON.parse(raw) : [];
    list.push(newRecord);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save registered user', err);
  }

  // Automatically log in
  return authenticateUser(cleanUsername, params.password);
};

/**
 * Retrieve active session from storage
 */
export const getActiveSession = (): User | null => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      return JSON.parse(raw) as User;
    }
  } catch {
    // Ignore error
  }
  return null;
};

/**
 * Sign out and destroy session
 */
export const endActiveSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore error
  }
};
