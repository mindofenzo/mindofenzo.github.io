/** --- PIXEL ART DEFINITIONS & ANIMATIONS --- */

// Expanded Color Palette for High Detail
const pixelColors = {
    'O': '#FF7518', // Orange
    'G': '#00FF00', // Bright Green
    'D': '#008000', // Dark Green (Tree depth/Stems)
    'B': '#8B4513', // Brown (Trunks/Stems)
    'R': '#FF0055', // Red
    'Y': '#FFD700', // Yellow
    'W': '#FFFFFF', // White
    'P': '#9932CC', // Purple
    'C': '#00FFFF', // Cyan
    'K': '#111111', // Black/Dark (Eyes/Mouths)
    'S': '#FFDAA3', // Skin tone (Santa)
    'M': '#FF69B4'  // Pink (Bunny ears)
};

// Art Library now holds Arrays of Frames [Frame1, Frame2] for animation
const artLibrary = {
    // --- SPACE THEME ---
    rocket: [
        [ // Frame 1: Long Fire
            "     RR     ",
            "    RRRR    ",
            "   WWWWWW   ",
            "   WWCCWW   ",
            "   WWWWWW   ",
            "  RWWWWWWR  ",
            "  RR    RR  ",
            "    Y  Y    "
        ],
        [ // Frame 2: Short Fire
            "     RR     ",
            "    RRRR    ",
            "   WWWWWW   ",
            "   WWCCWW   ",
            "   WWWWWW   ",
            "  RWWWWWWR  ",
            "  RR    RR  ",
            "     OO     "
        ]
    ],
    ufo: [
        [ // Frame 1: Lights config 1
            "    CCCC    ",
            "   CCCCCC   ",
            " GGGGGGGGGG ",
            " GYGGYGGYGG ",
            " GGGGGGGGGG "
        ],
        [ // Frame 2: Lights config 2 (shifting)
            "    CCCC    ",
            "   CCCCCC   ",
            " GGGGGGGGGG ",
            " GGGYGGYGGY ",
            " GGGGGGGGGG "
        ]
    ],

    // --- SUMMER THEME ---
    sun: [
        [ // Frame 1: Outward rays
            "  Y   Y   Y  ",
            "    YYY      ",
            " Y YYYYYY  Y ",
            "  YYYYYYYY   ",
            " YYYYYYYYYY  ",
            "  YYYYYYYY   ",
            " Y YYYYYY  Y ",
            "    YYY      ",
            "  Y   Y   Y  "
        ],
        [ // Frame 2: Inward rays
            "    Y   Y    ",
            "  Y YYY Y Y  ",
            "   YYYYYY    ",
            " YYYYYYYYYY  ",
            "  YYYYYYYY   ",
            " YYYYYYYYYY  ",
            "   YYYYYY    ",
            "  Y YYY Y Y  ",
            "    Y   Y    "
        ]
    ],
    crab: [
        [ // Frame 1: Claws up
            " R        R ",
            "  R  RR  R  ",
            "   RRRRRR   ",
            "  R KRRK R  ",
            "   RRRRRR   ",
            "  R R  R R  ",
            " R        R "
        ],
        [ // Frame 2: Claws down
            "  R      R  ",
            "   R RR R   ",
            "   RRRRRR   ",
            "  R KRRK R  ",
            "   RRRRRR   ",
            "   R    R   ",
            "  R      R  "
        ]
    ],

    // --- HALLOWEEN THEME ---
    pumpkin: [
        [ // Frame 1: Stem left, bright candle
            "     GB     ",
            "   OOOOOO   ",
            "  OOOKKOOO  ",
            " OOOOOOOOOO ",
            " OOOKYYKOOO ",
            " OOOOKKOOOO ",
            "  OOOOOOOO  "
        ],
        [ // Frame 2: Stem right, dim candle (flicker)
            "     BG     ",
            "   OOOOOO   ",
            "  OOOKKOOO  ",
            " OOOOOOOOOO ",
            " OOOKOOKOOO ",
            " OOOOKKOOOO ",
            "  OOOOOOOO  "
        ]
    ],
    ghost: [
        [ // Frame 1: Tail swoosh left
            "   WWWW   ",
            "  WWWWWW  ",
            " WWKWWKWW ",
            " WWWWWWWW ",
            " WWWWWWWW ",
            " W WW WW  ",
            " W    W   "
        ],
        [ // Frame 2: Tail swoosh right
            "   WWWW   ",
            "  WWWWWW  ",
            " WWKWWKWW ",
            " WWWWWWWW ",
            " WWWWWWWW ",
            "  WW WW W ",
            "   W    W "
        ]
    ],

    // --- WINTER THEME ---
    tree: [
        [ // Frame 1: Yellow/Red lights
            "     Y      ",
            "    GGG     ",
            "   GDGDG    ",
            "    GGG     ",
            "  GDRGDG    ",
            " GGGGGGGG   ",
            "GDRGDGDGDG  ",
            "    BBB     "
        ],
        [ // Frame 2: White/Yellow lights flashing
            "     W      ",
            "    GGG     ",
            "   GRGYG    ",
            "    GGG     ",
            "  GYGDGR    ",
            " GGGGGGGG   ",
            "GRGYGDGYDG  ",
            "    BBB     "
        ]
    ],
    santa: [
        [ // Frame 1: Standing
            "   RRRRRR   ",
            "  WWWWWWWW  ",
            "  WWSKSKWW  ",
            "  WWWWWWWW  ",
            "  RRRKKRRR  ",
            "  R KKKK R  ",
            "  KK    KK  "
        ],
        [ // Frame 2: Waving
            "   RRRRRR W ",
            "  WWWWWWWWW ",
            "  WWSKSKWW  ",
            "  WWWWWWW   ",
            "  RRRKKRR   ",
            "  R KKKK R  ",
            "  KK    KK  "
        ]
    ],

    // --- EASTER THEME ---
    bunny: [
        [ // Frame 1: Down
            "  WW    WW  ",
            "  WMW  WMW  ",
            "  WWW  WWW  ",
            "   WWWWWW   ",
            "  WWKWWKWW  ",
            "   WWWMWW   ",
            "   WWWWWW   ",
            "            "
        ],
        [ // Frame 2: Hopping Up
            "            ",
            "  WW    WW  ",
            "  WMW  WMW  ",
            "  WWW  WWW  ",
            "   WWWWWW   ",
            "  WWKWWKWW  ",
            "   WWWMWW   ",
            "   WWWWWW   "
        ]
    ],
    egg: [
        [ // Frame 1: Purple/Yellow dominant
            "    YY    ",
            "   YPPY   ",
            "  PCCCCP  ",
            " CCYYYYCC ",
            "  CPPPPC  ",
            "   CYYC   "
        ],
        [ // Frame 2: Shifting Colors
            "    CC    ",
            "   CYYC   ",
            "  YPPPPY  ",
            " PPCCCCPP ",
            "  PYYYYP  ",
            "   PCCP   "
        ]
    ]
};

// Themes now have an array of "art" they can randomly pick from!
const themes = [
    { name: "Space Explorer", hueOffset: 240, art: ['rocket', 'ufo'], color: '#8800ff', audioId: 'music-space', effect: 'stars' },
    { name: "Summer Time", hueOffset: 60, art: ['sun', 'crab'], color: '#ffea00', audioId: 'music-summer', effect: 'float' },
    { name: "Halloween", hueOffset: 30, art: ['pumpkin', 'ghost'], color: '#FF7518', audioId: 'music-halloween', effect: 'embers' },
    { name: "Winter Wonderland", hueOffset: 180, art: ['tree', 'santa'], color: '#00ffff', audioId: 'music-winter', effect: 'snow' },
    { name: "Easter Hunt", hueOffset: 300, art: ['egg', 'bunny'], color: '#ff00ff', audioId: 'music-easter', effect: 'float' }
];
