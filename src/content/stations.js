export const STATIONS = [
  {
    id: 1,
    title: "Station 1: Trail Surveyor",
    subtitle: "Ruler & Topographic Map",
    badge: "LAB 01",
    intro: "Help Liam and Chloe survey the Isle of Whispers using Ranger Arthur's 1 : 50 000 topographic trail map. Measure map distances with your ruler and calculate real ground distances.",
    storyTie: "Story Arc 1–4: Faded Map of the Isle of Whispers",
    formula: "Actual Distance = Map Distance (cm) × Scale Factor",
    problems: [
      {
        id: "s1p1",
        objective: "Measure map distance with a ruler and convert to real ground distance (cm → km).",
        task: "Use your interactive surveyor ruler to measure the trail from Pinecrest Harbor to Beacon Lighthouse. Using the scale 1 cm : 500 m, find the real ground distance in kilometres.",
        storyContext: "Liam aligns the surveyor ruler along the trail from Pinecrest Harbor to Beacon Lighthouse.",
        scale: "1 cm : 500 m (1 : 50 000)",
        mapLengthCm: 6.4,
        unit: "km",
        expected: 3.2,
        step1: "Align the ruler with 0 cm at Pinecrest Harbor and read the distance at Beacon Lighthouse (in cm).",
        step2: "Multiply your measured map centimetres by 500 m, then convert metres to kilometres (divide by 1 000).",
        hint: "Align 0 cm at the Harbor and note the tick at the Lighthouse. Multiply that map distance by 500 m, then divide by 1 000 to convert to km."
      },
      {
        id: "s1p2",
        objective: "Calculate map drawing length from known real ground distance (km → cm).",
        task: "Chloe's detailed hiking map has scale 1 : 25 000 (1 cm : 250 m). If the actual ground distance to Falcon Lookout is 3.5 km, how long should Chloe draw this trail on her map in cm?",
        storyContext: "Chloe calculates how long to draw the steep mountain trail to Falcon Lookout on her map.",
        scale: "1 : 25 000 (1 cm : 250 m)",
        realKm: 3.5,
        unit: "cm",
        expected: 14,
        step1: "Convert 3.5 km into metres by multiplying by 1 000.",
        step2: "Divide the total metres by the scale rate (250 m per cm) to find the map length in cm.",
        hint: "Convert 3.5 km to metres (multiply by 1 000). Since each 1 cm represents 250 m, divide the total ground metres by 250."
      },
      {
        id: "s1p3",
        objective: "Combine multiple map path segments and convert total length to real kilometres.",
        task: "Ranger Arthur patrols from the Boat Ramp past Hidden Falls on the 1 : 50 000 map. If the two trail segments measure 4.2 cm and 5.8 cm on the map, what is the total ground distance in kilometres?",
        storyContext: "Ranger Arthur calculates the full length of his daily patrol route across two trail segments.",
        scale: "1 : 50 000 (1 cm : 0.5 km)",
        mapLengthCm: 10.0,
        unit: "km",
        expected: 5.0,
        step1: "Add the two map lengths together in centimetres.",
        step2: "On a 1 : 50 000 map, 1 cm represents 0.5 km. Multiply your total map length by 0.5 km.",
        hint: "Add 4.2 cm and 5.8 cm to get the total map distance. Then multiply by 0.5 km (the real distance represented by 1 cm)."
      }
    ]
  },
  {
    id: 2,
    title: "Station 2: Cartographer's Desk",
    subtitle: "Unit Ladder & Ratio Calibration",
    badge: "LAB 02",
    intro: "Ranger Arthur teaches Liam: 'A scale is a promise.' Climb the metric unit ladder to convert word scales and unscaled maps into representative fractions (1 : n).",
    storyTie: "Story Arc 2, 5 & 6: The Mystery Map & Scale Comparison",
    formula: "Ratio 1 : n = (Map Distance in cm) : (Ground Distance in cm)",
    problems: [
      {
        id: "s2p1",
        objective: "Convert a word scale with mixed units (1 cm : 250 m) into a unit-free ratio 1 : n.",
        task: "Convert Ranger Arthur's word scale '1 cm : 250 m' into the standard ratio form 1 : n. What is the value of n?",
        storyContext: "Liam converts the trail guide word scale into a unit-free ratio for the cartographer archives.",
        inputScale: "1 cm : 250 m",
        unit: "n",
        expected: 25000,
        step1: "Convert 250 metres into centimetres (1 m = 100 cm).",
        step2: "Since both sides are now in centimetres, the ratio is 1 : n. Enter the number for n.",
        hint: "Convert 250 m to cm by multiplying by 100. When both units match, the ground number is your value for n."
      },
      {
        id: "s2p2",
        objective: "Find ratio scale 1 : n from known map distance and ground distance.",
        task: "Liam finds a faded island map with no scale. A 5 cm trail on the map is known to be 2 km in reality. Find the scale in the form 1 : n. What is the value of n?",
        storyContext: "Solving the mystery map found in the old ranger trunk: 5 cm on paper equals 2 km in reality.",
        inputScale: "5 cm : 2 km",
        unit: "n",
        expected: 40000,
        step1: "Convert 2 km into centimetres (1 km = 100 000 cm).",
        step2: "Divide both the map length (5) and the ground length by 5 so the map side equals 1.",
        hint: "First convert 2 km to cm (multiply by 100 000). Then divide both sides by 5 to find what 1 cm represents."
      },
      {
        id: "s2p3",
        objective: "Determine new scale ratio 1 : n after a 200% map enlargement.",
        task: "Liam takes his 1 : 50 000 map and enlarges it to 200% on the station photocopier. What is the new scale ratio 1 : n? What is the value of n?",
        storyContext: "Chloe needs larger details, so Liam uses the photocopier to double the map's printed size.",
        inputScale: "1 : 50 000 enlarged 200%",
        unit: "n",
        expected: 25000,
        step1: "A 200% enlargement doubles every drawn distance on the paper.",
        step2: "Because 1 cm on paper now covers half the ground distance, divide the scale denominator by 2.",
        hint: "Doubling the map size (200%) means every line is 2× longer on paper. Divide 50 000 by 2 to find the new ratio denominator."
      }
    ]
  },
  {
    id: 3,
    title: "Station 3: Hydrology & Lake Area",
    subtitle: "Area Scale 1 : n² & Reservoir GIS",
    badge: "LAB 03",
    intro: "Investigate Silver Lake on the Isle of Whispers. Count grid tiles to find map area and apply the 1 : n² area scale rule to calculate actual surface area.",
    storyTie: "Story Arc 7: Silver Lake & The n² Area Rule",
    formula: "If Linear Scale is 1 cm : k km, then Area Scale is 1 cm² : k² km²",
    problems: [
      {
        id: "s3p1",
        objective: "Calculate real ground area from map grid tiles using the 1 cm² : k² km² area rule.",
        task: "On an island survey map with scale 1 cm : 2 km, use the interactive grid to count the 1 cm² tiles covering Silver Lake. What is the actual surface area of the lake in km²?",
        storyContext: "Liam and Chloe survey Silver Lake reservoir to estimate fresh water storage for the island.",
        scale: "1 cm : 2 km (Linear Scale)",
        mapAreaCm2: 3.5,
        unit: "km²",
        expected: 14,
        step1: "Count the 1 cm² tiles covering the lake on the grid (3 full tiles + 1 half tile = 3.5 cm²).",
        step2: "Square the linear factor: (2 km)² = 4 km² per cm². Then multiply the lake's map area by 4.",
        hint: "Count the grid tiles covering the lake (3.5 cm²). Each 1 cm² tile represents 2 × 2 = 4 km². Multiply the map tiles by 4."
      },
      {
        id: "s3p2",
        objective: "Calculate map area in cm² from actual ground area using a 1 : 50 000 map scale.",
        task: "The protected forest catchment around Silver Lake has an actual area of 2.5 km². On a 1 : 50 000 map (1 cm : 0.5 km), what is its area on paper in cm²?",
        storyContext: "Ranger Arthur calculates the size needed to shade the forest catchment on his map sheet.",
        scale: "1 : 50 000 (1 cm : 0.5 km)",
        realAreaKm2: 2.5,
        unit: "cm²",
        expected: 10,
        step1: "Find the area represented by 1 cm² by squaring the linear scale: (0.5 km)².",
        step2: "Divide the actual ground area (2.5 km²) by this area factor to get map cm².",
        hint: "First square 0.5 km to find the area factor (0.5 × 0.5 = 0.25 km² per cm²). Then divide 2.5 km² by 0.25."
      },
      {
        id: "s3p3",
        objective: "Determine linear scale (1 cm : k km) from a given area scale by taking the square root.",
        task: "A coastal bay area scale is given as 1 cm² : 25 km². What is the linear map scale in the form 1 cm : ? km? (Enter the number of km).",
        storyContext: "Chloe needs the linear hiking scale from an environmental chart that only lists the area ratio.",
        scale: "Area: 1 cm² : 25 km²",
        unit: "km",
        expected: 5,
        step1: "Recall that Area Factor = (Linear Factor)².",
        step2: "Take the square root of 25 to find how many kilometres 1 cm represents.",
        hint: "To find the linear scale from the area scale, take the square root of 25 (√25)."
      }
    ]
  },
  {
    id: 4,
    title: "Station 4: Architect's Workshop",
    subtitle: "Floor Plans & Beacon Lighthouse Model",
    badge: "LAB 04",
    intro: "Step inside Ranger Arthur's cabin and the Beacon Lighthouse workshop. Work with architectural CAD floor plans (1 : 50), 3D miniature models (1 : 20), and biological lens specimens (5 : 1).",
    storyTie: "Story Arc 8: Ranger Cabin & Beacon Lighthouse Model",
    formula: "Drawn Dimension = Real Dimension ÷ Scale Factor",
    problems: [
      {
        id: "s4p1",
        objective: "Use a 1 : 50 architectural scale to find blueprint drawing dimensions from real metres.",
        task: "Ranger Arthur's cabin room has an actual length of 8 m and width of 6 m. On a 1 : 50 architectural blueprint, find the drawn length of the room in cm.",
        storyContext: "Liam inspects the cabin blueprint dimensions before drafting a storage extension.",
        scale: "1 : 50 (Architectural Blueprint)",
        realDim: "8 m length × 6 m width",
        unit: "cm",
        expected: 16,
        step1: "Convert the real length of 8 m into centimetres (1 m = 100 cm).",
        step2: "Divide the real centimetres by the scale denominator (50) to find the blueprint length in cm.",
        hint: "Convert 8 m to centimetres first (8 × 100 cm). Then divide by the scale factor 50."
      },
      {
        id: "s4p2",
        objective: "Calculate real physical height from a 1 : 20 3D miniature scale model.",
        task: "Inside Beacon Lighthouse, a scale model of the tower is built at 1 : 20. If the model entrance door is 9 cm tall, calculate the actual height of the real lighthouse door in metres.",
        storyContext: "Chloe compares the visitor center scale model with the towering stone lighthouse entrance.",
        scale: "1 : 20 (Miniature Model)",
        modelCm: 9,
        unit: "m",
        expected: 1.8,
        step1: "Multiply the model door height (9 cm) by the scale factor (20) to find the real height in cm.",
        step2: "Convert centimetres to metres by dividing by 100.",
        hint: "Multiply 9 cm by 20 to find real centimetres. Then divide by 100 to convert to metres."
      },
      {
        id: "s4p3",
        objective: "Determine real biological specimen size from a 5 : 1 magnification drawing.",
        task: "Chloe examines an island pine beetle specimen under a 5 : 1 magnifying field-glass. If the enlarged drawing is 6 cm long, calculate the insect's actual real-life length in cm.",
        storyContext: "Ranger Arthur shows the children an enlarged biological drawing of the native pine beetle.",
        scale: "5 : 1 (Microscope Enlargement)",
        drawingCm: 6,
        unit: "cm",
        expected: 1.2,
        step1: "Note the ratio: 5 : 1 means the drawing is 5 times larger than the real insect.",
        step2: "Divide the drawing length (6 cm) by 5 to find the real insect length.",
        hint: "Since the drawing is 5 times actual size, divide 6 cm by 5 to find the real length."
      }
    ]
  }
];
