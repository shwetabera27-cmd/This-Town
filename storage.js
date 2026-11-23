// LocalStorage persistence utility for "This Town" Student Metronome

import { defaultProfile, defaultGoals } from '../data/defaultData.js';

const STORAGE_KEYS = {
  PROFILE: 'this_town_student_profile_v1',
  GOALS: 'this_town_student_goals_v1',
  ACTIVE_QUOTE_INDEX: 'this_town_quote_idx_v1',
  LAST_VISIT: 'this_town_last_visit_v1'
};

export const Storage = {
  getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) {
        return { ...defaultProfile, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Error reading profile from localStorage:', e);
    }
    return { ...defaultProfile };
  },

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      window.dispatchEvent(new CustomEvent('this-town-profile-updated', { detail: profile }));
      return true;
    } catch (e) {
      console.error('Error saving profile to localStorage:', e);
      return false;
    }
  },

  getGoals() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading goals from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(defaultGoals));
  },

  saveGoals(goals) {
    try {
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
      window.dispatchEvent(new CustomEvent('this-town-goals-updated', { detail: goals }));
      return true;
    } catch (e) {
      console.error('Error saving goals to localStorage:', e);
      return false;
    }
  },

  getQuoteIndex() {
    try {
      const idx = localStorage.getItem(STORAGE_KEYS.ACTIVE_QUOTE_INDEX);
      return idx !== null ? parseInt(idx, 10) : 0;
    } catch (e) {
      return 0;
    }
  },

  saveQuoteIndex(index) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_QUOTE_INDEX, index.toString());
    } catch (e) {
      console.warn('Could not save quote index', e);
    }
  },

  resetDefaults() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.GOALS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_QUOTE_INDEX);
      window.dispatchEvent(new CustomEvent('this-town-data-reset'));
      return true;
    } catch (e) {
      console.error('Error resetting data:', e);
      return false;
    }
  }
};
