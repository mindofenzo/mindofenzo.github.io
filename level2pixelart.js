/** --- LEVEL 2: CUTE BOUNCING ANIMAL FACES --- */
// Designed using a 9x9 grid, face-forward, with a 2-frame "hop" animation!

Object.assign(artLibrary, {
    
    // --- HOME ---
    dog: [ 
        [ // Frame 1: Down
            "         ",
            "  B   B  ",
            " BB   BB ",
            " BBWWWBB ",
            " OOWWWWW ",
            " OKWWWKW ",
            " OOWWWWW ",
            "  WWKWW  ",
            "  WWRWW  "
        ],
        [ // Frame 2: Hopping up
            "  B   B  ",
            " BB   BB ",
            " BBWWWBB ",
            " OOWWWWW ",
            " OKWWWKW ",
            " OOWWWWW ",
            "  WWKWW  ",
            "  WWRWW  ",
            "         "
        ]
    ],
    cat: [ 
        [
            "         ",
            " A     A ",
            " AA   AA ",
            " AAAAAAA ",
            " AKAAAKA ",
            " MAAWAAM ",
            "  AAAAA  ",
            "         ",
            "         "
        ],
        [
            " A     A ",
            " AA   AA ",
            " AAAAAAA ",
            " AKAAAKA ",
            " MAAWAAM ",
            "  AAAAA  ",
            "         ",
            "         ",
            "         "
        ]
    ],

    // --- FARM ---
    cow: [ 
        [
            "         ",
            " K     K ",
            " WW   WW ",
            " WWWWWWW ",
            " WKWKWKW ",
            " WWWWWWW ",
            "  MMMMM  ",
            "  MKMKM  ",
            "         "
        ],
        [
            " K     K ",
            " WW   WW ",
            " WWWWWWW ",
            " WKWKWKW ",
            " WWWWWWW ",
            "  MMMMM  ",
            "  MKMKM  ",
            "         ",
            "         "
        ]
    ],
    pig: [ 
        [
            "         ",
            " M     M ",
            " MM   MM ",
            " MMMMMMM ",
            " MKMMMKM ",
            " MMMMMMM ",
            "  MMMMM  ",
            "  MKMKM  ",
            "         "
        ],
        [
            " M     M ",
            " MM   MM ",
            " MMMMMMM ",
            " MKMMMKM ",
            " MMMMMMM ",
            "  MMMMM  ",
            "  MKMKM  ",
            "         ",
            "         "
        ]
    ],

    // --- ZOO ---
    giraffe: [ 
        [
            "         ",
            " B     B ",
            " Y     Y ",
            " YYYYYYY ",
            " YKYYYKY ",
            " YYYYYYY ",
            "  YYYYY  ",
            "  YBYBY  ",
            "         "
        ],
        [
            " B     B ",
            " Y     Y ",
            " YYYYYYY ",
            " YKYYYKY ",
            " YYYYYYY ",
            "  YYYYY  ",
            "  YBYBY  ",
            "         ",
            "         "
        ]
    ],
    zebra: [ 
        [
            "         ",
            " W  K  W ",
            " WK K KW ",
            " WWKKKWW ",
            " W K K W ",
            "  AAAAA  ",
            " AA K AA ",
            "  AAAAA  ",
            "         "
        ],
        [
            " W  K  W ",
            " WK K KW ",
            " WWKKKWW ",
            " W K K W ",
            "  AAAAA  ",
            " AA K AA ",
            "  AAAAA  ",
            "         ",
            "         "
        ]
    ],

    // --- JUNGLE ---
    lion: [ 
        [
            "         ",
            "  OOOOO  ",
            " OYOOOYO ", 
            " OYYYYYO ",
            " OYK YKO ",
            " OYWMWYO ", 
            " OOWWWOO ", 
            "  OOOOO  ",
            "         "
        ],
        [
            "  OOOOO  ",
            " OYOOOYO ",
            " OYYYYYO ",
            " OYK YKO ",
            " OYWMWYO ",
            " OOWWWOO ",
            "  OOOOO  ",
            "         ",
            "         "
        ]
    ],
    tiger: [ 
        [
            "         ",
            " OY   YO ", 
            " OOOOOOO ",
            " OK O KO ", 
            " O K K O ", 
            " KOSSSOK ", 
            "  S K S  ", 
            "   SSS   ",
            "         "
        ],
        [
            " OY   YO ",
            " OOOOOOO ",
            " OK O KO ",
            " O K K O ",
            " KOSSSOK ",
            "  S K S  ",
            "   SSS   ",
            "         ",
            "         "
        ]
    ],

    // --- OCEAN ---
    fish: [ 
        [
            "         ",
            "   OOO   ",
            "  OOOOO  ",
            " OOWWWOO ",
            " OWK WKWO",
            " OOWWWOO ",
            "  OOOOO  ",
            "   OOO   ",
            "         "
        ],
        [
            "   OOO   ",
            "  OOOOO  ",
            " OOWWWOO ",
            " OWK WKWO",
            " OOWWWOO ",
            "  OOOOO  ",
            "   OOO   ",
            "         ",
            "         "
        ]
    ],
    turtle: [ 
        [
            "         ",
            "  G   G  ",
            "  DDDDD  ",
            " DDDDDDD ",
            " DDDDDDD ",
            " DDDDDDD ",
            "  DDDDD  ",
            " G  G  G ",
            "         "
        ],
        [
            "  G   G  ",
            "  DDDDD  ",
            " DDDDDDD ",
            " DDDDDDD ",
            " DDDDDDD ",
            "  DDDDD  ",
            " G  G  G ",
            "         ",
            "         "
        ]
    ]
});

// Update the levels logic to use the new file-based audio targeting
const gameLevels = {
    cameron: themes, // Re-uses the themes array from pixelart.js
    safari: [
        { name: "Cozy Home", hueOffset: 200, art: ['dog', 'cat'], color: '#00aaff', file: 'music/Home.mp3', effect: 'float' },
        { name: "Sunny Farm", hueOffset: 60, art: ['cow', 'pig'], color: '#ffcc00', file: 'music/Farm.mp3', effect: 'stars' },
        { name: "Zoo Trip", hueOffset: 120, art: ['giraffe', 'zebra'], color: '#00ff44', file: 'music/Zoo.mp3', effect: 'float' },
        { name: "Deep Jungle", hueOffset: 150, art: ['lion', 'tiger'], color: '#00aa00', file: 'music/Jungle.mp3', effect: 'embers' },
        { name: "Blue Ocean", hueOffset: 220, art: ['fish', 'turtle'], color: '#0044ff', file: 'music/Outro.mp3', effect: 'snow' }
    ]
};
