// Default Multi-Language Song Library & Mood Presets for "This Town"
// Features English songs, Hindi songs, and other languages for students' choices

export const defaultSongLibrary = [
  // --- HINDI SONGS (Peaceful, Lofi, Acoustic, Raag) ---
  {
    id: 'hi-1',
    title: 'Kesariya (Peaceful Lofi Ambient Raag)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Acoustic Sitar & Piano Lofi',
    mood: 'calm',
    moodLabel: '😌 Calm & Content',
    notes: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // Raag Yaman / Bilawal pentatonic
    tempo: 60,
    description: 'Unhurried bansuri flute and warm sitar resonance to dissolve evening tension'
  },
  {
    id: 'hi-2',
    title: 'Phir Le Aya Dil (Gentle Twilight Bansuri)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Classical Bansuri & Rain Ambience',
    mood: 'sleepy',
    moodLabel: '😴 Sleepy & Restful',
    notes: [220.00, 246.94, 277.18, 329.63, 440.00], // Soothing deep tones
    tempo: 48,
    description: 'Soulful twilight flute melody designed to slow down thoughts before sleep'
  },
  {
    id: 'hi-3',
    title: 'Iktara (Evening Rooftop Relaxing Instrumental)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Acoustic Guitar & Warm Chords',
    mood: 'proud',
    moodLabel: '🌟 Proud of Today',
    notes: [293.66, 369.99, 440.00, 587.33], // D Major joyful acoustic
    tempo: 66,
    description: 'Lighthearted, uplifting melody celebrating consistent daily study rhythm'
  },
  {
    id: 'hi-4',
    title: 'Raataan Lambiyan (Midnight Chill Chords)',
    language: 'Hindi',
    langFlag: '🇮🇳',
    artist: 'Lo-Fi Chill & Sub-Bass',
    mood: 'decompress',
    moodLabel: '🧘 Need to Decompress',
    notes: [261.63, 311.13, 392.00, 466.16], // Minor soothing breeze
    tempo: 52,
    description: 'Soft night breeze melodies to decompress after long study hours'
  },

  // --- ENGLISH SONGS (Chill, Acoustic, Study Beats) ---
  {
    id: 'en-1',
    title: 'Golden Hour (Cozy Piano Study Chords)',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Warm Felt Piano',
    mood: 'calm',
    moodLabel: '😌 Calm & Content',
    notes: [261.63, 329.63, 392.00, 523.25],
    tempo: 60,
    description: 'Golden twilight chords inspiring quiet confidence and steady focus'
  },
  {
    id: 'en-2',
    title: 'Night Changes (Acoustic Starlight Chimes)',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Acoustic Fingerstyle & Music Box',
    mood: 'sleepy',
    moodLabel: '😴 Sleepy & Restful',
    notes: [220.00, 277.18, 329.63, 440.00],
    tempo: 46,
    description: 'Gentle acoustic strings reminding you that tomorrow is a fresh beginning'
  },
  {
    id: 'en-3',
    title: 'Until I Found You (Midnight Vinyl Lofi)',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Vintage Vinyl Lo-Fi',
    mood: 'decompress',
    moodLabel: '🧘 Need to Decompress',
    notes: [261.63, 349.23, 392.00, 523.25],
    tempo: 54,
    description: 'Nostalgic, gentle melodies with vinyl crackle for winding down'
  },
  {
    id: 'en-4',
    title: 'Twilight Study Chimes',
    language: 'English',
    langFlag: '🇬🇧',
    artist: 'Pentatonic Bells & Soft Ticks',
    mood: 'proud',
    moodLabel: '🌟 Proud of Today',
    notes: [293.66, 329.63, 392.00, 440.00],
    tempo: 64,
    description: 'Clear, peaceful bell tones reflecting on your accomplishments'
  },

  // --- OTHER LANGUAGES (Japanese, Spanish, Instrumental) ---
  {
    id: 'oth-1',
    title: 'Ghibli Starlight Lullaby',
    language: 'Japanese',
    langFlag: '🇯🇵',
    artist: 'Anime Piano & Night Crickets',
    mood: 'sleepy',
    moodLabel: '😴 Sleepy & Restful',
    notes: [246.94, 293.66, 329.63, 392.00, 493.88],
    tempo: 48,
    description: 'Magical and comforting Japanese animated soundtrack piano melody'
  },
  {
    id: 'oth-2',
    title: 'Breeze of Cordoba (Spanish Classical Guitar)',
    language: 'Spanish',
    langFlag: '🇪🇸',
    artist: 'Nylon Acoustic Strings',
    mood: 'calm',
    moodLabel: '😌 Calm & Content',
    notes: [261.63, 329.63, 392.00, 493.88],
    tempo: 58,
    description: 'Warm Spanish acoustic arpeggios that relax the shoulder muscles'
  }
];
