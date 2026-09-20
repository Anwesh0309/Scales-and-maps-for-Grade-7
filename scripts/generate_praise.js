import fs from 'fs';
import path from 'path';

const API_KEY = 'sk_0af55b573c54fe31387443150c45624fed865ccc914cd486';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';
const AUDIO_DIR = path.resolve('public/assets/audio');

async function generatePraise() {
  const items = [
    { key: 'correct_praise', text: "That's Correct" },
    { key: 'try_again_praise', text: "Not Quite" }
  ];

  for (const item of items) {
    console.log(`Generating ${item.key}: "${item.text}" via ElevenLabs...`);
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({
          text: item.text,
          model_id: MODEL_ID,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.35,
            use_speaker_boost: true
          }
        })
      });

      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const filePath = path.join(AUDIO_DIR, `${item.key}.mp3`);
        fs.writeFileSync(filePath, buffer);
        console.log(`✓ Saved ${item.key}.mp3 (${buffer.length} bytes) with ElevenLabs!`);
      } else {
        const err = await res.text();
        console.warn(`ElevenLabs error (${res.status}): ${err}. Falling back to Google TTS...`);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(item.text)}&tl=en&client=tw-ob`;
        const gRes = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (gRes.ok) {
          const buffer = Buffer.from(await gRes.arrayBuffer());
          const filePath = path.join(AUDIO_DIR, `${item.key}.mp3`);
          fs.writeFileSync(filePath, buffer);
          console.log(`✓ Saved fallback ${item.key}.mp3 (${buffer.length} bytes)`);
        }
      }
    } catch (e) {
      console.error(`Error generating ${item.key}:`, e.message);
    }
  }
}

generatePraise();
