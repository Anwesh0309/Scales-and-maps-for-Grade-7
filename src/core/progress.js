const STORAGE_KEY = 'intellia.scale-maps.v1';

export const INITIAL_STATE = {
  version: 1,
  phase: 'landing', // 'landing' | 'wonder' | 'story' | 'simulate' | 'play' | 'reflect'
  completed: {
    wonder: false,
    story: false,
    simulate: false,
    play: false,
    reflect: false
  },
  storyIndex: 0,
  simulate: {
    currentStation: 1,
    stations: {
      1: { done: false, stars: 0, currentProblem: 0 },
      2: { done: false, stars: 0, currentProblem: 0 },
      3: { done: false, stars: 0, currentProblem: 0 },
      4: { done: false, stars: 0, currentProblem: 0 }
    }
  },
  play: {
    currentWorld: null,
    worlds: {
      1: { unlocked: true, stars: 0, bestScore: 0, attempts: 0 },
      2: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      3: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      4: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      5: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      6: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      7: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      8: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      9: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 },
      10: { unlocked: false, stars: 0, bestScore: 0, attempts: 0 }
    },
    xp: 0,
    streak: 0,
    bestStreak: 0,
    hearts: 3,
    badges: []
  },
  reflect: {
    text: '',
    submitted: false
  },
  audioEnabled: true
};

export function loadSavedProgress() {
  try {
    // Whenever the user enters the module, reset all progress
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear stored progress on entry:', e);
  }
  return JSON.parse(JSON.stringify(INITIAL_STATE));
}

export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

export function progressReducer(state, action) {
  switch (action.type) {
    case 'GO_PHASE': {
      return { ...state, phase: action.payload };
    }

    case 'TOGGLE_AUDIO': {
      return { ...state, audioEnabled: !state.audioEnabled };
    }

    case 'SET_STORY_INDEX': {
      return { ...state, storyIndex: action.payload };
    }

    case 'COMPLETE_PHASE': {
      const phase = action.payload;
      return {
        ...state,
        completed: { ...state.completed, [phase]: true }
      };
    }

    case 'SOLVE_STATION_PROBLEM': {
      const { station, stars, nextProblem } = action.payload;
      const isLast = nextProblem >= 3;
      return {
        ...state,
        simulate: {
          ...state.simulate,
          stations: {
            ...state.simulate.stations,
            [station]: {
              done: isLast ? true : state.simulate.stations[station].done,
              stars: Math.max(state.simulate.stations[station].stars, stars || 1),
              currentProblem: nextProblem
            }
          }
        }
      };
    }

    case 'SET_SIMULATE_STATION': {
      return {
        ...state,
        simulate: {
          ...state.simulate,
          currentStation: action.payload
        }
      };
    }

    case 'START_WORLD': {
      return {
        ...state,
        play: {
          ...state.play,
          currentWorld: action.payload,
          hearts: 3
        }
      };
    }

    case 'EXIT_WORLD': {
      return {
        ...state,
        play: {
          ...state.play,
          currentWorld: null,
          hearts: 3
        }
      };
    }

    case 'ANSWER_QUESTION': {
      const { correct, xpGained } = action.payload;
      const newStreak = correct ? state.play.streak + 1 : 0;
      const newHearts = correct ? state.play.hearts : Math.max(0, state.play.hearts - 1);
      return {
        ...state,
        play: {
          ...state.play,
          xp: state.play.xp + (xpGained || 0),
          streak: newStreak,
          bestStreak: Math.max(state.play.bestStreak, newStreak),
          hearts: newHearts
        }
      };
    }

    case 'COMPLETE_WORLD': {
      const { world, stars, score } = action.payload;
      const nextWorld = world + 1;
      const isQualified = score >= 4 && stars >= 1;
      const updatedWorlds = {
        ...state.play.worlds,
        [world]: {
          ...state.play.worlds[world],
          stars: Math.max(state.play.worlds[world].stars, isQualified ? stars : 0),
          bestScore: Math.max(state.play.worlds[world].bestScore, score),
          attempts: state.play.worlds[world].attempts + 1
        }
      };
      if (nextWorld <= 10 && isQualified) {
        updatedWorlds[nextWorld] = {
          ...updatedWorlds[nextWorld],
          unlocked: true
        };
      }
      return {
        ...state,
        play: {
          ...state.play,
          worlds: updatedWorlds,
          currentWorld: null,
          hearts: 3
        }
      };
    }

    case 'SET_REFLECTION': {
      return {
        ...state,
        reflect: {
          ...state.reflect,
          text: action.payload
        }
      };
    }

    case 'SUBMIT_REFLECTION': {
      return {
        ...state,
        completed: { ...state.completed, reflect: true },
        reflect: { ...state.reflect, submitted: true }
      };
    }

    case 'RESET_ALL': {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return JSON.parse(JSON.stringify(INITIAL_STATE));
    }

    default:
      return state;
  }
}
