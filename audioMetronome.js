// Web Audio API Metronome & Gentle Ambient Chimes
// Zero dependencies, 100% offline, soothing sound design for school students.

class AudioMetronomeService {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.bpm = 60;
    this.timerId = null;
    this.isMuted = false;
    this.onBeatListeners = [];
    this.ambientPlaying = false;
    this.ambientInterval = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a soft wooden tick sound (metronome)
  playTick(isAccent = false) {
    if (this.isMuted) return;
    try {
      this.initContext();
      const now = this.audioCtx.currentTime;

      // Gentle woodblock tone: Bandpass-filtered triangle/sine wave
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isAccent ? 880 : 660, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn('Audio tick error:', e);
    }
  }

  // Play a relaxing, warm chime chord (pentatonic peaceful resonance)
  playPeacefulChord() {
    try {
      this.initContext();
      const now = this.audioCtx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 warm chord

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        const startTime = now + idx * 0.06;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.9);
      });
    } catch (e) {
      console.warn('Peaceful chord error:', e);
    }
  }

  setBpm(newBpm) {
    this.bpm = Math.max(40, Math.min(160, newBpm));
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

    // Initial immediate beat
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

  toggleAmbientSong() {
    this.initContext();
    if (this.ambientPlaying) {
      if (this.ambientInterval) clearInterval(this.ambientInterval);
      this.ambientInterval = null;
      this.ambientPlaying = false;
      return false;
    } else {
      this.ambientPlaying = true;
      this.playPeacefulChord();
      this.ambientInterval = setInterval(() => {
        this.playPeacefulChord();
      }, 4200);
      return true;
    }
  }

  onBeat(callback) {
    this.onBeatListeners.push(callback);
  }
}

export const metronomeService = new AudioMetronomeService();
