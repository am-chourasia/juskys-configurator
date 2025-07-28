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
        type: ['mit-fuesse'],
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
//             condition: { /* what triggers this rule */ },
//             disable: {
//                 default: [options],
//                 tab2: [options]
//             },
//             reason: "Why it's disabled"
//         }
//     ]
// }

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
                series: { default: { not: 'komfort' } }
            },
            disable: {
                default: ['durchgaengige-schubladen', 'geteilte-schubladen']
            },
            reason: "Nur verfügbar in der Komfort Serie"
        },
        {
            condition: {
                feet: { type: { not: 'ohne-fuesse' } },
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
                headrest: { model: { in: ['versailles', 'palais', 'chateau'] } },
                foot_style: { default: { in: ['tv-lift-versailles', 'louvre-fussteil'] } }
            },
            disable: {
                cord: ['*']
            },
            reason: "Nicht verfügbar mit Versailles/Palais/Chateau Kopfteil oder Versailles Lift/Louvre Fussteil"
        }
    ],
    foot_style: [
        {
            condition: {
                feet: { type: { not: 'ohne-fuesse' } }
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
                'zwei-separate-matratzen': ['*']
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
                feet: { height: { not: '10cm' } }
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
                foot_style: { default: { not: 'kein-fussteil' } }
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
                feet: { type: { not: 'mit-fuesse' } }
            },
            disable: {
                'beleuchtung-box': ['led-unterboden']
            },
            reason: "Nicht verfügbar mit Ohne-Füssen"
        },
        {
            condition: {
                foot_style: { default: { not: 'tv-lift-salon' } }
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
                headrest: { model: { is: 'monet' } }
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
                'beleuchtungs-farbe': ['*']
            },
            reason: "Nicht verfügbar mit keiner Beleuchtung"
        }
    ]
}

module.exports = { exclusion_matrix, exclusion_principles };