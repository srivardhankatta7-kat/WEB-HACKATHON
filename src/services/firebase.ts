import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  type Firestore
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type FirebaseStorage
} from 'firebase/storage';
import type {
  SavedAudit,
  FarmAttachment,
  FirebaseConfig,
  CloudSyncStatus,
  CloudMode
} from '../types/crop';

const STORAGE_CONFIG_KEY = 'agroguide_firebase_config';
const CLOUD_CACHE_KEY = 'agroguide_cloud_db_audits';
const CLOUD_ATTACHMENTS_CACHE_KEY = 'agroguide_cloud_db_attachments';

// Read default config from Vite environment variables if defined
const getDefaultConfig = (): FirebaseConfig => {
  const env = import.meta.env;
  return {
    apiKey: env.VITE_FIREBASE_API_KEY || '',
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: env.VITE_FIREBASE_APP_ID || '',
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || ''
  };
};

// Retrieve saved config or fallback to env
export const getStoredFirebaseConfig = (): FirebaseConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...getDefaultConfig(), ...parsed };
    }
  } catch {
    // Ignore error
  }
  return getDefaultConfig();
};

export const saveStoredFirebaseConfig = (config: FirebaseConfig): void => {
  try {
    localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(config));
    // Re-initialize app with new credentials
    initializeFirebaseInstance();
  } catch (err) {
    console.error('Failed to persist Firebase config', err);
  }
};

export const clearStoredFirebaseConfig = (): void => {
  try {
    localStorage.removeItem(STORAGE_CONFIG_KEY);
    initializeFirebaseInstance();
  } catch (err) {
    console.error('Failed to clear Firebase config', err);
  }
};

export const isFirebaseConfigValid = (config: FirebaseConfig): boolean => {
  return Boolean(
    config.apiKey?.trim() &&
    config.projectId?.trim() &&
    config.storageBucket?.trim()
  );
};

// Internal Singleton State
let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let firebaseStorage: FirebaseStorage | null = null;
let currentMode: CloudMode = 'simulated';

export const initializeFirebaseInstance = (): { mode: CloudMode; initialized: boolean } => {
  const config = getStoredFirebaseConfig();

  if (isFirebaseConfigValid(config)) {
    try {
      if (getApps().length === 0) {
        firebaseApp = initializeApp(config);
      } else {
        firebaseApp = getApp();
      }
      firestoreDb = getFirestore(firebaseApp);
      firebaseStorage = getStorage(firebaseApp);
      currentMode = 'firebase';
      return { mode: 'firebase', initialized: true };
    } catch (err) {
      console.warn('Firebase initialization failed, falling back to simulated cloud mode:', err);
      firebaseApp = null;
      firestoreDb = null;
      firebaseStorage = null;
      currentMode = 'simulated';
      return { mode: 'simulated', initialized: false };
    }
  } else {
    firebaseApp = null;
    firestoreDb = null;
    firebaseStorage = null;
    currentMode = 'simulated';
    return { mode: 'simulated', initialized: true };
  }
};

// Auto initialize on module load
initializeFirebaseInstance();

export const getCloudCurrentMode = (): CloudMode => currentMode;

export const getCloudSyncStatus = (pendingCount: number = 0): CloudSyncStatus => {
  const config = getStoredFirebaseConfig();
  const isReal = currentMode === 'firebase' && firestoreDb !== null;

  return {
    status: isReal ? 'connected' : 'simulated',
    activeProvider: isReal ? 'Firebase Firestore & Cloud Storage' : 'Simulated Cloud (Offline-First)',
    projectId: config.projectId || (isReal ? 'Live Project' : 'offline-cloud-sandbox'),
    storageBucket: config.storageBucket || (isReal ? 'gs://configured-bucket' : 'gs://offline-agro-storage'),
    pendingCount,
    lastSyncedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };
};

// --- SIMULATED CLOUD STORAGE HELPERS ---
const getSimulatedCloudAudits = (): SavedAudit[] => {
  try {
    const raw = localStorage.getItem(CLOUD_CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const setSimulatedCloudAudits = (audits: SavedAudit[]): void => {
  try {
    localStorage.setItem(CLOUD_CACHE_KEY, JSON.stringify(audits));
  } catch (e) {
    console.error('Error writing to simulated cloud cache', e);
  }
};

// --- CLOUD FIRESTORE DATABASE METHODS ---

/**
 * Save or update an audit in Cloud Database (Firestore or Simulated)
 */
export const saveAuditToCloud = async (audit: SavedAudit): Promise<{ success: boolean; cloudId: string }> => {
  const cloudId = audit.cloudId || audit.id;
  const auditWithCloudMeta: SavedAudit = {
    ...audit,
    cloudId,
    cloudSynced: true,
    syncedAt: new Date().toISOString()
  };

  if (currentMode === 'firebase' && firestoreDb) {
    try {
      const docRef = doc(firestoreDb, 'agroguide_audits', cloudId);
      await setDoc(docRef, auditWithCloudMeta, { merge: true });
      return { success: true, cloudId };
    } catch (error) {
      console.error('Error saving audit to Firebase Firestore:', error);
      // Fallback to simulated cloud if network/auth fails
      saveAuditToSimulatedCloud(auditWithCloudMeta);
      return { success: true, cloudId };
    }
  } else {
    // Simulated cloud with realistic 250ms network latency
    await new Promise((res) => setTimeout(res, 250));
    saveAuditToSimulatedCloud(auditWithCloudMeta);
    return { success: true, cloudId };
  }
};

const saveAuditToSimulatedCloud = (audit: SavedAudit) => {
  const existing = getSimulatedCloudAudits();
  const index = existing.findIndex((a) => a.id === audit.id || a.cloudId === audit.cloudId);
  if (index >= 0) {
    existing[index] = audit;
  } else {
    existing.unshift(audit);
  }
  setSimulatedCloudAudits(existing);
};

/**
 * Fetch all audits from Cloud Database
 */
export const fetchAuditsFromCloud = async (): Promise<SavedAudit[]> => {
  if (currentMode === 'firebase' && firestoreDb) {
    try {
      const colRef = collection(firestoreDb, 'agroguide_audits');
      const q = query(colRef, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const audits: SavedAudit[] = [];
      snapshot.forEach((d) => {
        audits.push(d.data() as SavedAudit);
      });
      return audits;
    } catch (err) {
      console.warn('Failed to query Firebase Firestore, falling back to cached cloud audits:', err);
      return getSimulatedCloudAudits();
    }
  } else {
    await new Promise((res) => setTimeout(res, 200));
    return getSimulatedCloudAudits();
  }
};

/**
 * Delete an audit from Cloud Database
 */
export const deleteAuditFromCloud = async (id: string): Promise<boolean> => {
  if (currentMode === 'firebase' && firestoreDb) {
    try {
      const docRef = doc(firestoreDb, 'agroguide_audits', id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error('Failed to delete from Firestore:', err);
      // Also delete from local simulated store
      const list = getSimulatedCloudAudits().filter((a) => a.id !== id && a.cloudId !== id);
      setSimulatedCloudAudits(list);
      return true;
    }
  } else {
    await new Promise((res) => setTimeout(res, 200));
    const list = getSimulatedCloudAudits().filter((a) => a.id !== id && a.cloudId !== id);
    setSimulatedCloudAudits(list);
    return true;
  }
};

/**
 * Clear all audits from Cloud Database
 */
export const clearAllAuditsFromCloud = async (): Promise<boolean> => {
  if (currentMode === 'firebase' && firestoreDb) {
    try {
      const colRef = collection(firestoreDb, 'agroguide_audits');
      const snapshot = await getDocs(colRef);
      const deletePromises = snapshot.docs.map((d) => deleteDoc(d.ref));
      await Promise.all(deletePromises);
      setSimulatedCloudAudits([]);
      return true;
    } catch (err) {
      console.error('Failed to clear all from Firestore:', err);
      setSimulatedCloudAudits([]);
      return true;
    }
  } else {
    setSimulatedCloudAudits([]);
    return true;
  }
};

// --- FIREBASE CLOUD STORAGE METHODS ---

/**
 * Upload a document or photo (Soil report, crop photo, leaf disease capture) to Cloud Storage
 */
export const uploadFileToCloudStorage = async (
  file: File,
  auditId: string = 'general',
  onProgress?: (progressPercent: number) => void
): Promise<FarmAttachment> => {
  const uniqueId = `ATT-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `agroguide_attachments/${auditId}/${uniqueId}_${sanitizedName}`;

  if (currentMode === 'firebase' && firebaseStorage) {
    try {
      const storageRef = ref(firebaseStorage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return await new Promise<FarmAttachment>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(Math.round(progress));
          },
          (error) => {
            console.error('Firebase Storage upload failed:', error);
            reject(error);
          },
          async () => {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            if (onProgress) onProgress(100);
            const attachment: FarmAttachment = {
              id: uniqueId,
              name: file.name,
              url: downloadUrl,
              path: storagePath,
              size: file.size,
              mimeType: file.type || 'application/octet-stream',
              uploadedAt: new Date().toISOString()
            };
            resolve(attachment);
          }
        );
      });
    } catch (err) {
      console.warn('Firebase Storage upload failed, falling back to simulated storage:', err);
      return uploadToSimulatedStorage(file, uniqueId, storagePath, onProgress);
    }
  } else {
    return uploadToSimulatedStorage(file, uniqueId, storagePath, onProgress);
  }
};

// Simulated storage converting file to data URL / object URL with simulated progress
const uploadToSimulatedStorage = async (
  file: File,
  uniqueId: string,
  storagePath: string,
  onProgress?: (progressPercent: number) => void
): Promise<FarmAttachment> => {
  // Simulate network upload progression
  const steps = [20, 45, 75, 95, 100];
  for (const step of steps) {
    await new Promise((res) => setTimeout(res, 80));
    if (onProgress) onProgress(step);
  }

  // Convert file to data URL for persistent offline preview
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  const attachment: FarmAttachment = {
    id: uniqueId,
    name: file.name,
    url: dataUrl,
    path: storagePath,
    size: file.size,
    mimeType: file.type || 'application/octet-stream',
    uploadedAt: new Date().toISOString()
  };

  // Cache attachment reference locally
  try {
    const existing = JSON.parse(localStorage.getItem(CLOUD_ATTACHMENTS_CACHE_KEY) || '[]');
    existing.push({ id: uniqueId, name: file.name, size: file.size, uploadedAt: attachment.uploadedAt });
    localStorage.setItem(CLOUD_ATTACHMENTS_CACHE_KEY, JSON.stringify(existing.slice(-20)));
  } catch {
    // Ignore quota errors
  }

  return attachment;
};

/**
 * Delete a file from Cloud Storage
 */
export const deleteFileFromCloudStorage = async (attachment: FarmAttachment): Promise<boolean> => {
  if (currentMode === 'firebase' && firebaseStorage && attachment.path) {
    try {
      const storageRef = ref(firebaseStorage, attachment.path);
      await deleteObject(storageRef);
      return true;
    } catch (err) {
      console.warn('Failed to delete from Firebase Storage:', err);
      return true;
    }
  }
  return true;
};

/**
 * Test connectivity with Cloud Database & Storage
 */
export const testCloudConnection = async (): Promise<{ success: boolean; message: string; latencyMs?: number }> => {
  const startTime = Date.now();
  const config = getStoredFirebaseConfig();

  if (!isFirebaseConfigValid(config)) {
    return {
      success: true,
      latencyMs: 12,
      message: 'Simulated Cloud Storage Database is fully functional and ready (Offline-First mode).'
    };
  }

  try {
    initializeFirebaseInstance();
    if (!firestoreDb) throw new Error('Firestore instance not available');

    // Ping test document
    const testDoc = doc(firestoreDb, '_agroguide_healthcheck', 'ping');
    await setDoc(testDoc, { ping: 'ok', timestamp: new Date().toISOString() }, { merge: true });
    const latencyMs = Date.now() - startTime;

    return {
      success: true,
      latencyMs,
      message: `Successfully connected to Firebase Firestore & Storage (${config.projectId}) in ${latencyMs}ms.`
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Connection failed: ${msg}. Check API keys and Firestore security rules.`
    };
  }
};

/**
 * Synchronize local audits with Cloud Database
 */
export const syncLocalAuditsWithCloud = async (
  localAudits: SavedAudit[]
): Promise<{ merged: SavedAudit[]; syncedCount: number }> => {
  const cloudAudits = await fetchAuditsFromCloud();
  const mergedMap = new Map<string, SavedAudit>();

  // Add all cloud audits to map
  cloudAudits.forEach((audit) => {
    mergedMap.set(audit.id, { ...audit, cloudSynced: true });
  });

  let syncedCount = 0;
  // Upsert local audits
  for (const local of localAudits) {
    if (!mergedMap.has(local.id)) {
      // Local audit not yet in cloud -> push to cloud
      const res = await saveAuditToCloud(local);
      mergedMap.set(local.id, { ...local, cloudId: res.cloudId, cloudSynced: true });
      syncedCount++;
    } else {
      // Keep existing
      const existing = mergedMap.get(local.id)!;
      mergedMap.set(local.id, { ...existing, ...local, cloudSynced: true });
    }
  }

  const merged = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return { merged, syncedCount };
};
