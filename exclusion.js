const { headrest, material } = require("./matrix");

// this is updated as the selections are changed in the current state
const exclusion_matrix = {
    headrest: {
        model: ['versailles', 'palais', 'chateau'],
        height: ['115cm', '140cm']
    },
    storage: {
        default: ['durchgaengige-schubladen', 'geteilte-schubladen']
    },
    foot_style: {
        default: ['tv-lift-salon', 'tv-lift-versailles', 'louvre-fussteil']
    },
    feet: {
        model: ['tbd-1', 'tbd-2', 'tbd-3', 'tbd-4', 'tbd-5', 'tbd-6'],
        height: ['10cm']
    },
    material: {
        'feiner-stoff': ['feiner-stoff-farbe-1', 'feiner-stoff-farbe-2'],
        'samt': ['samt-farbe-1'],
        'cord': ['cord-farbe-1'],
        'boucle': ['boucle-farbe-1'],
        'grober-stoff': ['grober-stoff-farbe-1'],
        'kunstleder': ['kunstleder-farbe-1']
    },
    mattress: {
        'zwei-separate-matratzen': ['h2-zwei', 'h4-zwei'],
        'durchgaengig': ['h2-durchgaengig', 'h4-durchgaengig']
    },
    topper: {
        default: ['kaltschaum-topper', 'visco-schaum-topper']
    },
    upgrades: {
        'beleuchtung-kopfteil': ['vorne'],
        'beleuchtung-box': ['led-seite', 'led-unterboden', 'led-fussteil']
    },
    extras: {
        'rueckseite-stofffarbe': ['rueckseite-stofffarbe'],
        'usb-anschluesse': ['usb-anschluesse'],
        'beleuchtungs-farbe': ['led-blau', 'rgb-fernbedienung']
    }
}

// Structured exclusion principles - can be passed anywhere
// exclusion_principles = {
//     section: [
//         {
//             condition: {
//                 /* what triggers this rule */
//                 tab1: { operation: [ value1, value2 ] },
//                 tab2: { operation: [ value1, value2 ] }
//             },
//             disable: {
//                 tab1: [option1, option2],
//                 tab2: [option1, option2]
//             },
//             reason: "Why it's disabled"
//         }
//     ]
// }

// OPERATIONS: in, not_in, less_than, greater_than, empty

// LOGIC:
/*
checkArray = ['A', 'B', 'C']
selectionArray = ['D'];
operation = 'in';

function isIn() {
    let found = false;
    for (const selection of selectionArray) {
        if (checkArray.includes(selection)) {
            found = true;
            break;
        }
    }
    return found;
}

let result = '';
if (operation == 'in') {
    result = isIn();
} 
else if (operation == 'not_in') {
    result = !isIn();
}

console.log(result);
*/


const exclusion_principles = {
    series: [
        {
            condition: {
                storage: { default: { in: ['durchgaengige-schubladen', 'geteilte-schubladen'] } }
            },
            disable: {
                default: ['deluxe', 'first-class']
            },
            reason: "Nicht verfügbar mit Durchgängige/Geteilte Schubladen"
        }
    ],
    storage: [
        {
            condition: {
                series: { default: { not_in: ['komfort'] } }
            },
            disable: {
                default: ['durchgaengige-schubladen', 'geteilte-schubladen']
            },
            reason: "Nur verfügbar in der Komfort Serie"
        },
        {
            condition: {
                feet: { model: { empty: false } },
                size: { width: { less_than: 120 } }
            },
            disable: {
                default: ['durchgaengige-schubladen', 'geteilte-schubladen', 'hochklappbarer-bettkasten']
            },
            reason: "Nicht verfügbar mit Füßen oder kleiner Breite"
        }
    ],
    material: [
        {
            condition: {
                // Combine with OR operation
                headrest: { model: { in: ['versailles', 'palais', 'chateau'] } },
                foot_style: { default: { in: ['tv-lift-versailles', 'louvre-fussteil'] } }
            },
            disable: {
                cord: ['cord-farbe-1', 'cord-farbe-2', 'cord-farbe-3', 'cord-farbe-4', 'cord-farbe-5', 'cord-farbe-6']
            },
            reason: "Nicht verfügbar mit Versailles/Palais/Chateau Kopfteil oder Versailles Lift/Louvre Fussteil"
        }
    ],
    headrest: [
        {
            condition: {
                material: { cord: { in: ['cord-farbe-1', 'cord-farbe-2', 'cord-farbe-3', 'cord-farbe-4', 'cord-farbe-5', 'cord-farbe-6'] } }
            },
            disable: {
                model: ['versailles', 'palais', 'chateau']
            },
            reason: "Nicht verfügbar mit Cord"
        }
    ],
    foot_style: [
        {
            condition: {
                feet: { model: { empty: false } }
            },
            disable: {
                default: ['tv-lift-salon', 'tv-lift-versailles']
            },
            reason: "Nicht verfügbar mit Ohne-Füssen"
        }
    ],
    mattress: [
        {
            condition: {
                size: { width: { less_than: 120 } }
            },
            disable: {
                'zwei-separate-matratzen': ['h2-zwei', 'h4-zwei']
            },
            reason: "Nicht verfügbar mit kleiner Breite"
        },
        {
            condition: {
                size: { width: { greater_than: 200 } }
            },
            disable: {
                'durchgaengig': ['*']
            },
            reason: "Nicht verfügbar mit großer Breite"
        }
    ],
    feet: [
        {
            condition: {
                feet: { height: { not_in: ['10cm'] } }
            },
            disable: {
                model: ['schwebend']
            },
            reason: "Nicht verfügbar mit anderer Höhe"
        }
    ],
    upgrades: [
        {
            condition: {
                headrest: { model: { not_in: ['versailles', 'palais', 'maison'] } }
            },
            disable: {
                'beleuchtung-kopfteil': ['vorne']
            },
            reason: "Nicht verfügbar mit Versailles, Palais oder Maison"
        },
        {
            condition: {
                foot_style: { default: { not_in: ['kein-fussteil'] } }
            },
            disable: {
                'beleuchtung-box': ['led-front']
            },
            reason: "Nicht verfügbar mit keinem Fussteil"
        },
        {
            condition: {
                storage: { default: { in: ['durchgaengige-schubladen', 'geteilte-schubladen'] } }
            },
            disable: {
                'beleuchtung-box': ['led-seite']
            },
            reason: "Nicht verfügbar mit Durchgängige/Geteilte Schubladen"
        },
        {
            condition: {
                feet: { model: { empty: false } }
            },
            disable: {
                'beleuchtung-box': ['led-unterboden']
            },
            reason: "Nicht verfügbar mit Ohne-Füssen"
        },
        {
            condition: {
                foot_style: { default: { not_in: ['tv-lift-salon'] } }
            },
            disable: {
                'beleuchtung-box': ['led-fussteil']
            },
            reason: "Nicht verfügbar mit Salon Lift"
        }
    ],
    extras: [
        {
            condition: {
                headrest: { model: { in: ['monet'] } }
            },
            disable: {
                'usb-anschluesse': ['usb-anschluesse']
            },
            reason: "Nicht verfügbar mit Monet"
        },
        {
            condition: {
                upgrades: {
                    'beleuchtung-kopfteil': { empty: true },
                    'beleuchtung-box': { empty: true }
                }
            },
            disable: {
                'beleuchtungs-farbe': ['led-blau', 'rgb-fernbedienung']
            },
            reason: "Nicht verfügbar mit keiner Beleuchtung"
        }
    ]
}

module.exports = { exclusion_matrix, exclusion_principles };