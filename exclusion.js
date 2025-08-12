// Structured exclusion principles
// exclusion_rules = {
//     topic: [
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

// Example exclusion_matrix formed at each step:
// const exclusion_matrix = {
//     series: { default: [ 'kollektion-deluxe', 'kollektion-first-class' ] },
//     storage: {
//       default: [
//         'stauraum-durchgangige-schubladen',
//         'stauraum-geteilte-schubladen',
//         'stauraum-hochklappbarer-bettkasten'
//       ]
//     },
//     material: {
//       'feiner-stoff': [],
//       samt: [],
//       cord: [],
//       boucle: [],
//       'grober-stoff': [],
//       kunstleder: []
//     },
//     headrest: {
//       height: [],
//       model: [
//         'kopfteil-modell-versailles',
//         'kopfteil-modell-palais',
//         'kopfteil-modell-chateau'
//       ]
//     },
//     foot_style: {
//       default: [ 'fussteil-tv-lift-salon', 'fussteil-tv-lift-versailles' ]
//     },
//     feet: { height: [], type: [] },
//     upgrades: {
//       'beleuchtung-kopfteil': [ 'beleuchtung-kopfteil-vorne' ],
//       'beleuchtung-box': [
//         'beleuchtung-box-led-seite',
//         'beleuchtung-box-led-unterboden',
//         'beleuchtung-box-led-fussteil'
//       ]
//     },
//     extras: {
//       'rueckseite-stofffarbe': [],
//       'usb-anschluesse': [],
//       'beleuchtungs-farbe': []
//     }
//   }

// OPERATIONS: in, not_in, less_than, greater_than, isEmpty
// CONDITIONS: Always combined with OR operator

export const exclusion_rules = {
    series: [
        {
            condition: {
                storage: { default: { in: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen'] } }
            },
            disable: {
                default: ['kollektion-deluxe', 'kollektion-first-class']
            },
            reason: "Not available with continuous/divided drawers"
        }
    ],
    storage: [
        {
            condition: {
                series: { default: { not_in: ['bettboutique-kollektion-komfort'] } }
            },
            disable: {
                default: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen']
            },
            reason: "Only available in the Komfort series"
        },
        {
            condition: {
                feet: { type: { isEmpty: false } },
                size: { width: { less_than: 'breite-120-cm' } }
            },
            disable: {
                default: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen', 'stauraum-hochklappbarer-bettkasten']
            },
            reason: "Not available with feet or small width"
        }
    ],
    material: [
        {
            condition: {
                headrest: { model: { in: ['kopfteil-modell-versailles', 'kopfteil-modell-palais', 'kopfteil-modell-chateau'] } },
                foot_style: { default: { in: ['fussteil-tv-lift-versailles', 'fussteil-louvre'] } }
            },
            disable: {
                cord: ['farbe-cord-silbergrau', 'farbe-cord-korallenrosa', 'farbe-cord-hazel', 'farbe-cord-erdbraun', 'farbe-cord-elfenbein', 'farbe-cord-cremeweiss', 'farbe-cord-blutenrosa', 'farbe-cord-anthrazit']
            },
            reason: "Not available with Versailles/Palais/Chateau headrest or Versailles Lift/Louvre foot style"
        }
    ],
    headrest: [
        {
            condition: {
                material: { cord: { in: ['farbe-cord-silbergrau', 'farbe-cord-korallenrosa', 'farbe-cord-hazel', 'farbe-cord-erdbraun', 'farbe-cord-elfenbein', 'farbe-cord-cremeweiss', 'farbe-cord-blutenrosa', 'farbe-cord-anthrazit'] } }
            },
            disable: {
                model: ['kopfteil-modell-versailles', 'kopfteil-modell-palais', 'kopfteil-modell-chateau']
            },
            reason: "Not available with Cord"
        }
    ],
    foot_style: [
        {
            condition: {
                feet: { type: { isEmpty: false } }
            },
            disable: {
                default: ['fussteil-tv-lift-salon', 'fussteil-tv-lift-versailles']
            },
            reason: "Not available with feet"
        }
    ],
    feet: [
        {
            condition: {
                feet: { height: { not_in: ['fusshohe-10-cm'] } }
            },
            disable: {
                type: ['fusse-schwebend-nur-10cm']
            },
            reason: "Not available with other heights"
        }
    ],
    upgrades: [
        {
            condition: {
                headrest: { model: { not_in: ['kopfteil-modell-versailles', 'kopfteil-modell-palais', 'kopfteil-modell-maison'] } }
            },
            disable: {
                'beleuchtung-kopfteil': ['beleuchtung-kopfteil-vorne']
            },
            reason: "Not available with Versailles, Palais or Maison"
        },
        {
            condition: {
                foot_style: { default: { not_in: ['fussteil-kein-fussteil'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-front']
            },
            reason: "Not available without foot style"
        },
        {
            condition: {
                storage: { default: { in: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-seite']
            },
            reason: "Not available with continuous/divided drawers"
        },
        {
            condition: {
                feet: { type: { isEmpty: false } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-unterboden']
            },
            reason: "Not available with feet"
        },
        {
            condition: {
                foot_style: { default: { not_in: ['fussteil-tv-lift-salon'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-fussteil']
            },
            reason: "Not available with Salon Lift"
        }
    ],
    extras: [
        {
            condition: {
                headrest: { model: { in: ['kopfteil-modell-monet'] } }
            },
            disable: {
                'usb-anschluesse': ['upgrades-usb-anschlusse-am-kopfteil']
            },
            reason: "Not available with Monet"
        },
        {
            condition: {
                upgrades: {
                    'beleuchtung-kopfteil': { isEmpty: true },
                    'beleuchtung-box': { isEmpty: true }
                }
            },
            disable: {
                'beleuchtungs-farbe': ['beleuchtungs-farbe-rgb-mit-fernbedienung']
            },
            reason: "Not available without lighting"
        }
    ]
}

/**
 * Checks all exclusion logic from current_state and generates an exclusion matrix
 * @param {Object} currentState - The current state object
 * @returns {Object} - Exclusion matrix showing which options should be disabled
 */
export function generateExclusionMatrix(currentState) {
    const exclusionMatrix = {};

    // Initialize exclusion matrix for all topics
    Object.keys(exclusion_rules).forEach(topic => {
        exclusionMatrix[topic] = {};

        // Initialize all tabs in the topic
        if (currentState[topic] && currentState[topic].selection) {
            Object.keys(currentState[topic].selection).forEach(tab => {
                exclusionMatrix[topic][tab] = [];
            });
        }
    });

    // Check each exclusion rule
    Object.keys(exclusion_rules).forEach(topic => {
        const rules = exclusion_rules[topic];

        rules.forEach(rule => {
            // Check if the condition is met
            if (isConditionMet(rule.condition, currentState)) {
                // Apply the disable rule
                Object.keys(rule.disable).forEach(tab => {
                    if (!exclusionMatrix[topic]) {
                        exclusionMatrix[topic] = {};
                    }
                    if (!exclusionMatrix[topic][tab]) {
                        exclusionMatrix[topic][tab] = [];
                    }

                    // Add disabled options to the matrix
                    rule.disable[tab].forEach(option => {
                        if (!exclusionMatrix[topic][tab].includes(option)) {
                            exclusionMatrix[topic][tab].push(option);
                        }
                    });
                });
            }
        });
    });

    return exclusionMatrix;
}

/**
 * Checks if a condition is met based on the current state
 * @param {Object} condition - The condition object
 * @param {Object} currentState - The current state object
 * @returns {boolean} - True if condition is met
 */
function isConditionMet(condition, currentState) {
    // Multiple conditions are combined with OR logic
    return Object.keys(condition).some(topic => {
        const topicCondition = condition[topic];
        return Object.keys(topicCondition).some(tab => {
            const tabCondition = topicCondition[tab];
            return Object.keys(tabCondition).some(operation => {
                const operationValue = tabCondition[operation];
                const selection = currentState[topic]?.selection?.[tab] || [];

                return checkOperation(operation, selection, operationValue);
            });
        });
    });
}

/**
 * Checks if an operation condition is met
 * @param {string} operation - The operation type
 * @param {Array} selection - The current selection array
 * @param {*} operationValue - The value to check against
 * @returns {boolean} - True if operation condition is met
 */
function checkOperation(operation, selection, operationValue) {
    switch (operation) {
        case 'in':
            return selection.some(item => operationValue.includes(item));
        case 'not_in':
            return !selection.some(item => operationValue.includes(item));
        case 'isEmpty':
            return operationValue ? selection.length === 0 : selection.length > 0;
        case 'less_than':
            // For numeric comparisons, assume the selection contains numeric values
            // TODO: Implement this assumption
            return selection.some(item => {
                const numValue = parseFloat(item.replace(/[^\d.]/g, ''));
                return !isNaN(numValue) && numValue < operationValue;
            });
        case 'greater_than':
            return selection.some(item => {
                const numValue = parseFloat(item.replace(/[^\d.]/g, ''));
                return !isNaN(numValue) && numValue > operationValue;
            });
        default:
            return false;
    }
}

/**
 * Gets all exclusion reasons for a specific topic and tab
 * @param {string} topic - The topic name
 * @param {string} tab - The tab name
 * @param {Object} currentState - The current state object
 * @returns {Array} - Array of exclusion reason objects
 */
export function getExclusionReasons(topic, tab, currentState) {
    const reasons = [];

    if (!exclusion_rules[topic]) return reasons;

    exclusion_rules[topic].forEach(rule => {
        if (isConditionMet(rule.condition, currentState)) {
            if (rule.disable[tab]) {
                reasons.push({
                    reason: rule.reason,
                    disabledOptions: rule.disable[tab]
                });
            }
        }
    });

    return reasons;
}

