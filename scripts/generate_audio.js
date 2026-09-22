import fs from 'fs';
import path from 'path';
import { STATIONS } from '../src/content/stations.js';
import { getWorldQuestions } from '../src/core/questions/questionBank.js';
import { WONDER } from '../src/content/wonder.js';
import { STORY } from '../src/content/story.js';

const API_KEY = 'sk_1477a0b0a31e89b834b1e17ca4468c02a6e8bf554f621c5a';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const AUDIO_DIR = path.resolve('public/assets/audio');
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// Helper to clean mathematical symbols for natural, crystal-clear speech pronunciation
function cleanSpeechText(text) {
  if (!text) return '';
  return text
    // Strip emojis & special decorative symbols
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|✦|💡|🎯|✨|🎉|⭐|🔥|🔓|🧭|🪜|🌊|📐/gu, '')
    // Replace spaced numbers like '25 000' or '100 000' or '1 000 000' with comma separation
    .replace(/(\d+)\s+(\d{3})\s+(\d{3})\b/g, '$1,$2,$3')
    .replace(/(\d+)\s+(\d{3})\b/g, '$1,$2')
    // Percentages
    .replace(/(\d+)%/g, '$1 percent')
    // Area & Volume units with values first (e.g. 12 cm², 7.5 km²)
    .replace(/(\d+(\.\d+)?)\s*km²/gi, '$1 square kilometres')
    .replace(/(\d+(\.\d+)?)\s*cm²/gi, '$1 square centimetres')
    .replace(/(\d+(\.\d+)?)\s*m²/gi, '$1 square metres')
    .replace(/(\d+(\.\d+)?)\s*mm²/gi, '$1 square millimetres')
    .replace(/km²/gi, 'square kilometres')
    .replace(/cm²/gi, 'square centimetres')
    .replace(/m²/gi, 'square metres')
    .replace(/mm²/gi, 'square millimetres')
    .replace(/\bsq\.?\s*km\b/gi, 'square kilometres')
    .replace(/\bsq\.?\s*cm\b/gi, 'square centimetres')
    .replace(/\bsq\.?\s*m\b/gi, 'square metres')
    // Powers / Math expressions
    .replace(/\bn²/gi, 'n squared')
    .replace(/\bk²/gi, 'k squared')
    .replace(/\bk³/gi, 'k cubed')
    // Handle ratio formats like 1 : 50,000 or 1 cm : 500 m or 5 : 1 or 200 : 1
    .replace(/1\s*:\s*n\b/gi, 'one to n')
    .replace(/\b(\d+)\s*cm\s*:\s*(\d+)\s*km\b/gi, '$1 centimetre to $2 kilometres')
    .replace(/\b(\d+)\s*cm\s*:\s*(\d+)\s*m\b/gi, '$1 centimetre to $2 metres')
    .replace(/(\d[\d,]*)\s*:\s*(\d[\d,]*)/g, '$1 to $2')
    .replace(/1\s*\/\s*(\d[\d,]*)/g, '1 divided by $1')
    // Common scale terminology
    .replace(/\bRF\b/g, 'representative fraction')
    .replace(/\bha\b/gi, 'hectares')
    // Speed & Rate units
    .replace(/(\d+(\.\d+)?)\s*km\/h\b/gi, '$1 kilometres per hour')
    .replace(/\bkm\/h\b/gi, 'kilometres per hour')
    .replace(/(\d+(\.\d+)?)\s*m\/s\b/gi, '$1 metres per second')
    .replace(/\bm\/s\b/gi, 'metres per second')
    // Length units with values
    .replace(/(\d+(\.\d+)?)\s*km\b/gi, '$1 kilometres')
    .replace(/(\d+(\.\d+)?)\s*cm\b/gi, '$1 centimetres')
    .replace(/(\d+(\.\d+)?)\s*mm\b/gi, '$1 millimetres')
    .replace(/(\d+(\.\d+)?)\s*m\b/gi, '$1 metres')
    // Standalone units
    .replace(/\bkm\b/gi, 'kilometres')
    .replace(/\bcm\b/gi, 'centimetres')
    .replace(/\bmm\b/gi, 'millimetres')
    .replace(/\bMETRES\b/g, 'metres')
    .replace(/\bMILLIMETRES\b/g, 'millimetres')
    // Math symbols
    .replace(/÷/g, ' divided by ')
    .replace(/×/g, ' times ')
    .replace(/\b\/\b/g, ' divided by ')
    .replace(/√/g, 'square root of ')
    .replace(/\^2\b/g, ' squared ')
    .replace(/=/g, ' equals ')
    // Fix multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchElevenLabs(text) {
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.35,
          similarity_boost: 0.65,
          style: 0.45,
          use_speaker_boost: true
        }
      })
    });

    if (res.ok) {
      return Buffer.from(await res.arrayBuffer());
    }
    const errText = await res.text();
    console.warn(`ElevenLabs API returned ${res.status}: ${errText.slice(0, 100)}`);
    return null;
  } catch (e) {
    console.warn('ElevenLabs fetch error:', e.message);
    return null;
  }
}

async function fetchGoogleTTSChunk(chunk) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=en&client=tw-ob`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  });
  if (!res.ok) throw new Error(`Google TTS error: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function fetchGoogleTTS(text) {
  if (text.length <= 160) {
    return await fetchGoogleTTSChunk(text);
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const buffers = [];
  for (const s of sentences) {
    const clean = s.trim();
    if (clean.length > 0) {
      buffers.push(await fetchGoogleTTSChunk(clean));
      await new Promise(r => setTimeout(r, 80));
    }
  }
  return Buffer.concat(buffers);
}

async function generateClip(key, rawText, force = false) {
  const fileName = `${key}.mp3`;
  const filePath = path.join(AUDIO_DIR, fileName);

  if (!force && fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
    return `/assets/audio/${fileName}`;
  }

  const spokenText = cleanSpeechText(rawText);
  console.log(`Generating audio for [${key}]: "${spokenText.slice(0, 50)}..."`);

  // 1. Try ElevenLabs first
  let buffer = await fetchElevenLabs(spokenText);

  // 2. Fallback to Google TTS if ElevenLabs quota exceeded or unavailable
  if (!buffer) {
    console.log(`Using fallback TTS for [${key}]...`);
    try {
      buffer = await fetchGoogleTTS(spokenText);
    } catch (e) {
      console.error(`Failed fallback TTS for [${key}]:`, e.message);
      return null;
    }
  }

  if (buffer) {
    fs.writeFileSync(filePath, buffer);
    console.log(`✓ Saved ${fileName} (${buffer.length} bytes)`);
    return `/assets/audio/${fileName}`;
  }
  return null;
}

async function main() {
  const force = process.argv.includes('--force');
  console.log(`--- Generating All Audio Narration Clips (force=${force}) ---`);
  const audioMap = {};

  // 1. Intro/Landing Screen (No audio narration)

  // 2. Wonder Phase On-Screen Audio
  await generateClip('wonder_para', WONDER.paragraph, force);
  await generateClip('wonder_q', WONDER.question, force);
  audioMap['wonder_para'] = '/assets/audio/wonder_para.mp3';
  audioMap['wonder_q'] = '/assets/audio/wonder_q.mp3';

  // 3. Story Phase On-Screen Audio (Slides 1 to 8)
  for (let i = 0; i < STORY.length; i++) {
    const slide = STORY[i];
    const pKey = `story_${slide.id}_p`;
    const qKey = `story_${slide.id}_q`;
    await generateClip(pKey, slide.paragraph, force);
    await generateClip(qKey, slide.question, force);
    audioMap[pKey] = `/assets/audio/${pKey}.mp3`;
    audioMap[qKey] = `/assets/audio/${qKey}.mp3`;
  }

  // 4. Simulation Phase Guide & Task Audio (4 Stations, 12 Problems)
  for (const station of STATIONS) {
    const introKey = `station_${station.id}_intro`;
    await generateClip(introKey, station.intro, force);
    audioMap[introKey] = `/assets/audio/${introKey}.mp3`;

    for (const prob of station.problems) {
      const guideKey = `${prob.id}_guide`;
      const fullGuideText = `${prob.task} ${prob.step1 || ''} ${prob.step2 || ''}`;
      await generateClip(guideKey, fullGuideText, force);
      audioMap[guideKey] = `/assets/audio/${guideKey}.mp3`;

      // Also generate concise task prompt audio
      const taskKey = `${prob.id}_task`;
      await generateClip(taskKey, prob.task, force);
      audioMap[taskKey] = `/assets/audio/${taskKey}.mp3`;
    }
  }

  // 5. Practice Phase Questions & Hints (10 Worlds x 10 Questions = 100 Questions + 100 Hints)
  console.log('Generating Practice Phase questions and hints (10 worlds)...');
  for (let w = 1; w <= 10; w++) {
    const questions = getWorldQuestions(w);
    for (let qIdx = 0; qIdx < questions.length; qIdx++) {
      const q = questions[qIdx];
      const qKey = `w${w}q${qIdx + 1}`;
      await generateClip(qKey, q.stem, force);
      audioMap[qKey] = `/assets/audio/${qKey}.mp3`;

      if (q.hint) {
        const hintKey = `w${w}q${qIdx + 1}_hint`;
        await generateClip(hintKey, q.hint, force);
        audioMap[hintKey] = `/assets/audio/${hintKey}.mp3`;
      }

      if (force) await new Promise(r => setTimeout(r, 120)); // Gentle throttle
    }
  }

  // 6. Praise & Feedback Audio
  await generateClip('correct_praise', "That's Correct", force);
  await generateClip('try_again_praise', "Not Quite", force);
  await generateClip('reflect_prompt', "Reflect on what you have learned about scale factors and map reading.", force);
  audioMap['correct_praise'] = '/assets/audio/correct_praise.mp3';
  audioMap['try_again_praise'] = '/assets/audio/try_again_praise.mp3';
  audioMap['reflect_prompt'] = '/assets/audio/reflect_prompt.mp3';

  // 7. Write complete audioMap.js
  const mapPath = path.resolve('src/utils/audioMap.js');
  const code = `// Auto-generated by scripts/generate_audio.js
export const AUDIO_MAP = ${JSON.stringify(audioMap, null, 2)};
`;
  fs.writeFileSync(mapPath, code);
  console.log(`\n🎉 Successfully generated all audio files! Total mapped keys: ${Object.keys(audioMap).length}`);
}

main().catch(console.error);

