import { AUDIO_MAP } from './audioMap.js';

let currentAudio = null;
let currentPlaybackId = 0;
let isAudioEnabled = true;

/**
 * Updates the global audio enabled flag.
 * When disabled (muted), any playing audio is stopped immediately.
 */
export const setAudioEnabled = (enabled) => {
  isAudioEnabled = Boolean(enabled);
  if (!isAudioEnabled) {
    stopAudio();
  }
};

export const getAudioEnabled = () => isAudioEnabled;

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
 * Silently does nothing if audio is muted.
 */
export const playAudioKey = (key, onEnd = null) => {
  stopAudio();
  if (!isAudioEnabled) {
    if (onEnd) onEnd();
    return;
  }

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
      // Autoplay blocked by browser or interrupted
      if (currentPlaybackId !== playbackId) return;
      currentAudio = null;
      if (onEnd) onEnd();
    });
  } catch {
    if (onEnd) onEnd();
  }
};

/**
 * Plays a sequence of audio clips one after another without overlap.
 * Automatically aborts if stopAudio() is called (e.g. user navigates away or mutes).
 */
export const playAudioSequence = async (keys, shouldContinue = () => true) => {
  stopAudio();
  if (!isAudioEnabled) return;

  const sequenceId = currentPlaybackId;

  for (const key of keys) {
    if (currentPlaybackId !== sequenceId || !isAudioEnabled || !shouldContinue()) {
      return;
    }

    const url = AUDIO_MAP[key];
    if (!url) continue;

    await new Promise((resolve) => {
      if (currentPlaybackId !== sequenceId || !isAudioEnabled || !shouldContinue()) {
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
