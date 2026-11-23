// =====================================================================
// THIS TOWN – A SWEET HOME FOR STUDENTS' METRONOME
// Browser Database Layer (IndexedDB + Synchronous Dual-Cache)
// Preserves student data so it never disappears on refresh.
// Isolated accounts with Email Login, Sign-Up & Sign-Out.
// No sensitive details stored (no phone numbers, no addresses).
// =====================================================================

import { defaultProfile, defaultGoals, defaultScheduleTasks } from '../data/defaultData.js';
import { defaultSongLibrary } from '../data/songsData.js';

const DB_NAME = 'ThisTownStudentDB';
const DB_VERSION = 2;

export class StudentDatabase {
  constructor() {
    this.db = null;
    this.dbReady = this.initDB();
  }

  initDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported in this environment, falling back to LocalStorage');
        resolve(null);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. Users Table (email as unique primary key)
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { keyPath: 'email' });
        }

        // 2. Profiles Table (userEmail as primary key)
        if (!db.objectStoreNames.contains('profiles')) {
          db.createObjectStore('profiles', { keyPath: 'userEmail' });
        }

        // 3. Schedules Table (userEmail as primary key)
        if (!db.objectStoreNames.contains('schedules')) {
          db.createObjectStore('schedules', { keyPath: 'userEmail' });
        }

        // 4. Goals Table (userEmail as primary key)
        if (!db.objectStoreNames.contains('goals')) {
          db.createObjectStore('goals', { keyPath: 'userEmail' });
        }

        // 5. Songs Table (song id as primary key)
        if (!db.objectStoreNames.contains('songs')) {
          const songStore = db.createObjectStore('songs', { keyPath: 'id' });
          songStore.createIndex('userEmail', 'userEmail', { unique: false });
        }

        // 6. Session Table (stores current signed-in email)
        if (!db.objectStoreNames.contains('session')) {
          db.createObjectStore('session', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.seedDemoUserIfEmpty();
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB open error:', event.target.error);
        resolve(null);
      };
    });
  }

  // Pre-seed default demo account (Shweta) so first-time users can explore immediately
  async seedDemoUserIfEmpty() {
    const demoEmail = 'shweta@student.edu';
    const existing = await this.getUser(demoEmail);
    if (!existing) {
      await this.createUser({
        name: 'Shweta',
        email: demoEmail,
        password: 'password123',
        studentClass: '10th'
      });
    }
  }

  // --- USER AUTHENTICATION & SESSIONS ---
  async createUser({ name, email, password, studentClass = '10th' }) {
    await this.dbReady;
    const cleanEmail = (email || '').trim().toLowerCase();
    const existing = await this.getUser(cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const newUser = {
      email: cleanEmail,
      name: name.trim() || 'Student',
      password: password, // client-side local DB credential
      studentClass: studentClass,
      createdAt: new Date().toISOString()
    };

    // Initialize their default profile
    const newProfile = {
      ...defaultProfile,
      userEmail: cleanEmail,
      name: newUser.name,
      studentClass: studentClass
    };

    // Initialize their default schedule
    const newSchedule = {
      userEmail: cleanEmail,
      tasks: JSON.parse(JSON.stringify(defaultScheduleTasks))
    };

    // Initialize their default goals
    const newGoals = {
      userEmail: cleanEmail,
      ...JSON.parse(JSON.stringify(defaultGoals))
    };

    // Save into IndexedDB
    await this.putRecord('users', newUser);
    await this.putRecord('profiles', newProfile);
    await this.putRecord('schedules', newSchedule);
    await this.putRecord('goals', newGoals);

    // Save session
    await this.setCurrentSession(cleanEmail);
    this.syncToLocalStorageCache(cleanEmail, newProfile, newSchedule.tasks, newGoals);

    return newUser;
  }

  async login(email, password) {
    await this.dbReady;
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = await this.getUser(cleanEmail);
    if (!user) {
      throw new Error('No account found with this email. Please sign up first.');
    }
    if (user.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    await this.setCurrentSession(cleanEmail);
    const profile = await this.getProfile(cleanEmail);
    const schedule = await this.getSchedule(cleanEmail);
    const goals = await this.getGoals(cleanEmail);
    this.syncToLocalStorageCache(cleanEmail, profile, schedule.tasks, goals);

    return user;
  }

  async signOut() {
    await this.dbReady;
    await this.deleteRecord('session', 'current_user');
    localStorage.removeItem('this_town_current_session_email');
    return true;
  }

  async getCurrentSessionUser() {
    await this.dbReady;
    // Check localStorage cache first for zero-latency load
    const cachedEmail = localStorage.getItem('this_town_current_session_email');
    if (cachedEmail) {
      const user = await this.getUser(cachedEmail);
      if (user) return user;
    }

    const sessionRecord = await this.getRecord('session', 'current_user');
    if (sessionRecord && sessionRecord.email) {
      return await this.getUser(sessionRecord.email);
    }

    // Default to Shweta if no session
    return await this.getUser('shweta@student.edu');
  }

  async setCurrentSession(email) {
    await this.putRecord('session', { key: 'current_user', email });
    localStorage.setItem('this_town_current_session_email', email);
  }

  // --- DATA ACCESS METHODS ---
  async getUser(email) {
    return await this.getRecord('users', (email || '').trim().toLowerCase());
  }

  async getProfile(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const prof = await this.getRecord('profiles', cleanEmail);
    if (prof) return prof;
    return { ...defaultProfile, userEmail: cleanEmail };
  }

  async saveProfile(email, profileData) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const record = { ...profileData, userEmail: cleanEmail };
    await this.putRecord('profiles', record);
    localStorage.setItem(`this_town_prof_${cleanEmail}`, JSON.stringify(record));
    return record;
  }

  async getSchedule(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const sched = await this.getRecord('schedules', cleanEmail);
    if (sched && sched.tasks) return sched;
    return { userEmail: cleanEmail, tasks: JSON.parse(JSON.stringify(defaultScheduleTasks)) };
  }

  async saveSchedule(email, tasks) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const record = { userEmail: cleanEmail, tasks };
    await this.putRecord('schedules', record);
    localStorage.setItem(`this_town_sched_${cleanEmail}`, JSON.stringify(tasks));
    return record;
  }

  async getGoals(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const record = await this.getRecord('goals', cleanEmail);
    if (record && record.daily) return record;
    return { userEmail: cleanEmail, ...JSON.parse(JSON.stringify(defaultGoals)) };
  }

  async saveGoals(email, goalsData) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const record = { userEmail: cleanEmail, ...goalsData };
    await this.putRecord('goals', record);
    localStorage.setItem(`this_town_goals_${cleanEmail}`, JSON.stringify(record));
    return record;
  }

  // --- CUSTOM SONGS DATABASE ---
  async getSongs(userEmail) {
    await this.dbReady;
    const cleanEmail = (userEmail || '').trim().toLowerCase();
    const customSongs = await this.getCustomSongsForUser(cleanEmail);
    // Combine built-in default library with student's custom added songs
    return [...defaultSongLibrary, ...customSongs];
  }

  async addCustomSong(userEmail, song) {
    await this.dbReady;
    const cleanEmail = (userEmail || '').trim().toLowerCase();
    const newSong = {
      ...song,
      id: 'song_' + Date.now(),
      userEmail: cleanEmail,
      createdAt: new Date().toISOString()
    };
    await this.putRecord('songs', newSong);
    return newSong;
  }

  async deleteCustomSong(songId) {
    await this.dbReady;
    await this.deleteRecord('songs', songId);
    return true;
  }

  async getCustomSongsForUser(userEmail) {
    if (!this.db) {
      // LocalStorage fallback
      try {
        const stored = localStorage.getItem(`this_town_songs_${userEmail}`);
        return stored ? JSON.parse(stored) : [];
      } catch (e) { return []; }
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction('songs', 'readonly');
        const store = tx.objectStore('songs');
        const req = store.getAll();
        req.onsuccess = () => {
          const all = req.result || [];
          const userSongs = all.filter(s => s.userEmail === userEmail);
          resolve(userSongs);
        };
        req.onerror = () => resolve([]);
      } catch (e) {
        resolve([]);
      }
    });
  }

  // --- LOW LEVEL INDEXEDDB HELPERS ---
  putRecord(storeName, data) {
    if (!this.db) {
      // LocalStorage fallback
      localStorage.setItem(`idb_fallback_${storeName}_${data.email || data.userEmail || data.key || data.id}`, JSON.stringify(data));
      return Promise.resolve(data);
    }
    return new Promise((resolve, reject) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(data);
        req.onsuccess = () => resolve(data);
        req.onerror = (e) => reject(e.target.error);
      } catch (e) {
        reject(e);
      }
    });
  }

  getRecord(storeName, key) {
    if (!this.db) {
      try {
        const stored = localStorage.getItem(`idb_fallback_${storeName}_${key}`);
        return Promise.resolve(stored ? JSON.parse(stored) : null);
      } catch (e) { return Promise.resolve(null); }
    }
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  }

  deleteRecord(storeName, key) {
    if (!this.db) {
      localStorage.removeItem(`idb_fallback_${storeName}_${key}`);
      return Promise.resolve(true);
    }
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }

  syncToLocalStorageCache(email, profile, tasks, goals) {
    try {
      localStorage.setItem('this_town_current_session_email', email);
      if (profile) localStorage.setItem(`this_town_prof_${email}`, JSON.stringify(profile));
      if (tasks) localStorage.setItem(`this_town_sched_${email}`, JSON.stringify(tasks));
      if (goals) localStorage.setItem(`this_town_goals_${email}`, JSON.stringify(goals));
    } catch (e) {}
  }
}

export const studentDB = new StudentDatabase();
