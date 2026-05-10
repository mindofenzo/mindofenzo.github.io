/** --- LEVEL 1: HOLIDAY & SPACE 2-FRAME ANIMATIONS --- */

const pixelColors = {
    'O': '#FF7518', 'G': '#00FF00', 'D': '#008000', 'B': '#8B4513', 
    'R': '#FF0055', 'Y': '#FFD700', 'W': '#FFFFFF', 'P': '#9932CC', 
    'C': '#00FFFF', 'U': '#0000FF', 'K': '#111111', 'S': '#FFDAA3', 
    'M': '#FFB6C1', 'A': '#A9A9A9'
};

const artLibrary = {
    rocket: [
        ["     RR     ", "    RRRR    ", "   WWWWWW   ", "   WWCCWW   ", "   WWWWWW   ", "  RWWWWWWR  ", "  RR    RR  ", "    Y  Y    "],
        ["     RR     ", "    RRRR    ", "   WWWWWW   ", "   WWCCWW   ", "   WWWWWW   ", "  RWWWWWWR  ", "  RR    RR  ", "     OO     "]
    ],
    ufo: [
        ["    CCCC    ", "   CCCCCC   ", " GGGGGGGGGG ", " GYGGYGGYGG ", " GGGGGGGGGG "],
        ["    CCCC    ", "   CCCCCC   ", " GGGGGGGGGG ", " GGGYGGYGGY ", " GGGGGGGGGG "]
    ],
    sun: [
        ["  Y   Y   Y  ", "    YYY      ", " Y YYYYYY  Y ", "  YYYYYYYY   ", " YYYYYYYYYY  ", "  YYYYYYYY   ", " Y YYYYYY  Y ", "    YYY      ", "  Y   Y   Y  "],
        ["    Y   Y    ", "  Y YYY Y Y  ", "   YYYYYY    ", " YYYYYYYYYY  ", "  YYYYYYYY   ", " YYYYYYYYYY  ", "   YYYYYY    ", "  Y YYY Y Y  ", "    Y   Y    "]
    ],
    crab: [
        [" R        R ", "  R  RR  R  ", "   RRRRRR   ", "  R KRRK R  ", "   RRRRRR   ", "  R R  R R  ", " R        R "],
        ["  R      R  ", "   R RR R   ", "   RRRRRR   ", "  R KRRK R  ", "   RRRRRR   ", "   R    R   ", "  R      R  "]
    ],
    pumpkin: [
        ["     GB     ", "   OOOOOO   ", "  OOOKKOOO  ", " OOOOOOOOOO ", " OOOKYYKOOO ", " OOOOKKOOOO ", "  OOOOOOOO  "],
        ["     BG     ", "   OOOOOO   ", "  OOOKKOOO  ", " OOOOOOOOOO ", " OOOKOOKOOO ", " OOOOKKOOOO ", "  OOOOOOOO  "]
    ],
    ghost: [
        ["   WWWW   ", "  WWWWWW  ", " WWKWWKWW ", " WWWWWWWW ", " WWWWWWWW ", " W WW WW  ", " W    W   "],
        ["   WWWW   ", "  WWWWWW  ", " WWKWWKWW ", " WWWWWWWW ", " WWWWWWWW ", "  WW WW W ", "   W    W "]
    ],
    tree: [
        ["     Y      ", "    GGG     ", "   GDGDG    ", "    GGG     ", "  GDRGDG    ", " GGGGGGGG   ", "GDRGDGDGDG  ", "    BBB     "],
        ["     W      ", "    GGG     ", "   GRGYG    ", "    GGG     ", "  GYGDGR    ", " GGGGGGGG   ", "GRGYGDGYDG  ", "    BBB     "]
    ],
    santa: [
        ["   RRRRRR   ", "  WWWWWWWW  ", "  WWSKSKWW  ", "  WWWWWWWW  ", "  RRRKKRRR  ", "  R KKKK R  ", "  KK    KK  "],
        ["   RRRRRR W ", "  WWWWWWWWW ", "  WWSKSKWW  ", "  WWWWWWW   ", "  RRRKKRR   ", "  R KKKK R  ", "  KK    KK  "]
    ],
    bunny: [
        ["  WW    WW  ", "  WMW  WMW  ", "  WWW  WWW  ", "   WWWWWW   ", "  WWKWWKWW  ", "   WWWMWW   ", "   WWWWWW   ", "            "],
        ["            ", "  WW    WW  ", "  WMW  WMW  ", "  WWW  WWW  ", "   WWWWWW   ", "  WWKWWKWW  ", "   WWWMWW   ", "   WWWWWW   "]
    ],
    egg: [
        ["    YY    ", "   YPPY   ", "  PCCCCP  ", " CCYYYYCC ", "  CPPPPC  ", "   CYYC   "],
        ["    CC    ", "   CYYC   ", "  YPPPPY  ", " PPCCCCPP ", "  PYYYYP  ", "   PCCP   "]
    ]
};

// Simplified Audio IDs - game.js will now just load the path dynamically
const themes = [
    { name: "Space Explorer", hueOffset: 240, art: ['rocket', 'ufo'], color: '#8800ff', file: 'music/Space.mp3', effect: 'stars' },
    { name: "Summer Time", hueOffset: 60, art: ['sun', 'crab'], color: '#ffea00', file: 'music/Summer.mp3', effect: 'float' },
    { name: "Halloween", hueOffset: 30, art: ['pumpkin', 'ghost'], color: '#FF7518', file: 'music/Halloween.mp3', effect: 'embers' },
    { name: "Winter Wonderland", hueOffset: 180, art: ['tree', 'santa'], color: '#00ffff', file: 'music/Winter.mp3', effect: 'snow' },
    { name: "Easter Hunt", hueOffset: 300, art: ['egg', 'bunny'], color: '#ff00ff', file: 'music/Easter.mp3', effect: 'float' }
];
