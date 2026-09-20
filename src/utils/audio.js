import { AUDIO_MAP } from './audioMap.js';

let currentAudio = null;
let currentPlaybackId = 0;

/**
 * Stops any currently playing audio immediately and invalidates any queued sequences.
 */
export const stopAudio = () => {
  currentPlaybackId++; // Invalidate all pending sequences and callbacks
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.src = '';
    } catch {
      // ignore
    }
    currentAudio = null;
  }
};

/**
 * Plays a single audio clip by key.
 * Automatically stops any previously playing audio to prevent overlap.
 */
export const playAudioKey = (key, onEnd = null) => {
  stopAudio();
  const playbackId = currentPlaybackId;

  const url = AUDIO_MAP[key];
  if (!url) {
    if (onEnd) onEnd();
    return;
  }

  try {
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      if (currentPlaybackId !== playbackId) return;
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.onerror = () => {
      if (currentPlaybackId !== playbackId) return;
      currentAudio = null;
      if (onEnd) onEnd();
    };

    audio.play().catch(() => {
      // Autoplay blocked by browser or interrupted by rapid navigation
      if (currentPlaybackId !== playbackId) return;
      if (onEnd) onEnd();
    });
  } catch {
    if (onEnd) onEnd();
  }
};

/**
 * Plays a sequence of audio clips one after another without overlap.
 * Automatically aborts if stopAudio() is called (e.g. user navigates away).
 */
export const playAudioSequence = async (keys, shouldContinue = () => true) => {
  stopAudio();
  const sequenceId = currentPlaybackId;

  for (const key of keys) {
    if (currentPlaybackId !== sequenceId || !shouldContinue()) {
      return;
    }

    const url = AUDIO_MAP[key];
    if (!url) continue;

    await new Promise((resolve) => {
      if (currentPlaybackId !== sequenceId || !shouldContinue()) {
        resolve();
        return;
      }

      // Stop previous clip without incrementing currentPlaybackId
      if (currentAudio) {
        try {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          currentAudio.onended = null;
          currentAudio.onerror = null;
          currentAudio.src = '';
        } catch {}
        currentAudio = null;
      }

      try {
        const audio = new Audio(url);
        currentAudio = audio;

        audio.onended = () => {
          if (currentPlaybackId === sequenceId) {
            currentAudio = null;
          }
          resolve();
        };

        audio.onerror = () => {
          if (currentPlaybackId === sequenceId) {
            currentAudio = null;
          }
          resolve();
        };

        audio.play().catch(() => {
          if (currentPlaybackId === sequenceId) {
            currentAudio = null;
          }
          resolve();
        });
      } catch {
        resolve();
      }
    });
  }
};
