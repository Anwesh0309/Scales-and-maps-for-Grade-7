import fs from 'fs';
import path from 'path';
import { AUDIO_MAP } from '../src/utils/audioMap.js';
import { STATIONS } from '../src/content/stations.js';
import { getWorldQuestions } from '../src/core/questions/questionBank.js';
import { INITIAL_STATE, progressReducer } from '../src/core/progress.js';

let errors = [];

console.log('--- 1. Testing Audio Map & Files ---');
let audioCount = 0;
for (const [key, url] of Object.entries(AUDIO_MAP)) {
  audioCount++;
  const filePath = path.join(process.cwd(), 'public', url.replace(/^\//, ''));
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing audio file for key [${key}]: ${filePath}`);
  } else {
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      errors.push(`Empty audio file for key [${key}]: ${filePath}`);
    }
  }
}
console.log(`Validated ${audioCount} audio entries in AUDIO_MAP. Errors: ${errors.length}`);

console.log('--- 2. Testing Simulation Stations ---');
if (STATIONS.length !== 4) {
  errors.push(`Expected 4 stations, got ${STATIONS.length}`);
}
for (const station of STATIONS) {
  if (!station.problems || station.problems.length !== 3) {
    errors.push(`Station ${station.id} does not have 3 problems`);
  }
  for (const prob of station.problems) {
    if (!prob.id || !prob.task || prob.expected === undefined) {
      errors.push(`Station problem ${prob.id} is missing essential fields`);
    }
    if (isNaN(parseFloat(prob.expected))) {
      errors.push(`Station problem ${prob.id} expected value is NaN: ${prob.expected}`);
    }
  }
}
console.log('Station problems verified.');

console.log('--- 3. Testing Practice Questions (10 Worlds x 10 Questions) ---');
let totalQ = 0;
for (let w = 1; w <= 10; w++) {
  const qs = getWorldQuestions(w);
  if (qs.length !== 10) {
    errors.push(`World ${w} has ${qs.length} questions instead of 10`);
  }
  for (let i = 0; i < qs.length; i++) {
    totalQ++;
    const q = qs[i];
    if (!q.stem || !q.options || q.options.length !== 4) {
      errors.push(`World ${w} Q${i + 1} does not have 4 options`);
    }
    const correctOpts = q.options.filter(o => o.correct);
    if (correctOpts.length !== 1) {
      errors.push(`World ${w} Q${i + 1} has ${correctOpts.length} correct options (expected exactly 1)`);
    }
    for (const opt of q.options) {
      if (opt.text.match(/\b(km|cm|m|km²|cm²|m²)\s+\1\b/i)) {
        errors.push(`World ${w} Q${i + 1} option has duplicate unit: "${opt.text}"`);
      }
      if (opt.text.includes('NaN')) {
        errors.push(`World ${w} Q${i + 1} option contains NaN: "${opt.text}"`);
      }
    }
  }
}
console.log(`Validated ${totalQ} questions across all worlds.`);

console.log('--- 4. Testing Progress Reducer ---');
let testState = progressReducer(INITIAL_STATE, { type: 'GO_PHASE', payload: 'simulate' });
if (testState.phase !== 'simulate') errors.push('Reducer failed GO_PHASE');

testState = progressReducer(testState, {
  type: 'SOLVE_STATION_PROBLEM',
  payload: { station: 1, stars: 3, nextProblem: 1 }
});
if (testState.simulate.stations[1].currentProblem !== 1) {
  errors.push('Reducer failed SOLVE_STATION_PROBLEM');
}

testState = progressReducer(testState, { type: 'RESET_ALL' });
if (testState.phase !== 'landing' || testState.simulate.stations[1].currentProblem !== 0) {
  errors.push('Reducer failed RESET_ALL');
}
console.log('Progress state transitions verified.');

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} errors:`);
  console.error(errors.join('\n'));
  process.exit(1);
} else {
  console.log('ALL AUDIT CHECKS PASSED PERFECTLY with 0 ERRORS!');
}
