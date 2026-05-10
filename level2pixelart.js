/** --- LEVEL 2: ANIMAL SAFARI 2-FRAME ANIMATIONS --- */

Object.assign(artLibrary, {
    
    // --- HOME ---
    dog: [ // Brown floppy ears
        ["  B   B  ", " BBB BBB ", " BBBBBBB ", " B K K B ", " BB K BB ", "  BBBBB  "],
        ["  B   B  ", " BBB BBB ", " BBBBBBB ", " B K K B ", " B M M B ", "  BBBBB  "] // Blinking/Smiling
    ],
    cat: [ // Orange with pointy ears
        [" O     O ", " OO   OO ", " OOOOOOO ", " O K K O ", " OO O OO ", "  OOOOO  "],
        [" O     O ", " OO   OO ", " OOOOOOO ", " O K K O ", " OOO OOO ", "  OOOOO  "]
    ],

    // --- FARM ---
    cow: [ // Black/White spots, pink nose
        [" K     K ", " WWWWWWW ", "WWKWWWWKW", "WWWKWWWWW", " WMMMMMW ", "  M K M  "],
        [" K     K ", " WWWWWWW ", "WWKWWWWKW", "WWWKWWWWW", " WMMMMMW ", "  M M M  "]
    ],
    pig: [ // Round and pink
        [" M     M ", " MMMMMMM ", "MM K K MM", "MMMMMMMMM", " MMRRRMM ", "  R K R  "],
        [" M     M ", " MMMMMMM ", "MM K K MM", "MMMMMMMMM", " MMRRRMM ", "  RRRRR  "]
    ],

    // --- ZOO ---
    giraffe: [ // Super long neck
        ["  Y   Y  ", "  YY YY  ", "  YKYKY  ", "  YYYYY  ", "   YBY   ", "   YYY   ", "   YBY   ", "   YYY   "],
        ["  Y   Y  ", "  YY YY  ", "  YKYKY  ", "  YYYYY  ", "   YBY   ", "   YYY   ", "   YYY   ", "   YYY   "]
    ],
    zebra: [ // Black and white stripes
        ["  W   W  ", "  WW WW  ", "  WKWKW  ", "  WWWWW  ", "   KWK   ", "   WWW   ", "   KWK   "],
        ["  W   W  ", "  WW WW  ", "  WKWKW  ", "  WWWWW  ", "   WWW   ", "   KWK   ", "   WWW   "]
    ],

    // --- JUNGLE ---
    lion: [ // Huge orange mane, yellow face
        [" OOOOOOO ", "OOYYYYYOO", "OOYKYKYOO", "OOYYYYYOO", "OOY Y YOO", " OOOOOOO "],
        [" OOOOOOO ", "OOYYYYYOO", "OOYKYKYOO", "OOYYYYYOO", "OO YYY OO", " OOOOOOO "]
    ],
    tiger: [ // Orange with black stripes
        [" O     O ", " OOOOOOO ", "OOKOKOKOO", "OOOOOOOOO", " OOWWWOO ", "   K K   "],
        [" O     O ", " OOOOOOO ", "OOKOKOKOO", "OOOOOOOOO", " OOWWWOO ", "   KKK   "]
    ],

    // --- OCEAN ---
    fish: [ // Clownfish style (Orange/White)
        ["   O     ", " OOWOO   ", "OOOWOOO O", "OOOWOOO O", " OOWOO   ", "   O     "],
        ["   O     ", " OOWOO   ", "OOOWOOO O", "OOOWOOO  ", " OOWOO  O", "   O     "]
    ],
    turtle: [ // Green shell
        ["   G     ", "  GGG    ", " DDDDD   ", "DDDDDDD G", "GDDDDDD  ", " DDDDD   "],
        ["   G     ", "  GGG    ", " DDDDD   ", "DDDDDDD  ", " DDDDDD G", " DDDDD   "]
    ]
});

// Update the levels logic to use the new file-based audio targeting
const gameLevels = {
    cameron: themes, // Re-uses the themes array from pixelArt.js
    safari: [
        { name: "Cozy Home", hueOffset: 200, art: ['dog', 'cat'], color: '#00aaff', file: 'music/Home.mp3', effect: 'float' },
        { name: "Sunny Farm", hueOffset: 60, art: ['cow', 'pig'], color: '#ffcc00', file: 'music/Farm.mp3', effect: 'stars' },
        { name: "Zoo Trip", hueOffset: 120, art: ['giraffe', 'zebra'], color: '#00ff44', file: 'music/Zoo.mp3', effect: 'float' },
        { name: "Deep Jungle", hueOffset: 150, art: ['lion', 'tiger'], color: '#00aa00', file: 'music/Jungle.mp3', effect: 'embers' },
        { name: "Blue Ocean", hueOffset: 220, art: ['fish', 'turtle'], color: '#0044ff', file: 'music/Outro.mp3', effect: 'snow' }
    ]
};
