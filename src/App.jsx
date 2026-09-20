import React, { useReducer, useEffect } from 'react';
import { INITIAL_STATE, progressReducer, loadSavedProgress, saveProgress } from './core/progress';
import { playAudioKey, playAudioSequence, stopAudio, setAudioEnabled } from './utils/audio';

import TopBar from './components/shared/TopBar';
import FloatingBg from './components/shared/FloatingBg';

import LandingScreen from './components/screens/LandingScreen';
import WonderScreen from './components/screens/WonderScreen';
import StoryScreen from './components/screens/StoryScreen';
import SimulateScreen from './components/screens/SimulateScreen';
import PracticeScreen from './components/screens/PracticeScreen';
import ReflectScreen from './components/screens/ReflectScreen';

export default function App() {
  const [state, dispatch] = useReducer(progressReducer, INITIAL_STATE, loadSavedProgress);

  // Auto-save progress to localStorage on state changes
  useEffect(() => {
    saveProgress(state);
  }, [state]);

  // Keep audio module's global enabled flag synchronized
  useEffect(() => {
    setAudioEnabled(state.audioEnabled);
  }, [state.audioEnabled]);

  // Audio narration synchronization for Wonder, Story, and Reflect
  useEffect(() => {
    if (state.phase === 'simulate' || state.phase === 'play') {
      // Simulate and Practice screens synchronize their own active problem / question narration
      return;
    }

    stopAudio();

    if (!state.audioEnabled) {
      return;
    }

    if (state.phase === 'landing') {
      // Intro phase: No audio narration
      return;
    } else if (state.phase === 'wonder') {
      playAudioSequence(['wonder_para', 'wonder_q'], () => state.audioEnabled && state.phase === 'wonder');
    } else if (state.phase === 'story') {
      const idx = state.storyIndex + 1;
      playAudioSequence([`story_${idx}_p`, `story_${idx}_q`], () => state.audioEnabled && state.phase === 'story' && state.storyIndex + 1 === idx);
    } else if (state.phase === 'reflect') {
      playAudioKey('reflect_prompt');
    }

    return () => {
      stopAudio();
    };
  }, [state.phase, state.storyIndex, state.audioEnabled]);

  // Phase navigation handlers
  const handleGoPhase = (phase) => {
    stopAudio();
    dispatch({ type: 'GO_PHASE', payload: phase });
  };

  const handleStartFromLanding = () => {
    stopAudio();
    dispatch({ type: 'RESET_ALL' });
    dispatch({ type: 'GO_PHASE', payload: 'wonder' });
  };

  const handleCompleteWonder = () => {
    stopAudio();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    dispatch({ type: 'GO_PHASE', payload: 'story' });
  };

  const handleSetStoryIndex = (idx) => {
    stopAudio();
    dispatch({ type: 'SET_STORY_INDEX', payload: idx });
  };

  const handleCompleteStory = () => {
    stopAudio();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'story' });
    dispatch({ type: 'GO_PHASE', payload: 'simulate' });
  };

  const handleSelectStation = (stationId) => {
    stopAudio();
    dispatch({ type: 'SET_SIMULATE_STATION', payload: stationId });
  };

  const handleSolveStationProblem = (station, stars, nextProblem) => {
    dispatch({
      type: 'SOLVE_STATION_PROBLEM',
      payload: { station, stars, nextProblem }
    });
  };

  const handleCompleteSimulate = () => {
    dispatch({ type: 'COMPLETE_PHASE', payload: 'simulate' });
    dispatch({ type: 'GO_PHASE', payload: 'play' });
  };

  const handleStartWorld = (worldId) => {
    dispatch({ type: 'START_WORLD', payload: worldId });
  };

  const handleExitWorld = () => {
    dispatch({ type: 'EXIT_WORLD' });
  };

  const handleAnswerQuestion = (correct, xpGained) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: { correct, xpGained }
    });
  };

  const handleCompleteWorld = (world, stars, score) => {
    dispatch({
      type: 'COMPLETE_WORLD',
      payload: { world, stars, score }
    });
  };

  const handleGoReflect = () => {
    dispatch({ type: 'COMPLETE_PHASE', payload: 'play' });
    dispatch({ type: 'GO_PHASE', payload: 'reflect' });
  };

  const handleSetReflection = (text) => {
    dispatch({ type: 'SET_REFLECTION', payload: text });
  };

  const handleSubmitReflection = () => {
    dispatch({ type: 'SUBMIT_REFLECTION' });
  };

  const handleToggleAudio = () => {
    const next = !state.audioEnabled;
    setAudioEnabled(next);
    dispatch({ type: 'TOGGLE_AUDIO' });
  };

  const handleHome = () => {
    stopAudio();
    dispatch({ type: 'RESET_ALL' });
    dispatch({ type: 'GO_PHASE', payload: 'landing' });
  };

  return (
    <div className="app-container">
      {/* Floating scale numerals in cosmic background */}
      <FloatingBg />

      {/* TopBar with Home, 5-phase Stepper, Audio Toggle, Close (hidden on landing phase) */}
      {state.phase !== 'landing' && (
        <TopBar
          phase={state.phase}
          completed={state.completed}
          onGoPhase={handleGoPhase}
          audioEnabled={state.audioEnabled}
          onToggleAudio={handleToggleAudio}
          onHome={handleHome}
          onClose={handleHome}
        />
      )}

      {/* Main Single-Frame Viewport Container (Zero Scroll) */}
      <main className={`app-main ${state.phase === 'landing' ? 'app-main--full' : ''}`}>
        {state.phase === 'landing' && (
          <LandingScreen 
            onStart={handleStartFromLanding} 
            onGoPhase={(phaseKey) => {
              dispatch({ type: 'RESET_ALL' });
              dispatch({ type: 'GO_PHASE', payload: phaseKey });
            }}
            onClose={handleStartFromLanding} 
          />
        )}

        {state.phase === 'wonder' && (
          <WonderScreen 
            onNext={handleCompleteWonder} 
          />
        )}

        {state.phase === 'story' && (
          <StoryScreen
            storyIndex={state.storyIndex}
            onSetStoryIndex={handleSetStoryIndex}
            onComplete={handleCompleteStory}
          />
        )}

        {state.phase === 'simulate' && (
          <SimulateScreen
            simulateState={state.simulate}
            audioEnabled={state.audioEnabled}
            onSelectStation={handleSelectStation}
            onSolveProblem={handleSolveStationProblem}
            onCompleteSimulate={handleCompleteSimulate}
          />
        )}

        {state.phase === 'play' && (
          <PracticeScreen
            playState={state.play}
            audioEnabled={state.audioEnabled}
            onStartWorld={handleStartWorld}
            onExitWorld={handleExitWorld}
            onAnswerQuestion={handleAnswerQuestion}
            onCompleteWorld={handleCompleteWorld}
            onGoReflect={handleGoReflect}
          />
        )}

        {state.phase === 'reflect' && (
          <ReflectScreen
            reflectState={state.reflect}
            playState={state.play}
            audioEnabled={state.audioEnabled}
            onSetReflection={handleSetReflection}
            onSubmitReflection={handleSubmitReflection}
          />
        )}
      </main>
    </div>
  );
}
