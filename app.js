// =====================================================================
// THIS TOWN – A SWEET HOME FOR STUDENTS' METRONOME
// Production Application Core with IndexedDB Database & Multi-User Accounts
// Screen 1 (Home Dashboard), Screen 2 (Today's Schedule), Screen 3 (End Your Day)
// Zero data loss on refresh • Email Login & Sign-Up • Multi-Language Music Provision
// Metronome removed from Screen 2 task cards as requested
// =====================================================================

// --- 1. DEFAULT DATA TEMPLATES ---
const DEFAULT_PROFILE = {
  name: "Shweta",
  studentClass: "10th",
  hobbies: "Sketching doodles, reading novels, playing badminton",
  schoolTimings: "07:45 AM - 02:00 PM",
  tuitionTimings: "04:30 PM - 06:30 PM",
  sleepWakeTimings: {
    wake: "06:00",
    sleep: "22:30"
  },
  mealTimings: {
    breakfast: "07:15",
    lunch: "13:30",
    dinner: "20:30"
  },
  freeTimeActivities: "Listening to chill lo-fi music, terrace stroll, journaling",
  preferredSubjects: "Mathematics, Physics, Biology, English Literature",
  learningPace: "12-15 questions per hour / 1 chapter in 1.5 hours",
  metronomeBpm: 60,
  studyStreakDays: 5
};

const DEFAULT_GOALS = {
  daily: [
    { id: 'd1', text: 'Solve 15 trigonometry practice questions', category: 'Maths', completed: true, date: 'Today' },
    { id: 'd2', text: 'Revise Chapter 6 Life Processes (Biology diagrams)', category: 'Science', completed: true, date: 'Today' },
    { id: 'd3', text: 'Write notes for English poem "The Road Not Taken"', category: 'English', completed: false, date: 'Today' },
    { id: 'd4', text: '30-minute evening walk & relax without screen', category: 'Health', completed: true, date: 'Today' }
  ],
  weekly: [
    { id: 'w1', text: 'Complete Physics Light & Reflection numerical sheet', category: 'Physics', completed: true, date: 'This Week' },
    { id: 'w2', text: 'Revise Social Science History Chapter 1 & 2', category: 'Social', completed: false, date: 'This Week' },
    { id: 'w3', text: 'Organize study desk & arrange revision notebooks', category: 'Routine', completed: true, date: 'This Week' },
    { id: 'w4', text: 'Practice 1 timed Mathematics mock quiz', category: 'Maths', completed: false, date: 'This Week' }
  ],
  monthly: [
    { id: 'm1', text: 'Finish Term 1 syllabus revision for Science & Maths', category: 'Academic', completed: false, date: 'This Month' },
    { id: 'm2', text: 'Maintain a 20-day consistent 10:30 PM sleep schedule', category: 'Habit', completed: true, date: 'This Month' },
    { id: 'm3', text: 'Read one wholesome non-academic book', category: 'Hobby', completed: true, date: 'This Month' },
    { id: 'm4', text: 'Clear all pending math formula backlogs', category: 'Productivity', completed: false, date: 'This Month' }
  ]
};

const DEFAULT_SCHEDULE_TASKS = [
  {
    id: 'task-1',
    title: 'Solve 15 Trigonometry Practice Questions',
    category: 'Academic',
    subject: 'Mathematics',
    startTime: '19:15',
    endTime: '20:30',
    duration: 75,
    priority: 'High',
    dueDate: 'Today',
    notes: 'Ex 8.4 identity proofs',
    isCommitment: false,
    completed: true
  },
  {
    id: 'task-2',
    title: 'Revise Chapter 6 Life Processes Biology Diagrams',
    category: 'Revision',
    subject: 'Science',
    startTime: '15:30',
    endTime: '16:30',
    duration: 60,
    priority: 'High',
    dueDate: 'Today',
    notes: 'Draw nephron and human heart diagrams in notebook',
    isCommitment: false,
    completed: true
  },
  {
    id: 'task-3',
    title: 'Write Summary & Question Answers for English Poem',
    category: 'Homework',
    subject: 'English',
    startTime: '21:15',
    endTime: '22:15',
    duration: 60,
    priority: 'Medium',
    dueDate: 'Today',
    notes: 'Poem "The Road Not Taken" by Robert Frost',
    isCommitment: false,
    completed: false
  },
  {
    id: 'task-4',
    title: 'Review Physics Reflection Numericals Formula Sheet',
    category: 'Revision',
    subject: 'Physics',
    startTime: '16:30',
    endTime: '17:00',
    duration: 30,
    priority: 'Low',
    dueDate: 'Tomorrow',
    notes: 'Mirror formula & sign convention check',
    isCommitment: false,
    completed: false
  }
];

// Multi-Language Song Library (English, Hindi, and Others)
const DEFAULT_SONGS = [
  {
    id: 'hi-1',
    title: 'Kesariya (Peaceful Lofi Ambient Raag)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Acoustic Sitar & Piano Lofi',
    mood: 'calm',
    notes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25],
    tempo: 60,
    description: 'Unhurried bansuri flute and warm sitar resonance to dissolve evening tension',
    isCustom: false
  },
  {
    id: 'hi-2',
    title: 'Phir Le Aya Dil (Gentle Twilight Bansuri)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Classical Bansuri & Rain Ambience',
    mood: 'sleepy',
    notes: [220.00, 246.94, 277.18, 329.63, 440.00],
    tempo: 48,
    description: 'Soulful twilight flute melody designed to slow down thoughts before sleep',
    isCustom: false
  },
  {
    id: 'hi-3',
    title: 'Iktara (Evening Rooftop Relaxing Instrumental)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Acoustic Guitar & Warm Chords',
    mood: 'proud',
    notes: [293.66, 369.99, 440.00, 587.33],
    tempo: 66,
    description: 'Lighthearted, uplifting melody celebrating consistent daily study rhythm',
    isCustom: false
  },
  {
    id: 'hi-4',
    title: 'Raataan Lambiyan (Midnight Chill Chords)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Lo-Fi Chill & Sub-Bass',
    mood: 'decompress',
    notes: [261.63, 311.13, 392.00, 466.16],
    tempo: 52,
    description: 'Soft night breeze melodies to decompress after long study hours',
    isCustom: false
  },
  {
    id: 'en-1',
    title: 'Golden Hour (Cozy Piano Study Chords)',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Warm Felt Piano',
    mood: 'calm',
    notes: [261.63, 329.63, 392.00, 523.25],
    tempo: 60,
    description: 'Golden twilight chords inspiring quiet confidence and steady focus',
    isCustom: false
  },
  {
    id: 'en-2',
    title: 'Night Changes (Acoustic Starlight Chimes)',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Acoustic Fingerstyle & Music Box',
    mood: 'sleepy',
    notes: [220.00, 277.18, 329.63, 440.00],
    tempo: 46,
    description: 'Gentle acoustic strings reminding you that tomorrow is a fresh beginning',
    isCustom: false
  },
  {
    id: 'en-3',
    title: 'Until I Found You (Midnight Vinyl Lofi)',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Vintage Vinyl Lo-Fi',
    mood: 'decompress',
    notes: [261.63, 349.23, 392.00, 523.25],
    tempo: 54,
    description: 'Nostalgic, gentle melodies with vinyl crackle for winding down',
    isCustom: false
  },
  {
    id: 'en-4',
    title: 'Twilight Study Chimes',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Pentatonic Bells & Soft Ticks',
    mood: 'proud',
    notes: [293.66, 329.63, 392.00, 440.00],
    tempo: 64,
    description: 'Clear, peaceful bell tones reflecting on your accomplishments',
    isCustom: false
  },
  {
    id: 'oth-1',
    title: 'Ghibli Starlight Lullaby',
    language: 'Japanese',
    langFlag: '🇯🇵',
    artist: 'Anime Piano & Night Crickets',
    mood: 'sleepy',
    notes: [246.94, 293.66, 329.63, 392.00, 493.88],
    tempo: 48,
    description: 'Magical and comforting Japanese animated soundtrack piano melody',
    isCustom: false
  },
  {
    id: 'oth-2',
    title: 'Breeze of Cordoba (Spanish Classical Guitar)',
    language: 'Spanish',
    langFlag: '🇪🇸',
    artist: 'Nylon Acoustic Strings',
    mood: 'calm',
    notes: [261.63, 329.63, 392.00, 493.88],
    tempo: 58,
    description: 'Warm Spanish acoustic arpeggios that relax the shoulder muscles',
    isCustom: false
  }
];

const DAILY_QUOTES = [
  {
    id: 1,
    quote: "YOU ARE BRAVER than you believe, STRONGER than you seem, SMARTER than you think, and LOVED more than you know.",
    author: "Christopher Robin to Pooh (A. A. Milne)",
    tag: "Self-Belief & Courage"
  },
  {
    id: 2,
    quote: "A steady metronome beats softly, never rushing, never stopping. Take your tasks one question at a time—you are right on time.",
    author: "This Town Companion",
    tag: "Daily Rhythm"
  },
  {
    id: 3,
    quote: "It does not matter how slowly you go as long as you do not stop. Even ten focused minutes can open a doorway.",
    author: "Confucius",
    tag: "Patience & Growth"
  },
  {
    id: 4,
    quote: "Breathe in gentle courage, breathe out the worry. Your grades do not define your worth—your heart and curiosity do.",
    author: "Sweet Home Wisdom",
    tag: "Calm Mind"
  },
  {
    id: 5,
    quote: "Mistakes are proof that you are stretching your mind. Be kind to yourself today, drink water, and keep going.",
    author: "Student Journal",
    tag: "Encouragement"
  },
  {
    id: 6,
    quote: "The secret of getting ahead is getting started. Break that big chapter into tiny, friendly slices.",
    author: "Mark Twain",
    tag: "Action"
  }
];

// --- 2. VECTOR SVG ILLUSTRATIONS ---
const SVG_ASSETS = {
  poohBear: `
    <svg viewBox="0 0 160 180" width="120" height="135" fill="none" xmlns="http://www.w3.org/2000/svg" class="bear-svg">
      <circle cx="48" cy="42" r="14" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      <circle cx="48" cy="42" r="7" fill="#F49D1A" opacity="0.6"/>
      <circle cx="112" cy="42" r="14" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      <circle cx="112" cy="42" r="7" fill="#F49D1A" opacity="0.6"/>
      <ellipse cx="80" cy="62" rx="36" ry="32" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      <ellipse cx="60" cy="74" rx="7" ry="4" fill="#FF8E9E" opacity="0.5"/>
      <ellipse cx="100" cy="74" rx="7" ry="4" fill="#FF8E9E" opacity="0.5"/>
      <ellipse cx="68" cy="60" rx="3.2" ry="4.2" fill="#3E2723"/>
      <ellipse cx="92" cy="60" rx="3.2" ry="4.2" fill="#3E2723"/>
      <circle cx="69.2" cy="58.5" r="1.2" fill="#FFFFFF"/>
      <circle cx="93.2" cy="58.5" r="1.2" fill="#FFFFFF"/>
      <path d="M63 53 C66 50, 71 51, 73 53" stroke="#5D4037" stroke-width="2" stroke-linecap="round"/>
      <path d="M87 53 C89 51, 94 50, 97 53" stroke="#5D4037" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="80" cy="72" rx="14" ry="10" fill="#FFE599"/>
      <ellipse cx="80" cy="67" rx="5" ry="3.5" fill="#3E2723"/>
      <path d="M74 74 Q80 81 86 74" stroke="#5D4037" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M52 90 Q80 86 108 90 L118 126 Q80 134 42 126 Z" fill="#E65100" stroke="#5D4037" stroke-width="2.5"/>
      <path d="M52 90 Q80 86 108 90 L102 104 Q80 98 58 104 Z" fill="#FF7043" opacity="0.7"/>
      <path d="M48 122 Q80 132 112 122 Q122 155 106 172 Q80 178 54 172 Q38 155 48 122 Z" fill="#F7C04A" stroke="#5D4037" stroke-width="2.5"/>
      <path d="M42 98 C35 110 44 128 66 128 C74 128 82 124 88 120" stroke="#5D4037" stroke-width="2.5" fill="#F7C04A" stroke-linecap="round"/>
      <path d="M118 98 C125 110 114 128 92 128 C80 128 72 122 66 116" stroke="#5D4037" stroke-width="2.5" fill="#F7C04A" stroke-linecap="round"/>
      <path d="M44 94 Q40 106 48 114 Q58 110 56 96 Z" fill="#E65100" stroke="#5D4037" stroke-width="2"/>
      <path d="M116 94 Q120 106 112 114 Q102 110 104 96 Z" fill="#E65100" stroke="#5D4037" stroke-width="2"/>
      <path d="M22 45 L25 50 L30 53 L25 56 L22 61 L19 56 L14 53 L19 50 Z" fill="#FFB74D" opacity="0.8"/>
      <path d="M136 75 L138 78 L142 80 L138 82 L136 86 L134 82 L130 80 L134 78 Z" fill="#FFB74D" opacity="0.8"/>
    </svg>
  `,
  ribbonBow: `
    <svg viewBox="0 0 60 50" width="44" height="38" fill="none" xmlns="http://www.w3.org/2000/svg" class="ribbon-svg">
      <path d="M24 28 C20 36 12 44 6 48 L12 36 L18 28 Z" fill="#FF8FA3" stroke="#D85A7F" stroke-width="1.5"/>
      <path d="M36 28 C40 36 48 44 54 48 L48 36 L42 28 Z" fill="#FF8FA3" stroke="#D85A7F" stroke-width="1.5"/>
      <path d="M28 22 C14 8 2 18 16 28 C22 31 28 26 30 22 Z" fill="#FFB3C1" stroke="#D85A7F" stroke-width="2"/>
      <path d="M32 22 C46 8 58 18 44 28 C38 31 32 26 30 22 Z" fill="#FFB3C1" stroke="#D85A7F" stroke-width="2"/>
      <circle cx="30" cy="23" r="5.5" fill="#FF758F" stroke="#D85A7F" stroke-width="2"/>
    </svg>
  `,
  metronome: `
    <svg viewBox="0 0 48 48" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" class="metronome-icon">
      <path d="M16 42 L21 8 C21 6.9 21.9 6 23 6 L25 6 C26.1 6 27 6.9 27 8 L32 42 C32.3 43.1 31.4 44 30.3 44 L17.7 44 C16.6 44 15.7 43.1 16 42 Z" fill="#E8D5C4" stroke="#6D4C41" stroke-width="2"/>
      <path d="M20 18 L28 18 M19 26 L29 26 M18 34 L30 34" stroke="#8D6E63" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="24" y1="38" x2="19" y2="10" stroke="#D32F2F" stroke-width="2" stroke-linecap="round" class="pendulum-arm"/>
      <rect x="18" y="18" width="5" height="7" rx="1.5" fill="#C62828" transform="rotate(-12 20.5 21.5)" class="pendulum-weight"/>
      <circle cx="15" cy="44" r="2" fill="#5D4037"/>
      <circle cx="33" cy="44" r="2" fill="#5D4037"/>
    </svg>
  `
};

// --- 3. PERSISTENT INDEXEDDB DATABASE ENGINE ---
class AppDatabaseEngine {
  constructor() {
    this.db = null;
    this.dbName = 'ThisTownStudentDB';
    this.dbVersion = 2;
    this.initPromise = this.openDB();
  }

  openDB() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve(null);
        return;
      }
      try {
        const req = window.indexedDB.open(this.dbName, this.dbVersion);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('users')) db.createObjectStore('users', { keyPath: 'email' });
          if (!db.objectStoreNames.contains('profiles')) db.createObjectStore('profiles', { keyPath: 'email' });
          if (!db.objectStoreNames.contains('schedules')) db.createObjectStore('schedules', { keyPath: 'email' });
          if (!db.objectStoreNames.contains('goals')) db.createObjectStore('goals', { keyPath: 'email' });
          if (!db.objectStoreNames.contains('songs')) db.createObjectStore('songs', { keyPath: 'id' });
          if (!db.objectStoreNames.contains('session')) db.createObjectStore('session', { keyPath: 'key' });
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
          this.seedDefaultUser();
          resolve(this.db);
        };
        req.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  }

  async seedDefaultUser() {
    const demo = await this.getUser('shweta@student.edu');
    if (!demo) {
      await this.saveUser({
        name: 'Shweta',
        email: 'shweta@student.edu',
        password: 'password123',
        studentClass: '10th'
      });
      await this.saveProfile('shweta@student.edu', DEFAULT_PROFILE);
      await this.saveSchedule('shweta@student.edu', DEFAULT_SCHEDULE_TASKS);
      await this.saveGoals('shweta@student.edu', DEFAULT_GOALS);
    }
  }

  // Session & Auth
  async getCurrentSessionEmail() {
    const cached = localStorage.getItem('this_town_active_email');
    if (cached) return cached;
    const session = await this.getRecord('session', 'active_user');
    return session ? session.email : 'shweta@student.edu';
  }

  async setSessionEmail(email) {
    localStorage.setItem('this_town_active_email', email);
    await this.putRecord('session', { key: 'active_user', email });
  }

  async clearSession() {
    localStorage.removeItem('this_town_active_email');
    await this.deleteRecord('session', 'active_user');
  }

  // Users Table
  async getUser(email) {
    const clean = (email || '').trim().toLowerCase();
    const mem = localStorage.getItem(`db_user_${clean}`);
    if (mem) return JSON.parse(mem);
    return await this.getRecord('users', clean);
  }

  async saveUser(userObj) {
    const clean = userObj.email.trim().toLowerCase();
    const data = { ...userObj, email: clean };
    localStorage.setItem(`db_user_${clean}`, JSON.stringify(data));
    await this.putRecord('users', data);
    return data;
  }

  // Profiles Table
  async getProfile(email) {
    const clean = (email || '').trim().toLowerCase();
    const mem = localStorage.getItem(`db_prof_${clean}`);
    if (mem) return JSON.parse(mem);
    const fromDb = await this.getRecord('profiles', clean);
    if (fromDb) return fromDb;
    return { ...DEFAULT_PROFILE, email: clean };
  }

  async saveProfile(email, profileData) {
    const clean = (email || '').trim().toLowerCase();
    const data = { ...profileData, email: clean };
    localStorage.setItem(`db_prof_${clean}`, JSON.stringify(data));
    await this.putRecord('profiles', data);
    return data;
  }

  // Schedules Table
  async getSchedule(email) {
    const clean = (email || '').trim().toLowerCase();
    const mem = localStorage.getItem(`db_sched_${clean}`);
    if (mem) return JSON.parse(mem);
    const fromDb = await this.getRecord('schedules', clean);
    if (fromDb && fromDb.tasks) return fromDb.tasks;
    return JSON.parse(JSON.stringify(DEFAULT_SCHEDULE_TASKS));
  }

  async saveSchedule(email, tasks) {
    const clean = (email || '').trim().toLowerCase();
    localStorage.setItem(`db_sched_${clean}`, JSON.stringify(tasks));
    await this.putRecord('schedules', { email: clean, tasks });
    return tasks;
  }

  // Goals Table
  async getGoals(email) {
    const clean = (email || '').trim().toLowerCase();
    const mem = localStorage.getItem(`db_goals_${clean}`);
    if (mem) return JSON.parse(mem);
    const fromDb = await this.getRecord('goals', clean);
    if (fromDb && fromDb.goals) return fromDb.goals;
    return JSON.parse(JSON.stringify(DEFAULT_GOALS));
  }

  async saveGoals(email, goals) {
    const clean = (email || '').trim().toLowerCase();
    localStorage.setItem(`db_goals_${clean}`, JSON.stringify(goals));
    await this.putRecord('goals', { email: clean, goals });
    return goals;
  }

  // Custom Songs Table
  async getCustomSongs(email) {
    const clean = (email || '').trim().toLowerCase();
    const mem = localStorage.getItem(`db_songs_${clean}`);
    if (mem) return JSON.parse(mem);
    return [];
  }

  async saveCustomSongs(email, songs) {
    const clean = (email || '').trim().toLowerCase();
    localStorage.setItem(`db_songs_${clean}`, JSON.stringify(songs));
    return songs;
  }

  // Low level store helpers
  putRecord(storeName, data) {
    return new Promise((resolve) => {
      if (!this.db) { resolve(data); return; }
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(data);
        tx.oncomplete = () => resolve(data);
        tx.onerror = () => resolve(data);
      } catch (e) { resolve(data); }
    });
  }

  getRecord(storeName, key) {
    return new Promise((resolve) => {
      if (!this.db) { resolve(null); return; }
      try {
        const tx = this.db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) { resolve(null); }
    });
  }

  deleteRecord(storeName, key) {
    return new Promise((resolve) => {
      if (!this.db) { resolve(true); return; }
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (e) { resolve(false); }
    });
  }
}

const appDB = new AppDatabaseEngine();

// --- 4. WEB AUDIO METRONOME & SOOTHING MUSIC SYNTHESIZER ---
class StudentMetronomeAudio {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.bpm = 60;
    this.timerId = null;
    this.onBeatListeners = [];
    this.ambientPlaying = false;
    this.ambientInterval = null;
    this.currentTrack = DEFAULT_SONGS[0];
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTick(isAccent = false) {
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isAccent ? 880 : 660, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playChords(notesArray) {
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const notes = notesArray || this.currentTrack?.notes || [261.63, 329.63, 392.00, 523.25];

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        const startTime = now + idx * 0.09;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.13, startTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 2.4);
      });
    } catch (e) {}
  }

  setBpm(newBpm) {
    this.bpm = Math.max(30, Math.min(160, newBpm));
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    let beatCount = 0;

    const intervalMs = (60 / this.bpm) * 1000;
    this.timerId = setInterval(() => {
      beatCount = (beatCount % 4) + 1;
      this.playTick(beatCount === 1);
      this.onBeatListeners.forEach(cb => cb(beatCount));
    }, intervalMs);

    this.playTick(true);
    this.onBeatListeners.forEach(cb => cb(1));
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  playTrack(track) {
    this.initContext();
    this.currentTrack = track;
    this.bpm = track.tempo || 60;

    if (this.ambientInterval) clearInterval(this.ambientInterval);
    this.ambientPlaying = true;
    this.playChords(track.notes);

    const repeatMs = Math.max(3000, (60 / this.bpm) * 4000);
    this.ambientInterval = setInterval(() => {
      this.playChords(this.currentTrack.notes);
    }, repeatMs);

    return true;
  }

  stopSong() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    this.ambientPlaying = false;
  }

  toggleSong(track = null) {
    if (track) this.currentTrack = track;
    if (this.ambientPlaying) {
      this.stopSong();
      return false;
    } else {
      return this.playTrack(this.currentTrack);
    }
  }

  onBeat(callback) {
    this.onBeatListeners.push(callback);
  }
}

const audioMetronome = new StudentMetronomeAudio();

// --- 5. MAIN APPLICATION CONTROLLER ---
class ThisTownDashboard {
  constructor() {
    this.currentUser = null;
    this.profile = { ...DEFAULT_PROFILE };
    this.goals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
    this.scheduleTasks = JSON.parse(JSON.stringify(DEFAULT_SCHEDULE_TASKS));
    this.customSongs = [];
    this.allSongs = [...DEFAULT_SONGS];
    this.activeSong = DEFAULT_SONGS[0];
    this.selectedSongLang = 'all';

    this.isRescheduledAccepted = false;
    this.quoteIndex = 0;
    this.activeGoalTab = 'daily';
    this.activeScreenId = 'screen-home';
    this.scheduleFilter = 'all';
    this.editingTaskId = null;
    
    this.init();
  }

  async init() {
    this.injectSVGs();
    this.bindEvents();

    // Load active session from Database
    await this.loadActiveUserSession();
    console.log('🏡 This Town Database Connected for:', this.currentUser?.email);
  }

  async loadActiveUserSession() {
    const email = await appDB.getCurrentSessionEmail();
    let user = await appDB.getUser(email);
    if (!user) {
      user = {
        name: 'Shweta',
        email: 'shweta@student.edu',
        password: 'password123',
        studentClass: '10th'
      };
      await appDB.saveUser(user);
    }
    this.currentUser = user;

    // Load isolated data from Database
    this.profile = await appDB.getProfile(user.email);
    this.scheduleTasks = await appDB.getSchedule(user.email);
    this.goals = await appDB.getGoals(user.email);
    this.customSongs = await appDB.getCustomSongs(user.email);
    this.updateAllSongsList();

    this.renderSessionBar();
    this.renderProfile();
    this.renderQuote();
    this.renderGoals();
    this.renderScheduleTimetable();
    this.renderEndYourDay();
    this.renderSongLibrary();
    this.updateProgressCalculations();
    this.setupMetronomeBeatSync();
  }

  updateAllSongsList() {
    this.allSongs = [...DEFAULT_SONGS, ...this.customSongs];
  }

  injectSVGs() {
    const bearContainer = document.getElementById('bear-illustration-container');
    if (bearContainer) bearContainer.innerHTML = SVG_ASSETS.poohBear;

    const ribbonContainer = document.getElementById('ribbon-bow-container');
    if (ribbonContainer) ribbonContainer.innerHTML = SVG_ASSETS.ribbonBow;

    const headerMetronomeWrap = document.getElementById('header-metronome-icon');
    if (headerMetronomeWrap) headerMetronomeWrap.innerHTML = SVG_ASSETS.metronome;
  }

  renderSessionBar() {
    const nameLabel = document.getElementById('top-user-name');
    const emailLabel = document.getElementById('top-user-email');
    const btnSignout = document.getElementById('btn-top-signout');
    const btnLogin = document.getElementById('btn-top-login');

    if (this.currentUser) {
      if (nameLabel) nameLabel.textContent = this.currentUser.name;
      if (emailLabel) emailLabel.textContent = `(${this.currentUser.email})`;
      if (btnSignout) btnSignout.style.display = 'inline-flex';
      if (btnLogin) btnLogin.style.display = 'none';
    } else {
      if (nameLabel) nameLabel.textContent = 'Guest';
      if (emailLabel) emailLabel.textContent = '(Not signed in)';
      if (btnSignout) btnSignout.style.display = 'none';
      if (btnLogin) btnLogin.style.display = 'inline-flex';
    }
  }

  bindEvents() {
    // Navigation handlers
    const navItems = document.querySelectorAll('.bottom-nav-bar .nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        this.navigateToScreen(target);
      });
    });

    // "LET'S PLAN!" START Button
    const startPlanBtn = document.getElementById('btn-start-plan');
    if (startPlanBtn) {
      startPlanBtn.addEventListener('click', () => {
        this.navigateToScreen('screen-schedule');
        this.showToast("🗓️ Welcome to Today's Schedule!");
      });
    }

    // Return to Home Buttons
    ['btn-back-from-schedule', 'btn-back-from-pending', 'btn-back-from-music', 'btn-return-home-4'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => this.navigateToScreen('screen-home'));
    });

    // Cross-links between Screen 3 and Screen 4
    const btnTopMusic = document.getElementById('btn-top-goto-music');
    if (btnTopMusic) btnTopMusic.addEventListener('click', () => this.navigateToScreen('screen-music'));

    const btnNextStepMusic = document.getElementById('btn-goto-music-from-endday');
    if (btnNextStepMusic) btnNextStepMusic.addEventListener('click', () => this.navigateToScreen('screen-music'));

    const btnBackToReview = document.getElementById('btn-back-to-schedule-from-music');
    if (btnBackToReview) btnBackToReview.addEventListener('click', () => this.navigateToScreen('screen-pending'));

    // --- AUTHENTICATION & SESSION EVENTS ---
    const btnSignout = document.getElementById('btn-top-signout');
    if (btnSignout) {
      btnSignout.addEventListener('click', () => this.handleSignOut());
    }

    const btnLogin = document.getElementById('btn-top-login');
    if (btnLogin) {
      btnLogin.addEventListener('click', () => this.openAuthModal('login'));
    }

    const userChip = document.getElementById('user-chip-btn');
    if (userChip) {
      userChip.addEventListener('click', () => this.openAuthModal('login'));
    }

    const closeAuthBtn = document.getElementById('btn-close-auth-modal');
    if (closeAuthBtn) {
      closeAuthBtn.addEventListener('click', () => this.closeAuthModal());
    }

    // Auth Modal Tabs (Log In vs Sign Up)
    const tabLogin = document.getElementById('tab-auth-login');
    const tabSignup = document.getElementById('tab-auth-signup');
    const formLogin = document.getElementById('form-login');
    const formSignup = document.getElementById('form-signup');

    if (tabLogin && tabSignup) {
      tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        formLogin.style.display = 'flex';
        formSignup.style.display = 'none';
      });

      tabSignup.addEventListener('click', () => {
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
        formSignup.style.display = 'flex';
        formLogin.style.display = 'none';
      });
    }

    // Login Form Submit
    if (formLogin) {
      formLogin.addEventListener('submit', (e) => this.handleLoginFormSubmit(e));
    }

    // Sign Up Form Submit
    if (formSignup) {
      formSignup.addEventListener('submit', (e) => this.handleSignupFormSubmit(e));
    }

    // Demo Switch to Shweta
    const demoBtn = document.getElementById('btn-auth-demo-shweta');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => this.handleSwitchToDemo());
    }

    // Daily Motivation Quote
    const nextQuoteBtn = document.getElementById('btn-next-quote');
    if (nextQuoteBtn) nextQuoteBtn.addEventListener('click', () => this.cycleNextQuote());

    // Personal Corner modal
    ['btn-open-personal-corner', 'btn-quick-edit-profile', 'student-name-display', 'header-account-btn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => this.openPersonalCornerModal());
    });

    const closePersonalBtn = document.getElementById('btn-close-personal-modal');
    if (closePersonalBtn) closePersonalBtn.addEventListener('click', () => this.closePersonalCornerModal());

    const personalForm = document.getElementById('form-personal-profile');
    if (personalForm) personalForm.addEventListener('submit', (e) => this.handleSaveProfile(e));

    const resetDataBtn = document.getElementById('btn-reset-demo-data');
    if (resetDataBtn) {
      resetDataBtn.addEventListener('click', async () => {
        if (confirm("Reset current account data to default templates?")) {
          this.profile = { ...DEFAULT_PROFILE, name: this.currentUser.name };
          this.goals = JSON.parse(JSON.stringify(DEFAULT_GOALS));
          this.scheduleTasks = JSON.parse(JSON.stringify(DEFAULT_SCHEDULE_TASKS));
          await this.persistUserData();
          this.renderProfile();
          this.renderGoals();
          this.renderScheduleTimetable();
          this.renderEndYourDay();
          this.closePersonalCornerModal();
          this.showToast("✨ Account reset to clean templates!");
        }
      });
    }

    // Progress Modal
    const openProgressBtn = document.getElementById('btn-open-progress-modal');
    if (openProgressBtn) openProgressBtn.addEventListener('click', () => this.openProgressModal());

    ['btn-close-progress-modal', 'btn-close-progress-action'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', () => this.closeProgressModal());
    });

    // Goal Tabs
    document.querySelectorAll('.goal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchGoalTab(tab);
      });
    });

    const addGoalForm = document.getElementById('form-add-goal');
    if (addGoalForm) addGoalForm.addEventListener('submit', (e) => this.handleAddGoal(e));

    // SCREEN 2: Add/Edit Task Modal
    const addTopBtn = document.getElementById('btn-open-add-task-top');
    if (addTopBtn) addTopBtn.addEventListener('click', () => this.openTaskModal());

    const floatingAddBtn = document.getElementById('btn-floating-add-task');
    if (floatingAddBtn) floatingAddBtn.addEventListener('click', () => this.openTaskModal());

    const closeTaskModalBtn = document.getElementById('btn-close-task-modal');
    if (closeTaskModalBtn) closeTaskModalBtn.addEventListener('click', () => this.closeTaskModal());

    const cancelTaskBtn = document.getElementById('btn-cancel-task-form');
    if (cancelTaskBtn) cancelTaskBtn.addEventListener('click', () => this.closeTaskModal());

    const formTask = document.getElementById('form-schedule-task');
    if (formTask) formTask.addEventListener('submit', (e) => this.handleSaveTaskForm(e));

    // SCREEN 2: Filter Pills
    document.querySelectorAll('#sched-filter-pills .pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#sched-filter-pills .pill-btn').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.scheduleFilter = pill.getAttribute('data-filter');
        this.renderScheduleTimetable();
      });
    });

    const schedRhythmBadge = document.getElementById('sched-rhythm-badge-btn');
    if (schedRhythmBadge) schedRhythmBadge.addEventListener('click', () => this.toggleMetronome());

    // SCREEN 3: End Your Day Tab Switchers
    document.querySelectorAll('.end-day-tab-pills .pill-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.end-day-tab-pills .pill-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const targetSub = tab.getAttribute('data-target-sub');
        const subCard = document.getElementById(targetSub);
        if (subCard) subCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const btnAcceptReschedule = document.getElementById('btn-accept-reschedule');
    if (btnAcceptReschedule) btnAcceptReschedule.addEventListener('click', () => this.handleAcceptRescheduling());

    const btnUndoReschedule = document.getElementById('btn-undo-reschedule');
    if (btnUndoReschedule) btnUndoReschedule.addEventListener('click', () => this.handleUndoRescheduling());

    // SCREEN 4: Mood Chips
    document.querySelectorAll('.mood-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const mood = chip.getAttribute('data-mood');
        this.handleSelectMood(mood);
      });
    });

    // SCREEN 4: Language Filter Tabs
    document.querySelectorAll('#lang-filter-tabs .lang-tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#lang-filter-tabs .lang-tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.selectedSongLang = tab.getAttribute('data-lang');
        this.renderSongLibrary();
      });
    });

    // Custom Song Modal Triggers
    const btnOpenAddSong = document.getElementById('btn-open-add-song');
    if (btnOpenAddSong) btnOpenAddSong.addEventListener('click', () => this.openAddSongModal());

    const closeSongModal = document.getElementById('btn-close-song-modal');
    if (closeSongModal) closeSongModal.addEventListener('click', () => this.closeAddSongModal());

    const cancelSongBtn = document.getElementById('btn-cancel-song-form');
    if (cancelSongBtn) cancelSongBtn.addEventListener('click', () => this.closeAddSongModal());

    const formSong = document.getElementById('form-add-custom-song');
    if (formSong) formSong.addEventListener('submit', (e) => this.handleSaveCustomSong(e));

    // Player Controls
    const playSongBtn = document.getElementById('btn-play-peaceful-song');
    if (playSongBtn) playSongBtn.addEventListener('click', () => this.toggleActiveSongPlayback());

    const musicBpmSlider = document.getElementById('music-bpm-adjust');
    if (musicBpmSlider) {
      musicBpmSlider.addEventListener('input', (e) => {
        const bpm = parseInt(e.target.value, 10);
        audioMetronome.setBpm(bpm);
        const tempoDisplay = document.getElementById('song-tempo-display');
        if (tempoDisplay) tempoDisplay.textContent = bpm;
        const sliderLabel = document.getElementById('music-slider-bpm');
        if (sliderLabel) sliderLabel.textContent = bpm;
      });
    }

    // Top Metronome Controls
    const quickMetronomeBtn = document.getElementById('quick-metronome-btn');
    if (quickMetronomeBtn) quickMetronomeBtn.addEventListener('click', () => this.toggleMetronome());

    const toggleMetronomeAudioBtn = document.getElementById('btn-toggle-metronome-audio');
    if (toggleMetronomeAudioBtn) toggleMetronomeAudioBtn.addEventListener('click', () => this.toggleMetronome());

    const bpmSlider = document.getElementById('bpm-slider');
    if (bpmSlider) {
      bpmSlider.addEventListener('input', (e) => {
        const newBpm = parseInt(e.target.value, 10);
        this.updateBpm(newBpm);
      });
    }

    // Viewport switcher
    const mobileViewBtn = document.getElementById('btn-mobile-view');
    const desktopViewBtn = document.getElementById('btn-desktop-view');
    if (mobileViewBtn && desktopViewBtn) {
      mobileViewBtn.addEventListener('click', () => {
        document.body.classList.remove('desktop-frame-mode');
        document.body.classList.add('mobile-frame-mode');
        mobileViewBtn.classList.add('active');
        desktopViewBtn.classList.remove('active');
      });

      desktopViewBtn.addEventListener('click', () => {
        document.body.classList.remove('mobile-frame-mode');
        document.body.classList.add('desktop-frame-mode');
        desktopViewBtn.classList.add('active');
        mobileViewBtn.classList.remove('active');
      });
    }

    // Modal backdrops & ESC
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.remove('open');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(modal => modal.classList.remove('open'));
      }
    });
  }

  // --- PERSISTENCE SYNCHRONIZER ---
  async persistUserData() {
    if (!this.currentUser) return;
    const email = this.currentUser.email;
    await appDB.saveProfile(email, this.profile);
    await appDB.saveSchedule(email, this.scheduleTasks);
    await appDB.saveGoals(email, this.goals);
    await appDB.saveCustomSongs(email, this.customSongs);
  }

  // --- AUTHENTICATION FLOWS ---
  openAuthModal(defaultTab = 'login') {
    const modal = document.getElementById('modal-auth');
    if (!modal) return;
    modal.classList.add('open');

    const tabLogin = document.getElementById('tab-auth-login');
    const tabSignup = document.getElementById('tab-auth-signup');
    const formLogin = document.getElementById('form-login');
    const formSignup = document.getElementById('form-signup');

    if (defaultTab === 'signup') {
      tabSignup.classList.add('active');
      tabLogin.classList.remove('active');
      formSignup.style.display = 'flex';
      formLogin.style.display = 'none';
    } else {
      tabLogin.classList.add('active');
      tabSignup.classList.remove('active');
      formLogin.style.display = 'flex';
      formSignup.style.display = 'none';
    }

    const errLogin = document.getElementById('auth-login-error');
    const errSignup = document.getElementById('auth-signup-error');
    if (errLogin) errLogin.style.display = 'none';
    if (errSignup) errSignup.style.display = 'none';
  }

  closeAuthModal() {
    const modal = document.getElementById('modal-auth');
    if (modal) modal.classList.remove('open');
  }

  async handleLoginFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('auth-login-email').value.trim();
    const password = document.getElementById('auth-login-password').value;
    const errorElem = document.getElementById('auth-login-error');

    const user = await appDB.getUser(email);
    if (!user) {
      if (errorElem) {
        errorElem.textContent = 'Account not found. Please click "Create Account (Sign Up)" above.';
        errorElem.style.display = 'block';
      }
      return;
    }
    if (user.password !== password) {
      if (errorElem) {
        errorElem.textContent = 'Incorrect password. Please try again.';
        errorElem.style.display = 'block';
      }
      return;
    }

    await appDB.setSessionEmail(user.email);
    this.currentUser = user;
    await this.loadActiveUserSession();
    this.closeAuthModal();
    this.showToast(`✨ Welcome back, ${user.name}! Data loaded from database.`);
  }

  async handleSignupFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('auth-signup-name').value.trim();
    const studentClass = document.getElementById('auth-signup-class').value;
    const email = document.getElementById('auth-signup-email').value.trim().toLowerCase();
    const password = document.getElementById('auth-signup-password').value;
    const errorElem = document.getElementById('auth-signup-error');

    const existing = await appDB.getUser(email);
    if (existing) {
      if (errorElem) {
        errorElem.textContent = 'An account with this email already exists. Please log in.';
        errorElem.style.display = 'block';
      }
      return;
    }

    const newUser = {
      name: name || 'Student',
      email: email,
      password: password,
      studentClass: studentClass,
      createdAt: new Date().toISOString()
    };

    await appDB.saveUser(newUser);

    // Initialize fresh personalized data in database
    const newProfile = { ...DEFAULT_PROFILE, name: newUser.name, studentClass };
    const newSchedule = JSON.parse(JSON.stringify(DEFAULT_SCHEDULE_TASKS));
    const newGoals = JSON.parse(JSON.stringify(DEFAULT_GOALS));

    await appDB.saveProfile(email, newProfile);
    await appDB.saveSchedule(email, newSchedule);
    await appDB.saveGoals(email, newGoals);
    await appDB.setSessionEmail(email);

    this.currentUser = newUser;
    await this.loadActiveUserSession();
    this.closeAuthModal();
    this.showToast(`🎉 Account created for ${newUser.name}! Your private database is active.`);
  }

  async handleSwitchToDemo() {
    await appDB.setSessionEmail('shweta@student.edu');
    await this.loadActiveUserSession();
    this.closeAuthModal();
    this.showToast("⚡ Switched to Demo Account (Shweta)");
  }

  async handleSignOut() {
    await appDB.clearSession();
    this.currentUser = null;
    this.renderSessionBar();
    this.showToast("🚪 Signed out. Your data remains safely in the database.");
    this.openAuthModal('login');
  }

  // --- NAVIGATION ---
  navigateToScreen(screenId) {
    this.activeScreenId = screenId;

    document.querySelectorAll('.screen-content').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.bottom-nav-bar .nav-item').forEach(item => {
      if (item.getAttribute('data-target') === screenId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (screenId === 'screen-schedule') {
      this.renderScheduleTimetable();
    } else if (screenId === 'screen-pending') {
      this.renderEndYourDay();
    } else if (screenId === 'screen-music') {
      this.renderSongLibrary();
    }
  }

  // ===================================================================
  // SCREEN 2: TODAY'S SCHEDULE (METRONOME REMOVED FROM BELOW TASKS)
  // ===================================================================
  getDailyCommitments() {
    const prof = this.profile;
    const wake = prof.sleepWakeTimings?.wake || '06:00';
    const sleep = prof.sleepWakeTimings?.sleep || '22:30';
    const bfast = prof.mealTimings?.breakfast || '07:15';
    const lunch = prof.mealTimings?.lunch || '13:30';
    const dinner = prof.mealTimings?.dinner || '20:30';

    return [
      {
        id: 'commit-wake',
        title: '☀️ Morning Wake-Up & Light Stretch',
        category: 'Routine',
        subject: 'Routine',
        startTime: wake,
        endTime: bfast,
        duration: 45,
        priority: 'Medium',
        dueDate: 'Today',
        notes: 'Gentle hydration, light stretching and peaceful start',
        isCommitment: true,
        completed: true
      },
      {
        id: 'commit-bfast',
        title: '🍳 Healthy Breakfast',
        category: 'Meal',
        subject: 'Nutrition',
        startTime: bfast,
        endTime: '07:45',
        duration: 30,
        priority: 'Medium',
        dueDate: 'Today',
        notes: 'Nutritious breakfast to fuel your morning rhythm',
        isCommitment: true,
        completed: true
      },
      {
        id: 'commit-school',
        title: `🏫 School Hours (${prof.schoolTimings || '07:45 AM - 02:00 PM'})`,
        category: 'School',
        subject: 'Academics',
        startTime: '07:45',
        endTime: '14:00',
        duration: 375,
        priority: 'High',
        dueDate: 'Today',
        notes: 'Lectures, lab practicals, peer learning & school routine',
        isCommitment: true,
        completed: true
      },
      {
        id: 'commit-lunch',
        title: '🍲 Lunch & Relaxing Break',
        category: 'Meal',
        subject: 'Nutrition',
        startTime: lunch,
        endTime: '14:30',
        duration: 45,
        priority: 'Medium',
        dueDate: 'Today',
        notes: 'Wholesome lunch and short break to reset mind',
        isCommitment: true,
        completed: true
      },
      {
        id: 'commit-tuition',
        title: `✍️ Tuition & Coaching (${prof.tuitionTimings || '04:30 PM - 06:30 PM'})`,
        category: 'Tuition',
        subject: 'Coaching',
        startTime: '16:30',
        endTime: '18:30',
        duration: 120,
        priority: 'High',
        dueDate: 'Today',
        notes: 'Concept clearing, solving doubts and instructor notes',
        isCommitment: true,
        completed: false
      },
      {
        id: 'commit-free',
        title: '🎨 Hobby & Free-Time Activity',
        category: 'Hobby',
        subject: 'Relaxation',
        startTime: '18:30',
        endTime: '19:15',
        duration: 45,
        priority: 'Low',
        dueDate: 'Today',
        notes: prof.freeTimeActivities || 'Sketching, listening to chill music, terrace walk',
        isCommitment: true,
        completed: false
      },
      {
        id: 'commit-dinner',
        title: '🥗 Dinner & Family Time',
        category: 'Meal',
        subject: 'Nutrition',
        startTime: dinner,
        endTime: '21:15',
        duration: 45,
        priority: 'Medium',
        dueDate: 'Today',
        notes: 'Relaxed dinner and conversation with family',
        isCommitment: true,
        completed: false
      },
      {
        id: 'commit-sleep',
        title: '🌙 Night Wind-Down & Sleep',
        category: 'Sleep',
        subject: 'Rest',
        startTime: sleep,
        endTime: '06:00',
        duration: 450,
        priority: 'High',
        dueDate: 'Tonight',
        notes: 'Disconnect from screens, steady rhythm, full 8 hours rest',
        isCommitment: true,
        completed: false
      }
    ];
  }

  renderScheduleTimetable() {
    const container = document.getElementById('timetable-timeline-container');
    if (!container) return;

    const commitments = this.getDailyCommitments();
    const studyTasks = this.scheduleTasks;

    const pillTasksCount = document.getElementById('pill-tasks-count');
    if (pillTasksCount) pillTasksCount.textContent = studyTasks.length;

    const pillCommitCount = document.getElementById('pill-commitments-count');
    if (pillCommitCount) pillCommitCount.textContent = commitments.length;

    let combinedItems = [];
    if (this.scheduleFilter === 'all') {
      combinedItems = [...commitments, ...studyTasks];
    } else if (this.scheduleFilter === 'tasks') {
      combinedItems = [...studyTasks];
    } else if (this.scheduleFilter === 'commitments') {
      combinedItems = [...commitments];
    }

    combinedItems.sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

    const completedTasksCount = studyTasks.filter(t => t.completed).length;
    const pendingTasksCount = studyTasks.filter(t => !t.completed).length;
    const totalStudyMins = studyTasks.reduce((sum, t) => sum + (t.duration || 60), 0);
    const studyHoursFormatted = (totalStudyMins / 60).toFixed(1) + 'h';

    const statDoneElem = document.getElementById('sched-stat-completed');
    if (statDoneElem) statDoneElem.textContent = completedTasksCount;

    const statPendingElem = document.getElementById('sched-stat-pending');
    if (statPendingElem) statPendingElem.textContent = pendingTasksCount;

    const statHoursElem = document.getElementById('sched-stat-hours');
    if (statHoursElem) statHoursElem.textContent = studyHoursFormatted;

    const schedTempoVal = document.getElementById('sched-tempo-val');
    if (schedTempoVal) schedTempoVal.textContent = audioMetronome.bpm || 60;

    if (combinedItems.length === 0) {
      container.innerHTML = `
        <div class="empty-goals-state">
          <div class="empty-icon">📅</div>
          <h3>No items found</h3>
          <p>Click "+ Add Task" to schedule a study session for today!</p>
        </div>
      `;
      return;
    }

    // NOTE: Metronome focus button intentionally REMOVED from below tasks as requested by user
    container.innerHTML = combinedItems.map(item => {
      const isCommit = item.isCommitment;
      const catClass = this.getCategoryClass(item.category);
      const prioClass = (item.priority || 'Medium').toLowerCase();

      return `
        <div class="timeline-slot-card ${item.completed ? 'completed' : ''} ${isCommit ? 'commitment' : 'study-task'}" data-id="${item.id}">
          <div class="slot-timeline-node"></div>
          
          <div class="slot-header-row">
            <div class="slot-time-range">
              <span>⏰ ${this.formatTimeSlot(item.startTime)} - ${this.formatTimeSlot(item.endTime)}</span>
              <span class="slot-duration-pill">${item.duration || 45}m</span>
            </div>
            <div class="slot-badge-tags">
              <span class="category-pill ${catClass}">${item.category}</span>
              ${!isCommit ? `<span class="priority-pill prio-${prioClass}">${item.priority}</span>` : ''}
            </div>
          </div>

          <div class="slot-content-row">
            <button class="slot-checkbox" data-id="${item.id}" data-commit="${isCommit}" title="${item.completed ? 'Mark incomplete' : 'Mark complete'}">
              ${item.completed ? '✓' : ''}
            </button>
            <div class="slot-text-group">
              <h4 class="slot-title">${this.escapeHtml(item.title)}</h4>
              ${item.notes ? `<p class="slot-notes">${this.escapeHtml(item.notes)}</p>` : ''}
              ${isCommit ? `<span class="slot-commitment-badge">📌 Daily Commitment</span>` : ''}
            </div>
          </div>

          <!-- Clean Action Row without metronome below tasks -->
          <div class="slot-actions-row">
            <span class="due-date-text">📅 ${item.dueDate || 'Today'} ${item.subject ? `• 📖 ${item.subject}` : ''}</span>
            <div class="action-btns-group">
              ${!isCommit ? `
                <button class="btn-slot-edit" data-id="${item.id}" title="Edit task details">✏️ Edit</button>
                <button class="btn-slot-delete" data-id="${item.id}" title="Delete task">🗑️</button>
              ` : `
                <span style="font-size:0.68rem; color:#888;">Personal Corner Setting</span>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.slot-checkbox').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const isCommit = btn.getAttribute('data-commit') === 'true';
        this.toggleSlotCompletion(id, isCommit);
      });
    });

    container.querySelectorAll('.btn-slot-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.openEditTaskModal(id);
      });
    });

    container.querySelectorAll('.btn-slot-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.deleteScheduleTask(id);
      });
    });
  }

  getCategoryClass(category) {
    const cat = (category || '').toLowerCase();
    if (cat.includes('academic') || cat.includes('study') || cat.includes('math') || cat.includes('science')) return 'cat-academic';
    if (cat.includes('homework') || cat.includes('tuition')) return 'cat-homework';
    if (cat.includes('revision')) return 'cat-revision';
    if (cat.includes('school')) return 'cat-school';
    if (cat.includes('meal')) return 'cat-meal';
    if (cat.includes('hobby')) return 'cat-hobby';
    if (cat.includes('sleep')) return 'cat-sleep';
    return 'cat-routine';
  }

  formatTimeSlot(timeStr) {
    if (!timeStr) return '';
    if (timeStr.includes(':')) {
      const parts = timeStr.split(':');
      let hour = parseInt(parts[0], 10);
      const min = parts[1];
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12;
      return `${hour}:${min} ${ampm}`;
    }
    return timeStr;
  }

  openTaskModal(task = null) {
    const modal = document.getElementById('modal-task-form');
    if (!modal) return;

    const modalTitle = document.getElementById('modal-task-form-title');
    const submitBtn = document.getElementById('btn-submit-task-form');

    if (task) {
      this.editingTaskId = task.id;
      if (modalTitle) modalTitle.textContent = 'Edit Schedule Task';
      if (submitBtn) submitBtn.textContent = 'Save Changes';

      document.getElementById('input-task-id').value = task.id;
      document.getElementById('input-task-title').value = task.title || '';
      document.getElementById('select-task-category').value = task.category || 'Academic';
      document.getElementById('input-task-subject').value = task.subject || '';
      document.getElementById('input-task-start-time').value = task.startTime || '19:15';
      document.getElementById('input-task-end-time').value = task.endTime || '20:30';
      document.getElementById('input-task-duration').value = task.duration || 60;
      document.getElementById('select-task-priority').value = task.priority || 'Medium';
      document.getElementById('input-task-due-date').value = task.dueDate || 'Today';
      document.getElementById('input-task-notes').value = task.notes || '';
    } else {
      this.editingTaskId = null;
      if (modalTitle) modalTitle.textContent = 'Add New Task to Schedule';
      if (submitBtn) submitBtn.textContent = 'Save to Today\'s Schedule';

      document.getElementById('input-task-id').value = '';
      document.getElementById('input-task-title').value = '';
      document.getElementById('select-task-category').value = 'Academic';
      document.getElementById('input-task-subject').value = '';
      document.getElementById('input-task-start-time').value = '19:15';
      document.getElementById('input-task-end-time').value = '20:30';
      document.getElementById('input-task-duration').value = '60';
      document.getElementById('select-task-priority').value = 'Medium';
      document.getElementById('input-task-due-date').value = 'Today';
      document.getElementById('input-task-notes').value = '';
    }

    modal.classList.add('open');
  }

  openEditTaskModal(taskId) {
    const task = this.scheduleTasks.find(t => t.id === taskId);
    if (task) this.openTaskModal(task);
  }

  closeTaskModal() {
    const modal = document.getElementById('modal-task-form');
    if (modal) {
      modal.classList.remove('open');
      this.editingTaskId = null;
    }
  }

  async handleSaveTaskForm(e) {
    e.preventDefault();
    const title = document.getElementById('input-task-title').value.trim();
    if (!title) return;

    const category = document.getElementById('select-task-category').value;
    const subject = document.getElementById('input-task-subject').value.trim();
    const startTime = document.getElementById('input-task-start-time').value;
    const endTime = document.getElementById('input-task-end-time').value;
    const duration = parseInt(document.getElementById('input-task-duration').value, 10) || 60;
    const priority = document.getElementById('select-task-priority').value;
    const dueDate = document.getElementById('input-task-due-date').value.trim() || 'Today';
    const notes = document.getElementById('input-task-notes').value.trim();

    if (this.editingTaskId) {
      const idx = this.scheduleTasks.findIndex(t => t.id === this.editingTaskId);
      if (idx !== -1) {
        this.scheduleTasks[idx] = {
          ...this.scheduleTasks[idx],
          title, category, subject, startTime, endTime, duration, priority, dueDate, notes
        };
        this.showToast('✏️ Task updated in database!');
      }
    } else {
      const newTask = {
        id: 'task_' + Date.now(),
        title, category, subject, startTime, endTime, duration, priority, dueDate, notes,
        isCommitment: false, completed: false
      };
      this.scheduleTasks.push(newTask);
      this.showToast('⏰ Task saved to your schedule database!');
    }

    await this.persistUserData();
    this.closeTaskModal();
    this.renderScheduleTimetable();
    this.renderEndYourDay();
    this.updateProgressCalculations();
  }

  async toggleSlotCompletion(id, isCommitment) {
    if (isCommitment) {
      this.showToast('💡 Fixed daily commitments are set in your Personal Corner.');
      return;
    }

    const task = this.scheduleTasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.persistUserData();
      this.renderScheduleTimetable();
      this.renderEndYourDay();
      this.updateProgressCalculations();

      if (task.completed) {
        audioMetronome.playTick(true);
        this.showToast('🎉 Task completed! Steadily onward!');
      } else {
        this.showToast('Task marked incomplete');
      }
    }
  }

  async deleteScheduleTask(id) {
    if (confirm('Delete this task from Today\'s Schedule?')) {
      this.scheduleTasks = this.scheduleTasks.filter(t => t.id !== id);
      await this.persistUserData();
      this.renderScheduleTimetable();
      this.renderEndYourDay();
      this.updateProgressCalculations();
      this.showToast('🗑️ Task removed from database.');
    }
  }

  // ===================================================================
  // SCREEN 3: END YOUR DAY (REVIEW & SMART RESCHEDULING)
  // ===================================================================
  renderEndYourDay() {
    const studyTasks = this.scheduleTasks || [];
    const dailyGoals = this.goals.daily || [];

    const completedTasks = studyTasks.filter(t => t.completed);
    const unfinishedTasks = studyTasks.filter(t => !t.completed);

    const totalTasksCount = studyTasks.length + dailyGoals.length;
    const totalDoneCount = completedTasks.length + dailyGoals.filter(g => g.completed).length;
    const dailyPct = totalTasksCount > 0 ? Math.round((totalDoneCount / totalTasksCount) * 100) : 0;

    const pctLabel = document.getElementById('end-day-pct-label');
    if (pctLabel) pctLabel.textContent = `${dailyPct}%`;

    const circleMeter = document.getElementById('end-day-circle-meter');
    if (circleMeter) {
      const circumference = 2 * Math.PI * 48;
      const offset = circumference - (dailyPct / 100) * circumference;
      circleMeter.style.strokeDashoffset = offset;
    }

    const metricDone = document.getElementById('metric-tasks-done');
    if (metricDone) metricDone.textContent = completedTasks.length;

    const metricPending = document.getElementById('metric-tasks-pending');
    if (metricPending) metricPending.textContent = unfinishedTasks.length;

    const endDayPendingCount = document.getElementById('end-day-pending-count');
    if (endDayPendingCount) endDayPendingCount.textContent = unfinishedTasks.length;

    // Completed Tasks
    const completedList = document.getElementById('end-day-completed-list');
    if (completedList) {
      if (completedTasks.length === 0) {
        completedList.innerHTML = `<p style="font-size:0.78rem; color:#888;">No schedule tasks finished yet today.</p>`;
      } else {
        completedList.innerHTML = completedTasks.map(t => `
          <div class="completed-task-pill-item">
            <span><strong>✓</strong> ${this.escapeHtml(t.title)}</span>
            <span style="font-size:0.7rem; color:#15803D; font-weight:700;">Completed (${t.duration || 60}m)</span>
          </div>
        `).join('');
      }
    }

    // Reschedule Unfinished Tasks
    const rescheduleContainer = document.getElementById('reschedule-items-list');
    const statusBadge = document.getElementById('reschedule-status-badge');
    const disclaimer = document.getElementById('reschedule-disclaimer-text');

    if (this.isRescheduledAccepted) {
      if (statusBadge) {
        statusBadge.textContent = '✨ Rescheduled Accepted';
        statusBadge.style.background = '#DCFCE7';
        statusBadge.style.color = '#15803D';
      }
      if (disclaimer) disclaimer.textContent = '✓ Unfinished tasks are comfortably slotted into tomorrow afternoon and evening!';
    } else {
      if (statusBadge) {
        statusBadge.textContent = 'Proposed Plan Ready';
        statusBadge.style.background = '#FEF3C7';
        statusBadge.style.color = '#B45309';
      }
      if (disclaimer) disclaimer.textContent = 'Accepting automatically fits these tasks into tomorrow\'s free slots after school and tuition.';
    }

    if (rescheduleContainer) {
      if (unfinishedTasks.length === 0) {
        rescheduleContainer.innerHTML = `
          <div class="empty-goals-state">
            <div class="empty-icon">🎉</div>
            <h4>All tasks completed!</h4>
            <p>You have zero unfinished tasks today. Sleep with a peaceful mind!</p>
          </div>
        `;
      } else {
        rescheduleContainer.innerHTML = unfinishedTasks.map((t, idx) => {
          const proposedTime = this.getProposedTomorrowSlot(idx);
          const isAccepted = this.isRescheduledAccepted;

          return `
            <div class="reschedule-task-row ${isAccepted ? 'accepted' : ''}">
              <div class="reschedule-task-top">
                <span class="reschedule-task-title">${this.escapeHtml(t.title)}</span>
                <span class="priority-pill prio-${(t.priority || 'medium').toLowerCase()}">${t.priority}</span>
              </div>
              <div class="reschedule-proposal-box">
                <span>Today: ${this.formatTimeSlot(t.startTime)}</span>
                <span class="reschedule-arrow">➔</span>
                <span><strong>Suggested Tomorrow:</strong> ${proposedTime} (${t.duration || 45}m)</span>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    this.renderTomorrowSchedulePreview();
  }

  getProposedTomorrowSlot(index) {
    const slots = [
      '15:30 - 16:30 (After School Rest)',
      '19:15 - 20:15 (Evening Study Session)',
      '21:15 - 22:00 (Post-Dinner Revision)',
      '16:30 - 17:15 (Pre-Tuition Slot)'
    ];
    return slots[index % slots.length];
  }

  renderTomorrowSchedulePreview() {
    const container = document.getElementById('tomorrow-preview-timeline');
    if (!container) return;

    const prof = this.profile;
    const unfinished = this.scheduleTasks.filter(t => !t.completed);

    const baseBlocks = [
      { time: '07:45 AM - 02:00 PM', title: `🏫 School (${prof.schoolTimings || '07:45 - 02:00'})`, type: 'School' },
      { time: '02:00 PM - 03:30 PM', title: '🍲 Lunch, Rest & Free Rhythm', type: 'Rest' }
    ];

    if (this.isRescheduledAccepted && unfinished.length > 0) {
      unfinished.forEach((t, idx) => {
        baseBlocks.push({
          time: idx === 0 ? '03:30 PM - 04:30 PM' : '07:15 PM - 08:15 PM',
          title: `📚 [Rescheduled] ${t.title}`,
          type: 'Rescheduled'
        });
      });
    }

    baseBlocks.push(
      { time: '04:30 PM - 06:30 PM', title: `✍️ Tuition & Coaching (${prof.tuitionTimings || '04:30 - 06:30'})`, type: 'Tuition' },
      { time: '08:30 PM - 09:15 PM', title: '🥗 Dinner & Wind-Down', type: 'Meal' },
      { time: '10:30 PM', title: '🌙 Peaceful Sleep', type: 'Sleep' }
    );

    container.innerHTML = baseBlocks.map(block => {
      const isResched = block.type === 'Rescheduled';
      return `
        <div class="tomorrow-block-row ${isResched ? 'rescheduled-slot' : ''}">
          <div>
            <div class="tomorrow-block-time">⏰ ${block.time}</div>
            <div class="tomorrow-block-title">${this.escapeHtml(block.title)}</div>
          </div>
          <span class="tomorrow-block-badge ${isResched ? 'priority-pill prio-high' : 'category-pill cat-routine'}">
            ${isResched ? 'Rescheduled' : block.type}
          </span>
        </div>
      `;
    }).join('');
  }

  handleAcceptRescheduling() {
    this.isRescheduledAccepted = true;
    audioMetronome.playTick(true);
    audioMetronome.playChords(DEFAULT_SONGS[0].notes);
    this.renderEndYourDay();
    this.showToast('✨ Unfinished tasks rescheduled for tomorrow! Rest in peace tonight.');
  }

  handleUndoRescheduling() {
    this.isRescheduledAccepted = false;
    this.renderEndYourDay();
    this.showToast('↩ Rescheduling reverted.');
  }

  // ===================================================================
  // SCREEN 4: MULTI-LANGUAGE MUSIC (HINDI, ENGLISH, AND CUSTOM CHOICE)
  // ===================================================================
  renderSongLibrary() {
    const container = document.getElementById('songs-playlist-container');
    if (!container) return;

    let filtered = this.allSongs;
    if (this.selectedSongLang === 'Hindi') {
      filtered = this.allSongs.filter(s => s.language === 'Hindi');
    } else if (this.selectedSongLang === 'English') {
      filtered = this.allSongs.filter(s => s.language === 'English');
    } else if (this.selectedSongLang === 'other') {
      filtered = this.allSongs.filter(s => s.language !== 'Hindi' && s.language !== 'English' && !s.isCustom);
    } else if (this.selectedSongLang === 'custom') {
      filtered = this.allSongs.filter(s => s.isCustom);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-goals-state">
          <div class="empty-icon">🎵</div>
          <h4>No songs in this filter</h4>
          <p>Click "+ Add Song of Choice" to add your favorite Hindi or English song!</p>
        </div>
      `;
      return;
    }

    const currentTrackId = this.activeSong?.id;
    const isPlaying = audioMetronome.ambientPlaying;

    container.innerHTML = filtered.map(song => {
      const isNowPlaying = (song.id === currentTrackId && isPlaying);
      const flag = song.langFlag || '🎵';
      const langClass = 'lang-' + (song.language || 'other').toLowerCase();

      return `
        <div class="song-card-item ${isNowPlaying ? 'now-playing' : ''}" data-id="${song.id}">
          <div class="song-item-left">
            <div class="song-mini-disc">
              <span>${flag}</span>
            </div>
            <div class="song-details-col">
              <div class="song-title-row">
                <span class="song-name-text">${this.escapeHtml(song.title)}</span>
                <span class="song-lang-badge ${langClass}">${song.language}</span>
                ${song.isCustom ? `<span class="song-lang-badge lang-custom">My Choice</span>` : ''}
              </div>
              <span class="song-artist-text">${this.escapeHtml(song.artist || 'Acoustic Ambience')} • ${song.tempo || 60} BPM</span>
            </div>
          </div>

          <div class="song-item-actions">
            <button class="btn-play-track" data-id="${song.id}" title="${isNowPlaying ? 'Pause song' : 'Play song'}">
              <span>${isNowPlaying ? '⏸ Pause' : '▶ Play'}</span>
            </button>
            ${song.isCustom ? `
              <button class="btn-delete-song" data-id="${song.id}" title="Remove song from library">🗑️</button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Attach listeners
    container.querySelectorAll('.btn-play-track').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const song = this.allSongs.find(s => s.id === id);
        if (song) this.playSelectedTrack(song);
      });
    });

    container.querySelectorAll('.btn-delete-song').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.deleteCustomSong(id);
      });
    });

    // Update Player Display
    this.updatePlayerDisplay();
  }

  updatePlayerDisplay() {
    const song = this.activeSong || DEFAULT_SONGS[0];
    const titleElem = document.getElementById('song-title');
    if (titleElem) titleElem.textContent = song.title;

    const descElem = document.getElementById('song-desc');
    if (descElem) descElem.textContent = `${song.language} Melody • ${song.description || song.artist}`;

    const moodBadge = document.getElementById('song-mood-badge');
    if (moodBadge) moodBadge.textContent = `${song.langFlag || '🎵'} ${song.language} • ${song.artist || 'Relaxing'}`;

    const tempoElem = document.getElementById('song-tempo-display');
    if (tempoElem) tempoElem.textContent = song.tempo || 60;

    const sliderElem = document.getElementById('music-bpm-adjust');
    if (sliderElem) sliderElem.value = song.tempo || 60;

    const sliderLabel = document.getElementById('music-slider-bpm');
    if (sliderLabel) sliderLabel.textContent = song.tempo || 60;

    const disc = document.getElementById('music-disc-visual');
    const playSymbol = document.getElementById('music-play-symbol');
    const playLabel = document.getElementById('music-play-label');

    if (audioMetronome.ambientPlaying) {
      if (disc) disc.classList.add('playing');
      if (playSymbol) playSymbol.textContent = '⏸';
      if (playLabel) playLabel.textContent = 'Pause Music';
    } else {
      if (disc) disc.classList.remove('playing');
      if (playSymbol) playSymbol.textContent = '▶';
      if (playLabel) playLabel.textContent = `Play ${song.title.substring(0, 20)}...`;
    }
  }

  playSelectedTrack(song) {
    if (this.activeSong?.id === song.id && audioMetronome.ambientPlaying) {
      audioMetronome.stopSong();
      this.showToast('⏸ Music paused');
    } else {
      this.activeSong = song;
      audioMetronome.playTrack(song);
      this.showToast(`🎶 Now playing: ${song.title} (${song.language})`);
    }
    this.renderSongLibrary();
  }

  toggleActiveSongPlayback() {
    const track = this.activeSong || DEFAULT_SONGS[0];
    const isNowPlaying = audioMetronome.toggleSong(track);
    this.renderSongLibrary();
    if (isNowPlaying) {
      this.showToast(`🎶 Playing: ${track.title}`);
    } else {
      this.showToast('⏸ Music paused');
    }
  }

  handleSelectMood(moodKey) {
    // Filter songs matching this mood
    const matchingSong = this.allSongs.find(s => s.mood === moodKey) || DEFAULT_SONGS[0];
    this.playSelectedTrack(matchingSong);

    document.querySelectorAll('.mood-chip').forEach(chip => {
      if (chip.getAttribute('data-mood') === moodKey) chip.classList.add('active');
      else chip.classList.remove('active');
    });
  }

  // --- CUSTOM SONG ADD / DELETE ---
  openAddSongModal() {
    const modal = document.getElementById('modal-add-song');
    if (modal) modal.classList.add('open');
  }

  closeAddSongModal() {
    const modal = document.getElementById('modal-add-song');
    if (modal) modal.classList.remove('open');
  }

  async handleSaveCustomSong(e) {
    e.preventDefault();
    const title = document.getElementById('input-song-title').value.trim();
    if (!title) return;

    const language = document.getElementById('select-song-language').value;
    const artist = document.getElementById('input-song-artist').value.trim() || 'Student Favorite';
    const mood = document.getElementById('select-song-mood').value;
    const melodyStyle = document.getElementById('select-song-melody').value;
    const customUrl = document.getElementById('input-song-url').value.trim();

    // Generate harmonic notes based on melody style
    let notes = [261.63, 329.63, 392.00, 523.25];
    if (melodyStyle === 'raag') notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // Raag Bilawal / Yaman
    else if (melodyStyle === 'flute') notes = [220.00, 246.94, 277.18, 329.63, 440.00];
    else if (melodyStyle === 'chimes') notes = [293.66, 369.99, 440.00, 587.33];
    else if (melodyStyle === 'piano') notes = [261.63, 329.63, 392.00, 523.25];
    else if (melodyStyle === 'rain') notes = [261.63, 311.13, 392.00, 466.16];

    let langFlag = '🎵';
    if (language === 'Hindi' || language === 'Punjabi' || language === 'Bengali' || language === 'Tamil' || language === 'Telugu') langFlag = '🇮🇳';
    else if (language === 'English') langFlag = '🇬🇧';
    else if (language === 'Spanish') langFlag = '🇪🇸';
    else if (language === 'Korean') langFlag = '🇰🇷';
    else if (language === 'Japanese') langFlag = '🇯🇵';

    const newSong = {
      id: 'custom_' + Date.now(),
      title,
      language,
      langFlag,
      artist,
      mood,
      notes,
      tempo: 60,
      customUrl: customUrl || null,
      description: `Added by student (${language})`,
      isCustom: true
    };

    this.customSongs.push(newSong);
    this.updateAllSongsList();
    await this.persistUserData();

    this.closeAddSongModal();
    this.renderSongLibrary();
    this.playSelectedTrack(newSong);
    this.showToast(`🎶 Saved "${title}" (${language}) to your personal song library!`);
  }

  async deleteCustomSong(songId) {
    if (confirm('Remove this song from your library?')) {
      this.customSongs = this.customSongs.filter(s => s.id !== songId);
      this.updateAllSongsList();
      await this.persistUserData();
      this.renderSongLibrary();
      this.showToast('🗑️ Song removed from database.');
    }
  }

  // ===================================================================
  // SCREEN 1: PROFILE, GOALS, PROGRESS CALCULATIONS
  // ===================================================================
  renderProfile() {
    const nameDisplay = document.getElementById('student-name-display');
    if (nameDisplay) nameDisplay.textContent = this.profile.name || 'Shweta';

    const miniClass = document.getElementById('mini-student-class');
    if (miniClass) miniClass.textContent = `Class ${this.profile.studentClass || '10th'}`;

    const miniTiming = document.getElementById('mini-school-timing');
    if (miniTiming) miniTiming.textContent = `🏫 ${this.profile.schoolTimings || '07:45 - 02:00'}`;

    document.getElementById('input-student-name').value = this.profile.name || 'Shweta';
    document.getElementById('select-student-class').value = this.profile.studentClass || '10th';
    document.getElementById('input-subjects').value = this.profile.preferredSubjects || '';
    document.getElementById('input-hobbies').value = this.profile.hobbies || '';
    document.getElementById('input-school-timings').value = this.profile.schoolTimings || '';
    document.getElementById('input-tuition-timings').value = this.profile.tuitionTimings || '';
    document.getElementById('input-freetime').value = this.profile.freeTimeActivities || '';
    document.getElementById('input-learning-pace').value = this.profile.learningPace || '';

    if (this.profile.sleepWakeTimings) {
      document.getElementById('input-wake-time').value = this.profile.sleepWakeTimings.wake || '06:00';
      document.getElementById('input-sleep-time').value = this.profile.sleepWakeTimings.sleep || '22:30';
    }

    if (this.profile.mealTimings) {
      document.getElementById('input-breakfast-time').value = this.profile.mealTimings.breakfast || '07:15';
      document.getElementById('input-lunch-time').value = this.profile.mealTimings.lunch || '13:30';
      document.getElementById('input-dinner-time').value = this.profile.mealTimings.dinner || '20:30';
    }
  }

  openPersonalCornerModal() {
    const modal = document.getElementById('modal-personal-corner');
    if (modal) modal.classList.add('open');
  }

  closePersonalCornerModal() {
    const modal = document.getElementById('modal-personal-corner');
    if (modal) modal.classList.remove('open');
  }

  async handleSaveProfile(e) {
    e.preventDefault();

    this.profile = {
      ...this.profile,
      name: document.getElementById('input-student-name').value.trim() || 'Shweta',
      studentClass: document.getElementById('select-student-class').value,
      preferredSubjects: document.getElementById('input-subjects').value.trim(),
      hobbies: document.getElementById('input-hobbies').value.trim(),
      schoolTimings: document.getElementById('input-school-timings').value.trim(),
      tuitionTimings: document.getElementById('input-tuition-timings').value.trim(),
      freeTimeActivities: document.getElementById('input-freetime').value.trim(),
      learningPace: document.getElementById('input-learning-pace').value.trim(),
      sleepWakeTimings: {
        wake: document.getElementById('input-wake-time').value,
        sleep: document.getElementById('input-sleep-time').value
      },
      mealTimings: {
        breakfast: document.getElementById('input-breakfast-time').value,
        lunch: document.getElementById('input-lunch-time').value,
        dinner: document.getElementById('input-dinner-time').value
      }
    };

    if (this.currentUser) {
      this.currentUser.name = this.profile.name;
      this.currentUser.studentClass = this.profile.studentClass;
      await appDB.saveUser(this.currentUser);
    }

    await this.persistUserData();
    this.renderSessionBar();
    this.renderProfile();
    this.renderScheduleTimetable();
    this.renderEndYourDay();
    this.closePersonalCornerModal();
    this.showToast(`✨ Preferences saved to database for ${this.profile.name}!`);
  }

  renderQuote() {
    const quote = DAILY_QUOTES[this.quoteIndex % DAILY_QUOTES.length];
    const textElem = document.getElementById('daily-quote-text');
    const authorElem = document.getElementById('daily-quote-author');
    const tagElem = document.getElementById('quote-category');

    if (textElem) textElem.textContent = `"${quote.quote}"`;
    if (authorElem) authorElem.textContent = `— ${quote.author}`;
    if (tagElem) tagElem.textContent = `${quote.tag} ✨`;
  }

  cycleNextQuote() {
    this.quoteIndex = (this.quoteIndex + 1) % DAILY_QUOTES.length;
    this.renderQuote();
    this.showToast('✨ Fresh motivation loaded!');
  }

  switchGoalTab(tab) {
    this.activeGoalTab = tab;
    document.querySelectorAll('.goal-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tab) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    this.renderGoals();
  }

  renderGoals() {
    const listContainer = document.getElementById('goals-list-container');
    if (!listContainer) return;

    document.getElementById('count-daily').textContent = (this.goals.daily || []).length;
    document.getElementById('count-weekly').textContent = (this.goals.weekly || []).length;
    document.getElementById('count-monthly').textContent = (this.goals.monthly || []).length;

    const currentGoals = this.goals[this.activeGoalTab] || [];

    if (currentGoals.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-goals-state">
          <div class="empty-icon">🌱</div>
          <p>No ${this.activeGoalTab} goals set yet. Add one above to find your rhythm!</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = currentGoals.map(goal => `
      <div class="goal-item ${goal.completed ? 'completed' : ''}" data-id="${goal.id}">
        <div class="goal-left">
          <button class="goal-checkbox-btn" data-id="${goal.id}" title="${goal.completed ? 'Mark incomplete' : 'Mark complete'}">
            ${goal.completed ? '✓' : ''}
          </button>
          <div class="goal-text-content">
            <span class="goal-text-desc">${this.escapeHtml(goal.text)}</span>
            <span class="goal-category-tag">🏷️ ${goal.category || 'General'}</span>
          </div>
        </div>
        <div class="goal-actions">
          <button class="btn-delete-goal" data-id="${goal.id}" title="Remove goal">✕</button>
        </div>
      </div>
    `).join('');

    listContainer.querySelectorAll('.goal-checkbox-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const goalId = btn.getAttribute('data-id');
        this.toggleGoalCompletion(goalId);
      });
    });

    listContainer.querySelectorAll('.btn-delete-goal').forEach(btn => {
      btn.addEventListener('click', () => {
        const goalId = btn.getAttribute('data-id');
        this.deleteGoal(goalId);
      });
    });
  }

  async handleAddGoal(e) {
    e.preventDefault();
    const input = document.getElementById('input-goal-text');
    const select = document.getElementById('select-goal-category');
    const text = input.value.trim();
    if (!text) return;

    const newGoal = {
      id: 'g_' + Date.now(),
      text: text,
      category: select.value,
      completed: false,
      date: this.activeGoalTab === 'daily' ? 'Today' : (this.activeGoalTab === 'weekly' ? 'This Week' : 'This Month')
    };

    if (!this.goals[this.activeGoalTab]) this.goals[this.activeGoalTab] = [];
    this.goals[this.activeGoalTab].unshift(newGoal);

    await this.persistUserData();
    input.value = '';
    this.renderGoals();
    this.renderEndYourDay();
    this.updateProgressCalculations();
    this.showToast(`🎯 Added to ${this.activeGoalTab} goals in database!`);
  }

  async toggleGoalCompletion(goalId) {
    const list = this.goals[this.activeGoalTab];
    if (!list) return;

    const goal = list.find(g => g.id === goalId);
    if (goal) {
      goal.completed = !goal.completed;
      await this.persistUserData();
      this.renderGoals();
      this.renderEndYourDay();
      this.updateProgressCalculations();

      if (goal.completed) {
        audioMetronome.playTick(true);
        this.showToast('🎉 Goal completed!');
      }
    }
  }

  async deleteGoal(goalId) {
    const list = this.goals[this.activeGoalTab];
    if (!list) return;

    this.goals[this.activeGoalTab] = list.filter(g => g.id !== goalId);
    await this.persistUserData();
    this.renderGoals();
    this.renderEndYourDay();
    this.updateProgressCalculations();
    this.showToast('🗑️ Goal removed from database.');
  }

  updateProgressCalculations() {
    const daily = this.goals.daily || [];
    const weekly = this.goals.weekly || [];
    const monthly = this.goals.monthly || [];

    const schedTasks = this.scheduleTasks || [];
    const schedDone = schedTasks.filter(t => t.completed).length;
    const schedTotal = schedTasks.length;

    const dailyDone = daily.filter(g => g.completed).length + schedDone;
    const dailyTotal = daily.length + schedTotal;
    const dailyPct = dailyTotal > 0 ? Math.round((dailyDone / dailyTotal) * 100) : 0;

    const weeklyDone = weekly.filter(g => g.completed).length;
    const weeklyTotal = weekly.length;
    const weeklyPct = weeklyTotal > 0 ? Math.round((weeklyDone / weeklyTotal) * 100) : 0;

    const monthlyDone = monthly.filter(g => g.completed).length;
    const monthlyTotal = monthly.length;
    const monthlyPct = monthlyTotal > 0 ? Math.round((monthlyDone / monthlyTotal) * 100) : 0;

    const totalGoals = dailyTotal + weeklyTotal + monthlyTotal;
    const totalDone = dailyDone + weeklyDone + monthlyDone;
    const overallPct = totalGoals > 0 ? Math.round((totalDone / totalGoals) * 100) : 0;

    const miniPct = document.getElementById('mini-progress-pct');
    if (miniPct) miniPct.textContent = `${dailyPct}%`;

    const miniMeter = document.getElementById('mini-meter-fill');
    if (miniMeter) miniMeter.style.width = `${dailyPct}%`;

    const miniTasks = document.getElementById('mini-tasks-count');
    if (miniTasks) miniTasks.textContent = `${dailyDone} of ${dailyTotal} tasks`;

    const modalRingPct = document.getElementById('modal-ring-percentage');
    if (modalRingPct) modalRingPct.textContent = `${overallPct}%`;

    const circleMeter = document.getElementById('progress-circle-meter');
    if (circleMeter) {
      const circumference = 2 * Math.PI * 48;
      const offset = circumference - (overallPct / 100) * circumference;
      circleMeter.style.strokeDashoffset = offset;
    }

    const dailyRatioElem = document.getElementById('daily-progress-ratio');
    if (dailyRatioElem) dailyRatioElem.textContent = `${dailyDone}/${dailyTotal} Tasks`;
    const dailyFill = document.getElementById('daily-bar-fill');
    if (dailyFill) dailyFill.style.width = `${dailyPct}%`;
    const dailyPctLabel = document.getElementById('daily-progress-pct-label');
    if (dailyPctLabel) dailyPctLabel.textContent = `${dailyPct}% Complete`;

    const weeklyRatioElem = document.getElementById('weekly-progress-ratio');
    if (weeklyRatioElem) weeklyRatioElem.textContent = `${weeklyDone}/${weeklyTotal} Goals`;
    const weeklyFill = document.getElementById('weekly-bar-fill');
    if (weeklyFill) weeklyFill.style.width = `${weeklyPct}%`;
    const weeklyPctLabel = document.getElementById('weekly-progress-pct-label');
    if (weeklyPctLabel) weeklyPctLabel.textContent = `${weeklyPct}% Complete`;

    const monthlyRatioElem = document.getElementById('monthly-progress-ratio');
    if (monthlyRatioElem) monthlyRatioElem.textContent = `${monthlyDone}/${monthlyTotal} Goals`;
    const monthlyFill = document.getElementById('monthly-bar-fill');
    if (monthlyFill) monthlyFill.style.width = `${monthlyPct}%`;
    const monthlyPctLabel = document.getElementById('monthly-progress-pct-label');
    if (monthlyPctLabel) monthlyPctLabel.textContent = `${monthlyPct}% Complete`;

    const accomplishedList = document.getElementById('accomplished-items-list');
    if (accomplishedList) {
      const allCompleted = [
        ...schedTasks.filter(t => t.completed).map(t => ({ text: t.title, scope: 'Schedule' })),
        ...daily.filter(g => g.completed).map(g => ({ ...g, scope: 'Daily' })),
        ...weekly.filter(g => g.completed).map(g => ({ ...g, scope: 'Weekly' })),
        ...monthly.filter(g => g.completed).map(g => ({ ...g, scope: 'Monthly' }))
      ];

      if (allCompleted.length === 0) {
        accomplishedList.innerHTML = `<p style="font-size:0.8rem; color:#888;">No tasks completed yet. Check off a goal to see it here!</p>`;
      } else {
        accomplishedList.innerHTML = allCompleted.map(item => `
          <div class="accomplished-item">
            <span class="accomplished-check">✓</span>
            <span><strong>[${item.scope}]</strong> ${this.escapeHtml(item.text)}</span>
          </div>
        `).join('');
      }
    }
  }

  openProgressModal() {
    this.updateProgressCalculations();
    const modal = document.getElementById('modal-progress-details');
    if (modal) modal.classList.add('open');
  }

  closeProgressModal() {
    const modal = document.getElementById('modal-progress-details');
    if (modal) modal.classList.remove('open');
  }

  // --- METRONOME ---
  setupMetronomeBeatSync() {
    audioMetronome.onBeat((beatNum) => {
      const headerDot = document.getElementById('header-metronome-icon');
      if (headerDot) {
        headerDot.style.transform = beatNum % 2 === 0 ? 'rotate(10deg)' : 'rotate(-10deg)';
      }
    });
  }

  updateBpm(newBpm) {
    this.profile.metronomeBpm = newBpm;
    audioMetronome.setBpm(newBpm);

    const headerBpm = document.getElementById('header-bpm');
    if (headerBpm) headerBpm.textContent = newBpm;

    const bpmDisplay = document.getElementById('bpm-value-display');
    if (bpmDisplay) bpmDisplay.textContent = newBpm;

    const schedTempoVal = document.getElementById('sched-tempo-val');
    if (schedTempoVal) schedTempoVal.textContent = newBpm;
  }

  toggleMetronome() {
    const isPlaying = audioMetronome.toggle();
    const btnIcon = document.getElementById('audio-state-icon');
    const btnText = document.getElementById('audio-state-text');
    const quickBadge = document.getElementById('quick-metronome-btn');

    if (isPlaying) {
      if (btnIcon) btnIcon.textContent = '⏸';
      if (btnText) btnText.textContent = 'Pause Rhythm';
      if (quickBadge) quickBadge.style.background = '#FFE599';
      this.showToast(`🎵 Steady Metronome: ${audioMetronome.bpm} BPM started`);
    } else {
      if (btnIcon) btnIcon.textContent = '▶';
      if (btnText) btnText.textContent = 'Play Steady Rhythm';
      if (quickBadge) quickBadge.style.background = '';
      this.showToast('⏸ Metronome paused');
    }
  }

  showToast(message) {
    const toast = document.getElementById('toast-container');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  escapeHtml(str) {
    return (str || '')
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.thisTownDashboard = new ThisTownDashboard();
});
