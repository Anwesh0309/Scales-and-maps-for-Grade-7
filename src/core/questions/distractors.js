/**
 * Helper to build 4 shuffled options (A, B, C, D) with 1 correct and 3 misconception-driven distractors
 */
export function buildOptions(correctText, distractorList, unit = '') {
  const optionsSet = new Set();
  const formatText = (val) => {
    const s = String(val).trim();
    if (!unit) return s;
    const u = String(unit).trim();
    if (s.endsWith(u)) return s;
    return `${s} ${u}`;
  };

  const correctStr = formatText(correctText);
  optionsSet.add(correctStr);

  const wrongOptions = [];
  for (const d of distractorList) {
    if (!d || d.val == null) continue;
    const str = formatText(d.val);
    if (!optionsSet.has(str)) {
      optionsSet.add(str);
      wrongOptions.push({ text: str, misconception: d.why || '' });
    }
    if (wrongOptions.length >= 3) break;
  }

  // If fewer than 3 distractors, generate safe fallbacks
  let fallbackCount = 1;
  const numVal = parseFloat(correctText);
  while (wrongOptions.length < 3) {
    let alt;
    if (!isNaN(numVal)) {
      const mult = fallbackCount === 1 ? 10 : fallbackCount === 2 ? 2 : 0.5;
      alt = parseFloat((numVal * mult).toFixed(2));
    } else {
      alt = `${correctText} (Alt ${fallbackCount})`;
    }
    const str = formatText(alt);
    if (!optionsSet.has(str)) {
      optionsSet.add(str);
      wrongOptions.push({ text: str, misconception: 'Calculation error' });
    }
    fallbackCount++;
  }

  // Combine and shuffle
  const all = [
    { text: correctStr, correct: true },
    { text: wrongOptions[0].text, correct: false, misconception: wrongOptions[0].misconception },
    { text: wrongOptions[1].text, correct: false, misconception: wrongOptions[1].misconception },
    { text: wrongOptions[2].text, correct: false, misconception: wrongOptions[2].misconception }
  ];

  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  const ids = ['A', 'B', 'C', 'D'];
  return all.map((item, idx) => ({
    id: ids[idx],
    text: item.text,
    val: item.text,
    correct: item.correct,
    misconception: item.misconception || ''
  }));
}
