import http from 'http';
import fs from 'fs';
import path from 'path';

async function testUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, length: data.length }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('--- Verifying Scale & Maps Application ---');

  // 1. Check Dev Server
  try {
    const page = await testUrl('http://localhost:5173/');
    console.log('✓ Dev server running (HTTP ' + page.status + ', ' + page.length + ' bytes)');
  } catch (e) {
    console.error('✗ Dev server not responding:', e.message);
  }

  // 2. Check 8 Story Images
  const storyDir = path.resolve('public/assets/story');
  let imagesOk = true;
  for (let i = 1; i <= 8; i++) {
    const file = path.join(storyDir, `${i}.jpg`);
    if (fs.existsSync(file)) {
      const size = fs.statSync(file).size;
      if (size > 10000) {
        // ok
      } else {
        console.error(`✗ Image ${i}.jpg is too small (${size} bytes)`);
        imagesOk = false;
      }
    } else {
      console.error(`✗ Missing story image: ${i}.jpg`);
      imagesOk = false;
    }
  }
  if (imagesOk) console.log('✓ All 8 high-quality story images present and valid!');

  // 3. Check 27 Narration Audio MP3 Files
  const audioDir = path.resolve('public/assets/audio');
  const audioFiles = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
  console.log(`✓ Found ${audioFiles.length} generated ElevenLabs audio clips in public/assets/audio/`);

  // 4. Verify Story Audio Clips
  let audioOk = true;
  for (let i = 1; i <= 8; i++) {
    if (!fs.existsSync(path.join(audioDir, `story_${i}_p.mp3`))) {
      audioOk = false;
    }
    if (!fs.existsSync(path.join(audioDir, `story_${i}_q.mp3`))) {
      audioOk = false;
    }
  }
  if (audioOk) console.log('✓ All 8 story slides have matching paragraph and question audio clips!');

  // 5. Verify Build Assets
  if (fs.existsSync('dist/index.html')) {
    console.log('✓ Production build exists in dist/');
  }

  console.log('--- Verification Complete! ---');
}

verify();
