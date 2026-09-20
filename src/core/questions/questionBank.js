import { buildOptions } from './distractors.js';

export function getWorldQuestions(worldId) {
  switch (worldId) {
    case 1:
      return getWorld1();
    case 2:
      return getWorld2();
    case 3:
      return getWorld3();
    case 4:
      return getWorld4();
    case 5:
      return getWorld5();
    case 6:
      return getWorld6();
    case 7:
      return getWorld7();
    case 8:
      return getWorld8();
    case 9:
      return getWorld9();
    case 10:
      return getWorld10();
    default:
      return getWorld1();
  }
}

// World 1: The Map Key (Reading 1 : n & scale bars)
function getWorld1() {
  return [
    {
      id: "w1q1",
      world: 1,
      slot: 1,
      tag: "WORD SCALE → RATIO",
      stem: "A trail map states: Scale 1 cm : 500 m. What is this scale written as a ratio 1 : n?",
      visual: { type: "bar", lengthCm: 2, realLabel: "1 km", n: 50000 },
      options: buildOptions("1 : 50 000", [
        { val: "1 : 500", why: "Did not convert metres to centimetres (M2)" },
        { val: "1 : 5 000", why: "Lost a factor of 10 in conversion (M2)" },
        { val: "50 000 : 1", why: "Wrote ratio backwards (M5)" }
      ]),
      explanation: "500 m = 50 000 cm. Since both sides are now in cm, the ratio is 1 : 50 000.",
      hint: "Convert 500 m to centimetres first (1 m = 100 cm)."
    },
    {
      id: "w1q2",
      world: 1,
      slot: 2,
      tag: "SCALE RATIO MEANING",
      stem: "A map of Pinecrest Ridge has a scale of 1 : 25 000. What does 1 cm on the map represent on the ground?",
      visual: null,
      options: buildOptions("250 m", [
        { val: "25 m", why: "Divided by 1000 instead of 100 (M2)" },
        { val: "2.5 km", why: "Shifted decimal place (M2)" },
        { val: "25 000 m", why: "Assumed scale unit was metres (M2)" }
      ], "m"),
      explanation: "1 cm represents 25 000 cm on the ground. 25 000 cm ÷ 100 = 250 m.",
      hint: "Convert 25 000 cm to metres by dividing by 100."
    },
    {
      id: "w1q3",
      world: 1,
      slot: 3,
      tag: "SCALE BAR INTERPRETATION",
      stem: "A graphical scale bar has a marked segment of 2 cm representing 4 km. How many kilometres does 1 cm on this map represent?",
      visual: { type: "bar", lengthCm: 2, realLabel: "4 km", n: 200000 },
      options: buildOptions("2 km", [
        { val: "4 km", why: "Read the 2 cm mark as 1 cm" },
        { val: "8 km", why: "Multiplied instead of dividing (M1)" },
        { val: "0.5 km", why: "Divided 2 by 4 instead of 4 by 2" }
      ], "km"),
      explanation: "If 2 cm represents 4 km, then 1 cm represents 4 km ÷ 2 = 2 km.",
      hint: "Divide the real distance by the number of centimetres on the bar."
    },
    {
      id: "w1q4",
      world: 1,
      slot: 4,
      tag: "COMPARING MAP SCALES",
      stem: "Chloe has Map A drawn at 1 : 20 000 and Map B drawn at 1 : 100 000. Which map is drawn at a LARGER scale?",
      visual: null,
      options: buildOptions("Map A (1 : 20 000)", [
        { val: "Map B (1 : 100 000)", why: "Confused larger number with larger scale (LO6)" },
        { val: "Both are equal", why: "Assumed all maps have equivalent scale" },
        { val: "Neither has a scale", why: "Misread ratio notation" }
      ]),
      explanation: "A smaller number after the colon means a fraction with a smaller denominator (1/20 000 > 1/100 000), which represents a larger scale with more detail!",
      hint: "Think of scale as a fraction: 1/20 000 is larger than 1/100 000."
    },
    {
      id: "w1q5",
      world: 1,
      slot: 5,
      tag: "WORD SCALE → RATIO",
      stem: "A regional map has a scale of 1 cm : 2 km. Express this scale as a ratio in the form 1 : n.",
      visual: null,
      options: buildOptions("1 : 200 000", [
        { val: "1 : 2 000", why: "Converted 2 km to 2 000 cm instead of 200 000 cm (M2)" },
        { val: "1 : 20 000", why: "Dropped one zero in cm conversion (M2)" },
        { val: "1 : 2", why: "Wrote numbers without common units (M7)" }
      ]),
      explanation: "2 km = 2 000 m = 200 000 cm. Therefore, 1 cm : 2 km = 1 : 200 000.",
      hint: "1 km = 100 000 cm. Multiply 2 by 100 000."
    },
    {
      id: "w1q6",
      world: 1,
      slot: 6,
      tag: "REPRESENTATIVE FRACTION",
      stem: "A map scale is given as the fraction 1 / 50 000. If a road measures 3 cm on the map, what is its ground length in km?",
      visual: null,
      options: buildOptions("1.5 km", [
        { val: "15 km", why: "Off by factor of 10 (M2)" },
        { val: "0.15 km", why: "Divided by 1 000 000 instead of 100 000 (M2)" },
        { val: "150 km", why: "Did not divide by cm-to-km factor (M2)" }
      ], "km"),
      explanation: "3 cm × 50 000 = 150 000 cm. 150 000 cm ÷ 100 000 = 1.5 km.",
      hint: "Multiply 3 cm by 50 000, then divide by 100 000 to get kilometres."
    },
    {
      id: "w1q7",
      world: 1,
      slot: 7,
      tag: "SCALE BAR TICKS",
      stem: "On a scale bar, 0 to 1 km measures exactly 4 cm. What is the scale in words?",
      visual: { type: "bar", lengthCm: 4, realLabel: "1 km", n: 25000 },
      options: buildOptions("1 cm : 250 m", [
        { val: "1 cm : 400 m", why: "Divided incorrectly" },
        { val: "1 cm : 2.5 km", why: "Multiplied instead of dividing" },
        { val: "4 cm : 250 m", why: "Kept 4 cm on left side" }
      ]),
      explanation: "4 cm = 1 km = 1 000 m. Dividing both sides by 4 gives 1 cm = 250 m.",
      hint: "Divide 1 000 m by 4 to find what 1 cm represents."
    },
    {
      id: "w1q8",
      world: 1,
      slot: 8,
      tag: "DETAIL VS SCALE",
      stem: "Liam wants to see every small bend in a forest footpath. Should he choose a 1 : 10 000 map or a 1 : 250 000 map?",
      visual: null,
      options: buildOptions("1 : 10 000 map", [
        { val: "1 : 250 000 map", why: "Thought larger denominator meant more zoom" },
        { val: "Both show equal detail", why: "Ignored scale ratio" },
        { val: "Neither shows footpaths", why: "Incorrect assumption" }
      ]),
      explanation: "1 : 10 000 is a much larger scale, zooming in close to show fine details like bends in footpaths.",
      hint: "Larger scale = smaller number after the colon = more zoom and detail."
    },
    {
      id: "w1q9",
      world: 1,
      slot: 9,
      tag: "SIMPLIFYING RATIO",
      stem: "A map shows 4 cm representing 10 km. Express this scale in the standard form 1 : n.",
      visual: null,
      options: buildOptions("1 : 250 000", [
        { val: "1 : 25 000", why: "Dropped a zero in km conversion (M2)" },
        { val: "4 : 1 000 000", why: "Did not divide by 4 (M9)" },
        { val: "1 : 400 000", why: "Multiplied 4 by 100 000 incorrectly" }
      ]),
      explanation: "10 km = 1 000 000 cm. 4 cm : 1 000 000 cm simplifies by dividing both sides by 4: 1 : 250 000.",
      hint: "Change 10 km into centimetres (1 000 000 cm) then divide by 4."
    },
    {
      id: "w1q10",
      world: 1,
      slot: 10,
      tag: "METRES TO RATIO",
      stem: "If 1 cm on paper represents 80 m on the ground, what is the scale ratio 1 : n?",
      visual: null,
      options: buildOptions("1 : 8 000", [
        { val: "1 : 80", why: "Forgot to convert metres to cm (M7)" },
        { val: "1 : 800", why: "Multiplied by 10 instead of 100 (M2)" },
        { val: "1 : 80 000", why: "Multiplied by 1 000 instead of 100 (M2)" }
      ]),
      explanation: "80 m = 80 × 100 cm = 8 000 cm. So the ratio is 1 : 8 000.",
      hint: "80 m = 8 000 cm. The scale is 1 : 8 000."
    }
  ];
}

// World 2: Trail Blazer (Map to Ground Distance)
function getWorld2() {
  return [
    {
      id: "w2q1",
      world: 2,
      slot: 1,
      tag: "MAP → GROUND (1:50 000)",
      stem: "On a 1 : 50 000 map, the distance between Pinecrest Harbor and Echo Peak is 6 cm. What is the actual distance in km?",
      visual: { type: "ruler", lengthCm: 6, labelA: "Harbor", labelB: "Peak" },
      options: buildOptions("3 km", [
        { val: "30 km", why: "Divided by 10 000 instead of 100 000 (M2)" },
        { val: "0.3 km", why: "Divided by 1 000 000 (M2)" },
        { val: "300 km", why: "Lost zeroes in conversion (M2)" }
      ], "km"),
      explanation: "6 cm × 50 000 = 300 000 cm. 300 000 cm ÷ 100 000 = 3 km.",
      hint: "Multiply 6 cm by 50 000, then divide by 100 000 to convert to km."
    },
    {
      id: "w2q2",
      world: 2,
      slot: 2,
      tag: "MAP → GROUND (1:25 000)",
      stem: "Liam measures a scenic trail as 8.4 cm on a 1 : 25 000 map. What is the real length of the trail in km?",
      visual: null,
      options: buildOptions("2.1 km", [
        { val: "21 km", why: "Off by factor of 10 (M2)" },
        { val: "0.21 km", why: "Divided too many times (M2)" },
        { val: "3.36 km", why: "Divided instead of multiplied (M1)" }
      ], "km"),
      explanation: "8.4 cm × 25 000 = 210 000 cm. 210 000 cm ÷ 100 000 = 2.1 km.",
      hint: "8.4 × 25 000 = 210 000 cm. 210 000 ÷ 100 000 = 2.1 km."
    },
    {
      id: "w2q3",
      world: 2,
      slot: 3,
      tag: "MAP → GROUND (METRES)",
      stem: "On a 1 : 10 000 map of a campsite, a path measures 4.5 cm. What is its actual length in METRES?",
      visual: null,
      options: buildOptions("450 m", [
        { val: "45 m", why: "Divided by 1000 instead of 100 (M2)" },
        { val: "4.5 m", why: "Divided by 10 000 (M2)" },
        { val: "4 500 m", why: "Multiplied by 1000 instead of 100" }
      ], "m"),
      explanation: "4.5 cm × 10 000 = 45 000 cm. 45 000 cm ÷ 100 = 450 m.",
      hint: "Multiply by 10 000 to get cm, then divide by 100 to get metres."
    },
    {
      id: "w2q4",
      world: 2,
      slot: 4,
      tag: "MAP → GROUND (DECIMAL CM)",
      stem: "A road on a 1 : 200 000 highway map measures 3.2 cm. What is the actual length of the road in km?",
      visual: null,
      options: buildOptions("6.4 km", [
        { val: "64 km", why: "Decimal error (M2)" },
        { val: "0.64 km", why: "Divided by extra 10 (M2)" },
        { val: "640 km", why: "Converted cm to km incorrectly" }
      ], "km"),
      explanation: "3.2 cm × 200 000 = 640 000 cm = 6.4 km.",
      hint: "3.2 × 200 000 = 640 000 cm. Divide by 100 000."
    },
    {
      id: "w2q5",
      world: 2,
      slot: 5,
      tag: "MULTI-LEG TRAIL",
      stem: "Chloe hikes two legs: Leg 1 is 3.5 cm and Leg 2 is 4.5 cm on a 1 : 50 000 map. What is her total hike in km?",
      visual: null,
      options: buildOptions("4 km", [
        { val: "40 km", why: "Off by factor of 10 (M2)" },
        { val: "8 km", why: "Multiplied by 2 incorrectly" },
        { val: "2 km", why: "Only calculated one leg" }
      ], "km"),
      explanation: "Total map length = 3.5 + 4.5 = 8 cm. 8 cm × 50 000 = 400 000 cm = 4 km.",
      hint: "Add the map distances first: 3.5 + 4.5 = 8 cm. Then convert to km."
    },
    {
      id: "w2q6",
      world: 2,
      slot: 6,
      tag: "MAP → GROUND (LARGE SCALE)",
      stem: "On a 1 : 2 500 forest boundary map, a stream measures 12 cm. What is the real stream length in metres?",
      visual: null,
      options: buildOptions("300 m", [
        { val: "30 m", why: "Off by factor of 10" },
        { val: "3 km", why: "Confused metres with kilometres" },
        { val: "3 000 m", why: "Added extra zero" }
      ], "m"),
      explanation: "12 cm × 2 500 = 30 000 cm. 30 000 cm ÷ 100 = 300 m.",
      hint: "12 × 2 500 = 30 000 cm. Divide by 100 to get metres."
    },
    {
      id: "w2q7",
      world: 2,
      slot: 7,
      tag: "WORD SCALE → DISTANCE",
      stem: "The map scale is 1 cm : 750 m. A lake shoreline measures 4 cm. What is the real shoreline in km?",
      visual: null,
      options: buildOptions("3 km", [
        { val: "3 000 km", why: "Forgot to convert metres to km" },
        { val: "0.3 km", why: "Divided by 10 000" },
        { val: "1.875 km", why: "Divided 750 by 4" }
      ], "km"),
      explanation: "4 cm × 750 m = 3 000 m = 3 km.",
      hint: "Multiply 4 by 750 m = 3 000 m = 3 km."
    },
    {
      id: "w2q8",
      world: 2,
      slot: 8,
      tag: "PERIMETER DISTANCE",
      stem: "A rectangular nature reserve on a 1 : 20 000 map is 5 cm long and 3 cm wide. What is its real perimeter in km?",
      visual: null,
      options: buildOptions("3.2 km", [
        { val: "1.6 km", why: "Only added length and width without doubling" },
        { val: "32 km", why: "Off by factor of 10" },
        { val: "0.32 km", why: "Divided by 100 000 twice" }
      ], "km"),
      explanation: "Map perimeter = 2 × (5 + 3) = 16 cm. 16 cm × 20 000 = 320 000 cm = 3.2 km.",
      hint: "Perimeter = 2 × (5 + 3) = 16 cm. 16 × 20 000 = 320 000 cm = 3.2 km."
    },
    {
      id: "w2q9",
      world: 2,
      slot: 9,
      tag: "MILLIMETRES TO KM",
      stem: "On a 1 : 100 000 map, a railway section measures 45 mm. What is the actual distance in km?",
      visual: null,
      options: buildOptions("4.5 km", [
        { val: "45 km", why: "Treated mm as cm (M2)" },
        { val: "0.45 km", why: "Divided by extra 10" },
        { val: "450 km", why: "Forgot conversion" }
      ], "km"),
      explanation: "45 mm = 4.5 cm. 4.5 cm × 100 000 = 450 000 cm = 4.5 km.",
      hint: "45 mm is 4.5 cm. 4.5 cm × 100 000 = 450 000 cm = 4.5 km."
    },
    {
      id: "w2q10",
      world: 2,
      slot: 10,
      tag: "DISTANCE SUMMARY",
      stem: "A trail measures 7.2 cm on a 1 : 50 000 map. Liam walks it in both directions (round trip). What is the total real walk in km?",
      visual: null,
      options: buildOptions("7.2 km", [
        { val: "3.6 km", why: "Calculated one-way only" },
        { val: "72 km", why: "Decimal slip" },
        { val: "14.4 km", why: "Doubled twice" }
      ], "km"),
      explanation: "One-way = 7.2 cm × 50 000 = 360 000 cm = 3.6 km. Round trip = 3.6 × 2 = 7.2 km.",
      hint: "One-way is 3.6 km. Double it for the return trip."
    }
  ];
}

// World 3: Ground Scout (Ground to Map Distance)
function getWorld3() {
  return [
    {
      id: "w3q1",
      world: 3,
      slot: 1,
      tag: "GROUND → MAP (1:50 000)",
      stem: "A real hiking trail on the Isle of Whispers is 4.5 km long. How long should it be drawn on a 1 : 50 000 map?",
      visual: null,
      options: buildOptions("9 cm", [
        { val: "0.9 cm", why: "Dropped a zero (M2)" },
        { val: "90 cm", why: "Multiplied by 10 (M2)" },
        { val: "22.5 cm", why: "Multiplied ground by scale incorrectly (M1)" }
      ], "cm"),
      explanation: "4.5 km = 450 000 cm. 450 000 cm ÷ 50 000 = 9 cm.",
      hint: "Convert 4.5 km to centimetres (450 000 cm) and divide by 50 000."
    },
    {
      id: "w3q2",
      world: 3,
      slot: 2,
      tag: "GROUND → MAP (1:25 000)",
      stem: "A river section is 2.5 km long in reality. What is its length on a 1 : 25 000 map?",
      visual: null,
      options: buildOptions("10 cm", [
        { val: "1 cm", why: "Divided by 100 000 extra (M2)" },
        { val: "100 cm", why: "Off by factor of 10 (M2)" },
        { val: "6.25 cm", why: "Calculation error" }
      ], "cm"),
      explanation: "2.5 km = 250 000 cm. 250 000 cm ÷ 25 000 = 10 cm.",
      hint: "2.5 km = 250 000 cm. 250 000 ÷ 25 000 = 10 cm."
    },
    {
      id: "w3q3",
      world: 3,
      slot: 3,
      tag: "GROUND → MAP (METRES)",
      stem: "A wooden footbridge is 350 m long. How long is the bridge on a 1 : 5 000 park map?",
      visual: null,
      options: buildOptions("7 cm", [
        { val: "0.7 cm", why: "Forgot to multiply metres by 100 first" },
        { val: "70 cm", why: "Added extra zero" },
        { val: "1.75 cm", why: "Divided incorrectly" }
      ], "cm"),
      explanation: "350 m = 35 000 cm. 35 000 cm ÷ 5 000 = 7 cm.",
      hint: "350 m = 35 000 cm. 35 000 ÷ 5 000 = 7 cm."
    },
    {
      id: "w3q4",
      world: 3,
      slot: 4,
      tag: "GROUND → MAP (1:100 000)",
      stem: "The distance from Haven Bay to Beacon Lighthouse is 18 km. What is the distance on a 1 : 100 000 map?",
      visual: null,
      options: buildOptions("18 cm", [
        { val: "1.8 cm", why: "Off by factor of 10" },
        { val: "180 cm", why: "Too large" },
        { val: "9 cm", why: "Divided by 200 000" }
      ], "cm"),
      explanation: "18 km = 1 800 000 cm. 1 800 000 cm ÷ 100 000 = 18 cm.",
      hint: "18 km = 1 800 000 cm. 1 800 000 ÷ 100 000 = 18 cm."
    },
    {
      id: "w3q5",
      world: 3,
      slot: 5,
      tag: "DIVIDE VS MULTIPLY",
      stem: "Ranger Arthur reminds Liam: 'When converting from the real ground to the map, what mathematical operation do you perform with scale factor n?'",
      visual: null,
      options: buildOptions("Divide by n", [
        { val: "Multiply by n", why: "Confused ground-to-map with map-to-ground (M1)" },
        { val: "Add n", why: "Additive thinking (M6)" },
        { val: "Square n", why: "Confused with area (M3)" }
      ]),
      explanation: "Map drawings are smaller than reality, so real length ÷ n = map length!",
      hint: "The map is smaller than reality, so you must divide."
    },
    {
      id: "w3q6",
      world: 3,
      slot: 6,
      tag: "GROUND → MAP (DECIMAL CM)",
      stem: "A coastal boardwalk is 1.6 km long. What is its length on a 1 : 50 000 map in cm?",
      visual: null,
      options: buildOptions("3.2 cm", [
        { val: "0.32 cm", why: "Dropped zero" },
        { val: "32 cm", why: "Off by factor of 10" },
        { val: "8 cm", why: "Divided by 20 000" }
      ], "cm"),
      explanation: "1.6 km = 160 000 cm. 160 000 cm ÷ 50 000 = 3.2 cm.",
      hint: "160 000 ÷ 50 000 = 3.2 cm."
    },
    {
      id: "w3q7",
      world: 3,
      slot: 7,
      tag: "WORD SCALE CONVERSION",
      stem: "A map has scale 1 cm : 400 m. How many centimetres on the map represent a trail of 2.8 km?",
      visual: null,
      options: buildOptions("7 cm", [
        { val: "70 cm", why: "Did not convert km to metres correctly" },
        { val: "0.7 cm", why: "Decimal error" },
        { val: "11.2 cm", why: "Multiplied 2.8 by 4" }
      ], "cm"),
      explanation: "2.8 km = 2 800 m. 2 800 m ÷ 400 m = 7 cm.",
      hint: "Change 2.8 km into metres (2 800 m), then divide by 400 m."
    },
    {
      id: "w3q8",
      world: 3,
      slot: 8,
      tag: "RUNWAY DRAWING",
      stem: "An airport runway is 2 400 m long. On a 1 : 20 000 chart, what is the length of the runway?",
      visual: null,
      options: buildOptions("12 cm", [
        { val: "1.2 cm", why: "Off by factor of 10" },
        { val: "120 cm", why: "Too large" },
        { val: "4.8 cm", why: "Calculation error" }
      ], "cm"),
      explanation: "2 400 m = 240 000 cm. 240 000 cm ÷ 20 000 = 12 cm.",
      hint: "240 000 cm ÷ 20 000 = 12 cm."
    },
    {
      id: "w3q9",
      world: 3,
      slot: 9,
      tag: "ISLAND WIDTH",
      stem: "The Isle of Whispers is 7.5 km wide. On a 1 : 25 000 map, how wide is the island in cm?",
      visual: null,
      options: buildOptions("30 cm", [
        { val: "3 cm", why: "Off by factor of 10" },
        { val: "300 cm", why: "Too large" },
        { val: "18.75 cm", why: "Incorrect calculation" }
      ], "cm"),
      explanation: "7.5 km = 750 000 cm. 750 000 cm ÷ 25 000 = 30 cm.",
      hint: "750 000 ÷ 25 000 = 30 cm."
    },
    {
      id: "w3q10",
      world: 3,
      slot: 10,
      tag: "GROUND → MAP (MILLIMETRES)",
      stem: "A short trail is 150 m long. On a 1 : 25 000 map, what is its length in MILLIMETRES?",
      visual: null,
      options: buildOptions("6 mm", [
        { val: "0.6 mm", why: "Off by factor of 10" },
        { val: "60 mm", why: "Confused mm with cm" },
        { val: "6 cm", why: "Answer requested in mm" }
      ], "mm"),
      explanation: "150 m = 15 000 cm. 15 000 cm ÷ 25 000 = 0.6 cm = 6 mm.",
      hint: "15 000 ÷ 25 000 = 0.6 cm. 0.6 cm = 6 mm."
    }
  ];
}

// World 4: Scale Finder (Finding 1 : n)
function getWorld4() {
  return [
    {
      id: "w4q1",
      world: 4,
      slot: 1,
      tag: "FIND SCALE 1 : n",
      stem: "A forest trail measures 4 cm on a map and is 2 km long in reality. What is the map scale in the form 1 : n?",
      visual: null,
      options: buildOptions("1 : 50 000", [
        { val: "1 : 5 000", why: "Converted 2 km to 20 000 cm (M2)" },
        { val: "1 : 2", why: "Wrote 4 : 2 without converting units (M7)" },
        { val: "50 000 : 1", why: "Wrote ratio in reverse (M5)" }
      ]),
      explanation: "2 km = 200 000 cm. Ratio is 4 cm : 200 000 cm. Divide both by 4: 1 : 50 000.",
      hint: "Convert 2 km to 200 000 cm, then divide 200 000 by 4."
    },
    {
      id: "w4q2",
      world: 4,
      slot: 2,
      tag: "FIND SCALE 1 : n",
      stem: "A distance of 5 cm on a map represents an actual distance of 1.5 km. Find the scale of the map.",
      visual: null,
      options: buildOptions("1 : 30 000", [
        { val: "1 : 3 000", why: "Lost a zero (M2)" },
        { val: "1 : 300 000", why: "Added a zero (M2)" },
        { val: "1 : 75 000", why: "Multiplied 5 by 1.5" }
      ]),
      explanation: "1.5 km = 150 000 cm. 150 000 ÷ 5 = 30 000. So the scale is 1 : 30 000.",
      hint: "1.5 km = 150 000 cm. Divide 150 000 by 5."
    },
    {
      id: "w4q3",
      world: 4,
      slot: 3,
      tag: "FIND SCALE FROM METRES",
      stem: "On a plan of a school field, 8 cm represents 160 m. What is the scale in the form 1 : n?",
      visual: null,
      options: buildOptions("1 : 2 000", [
        { val: "1 : 20", why: "Did not convert metres to cm (M7)" },
        { val: "1 : 200", why: "Off by factor of 10" },
        { val: "1 : 20 000", why: "Treated m as km" }
      ]),
      explanation: "160 m = 16 000 cm. 16 000 ÷ 8 = 2 000. Scale = 1 : 2 000.",
      hint: "160 m = 16 000 cm. 16 000 ÷ 8 = 2 000."
    },
    {
      id: "w4q4",
      world: 4,
      slot: 4,
      tag: "FIND SCALE (DECIMAL CM)",
      stem: "A straight road of 6 km is represented by 2.5 cm on a map. What is the scale 1 : n?",
      visual: null,
      options: buildOptions("1 : 240 000", [
        { val: "1 : 24 000", why: "Dropped a zero" },
        { val: "1 : 150 000", why: "Multiplied 2.5 by 6" },
        { val: "1 : 2 400 000", why: "Added extra zero" }
      ]),
      explanation: "6 km = 600 000 cm. 600 000 ÷ 2.5 = 240 000. Scale = 1 : 240 000.",
      hint: "600 000 ÷ 2.5 = 240 000."
    },
    {
      id: "w4q5",
      world: 4,
      slot: 5,
      tag: "FIND SCALE (MILLIMETRES)",
      stem: "A 12 mm line on a technical blueprint represents 6 m in real life. What is the scale?",
      visual: null,
      options: buildOptions("1 : 500", [
        { val: "1 : 50", why: "Off by factor of 10" },
        { val: "1 : 5 000", why: "Added a zero" },
        { val: "1 : 2", why: "Did not convert units" }
      ]),
      explanation: "6 m = 6 000 mm. 6 000 mm ÷ 12 mm = 500. The scale is 1 : 500.",
      hint: "Convert 6 m into 6 000 mm. 6 000 ÷ 12 = 500."
    },
    {
      id: "w4q6",
      world: 4,
      slot: 6,
      tag: "COMMON UNITS RULE",
      stem: "Why MUST you convert both map length and real length into the same unit before writing a ratio 1 : n?",
      visual: null,
      options: buildOptions("Because ratios have no units and compare like quantities", [
        { val: "Because scale numbers must always end in zeroes", why: "Incorrect rule" },
        { val: "Because cm is the only valid unit in mathematics", why: "False premise" },
        { val: "Because maps cannot use decimals", why: "False premise" }
      ]),
      explanation: "A ratio compares quantities in the exact same unit so that 1 unit on paper equals n of that same unit in reality!",
      hint: "A ratio is a pure number without units, so both sides must have matching units."
    },
    {
      id: "w4q7",
      world: 4,
      slot: 7,
      tag: "SCALE FROM GRID",
      stem: "Each grid square on a map is 1 cm wide. If 3 grid squares stand for 1.2 km, what is the scale 1 : n?",
      visual: { type: "grid", size: 3, label: "3 cm = 1.2 km" },
      options: buildOptions("1 : 40 000", [
        { val: "1 : 4 000", why: "Dropped zero" },
        { val: "1 : 400 000", why: "Added zero" },
        { val: "1 : 36 000", why: "Multiplied 3 by 1.2" }
      ]),
      explanation: "3 cm = 1.2 km = 120 000 cm. 120 000 ÷ 3 = 40 000. Scale = 1 : 40 000.",
      hint: "1.2 km = 120 000 cm. Divide 120 000 by 3."
    },
    {
      id: "w4q8",
      world: 4,
      slot: 8,
      tag: "FIND SCALE (HALF METRE)",
      stem: "On a model train layout, a 15 cm car represents a real train car 30 m long. What is the scale?",
      visual: null,
      options: buildOptions("1 : 200", [
        { val: "1 : 20", why: "Off by factor of 10" },
        { val: "1 : 2", why: "No unit conversion" },
        { val: "1 : 2 000", why: "Added extra zero" }
      ]),
      explanation: "30 m = 3 000 cm. 3 000 ÷ 15 = 200. Scale = 1 : 200.",
      hint: "30 m = 3 000 cm. 3 000 ÷ 15 = 200."
    },
    {
      id: "w4q9",
      world: 4,
      slot: 9,
      tag: "ENLARGEMENT SCALE",
      stem: "A microscopic pollen grain measuring 0.4 mm is drawn as 8 cm in a biology textbook. What is the enlargement scale?",
      visual: null,
      options: buildOptions("200 : 1", [
        { val: "1 : 200", why: "Reduction instead of enlargement (M5)" },
        { val: "20 : 1", why: "Off by factor of 10" },
        { val: "8 : 0.4", why: "Not simplified" }
      ]),
      explanation: "8 cm = 80 mm. 80 mm ÷ 0.4 mm = 200. The drawing is 200 times larger: 200 : 1.",
      hint: "8 cm = 80 mm. 80 ÷ 0.4 = 200. Enlargements are written n : 1."
    },
    {
      id: "w4q10",
      world: 4,
      slot: 10,
      tag: "SCALE FINDER MASTERY",
      stem: "A 3.6 cm trail on an island map corresponds to 1.8 km. Find the scale 1 : n.",
      visual: null,
      options: buildOptions("1 : 50 000", [
        { val: "1 : 5 000", why: "Dropped a zero" },
        { val: "1 : 20 000", why: "Divided 3.6 by 1.8 incorrectly" },
        { val: "1 : 500 000", why: "Added extra zero" }
      ]),
      explanation: "1.8 km = 180 000 cm. 180 000 ÷ 3.6 = 50 000. The scale is 1 : 50 000.",
      hint: "180 000 ÷ 3.6 = 50 000."
    }
  ];
}

// World 5: Unit Ladder Masters (Precision Conversions)
function getWorld5() {
  return [
    {
      id: "w5q1",
      world: 5,
      slot: 1,
      tag: "cm → km SHORTCUT",
      stem: "How many centimetres are there in 1 kilometre?",
      visual: null,
      options: buildOptions("100 000 cm", [
        { val: "1 000 cm", why: "Confused with metres in a km (M2)" },
        { val: "10 000 cm", why: "Lost a zero (M2)" },
        { val: "1 000 000 cm", why: "Confused with mm in a km" }
      ], "cm"),
      explanation: "1 km = 1 000 m. Each metre has 100 cm. 1 000 × 100 = 100 000 cm.",
      hint: "1 km = 1 000 m, and 1 m = 100 cm. 1 000 × 100 = 100 000."
    },
    {
      id: "w5q2",
      world: 5,
      slot: 2,
      tag: "cm → km CONVERSION",
      stem: "Convert 350 000 cm into kilometres.",
      visual: null,
      options: buildOptions("3.5 km", [
        { val: "35 km", why: "Divided by 10 000 instead of 100 000 (M2)" },
        { val: "0.35 km", why: "Divided by 1 000 000" },
        { val: "350 km", why: "Divided by 1 000" }
      ], "km"),
      explanation: "To convert cm to km, divide by 100 000: 350 000 ÷ 100 000 = 3.5 km.",
      hint: "Move the decimal point 5 places to the left (÷ 100 000)."
    },
    {
      id: "w5q3",
      world: 5,
      slot: 3,
      tag: "km → cm CONVERSION",
      stem: "Convert 0.48 km into centimetres.",
      visual: null,
      options: buildOptions("48 000 cm", [
        { val: "4 800 cm", why: "Multiplied by 10 000 instead of 100 000 (M2)" },
        { val: "480 cm", why: "Multiplied by 1 000 (M2)" },
        { val: "480 000 cm", why: "Multiplied by 1 000 000" }
      ], "cm"),
      explanation: "0.48 × 100 000 = 48 000 cm.",
      hint: "Multiply 0.48 by 100 000."
    },
    {
      id: "w5q4",
      world: 5,
      slot: 4,
      tag: "mm → m CONVERSION",
      stem: "How many millimetres are in 2.5 metres?",
      visual: null,
      options: buildOptions("2 500 mm", [
        { val: "250 mm", why: "Multiplied by 100 instead of 1 000" },
        { val: "25 000 mm", why: "Added extra zero" },
        { val: "25 mm", why: "Multiplied by 10" }
      ], "mm"),
      explanation: "1 m = 1 000 mm. 2.5 × 1 000 = 2 500 mm.",
      hint: "There are 1 000 mm in 1 metre. 2.5 × 1 000 = 2 500."
    },
    {
      id: "w5q5",
      world: 5,
      slot: 5,
      tag: "mm → km CONVERSION",
      stem: "How many millimetres are in 1 kilometre?",
      visual: null,
      options: buildOptions("1 000 000 mm", [
        { val: "100 000 mm", why: "Confused with cm in a km" },
        { val: "10 000 mm", why: "Lost two zeroes" },
        { val: "10 000 000 mm", why: "Added extra zero" }
      ], "mm"),
      explanation: "1 km = 1 000 m = 100 000 cm = 1 000 000 mm.",
      hint: "1 km = 100 000 cm = 1 000 000 mm (six zeroes)."
    },
    {
      id: "w5q6",
      world: 5,
      slot: 6,
      tag: "cm → m CONVERSION",
      stem: "Convert 8 400 cm into metres.",
      visual: null,
      options: buildOptions("84 m", [
        { val: "8.4 m", why: "Divided by 1 000 instead of 100" },
        { val: "840 m", why: "Divided by 10 instead of 100" },
        { val: "0.84 m", why: "Divided by 10 000" }
      ], "m"),
      explanation: "8 400 cm ÷ 100 = 84 m.",
      hint: "Divide by 100."
    },
    {
      id: "w5q7",
      world: 5,
      slot: 7,
      tag: "CHAIN COMPARISON",
      stem: "Which of the following measurements represents the LONGEST distance?",
      visual: null,
      options: buildOptions("0.05 km", [
        { val: "40 m", why: "40 m is 0.04 km" },
        { val: "3 500 cm", why: "3 500 cm is 35 m" },
        { val: "45 000 mm", why: "45 000 mm is 45 m" }
      ]),
      explanation: "0.05 km = 50 m. Comparing: 50 m > 45 m > 40 m > 35 m.",
      hint: "Convert all values to metres: 0.05 km = 50 m, 40 m, 3 500 cm = 35 m, 45 000 mm = 45 m."
    },
    {
      id: "w5q8",
      world: 5,
      slot: 8,
      tag: "TWO-STEP CONVERSION",
      stem: "A ranger's pace is 75 cm. How many paces make up 1.5 km?",
      visual: null,
      options: buildOptions("2 000 paces", [
        { val: "200 paces", why: "Off by factor of 10" },
        { val: "20 000 paces", why: "Added extra zero" },
        { val: "1 125 paces", why: "Multiplied 1.5 by 75" }
      ], "paces"),
      explanation: "1.5 km = 150 000 cm. 150 000 ÷ 75 = 2 000 paces.",
      hint: "1.5 km = 150 000 cm. Divide by 75 cm."
    },
    {
      id: "w5q9",
      world: 5,
      slot: 9,
      tag: "DECIMAL METRES",
      stem: "Convert 65 000 cm into metres.",
      visual: null,
      options: buildOptions("650 m", [
        { val: "65 m", why: "Divided by 1 000" },
        { val: "6.5 m", why: "Divided by 10 000" },
        { val: "6 500 m", why: "Divided by 10" }
      ], "m"),
      explanation: "65 000 cm ÷ 100 = 650 m.",
      hint: "Divide by 100."
    },
    {
      id: "w5q10",
      world: 5,
      slot: 10,
      tag: "LADDER MASTERY",
      stem: "A map length of 82 mm corresponds to what value in centimetres?",
      visual: null,
      options: buildOptions("8.2 cm", [
        { val: "0.82 cm", why: "Divided by 100" },
        { val: "820 cm", why: "Multiplied by 10" },
        { val: "82 cm", why: "Ignored unit conversion" }
      ], "cm"),
      explanation: "1 cm = 10 mm. 82 mm ÷ 10 = 8.2 cm.",
      hint: "10 mm = 1 cm. 82 ÷ 10 = 8.2 cm."
    }
  ];
}

// World 6: Expedition Speed (Speed, Distance, Time on Maps)
function getWorld6() {
  return [
    {
      id: "w6q1",
      world: 6,
      slot: 1,
      tag: "TIME = DISTANCE ÷ SPEED",
      stem: "On a 1 : 50 000 map, a hiking trail is 8 cm long. If Liam hikes at 4 km/h, how long will the hike take?",
      visual: null,
      options: buildOptions("1 hour", [
        { val: "2 hours", why: "Divided 8 by 4 without scale" },
        { val: "30 minutes", why: "Calculation error" },
        { val: "4 hours", why: "Multiplied instead of dividing" }
      ]),
      explanation: "Real distance = 8 cm × 50 000 = 400 000 cm = 4 km. Time = 4 km ÷ 4 km/h = 1 hour.",
      hint: "First find real distance (4 km). Then time = distance ÷ speed."
    },
    {
      id: "w6q2",
      world: 6,
      slot: 2,
      tag: "DISTANCE = SPEED × TIME",
      stem: "Chloe cycles for 1.5 hours at 12 km/h. On a 1 : 100 000 map, how long will this route be in cm?",
      visual: null,
      options: buildOptions("18 cm", [
        { val: "1.8 cm", why: "Off by factor of 10" },
        { val: "180 cm", why: "Too large" },
        { val: "8 cm", why: "Calculation error" }
      ], "cm"),
      explanation: "Distance = 12 km/h × 1.5 h = 18 km. On map: 18 km = 1 800 000 cm ÷ 100 000 = 18 cm.",
      hint: "Real distance = 12 × 1.5 = 18 km = 1 800 000 cm. Divide by 100 000."
    },
    {
      id: "w6q3",
      world: 6,
      slot: 3,
      tag: "HALF-HOUR HIKE",
      stem: "A ranger walks at 5 km/h for 30 minutes. What length does this walk represent on a 1 : 25 000 map?",
      visual: null,
      options: buildOptions("10 cm", [
        { val: "1 cm", why: "Off by factor of 10" },
        { val: "5 cm", why: "Forgot to halve for 30 min" },
        { val: "20 cm", why: "Used 1 hour distance" }
      ], "cm"),
      explanation: "30 min = 0.5 h. Distance = 5 × 0.5 = 2.5 km = 250 000 cm. Map = 250 000 ÷ 25 000 = 10 cm.",
      hint: "In 30 minutes, distance is 2.5 km = 250 000 cm. Divide by 25 000."
    },
    {
      id: "w6q4",
      world: 6,
      slot: 4,
      tag: "FERRY SPEED",
      stem: "The ferry route from mainland to Isle of Whispers is 6 cm on a 1 : 200 000 chart. If the ferry travels at 24 km/h, how many minutes does the crossing take?",
      visual: null,
      options: buildOptions("30 minutes", [
        { val: "15 minutes", why: "Halved incorrectly" },
        { val: "45 minutes", why: "Calculation error" },
        { val: "60 minutes", why: "Used 24 km instead of 12 km" }
      ]),
      explanation: "Real distance = 6 cm × 200 000 = 1 200 000 cm = 12 km. Time = 12 km ÷ 24 km/h = 0.5 hours = 30 minutes.",
      hint: "Real distance = 12 km. 12 km ÷ 24 km/h = 0.5 hours = 30 minutes."
    },
    {
      id: "w6q5",
      world: 6,
      slot: 5,
      tag: "AVERAGE SPEED",
      stem: "Liam walks a 10 cm path on a 1 : 40 000 map in 40 minutes. What was his walking speed in km/h?",
      visual: null,
      options: buildOptions("6 km/h", [
        { val: "4 km/h", why: "Did not convert 40 min to hours properly" },
        { val: "10 km/h", why: "Used 10 cm directly" },
        { val: "5 km/h", why: "Calculation error" }
      ]),
      explanation: "Real distance = 10 cm × 40 000 = 400 000 cm = 4 km. Time = 40/60 h = 2/3 h. Speed = 4 ÷ (2/3) = 6 km/h.",
      hint: "Distance is 4 km. 40 minutes = 2/3 hour. Speed = 4 ÷ (2/3) = 6 km/h."
    },
    {
      id: "w6q6",
      world: 6,
      slot: 6,
      tag: "PACE TO SPEED",
      stem: "A jogger runs 5 cm on a 1 : 20 000 map in 6 minutes. What is their speed in km/h?",
      visual: null,
      options: buildOptions("10 km/h", [
        { val: "6 km/h", why: "Used 6 min directly" },
        { val: "12 km/h", why: "Arithmetic error" },
        { val: "1 km/h", why: "Forgot to multiply by 60" }
      ]),
      explanation: "Real distance = 5 cm × 20 000 = 100 000 cm = 1 km. 1 km in 6 min = 1 km in 0.1 h = 10 km/h.",
      hint: "Distance = 1 km in 6 minutes. In 60 minutes they would run 10 km."
    },
    {
      id: "w6q7",
      world: 6,
      slot: 7,
      tag: "SPEED ESTIMATE",
      stem: "Ranger Arthur drives a patrol truck at 45 km/h. On a 1 : 50 000 map, how many cm will he cover in 20 minutes?",
      visual: null,
      options: buildOptions("30 cm", [
        { val: "15 cm", why: "Used 10 minutes instead of 20" },
        { val: "45 cm", why: "Used 1 hour distance" },
        { val: "3 cm", why: "Off by factor of 10" }
      ], "cm"),
      explanation: "In 20 min (1/3 h), truck travels 45 × 1/3 = 15 km = 1 500 000 cm. Map = 1 500 000 ÷ 50 000 = 30 cm.",
      hint: "In 20 minutes (1/3 hour), distance is 15 km = 1 500 000 cm. Divide by 50 000."
    },
    {
      id: "w6q8",
      world: 6,
      slot: 8,
      tag: "RETURN HIKE TIME",
      stem: "A trail is 7 cm on a 1 : 25 000 map. Liam walks at 3.5 km/h. How long does a two-way round trip take?",
      visual: null,
      options: buildOptions("1 hour", [
        { val: "30 minutes", why: "Calculated one way only" },
        { val: "2 hours", why: "Doubled speed" },
        { val: "45 minutes", why: "Calculation slip" }
      ]),
      explanation: "One-way = 7 cm × 25 000 = 175 000 cm = 1.75 km. Round trip = 3.5 km. Time = 3.5 km ÷ 3.5 km/h = 1 hour.",
      hint: "One-way is 1.75 km, round trip is 3.5 km. 3.5 km ÷ 3.5 km/h = 1 hour."
    },
    {
      id: "w6q9",
      world: 6,
      slot: 9,
      tag: "BOAT RAMP RETURN",
      stem: "A rescue boat travels 8 cm on a 1 : 50 000 chart at 16 km/h. How many minutes does the trip take?",
      visual: null,
      options: buildOptions("15 minutes", [
        { val: "30 minutes", why: "Divided incorrectly" },
        { val: "10 minutes", why: "Estimation error" },
        { val: "20 minutes", why: "Arithmetic slip" }
      ]),
      explanation: "Distance = 8 cm × 50 000 = 400 000 cm = 4 km. Time = 4 km ÷ 16 km/h = 0.25 h = 15 minutes.",
      hint: "Distance = 4 km. 4 ÷ 16 = 0.25 hours = 15 minutes."
    },
    {
      id: "w6q10",
      world: 6,
      slot: 10,
      tag: "SPEED & SCALE SUMMARY",
      stem: "On a 1 : 100 000 map, a cyclist covers 12 cm. If her speed is 18 km/h, what is the travel time?",
      visual: null,
      options: buildOptions("40 minutes", [
        { val: "30 minutes", why: "Assumed 0.5 hours" },
        { val: "45 minutes", why: "Rounded incorrectly" },
        { val: "1 hour", why: "Arithmetic error" }
      ]),
      explanation: "Distance = 12 cm × 100 000 = 1 200 000 cm = 12 km. Time = 12/18 h = 2/3 h = 40 minutes.",
      hint: "12 km ÷ 18 km/h = 2/3 hour = 40 minutes."
    }
  ];
}

// World 7: Area Realm (Area Scale 1 : n²)
function getWorld7() {
  return [
    {
      id: "w7q1",
      world: 7,
      slot: 1,
      tag: "AREA SCALE PRINCIPLE",
      stem: "A map has a linear scale of 1 cm : 2 km. What is the AREA scale for 1 cm² on the map?",
      visual: { type: "grid", size: 2, label: "1 cm² = 2² km²" },
      options: buildOptions("1 cm² : 4 km²", [
        { val: "1 cm² : 2 km²", why: "Scaled area linearly (M3)" },
        { val: "1 cm² : 8 km²", why: "Cubed the scale factor" },
        { val: "1 cm² : 0.5 km²", why: "Inverted scale factor" }
      ]),
      explanation: "Area scales by the square of the linear scale factor: (2 km)² = 4 km². So 1 cm² stands for 4 km².",
      hint: "Square the linear distance: 2 km × 2 km = 4 km²."
    },
    {
      id: "w7q2",
      world: 7,
      slot: 2,
      tag: "MAP AREA → REAL AREA",
      stem: "On a 1 cm : 3 km map, Silver Lake has an area of 5 cm². What is the actual area of the lake in km²?",
      visual: null,
      options: buildOptions("45 km²", [
        { val: "15 km²", why: "Multiplied 5 by 3 linearly (M3)" },
        { val: "25 km²", why: "Squared 5 instead of 3" },
        { val: "9 km²", why: "Only calculated 1 cm²" }
      ], "km²"),
      explanation: "Linear scale: 1 cm : 3 km. Area scale: 1 cm² : 9 km². Real area = 5 × 9 = 45 km².",
      hint: "1 cm² represents 3² = 9 km². 5 cm² represents 5 × 9 = 45 km²."
    },
    {
      id: "w7q3",
      world: 7,
      slot: 3,
      tag: "REAL AREA → MAP AREA",
      stem: "A nature reserve has an area of 24 km². On a map with scale 1 cm : 2 km, what is the area of the reserve on the map?",
      visual: null,
      options: buildOptions("6 cm²", [
        { val: "12 cm²", why: "Divided 24 by 2 linearly (M3)" },
        { val: "48 cm²", why: "Multiplied instead of dividing" },
        { val: "3 cm²", why: "Divided by 8" }
      ], "cm²"),
      explanation: "1 cm : 2 km means 1 cm² : 4 km². Map area = 24 km² ÷ 4 km² = 6 cm².",
      hint: "1 cm² = 4 km². Map area = 24 ÷ 4 = 6 cm²."
    },
    {
      id: "w7q4",
      world: 7,
      slot: 4,
      tag: "LINEAR FROM AREA SCALE",
      stem: "An area scale is given as 1 cm² : 25 km². What is the linear scale in the form 1 cm : ? km?",
      visual: null,
      options: buildOptions("1 cm : 5 km", [
        { val: "1 cm : 25 km", why: "Assumed linear and area scales match (M3)" },
        { val: "1 cm : 12.5 km", why: "Divided 25 by 2 instead of square root (M4)" },
        { val: "1 cm : 625 km", why: "Squared 25 instead of square root" }
      ]),
      explanation: "Take the square root of the area scale factor: √25 = 5. The linear scale is 1 cm : 5 km.",
      hint: "Take the square root of 25 km²."
    },
    {
      id: "w7q5",
      world: 7,
      slot: 5,
      tag: "1 : 50 000 AREA SCALE",
      stem: "On a 1 : 50 000 map (1 cm : 0.5 km), a forest has an area of 8 cm². What is its actual area in km²?",
      visual: null,
      options: buildOptions("2 km²", [
        { val: "4 km²", why: "Multiplied 8 by 0.5 linearly (M3)" },
        { val: "1 km²", why: "Calculation error" },
        { val: "16 km²", why: "Divided by 0.5" }
      ], "km²"),
      explanation: "1 cm = 0.5 km. 1 cm² = (0.5)² = 0.25 km². Real area = 8 × 0.25 = 2 km².",
      hint: "1 cm² = (0.5)² = 0.25 km². 8 × 0.25 = 2 km²."
    },
    {
      id: "w7q6",
      world: 7,
      slot: 6,
      tag: "SQUARE LAKE AREA",
      stem: "A square pond on a 1 : 10 000 map has sides of 3 cm. What is the real area of the pond in m²?",
      visual: null,
      options: buildOptions("90 000 m²", [
        { val: "9 000 m²", why: "Off by factor of 10" },
        { val: "30 000 m²", why: "Did not square side" },
        { val: "900 m²", why: "Did not scale properly" }
      ], "m²"),
      explanation: "Real side = 3 cm × 10 000 = 30 000 cm = 300 m. Real area = 300 m × 300 m = 90 000 m².",
      hint: "Each side in reality is 300 m. Area = 300 × 300 = 90 000 m²."
    },
    {
      id: "w7q7",
      world: 7,
      slot: 7,
      tag: "RECTANGLE AREA ON MAP",
      stem: "A farm of dimensions 1.5 km by 2 km is shown on a 1 cm : 500 m map. What is its area on the map in cm²?",
      visual: null,
      options: buildOptions("12 cm²", [
        { val: "3 cm²", why: "Multiplied 1.5 by 2 without scale" },
        { val: "6 cm²", why: "Divided incorrectly" },
        { val: "24 cm²", why: "Doubled area" }
      ], "cm²"),
      explanation: "Scale 1 cm : 0.5 km. Map length = 2 ÷ 0.5 = 4 cm. Map width = 1.5 ÷ 0.5 = 3 cm. Map area = 4 × 3 = 12 cm².",
      hint: "Length on map = 4 cm, width on map = 3 cm. Area = 4 × 3 = 12 cm²."
    },
    {
      id: "w7q8",
      world: 7,
      slot: 8,
      tag: "PHOTOCOPY AREA EFFECT",
      stem: "A map is enlarged by 200% on a photocopier. By what factor does the area of any region on the paper increase?",
      visual: null,
      options: buildOptions("4 times", [
        { val: "2 times", why: "Confused length multiplier with area multiplier (M3)" },
        { val: "8 times", why: "Cubed the factor" },
        { val: "No change", why: "Thought area remains constant" }
      ]),
      explanation: "Enlarging lengths by 2× increases area by 2² = 4 times!",
      hint: "If lengths double (×2), area increases by 2 × 2 = 4 times."
    },
    {
      id: "w7q9",
      world: 7,
      slot: 9,
      tag: "LINEAR FROM AREA SCALE",
      stem: "On an island map, 4 cm² represents an area of 36 km². What is the linear scale in the form 1 cm : ? km?",
      visual: null,
      options: buildOptions("1 cm : 3 km", [
        { val: "1 cm : 9 km", why: "Divided 36 by 4 but forgot square root (M4)" },
        { val: "1 cm : 6 km", why: "Took √36 without dividing by 4" },
        { val: "1 cm : 1.5 km", why: "Calculation error" }
      ]),
      explanation: "4 cm² : 36 km² simplifies to 1 cm² : 9 km². Taking the square root gives 1 cm : 3 km.",
      hint: "First simplify to 1 cm² : 9 km². Then take the square root: √9 = 3 km."
    },
    {
      id: "w7q10",
      world: 7,
      slot: 10,
      tag: "AREA SCALE MASTERY",
      stem: "On a 1 : 100 000 map (1 cm : 1 km), what actual area in km² does a 12 cm² island represent?",
      visual: null,
      options: buildOptions("12 km²", [
        { val: "120 km²", why: "Multiplied by 10" },
        { val: "1.2 km²", why: "Divided by 10" },
        { val: "144 km²", why: "Squared 12" }
      ], "km²"),
      explanation: "Since 1 cm represents 1 km, 1 cm² represents 1² = 1 km². Thus, 12 cm² represents exactly 12 km²!",
      hint: "1 cm = 1 km, so 1 cm² = 1 km². 12 cm² = 12 km²."
    }
  ];
}

// World 8: Blueprint Bay (Architectural Floor Plans & Scale Models)
function getWorld8() {
  return [
    {
      id: "w8q1",
      world: 8,
      slot: 1,
      tag: "1 : 50 FLOOR PLAN",
      stem: "On a 1 : 50 cabin floor plan, the living room is drawn 12 cm long. What is the real length of the room in metres?",
      visual: { type: "plan", widthCm: 12, heightCm: 8, label: "Living Room (1 : 50)" },
      options: buildOptions("6 m", [
        { val: "60 m", why: "Off by factor of 10" },
        { val: "0.6 m", why: "Divided by 100 twice" },
        { val: "2.4 m", why: "Divided 12 by 5" }
      ], "m"),
      explanation: "12 cm × 50 = 600 cm = 6 m.",
      hint: "Multiply 12 cm by 50 to get 600 cm = 6 m."
    },
    {
      id: "w8q2",
      world: 8,
      slot: 2,
      tag: "FLOOR PLAN TO REAL",
      stem: "A bedroom measures 8 cm by 6 cm on a 1 : 50 floor plan. What are its real dimensions in metres?",
      visual: null,
      options: buildOptions("4 m × 3 m", [
        { val: "40 m × 30 m", why: "Off by factor of 10" },
        { val: "16 m × 12 m", why: "Used scale 1 : 200" },
        { val: "2 m × 1.5 m", why: "Divided by 4" }
      ]),
      explanation: "8 cm × 50 = 400 cm = 4 m; 6 cm × 50 = 300 cm = 3 m. Real room is 4 m × 3 m.",
      hint: "8 × 50 = 400 cm = 4 m. 6 × 50 = 300 cm = 3 m."
    },
    {
      id: "w8q3",
      world: 8,
      slot: 3,
      tag: "REAL TO FLOOR PLAN",
      stem: "A ranger storage shed is 5 m wide. How wide should it be drawn on a 1 : 50 plan in cm?",
      visual: null,
      options: buildOptions("10 cm", [
        { val: "1 cm", why: "Off by factor of 10" },
        { val: "25 cm", why: "Multiplied 5 by 5" },
        { val: "100 cm", why: "Too large" }
      ], "cm"),
      explanation: "5 m = 500 cm. 500 cm ÷ 50 = 10 cm.",
      hint: "Convert 5 m to 500 cm and divide by 50."
    },
    {
      id: "w8q4",
      world: 8,
      slot: 4,
      tag: "1 : 20 SCALE MODEL",
      stem: "A scale model of Beacon Lighthouse is built at 1 : 20. If the real lighthouse is 18 m tall, how tall is the model in cm?",
      visual: null,
      options: buildOptions("90 cm", [
        { val: "9 cm", why: "Off by factor of 10" },
        { val: "36 cm", why: "Multiplied 18 by 2" },
        { val: "900 cm", why: "Too large" }
      ], "cm"),
      explanation: "18 m = 1 800 cm. 1 800 cm ÷ 20 = 90 cm.",
      hint: "18 m = 1 800 cm. Divide by 20 to get 90 cm."
    },
    {
      id: "w8q5",
      world: 8,
      slot: 5,
      tag: "MODEL DOOR HEIGHT",
      stem: "On a 1 : 25 architectural model, the front door is 8 cm tall. What is the real door height in metres?",
      visual: null,
      options: buildOptions("2 m", [
        { val: "20 m", why: "Off by factor of 10" },
        { val: "0.2 m", why: "Divided by 100 extra" },
        { val: "3.125 m", why: "Divided 25 by 8" }
      ], "m"),
      explanation: "8 cm × 25 = 200 cm = 2 m.",
      hint: "8 cm × 25 = 200 cm = 2 m."
    },
    {
      id: "w8q6",
      world: 8,
      slot: 6,
      tag: "MAGNIFIED SPECIMEN (5 : 1)",
      stem: "A rare island ant specimen is drawn at 5 : 1 magnification. If the drawing is 4.5 cm long, what is the actual length of the ant in mm?",
      visual: null,
      options: buildOptions("9 mm", [
        { val: "22.5 mm", why: "Multiplied 4.5 by 5 instead of dividing (M8)" },
        { val: "0.9 mm", why: "Off by factor of 10" },
        { val: "90 mm", why: "Confused mm with cm" }
      ], "mm"),
      explanation: "5 : 1 enlargement means drawing is 5 times larger than life. 4.5 cm = 45 mm. Real length = 45 mm ÷ 5 = 9 mm.",
      hint: "In an enlargement (5 : 1), real length = drawing ÷ 5. 45 mm ÷ 5 = 9 mm."
    },
    {
      id: "w8q7",
      world: 8,
      slot: 7,
      tag: "MODEL CAR SCALE",
      stem: "A die-cast model patrol jeep is 10 cm long. The actual jeep is 4 m long. What is the model scale in the form 1 : n?",
      visual: null,
      options: buildOptions("1 : 40", [
        { val: "1 : 4", why: "Did not convert metres to cm (M7)" },
        { val: "1 : 400", why: "Off by factor of 10" },
        { val: "40 : 1", why: "Wrote ratio backwards (M5)" }
      ]),
      explanation: "4 m = 400 cm. 10 cm : 400 cm = 1 : 40.",
      hint: "4 m = 400 cm. Divide 400 by 10 = 40."
    },
    {
      id: "w8q8",
      world: 8,
      slot: 8,
      tag: "1 : 100 BLUEPRINT",
      stem: "On a 1 : 100 site plan, a wooden deck measures 7.5 cm by 4 cm. What is its real area in m²?",
      visual: null,
      options: buildOptions("30 m²", [
        { val: "300 m²", why: "Off by factor of 10" },
        { val: "3 m²", why: "Off by factor of 10" },
        { val: "30 000 m²", why: "Forgot to convert cm² to m²" }
      ], "m²"),
      explanation: "Real length = 7.5 × 100 cm = 7.5 m. Real width = 4 × 100 cm = 4 m. Area = 7.5 × 4 = 30 m².",
      hint: "Real dimensions are 7.5 m by 4 m. 7.5 × 4 = 30 m²."
    },
    {
      id: "w8q9",
      world: 8,
      slot: 9,
      tag: "MICROSCOPE MAGNIFICATION",
      stem: "A plant cell of diameter 0.02 mm is viewed under a 400 : 1 microscope projection. What is its diameter on screen in mm?",
      visual: null,
      options: buildOptions("8 mm", [
        { val: "0.8 mm", why: "Off by factor of 10" },
        { val: "80 mm", why: "Added extra zero" },
        { val: "0.05 mm", why: "Divided instead of multiplying" }
      ], "mm"),
      explanation: "0.02 mm × 400 = 8 mm.",
      hint: "Multiply 0.02 mm by 400 = 8 mm."
    },
    {
      id: "w8q10",
      world: 8,
      slot: 10,
      tag: "PLAN RATIO REASONING",
      stem: "Which scale produces a larger drawing of a building floor plan: 1 : 50 or 1 : 200?",
      visual: null,
      options: buildOptions("1 : 50", [
        { val: "1 : 200", why: "Confused larger number with larger drawing" },
        { val: "Both produce identical drawings", why: "Ignored scale" },
        { val: "Neither can be used for buildings", why: "False premise" }
      ]),
      explanation: "1 : 50 produces a drawing 4 times larger than 1 : 200 because each centimetre represents only 50 cm instead of 200 cm.",
      hint: "Smaller denominator = larger drawing on paper."
    }
  ];
}

// World 9: Error Inspector (Spot the Misconception)
function getWorld9() {
  return [
    {
      id: "w9q1",
      world: 9,
      slot: 1,
      tag: "MISCONCEPTION: NO COMMON UNITS",
      stem: "Leo wrote: 'A scale of 2 cm : 1 km simplifies to 2 : 1.' What mistake did Leo make?",
      visual: null,
      options: buildOptions("He did not convert 1 km into centimetres first", [
        { val: "He should have multiplied 2 by 1", why: "Incorrect rule" },
        { val: "He wrote the 2 on the wrong side", why: "Map is on left" },
        { val: "His answer is actually correct", why: "Failed to spot error" }
      ]),
      explanation: "Before simplifying a ratio, both sides must share common units! 1 km = 100 000 cm, so 2 : 100 000 = 1 : 50 000.",
      hint: "Both sides of a scale ratio must be in the same units (centimetres)."
    },
    {
      id: "w9q2",
      world: 9,
      slot: 2,
      tag: "MISCONCEPTION: LINEAR AREA",
      stem: "A map has scale 1 cm : 2 km. Leo calculates that a 3 cm² pond has a real area of 6 km². Why is he WRONG?",
      visual: null,
      options: buildOptions("Area scales by n² (4 km²), so real area is 12 km²", [
        { val: "He should have divided 3 by 2 to get 1.5 km²", why: "Swapped operation" },
        { val: "He should have cubed 2 km to get 24 km²", why: "Confused with volume" },
        { val: "His answer of 6 km² is correct", why: "Failed to spot error" }
      ]),
      explanation: "When length scales by 2 km, area scales by 2² = 4 km² per cm²! 3 × 4 = 12 km².",
      hint: "Area scales by n²: 1 cm² = 2² = 4 km². 3 × 4 = 12 km²."
    },
    {
      id: "w9q3",
      world: 9,
      slot: 3,
      tag: "MISCONCEPTION: SWAPPED OPERATION",
      stem: "A real road is 6 km long. On a 1 : 50 000 map, Leo multiplies 6 × 50 000 and gets 300 000 cm. What went wrong?",
      visual: null,
      options: buildOptions("He should have divided by 50 000 because map drawings are smaller", [
        { val: "He should have added 50 000 instead", why: "Additive error" },
        { val: "He should have squared 6 km first", why: "Confused with area" },
        { val: "His method was completely right", why: "Failed to spot error" }
      ]),
      explanation: "Going from ground to map requires DIVISION because map lengths are smaller! 600 000 cm ÷ 50 000 = 12 cm.",
      hint: "Map lengths are smaller than real ground lengths, so you must divide by n."
    },
    {
      id: "w9q4",
      world: 9,
      slot: 4,
      tag: "MISCONCEPTION: RULER ZERO ERROR",
      stem: "When measuring a trail with his ruler, Leo placed the 1 cm mark at the harbor instead of the 0 mark and read 7.4 cm. What is the true map distance?",
      visual: null,
      options: buildOptions("6.4 cm", [
        { val: "8.4 cm", why: "Added 1 cm instead of subtracting (M10)" },
        { val: "7.4 cm", why: "Ignored the offset (M10)" },
        { val: "0.74 cm", why: "Shifted decimal place" }
      ], "cm"),
      explanation: "Since he started at 1 cm instead of 0, he overcounted by 1.0 cm. True length = 7.4 - 1.0 = 6.4 cm!",
      hint: "Subtract the 1 cm zero offset from the reading."
    },
    {
      id: "w9q5",
      world: 9,
      slot: 5,
      tag: "MISCONCEPTION: UNIT LOSS",
      stem: "Leo converted 450 000 cm to km by dividing by 1 000 and got 450 km. What is the correct conversion?",
      visual: null,
      options: buildOptions("4.5 km", [
        { val: "45 km", why: "Divided by 10 000" },
        { val: "0.45 km", why: "Divided by 1 000 000" },
        { val: "450 km is correct", why: "Failed to spot error" }
      ], "km"),
      explanation: "There are 100 000 cm in a kilometre (1 000 m × 100 cm). 450 000 ÷ 100 000 = 4.5 km.",
      hint: "Divide by 100 000 to convert cm to km."
    },
    {
      id: "w9q6",
      world: 9,
      slot: 6,
      tag: "MISCONCEPTION: REVERSE RATIO",
      stem: "For a miniature architectural model, Leo wrote the scale as 50 : 1 instead of 1 : 50. Why is this confusing?",
      visual: null,
      options: buildOptions("50 : 1 means the model is 50 times larger than real life (an enlargement)", [
        { val: "50 : 1 is not a valid mathematical ratio", why: "False premise" },
        { val: "The numbers must always add to 100", why: "False rule" },
        { val: "There is no difference between 50 : 1 and 1 : 50", why: "Ignored ratio order" }
      ]),
      explanation: "In scale notation, Map/Model is on the left. 1 : 50 means a reduction, while 50 : 1 means an enlargement.",
      hint: "1 : n is a reduction; n : 1 is an enlargement."
    },
    {
      id: "w9q7",
      world: 9,
      slot: 7,
      tag: "MISCONCEPTION: ADDITIVE ERROR",
      stem: "A trail is 4 cm on a 1 : 25 000 map. Leo says the real trail is 4 + 25 000 = 25 004 cm. How should he fix his thinking?",
      visual: null,
      options: buildOptions("Scale is a multiplicative ratio; he must multiply 4 × 25 000", [
        { val: "He should subtract 4 from 25 000", why: "Still additive (M6)" },
        { val: "He should add 25 000 twice", why: "Still additive" },
        { val: "His addition was correct", why: "Failed to spot error" }
      ]),
      explanation: "Scale is multiplicative, not additive! 4 cm × 25 000 = 100 000 cm = 1 km.",
      hint: "Scale factors are multiplied, never added."
    },
    {
      id: "w9q8",
      world: 9,
      slot: 8,
      tag: "MISCONCEPTION: INVERTING AREA SQRT",
      stem: "An area scale is 1 cm² : 16 km². Leo squares 16 to get 1 cm : 256 km. What was his error?",
      visual: null,
      options: buildOptions("To find linear scale from area scale, you take the square root (√16 = 4 km)", [
        { val: "He should have divided 16 by 2 to get 8 km", why: "Linear division error" },
        { val: "He should have kept 16 km as the linear scale", why: "Ignored n²" },
        { val: "Squaring was the right step", why: "Failed to spot error" }
      ]),
      explanation: "Area scale is n². To find linear scale n, take the square root: √16 = 4 km.",
      hint: "Take the square root of 16 to find the linear scale."
    },
    {
      id: "w9q9",
      world: 9,
      slot: 9,
      tag: "MISCONCEPTION: UNREDUCED RATIO",
      stem: "A student leaves a scale as 4 cm : 80 000 cm. What should be done to write it in standard form?",
      visual: null,
      options: buildOptions("Divide both numbers by 4 to get 1 : 20 000", [
        { val: "Multiply both numbers by 4", why: "Wrong operation" },
        { val: "Remove the 4 and leave 1 : 80 000", why: "Ignored 4" },
        { val: "Nothing, 4 : 80 000 is the standard form", why: "M9 misconception" }
      ]),
      explanation: "Standard scale ratios must have 1 on the left side: 4 ÷ 4 = 1 and 80 000 ÷ 4 = 20 000 → 1 : 20 000.",
      hint: "Divide both sides by 4 to make the left side equal to 1."
    },
    {
      id: "w9q10",
      world: 9,
      slot: 10,
      tag: "MISCONCEPTION: LARGER SCALE",
      stem: "Leo insists that 1 : 500 000 is a larger scale than 1 : 25 000 because 500 000 is a bigger number. Explain why he is wrong:",
      visual: null,
      options: buildOptions("1/500 000 is a smaller fraction than 1/25 000, so it shows less detail", [
        { val: "He is right, bigger numbers always mean larger scales", why: "Supported misconception" },
        { val: "Both scales show the exact same view", why: "False premise" },
        { val: "500 000 is actually smaller than 25 000", why: "Numerically incorrect" }
      ]),
      explanation: "Scale is a fraction! 1/25 000 is 20 times larger than 1/500 000, so 1 : 25 000 is the larger scale and shows much more detail.",
      hint: "Think of 1/25 000 vs 1/500 000 as fractions."
    }
  ];
}

// World 10: Grand Cartographer Quest (Mastery Mixed Challenge)
function getWorld10() {
  return [
    {
      id: "w10q1",
      world: 10,
      slot: 1,
      tag: "PERIMETER & SCALE",
      stem: "A rectangular island measures 8 cm by 5 cm on a 1 : 50 000 map. What is the real perimeter of the island in km?",
      visual: null,
      options: buildOptions("13 km", [
        { val: "26 km", why: "Doubled perimeter twice" },
        { val: "6.5 km", why: "Forgot to double length and width" },
        { val: "20 km", why: "Multiplied 8 by 5 instead of perimeter" }
      ], "km"),
      explanation: "Map perimeter = 2 × (8 + 5) = 26 cm. Real perimeter = 26 cm × 50 000 = 1 300 000 cm = 13 km.",
      hint: "Map perimeter = 2 × (8 + 5) = 26 cm. 26 cm × 50 000 = 1 300 000 cm = 13 km."
    },
    {
      id: "w10q2",
      world: 10,
      slot: 2,
      tag: "AREA & SPEED COMBO",
      stem: "On a 1 cm : 2 km map, a square park has an area of 9 cm². What is the actual area in km²?",
      visual: null,
      options: buildOptions("36 km²", [
        { val: "18 km²", why: "Scaled linearly (M3)" },
        { val: "9 km²", why: "Did not scale" },
        { val: "81 km²", why: "Squared 9" }
      ], "km²"),
      explanation: "1 cm : 2 km means 1 cm² : 4 km². Real area = 9 cm² × 4 = 36 km².",
      hint: "1 cm² = 2² = 4 km². 9 × 4 = 36 km²."
    },
    {
      id: "w10q3",
      world: 10,
      slot: 3,
      tag: "HIKING TRIP TIME",
      stem: "Liam walks a 14 cm path on a 1 : 25 000 map. If he walks at 3.5 km/h, how long does the hike take?",
      visual: null,
      options: buildOptions("1 hour", [
        { val: "2 hours", why: "Calculation error" },
        { val: "30 minutes", why: "Halved time" },
        { val: "45 minutes", why: "Arithmetic slip" }
      ]),
      explanation: "Real distance = 14 cm × 25 000 = 350 000 cm = 3.5 km. Time = 3.5 km ÷ 3.5 km/h = 1 hour.",
      hint: "14 × 25 000 = 350 000 cm = 3.5 km. 3.5 ÷ 3.5 = 1 hour."
    },
    {
      id: "w10q4",
      world: 10,
      slot: 4,
      tag: "MAP COMPARISON",
      stem: "A trail is 6 cm on Map X (1 : 20 000). How long will the same trail be on Map Y (1 : 60 000)?",
      visual: null,
      options: buildOptions("2 cm", [
        { val: "18 cm", why: "Multiplied by 3 instead of dividing" },
        { val: "3 cm", why: "Halved instead of third" },
        { val: "1.2 cm", why: "Calculation error" }
      ], "cm"),
      explanation: "Real distance = 6 cm × 20 000 = 120 000 cm. On Map Y: 120 000 ÷ 60 000 = 2 cm.",
      hint: "Real trail is 1.2 km = 120 000 cm. On Map Y: 120 000 ÷ 60 000 = 2 cm."
    },
    {
      id: "w10q5",
      world: 10,
      slot: 5,
      tag: "CABIN BLUEPRINT",
      stem: "A cabin floor plan is drawn at 1 : 50. The cabin is 10 m by 8 m. What is its area on the blueprint in cm²?",
      visual: null,
      options: buildOptions("320 cm²", [
        { val: "160 cm²", why: "Halved dimensions" },
        { val: "80 cm²", why: "Did not multiply dimensions" },
        { val: "400 cm²", why: "Calculation error" }
      ], "cm²"),
      explanation: "Plan length = 1 000 ÷ 50 = 20 cm. Plan width = 800 ÷ 50 = 16 cm. Plan area = 20 × 16 = 320 cm².",
      hint: "Length on plan = 20 cm, width = 16 cm. Area = 20 × 16 = 320 cm²."
    },
    {
      id: "w10q6",
      world: 10,
      slot: 6,
      tag: "FIND LINEAR FROM AREA",
      stem: "On a forestry map, 16 cm² represents 64 km². What is the linear scale in the form 1 cm : ? km?",
      visual: null,
      options: buildOptions("1 cm : 2 km", [
        { val: "1 cm : 4 km", why: "Forgot to take square root of 4 (M4)" },
        { val: "1 cm : 8 km", why: "Took √64 without dividing by 16" },
        { val: "1 cm : 1 km", why: "Calculation error" }
      ]),
      explanation: "16 cm² : 64 km² simplifies to 1 cm² : 4 km². Taking the square root gives 1 cm : 2 km.",
      hint: "64 ÷ 16 = 4 km² per cm². √4 = 2 km."
    },
    {
      id: "w10q7",
      world: 10,
      slot: 7,
      tag: "SPEED & SCALE OVERVIEW",
      stem: "A helicopter flies at 120 km/h for 15 minutes. How many centimetres is this flight on a 1 : 200 000 map?",
      visual: null,
      options: buildOptions("15 cm", [
        { val: "30 cm", why: "Used 30 min instead of 15" },
        { val: "7.5 cm", why: "Halved distance" },
        { val: "60 cm", why: "Used 1 hour flight" }
      ], "cm"),
      explanation: "15 min = 0.25 h. Distance = 120 × 0.25 = 30 km = 3 000 000 cm. Map = 3 000 000 ÷ 200 000 = 15 cm.",
      hint: "In 15 minutes, distance = 30 km = 3 000 000 cm. Divide by 200 000 = 15 cm."
    },
    {
      id: "w10q8",
      world: 10,
      slot: 8,
      tag: "PHOTOCOPY & AREA",
      stem: "A circular lake has an area of 5 cm² on a 1 : 50 000 map. If the map is reduced to 50% on a photocopier, what will the lake's area be on the new copy?",
      visual: null,
      options: buildOptions("1.25 cm²", [
        { val: "2.5 cm²", why: "Halved linearly instead of squaring 0.5 (M3)" },
        { val: "5 cm²", why: "Thought area stayed unchanged" },
        { val: "0.5 cm²", why: "Divided by 10" }
      ], "cm²"),
      explanation: "Reducing lengths by 50% (0.5×) reduces area by (0.5)² = 0.25×. 5 cm² × 0.25 = 1.25 cm².",
      hint: "Length factor is 0.5. Area factor is (0.5)² = 0.25. 5 × 0.25 = 1.25 cm²."
    },
    {
      id: "w10q9",
      world: 10,
      slot: 9,
      tag: "ENLARGEMENT MODEL",
      stem: "A micro-switch of length 3 mm is shown as 15 cm on an engineering poster. What is the enlargement scale?",
      visual: null,
      options: buildOptions("50 : 1", [
        { val: "1 : 50", why: "Wrote as reduction instead of enlargement (M5)" },
        { val: "5 : 1", why: "Off by factor of 10" },
        { val: "500 : 1", why: "Added extra zero" }
      ]),
      explanation: "15 cm = 150 mm. 150 mm ÷ 3 mm = 50. Since drawing is larger, scale is 50 : 1.",
      hint: "15 cm = 150 mm. 150 ÷ 3 = 50. Scale is 50 : 1."
    },
    {
      id: "w10q10",
      world: 10,
      slot: 10,
      tag: "GRAND CARTOGRAPHER MASTERY",
      stem: "A 4 cm line on Map A (1 : 25 000) represents the same real trail as a 1 cm line on Map B. What is the scale of Map B?",
      visual: null,
      options: buildOptions("1 : 100 000", [
        { val: "1 : 50 000", why: "Doubled instead of quadrupled" },
        { val: "1 : 200 000", why: "Multiplied by 8" },
        { val: "1 : 12 500", why: "Halved denominator" }
      ]),
      explanation: "Real distance = 4 cm × 25 000 = 100 000 cm = 1 km. On Map B, 1 cm represents 100 000 cm. So Map B scale is 1 : 100 000.",
      hint: "Real distance is 100 000 cm. 1 cm represents 100 000 cm, so scale is 1 : 100 000."
    }
  ];
}
