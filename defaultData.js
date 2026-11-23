// Default data reflecting the initial sketch for "This Town - A Sweet Home for Students' Metronome"

export const defaultProfile = {
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
  freeTimeActivities: "Listening to chill lo-fi music, evening terrace stroll, journaling",
  preferredSubjects: "Mathematics, Physics, Biology, English Literature",
  learningPace: "12-15 questions per hour / 1 chapter in 1.5 hours",
  metronomeBpm: 60,
  studyStreakDays: 5
};

export const defaultGoals = {
  daily: [
    { id: 'd1', text: 'Solve 15 trigonometry practice questions', category: 'Maths', completed: true, date: 'Today' },
    { id: 'd2', text: 'Revise Chapter 6 Life Processes (Biology diagrams)', category: 'Science', completed: true, date: 'Today' },
    { id: 'd3', text: 'Write summary for English poem "The Road Not Taken"', category: 'English', completed: false, date: 'Today' },
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

// Screen 2: Today's Schedule - Tasks
export const defaultScheduleTasks = [
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
    notes: 'Focus on Ex 8.4 identity proofs with 60 BPM metronome',
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

// Screen 3: Mood & Music Presets
export const moodMusicPresets = {
  calm: {
    id: 'calm',
    label: '😌 Calm & Content',
    title: 'Twilight Study Chimes',
    description: 'Gentle pentatonic bells & soft 60 BPM metronome tick to ease the mind',
    tempo: 60,
    notes: [261.63, 329.63, 392.00, 523.25] // C4, E4, G4, C5
  },
  sleepy: {
    id: 'sleepy',
    label: '😴 Sleepy & Ready for Rest',
    title: 'Warm Hearth & Starlight Lullaby',
    description: 'Deep soothing tones (48 BPM) designed to slow brain waves for deep restorative sleep',
    tempo: 48,
    notes: [220.00, 277.18, 329.63, 440.00] // A3, C#4, E4, A4
  },
  proud: {
    id: 'proud',
    label: '🌟 Proud of Today',
    title: 'Quiet Triumph Melody',
    description: 'Harmonious gentle chords celebrating small victories and continuous rhythm',
    tempo: 68,
    notes: [293.66, 369.99, 440.00, 587.33] // D4, F#4, A4, D5
  },
  decompress: {
    id: 'decompress',
    label: '🧘 Need to Decompress',
    title: 'Gentle Rain & Soft Chords',
    description: 'Unhurried soothing frequencies to dissolve tension from exams and tuition',
    tempo: 52,
    notes: [261.63, 311.13, 392.00, 466.16] // C4, Eb4, G4, Bb4
  }
};
