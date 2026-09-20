import fs from 'fs';
import path from 'path';

const destDir = path.resolve('public/assets/story');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const artifactDir = 'C:/Users/anwes/.gemini/antigravity-ide/brain/f475a6bc-01de-44cd-a3e0-860c59870286';

const files = [
  { src: 'story_scene_one_1789849216585.jpg', dst: '1.jpg' },
  { src: 'story_scene_two_1789849226211.jpg', dst: '2.jpg' },
  { src: 'story_scene_three_1789849240939.jpg', dst: '3.jpg' },
  { src: 'story_scene_four_1789849252669.jpg', dst: '4.jpg' },
  { src: 'story_scene_five_1789849269894.jpg', dst: '5.jpg' },
  { src: 'story_scene_six_1789849303861.jpg', dst: '6.jpg' },
  { src: 'story_scene_seven_1789849320175.jpg', dst: '7.jpg' },
  { src: 'story_scene_eight_1789849330921.jpg', dst: '8.jpg' },
];

for (const { src, dst } of files) {
  const srcPath = path.join(artifactDir, src);
  const dstPath = path.join(destDir, dst);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`Copied ${src} -> ${dst}`);
  } else {
    console.error(`Missing source: ${srcPath}`);
  }
}
console.log('Story image copy finished!');
