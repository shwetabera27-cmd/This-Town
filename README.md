# 🏡 This Town – A Sweet Home for Students' Metronome
### Complete 3-Screen Application with IndexedDB Database & Multi-User Accounts

A warm, comforting, and fully interactive student productivity companion tailored for school students from **Classes 9–12**, designed to overcome academic overwhelm, procrastination, and inconsistent daily routines through the steady, calming rhythm of a metronome.

---

## 🔒 Database & Account Architecture (Zero Data Loss on Refresh)

- **IndexedDB Database Engine (`ThisTownStudentDB`)**:
  - `users`: Student account credentials (email as unique key, name, class, password).
  - `profiles`: Isolated academic routines (timings, subjects, hobbies, learning pace).
  - `schedules`: Individual student daily timetable and tasks.
  - `goals`: Individual student daily, weekly, and monthly targets.
  - `songs`: Student custom song selections and multi-language choices.
- **Privacy First**: No phone numbers, physical addresses, or sensitive details are ever collected.
- **Authentication**:
  - **Sign-Up**: Create a new account with Name, Class (9–12), Email, and Password.
  - **Log-In**: Securely sign in to access your personal timetable and goals.
  - **Sign-Out**: `[ 🚪 Sign Out ]` button in the top bar to switch students without losing any data.
  - **Demo Quick-Access**: One-click sign-in to the demo student account (*Shweta, Class 10th*).

---

## 🎵 Multi-Language Music Provision (English, Hindi & Student's Choice)

- **Pre-Loaded Curated Library**:
  - 🇮🇳 **Hindi Relaxing & Lofi**: *Kesariya (Peaceful Lofi Ambient Raag)*, *Phir Le Aya Dil (Gentle Bansuri)*, *Iktara (Acoustic Evening)*, *Raataan Lambiyan (Midnight Chill)*.
  - 🇬🇧 **English Chill & Study**: *Golden Hour (Cozy Piano)*, *Night Changes (Acoustic Starlight)*, *Until I Found You (Vintage Lofi)*, *Twilight Study Chimes*.
  - 🌸 **Other Languages**: *Ghibli Starlight Lullaby (Japanese)*, *Breeze of Cordoba (Spanish Acoustic)*.
- **`+ Add Song of Choice` Feature**:
  - Students can add their favorite English, Hindi, or any language song with title, artist, language, and harmonic melody style.
  - Custom songs are stored directly in the student's personal database table and can be played or deleted anytime.
- **Language Filter Tabs**: Filter playlist instantly by `All`, `Hindi`, `English`, `Other Languages`, or `My Added Songs`.

---

## 📱 Application Flow Across Screens

### Screen 1: Home Dashboard
- **Welcome Header**: Personalized student greeting (*"Hello, [Name] ^_^"*).
- **Daily Motivation Card**: Winnie the Pooh illustration and quote (*"You are braver than you believe..."*) with `✨ New Thought` cycler.
- **"LET'S PLAN!" Cloud Card**: Fluffy rounded container with `[START]` button that navigates directly to Screen 2.
- **Track Your Progress**: Hexagonal badge with ribbon bow showing Daily, Weekly, and Monthly completion percentages.
- **Personal Corner ♡**: Vertical oval badge opening student preferences.
- **GOAL Section**: Star badge (`★ GOAL ★`) with Daily, Weekly, and Monthly goal tabs.

### Screen 2: Today's Schedule (Metronome Below Tasks Removed)
- **Clean Task Cards**: The metronome button has been removed from below every task card as requested; each card cleanly shows time slots, priority badges, category tags, Edit (✏️), and Delete (🗑️) buttons.
- **Daily Commitments**: Fixed anchors (School, Tuition, Meals, Sleep) dynamically populated from Personal Corner.
- **Task Management**: Add, edit, and delete study tasks with instant database persistence.

### Screen 3: End Your Day & Screen 4: Music Sanctuary
- **Review Accomplishments**: Celebrate finished tasks and check daily rhythm score.
- **Smart Rescheduling**: Proposed slots for unfinished tasks with functional **`[ ACCEPT ]`** and **`[ UNDO ]`** buttons.
- **Tomorrow's Schedule Preview**: View tomorrow's timetable with rescheduled tasks integrated.
- **Ends the Day with a Song**: Multi-language music player, mood selector (*Calm, Sleepy, Proud, Decompress*), and spinning vinyl visualizer.

---

## 🚀 How to Run the Application

This application requires **zero external build steps or dependencies**. It runs 100% offline in any modern web browser (Edge, Chrome, Safari, Firefox).

1. Navigate to:
   `C:\Users\DELL USER\.gemini\antigravity\scratch\this-town-student-metronome\`
2. Double-click **`index.html`** or right-click and choose **Open with > Google Chrome / Microsoft Edge**.
3. Sign up with your email or use the demo account, and all your data will safely persist in the database across refreshes!
