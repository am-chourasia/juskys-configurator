// Structured exclusion principles
// exclusion_principles = {
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

export const exclusion_principles = {
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

// Color helpers (declare once, top-level)
const color = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    magenta: "\x1b[35m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    bold: "\x1b[1m",
    gray: "\x1b[90m"
};

// Divider helper (declare once, top-level)
function divider(msg = '', c = color.gray) {
    const line = '─'.repeat(60);
    if (msg) {
        console.log(`${c}${line}\n${msg}\n${line}${color.reset}`);
    } else {
        console.log(`${c}${line}${color.reset}`);
    }
}

/**
 * Checks all exclusion logic from current_state and generates an exclusion matrix
 * @param {Object} currentState - The current state object
 * @returns {Object} - Exclusion matrix showing which options should be disabled
 */
export function generateExclusionMatrix(currentState) {
    const exclusionMatrix = {};

    divider(`${color.bold}${color.cyan}[generateExclusionMatrix] Initializing exclusion matrix${color.reset}`);

    // Initialize exclusion matrix for all topics
    Object.keys(exclusion_principles).forEach(topic => {
        exclusionMatrix[topic] = {};

        // Initialize all tabs in the topic
        if (currentState[topic] && currentState[topic].selection) {
            Object.keys(currentState[topic].selection).forEach(tab => {
                exclusionMatrix[topic][tab] = [];
            });
        }
    });

    divider(`${color.bold}${color.magenta}[generateExclusionMatrix] Checking exclusion rules${color.reset}`);

    // Check each exclusion rule
    Object.keys(exclusion_principles).forEach(topic => {
        const rules = exclusion_principles[topic];

        rules.forEach((rule, ruleIdx) => {
            divider(`${color.bold}${color.yellow}[Rule #${ruleIdx}] Topic: '${topic}'${color.reset}`);
            // Debug: Show which rule is being checked
            console.log(`${color.cyan}[generateExclusionMatrix] Checking rule #${ruleIdx} for topic '${topic}':${color.reset}`, rule);

            // Check if the condition is met
            const conditionMet = isConditionMet(rule.condition, currentState);
            console.log(`${color.magenta}[generateExclusionMatrix] Condition met for rule #${ruleIdx} on topic '${topic}':${color.reset} ${color.bold}${conditionMet}${color.reset}`);

            if (conditionMet) {
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
                            // Debug: Show what is being disabled
                            console.log(`${color.red}[generateExclusionMatrix] Disabled option '${option}' for topic '${topic}', tab '${tab}' due to rule #${ruleIdx}${color.reset}`);
                        }
                    });
                });
            }
        });
    });

    divider(`${color.bold}${color.green}[generateExclusionMatrix] Final exclusionMatrix${color.reset}`);
    console.log(color.green, JSON.stringify(exclusionMatrix, null, 2), color.reset);

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

                // Debug: Show what is being checked
                console.log(`${color.blue}[isConditionMet] Checking operation '${operation}' for topic '${topic}', tab '${tab}' with selection:${color.reset}`, selection, `${color.blue}and operationValue:${color.reset}`, operationValue);

                const result = checkOperation(operation, selection, operationValue);

                // Debug: Show result of operation
                console.log(`${color.green}[isConditionMet] Result of operation '${operation}' for topic '${topic}', tab '${tab}':${color.reset} ${color.bold}${result}${color.reset}`);

                return result;
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
    // Debug: Show operation details
    console.log(`${color.yellow}[checkOperation] Operation: '${operation}', Selection:${color.reset}`, selection, `${color.yellow}OperationValue:${color.reset}`, operationValue);

    switch (operation) {
        case 'in':
            {
                const result = selection.some(item => operationValue.includes(item));
                console.log(`${color.cyan}[checkOperation] 'in' result:${color.reset} ${color.bold}${result}${color.reset}`);
                return result;
            }
        case 'not_in':
            {
                const result = !selection.some(item => operationValue.includes(item));
                console.log(`${color.cyan}[checkOperation] 'not_in' result:${color.reset} ${color.bold}${result}${color.reset}`);
                return result;
            }
        case 'isEmpty':
            {
                const result = operationValue ? selection.length === 0 : selection.length > 0;
                console.log(`${color.cyan}[checkOperation] 'isEmpty' result:${color.reset} ${color.bold}${result}${color.reset}`);
                return result;
            }
        case 'less_than':
            {
                // For numeric comparisons, assume the selection contains numeric values
                const result = selection.some(item => {
                    const numValue = parseFloat(item.replace(/[^\d.]/g, ''));
                    return !isNaN(numValue) && numValue < operationValue;
                });
                console.log(`${color.cyan}[checkOperation] 'less_than' result:${color.reset} ${color.bold}${result}${color.reset}`);
                return result;
            }
        case 'greater_than':
            {
                const result = selection.some(item => {
                    const numValue = parseFloat(item.replace(/[^\d.]/g, ''));
                    return !isNaN(numValue) && numValue > operationValue;
                });
                console.log(`${color.cyan}[checkOperation] 'greater_than' result:${color.reset} ${color.bold}${result}${color.reset}`);
                return result;
            }
        default:
            console.log(`${color.red}[checkOperation] Unknown operation '${operation}', returning false.${color.reset}`);
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

    if (!exclusion_principles[topic]) return reasons;

    exclusion_principles[topic].forEach(rule => {
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

const current_state = {
    "series": {
      "selection": {
        "default": [
          "bettboutique-kollektion-komfort"
        ]
      }
    },
    "size": {
      "selection": {
        "width": [
          "breite-100-cm"
        ]
      }
    },
    "foot_style": {
      "selection": {
        "default": [
          "fussteil-tv-lift-versailles"
        ]
      }
    },
  "material": {
      "selection": {
        "boucle": [
          "farbe-boucle-aqua"
        ]
      }
    },
    "topper": {
      "selection": {
        "default": [
          "topper-komfortschaum-topper-6-cm"
        ]
      }
    },
    "feet": {
      "selection": {
        "type": [
          "fusse-industrial-massivholz-schwarz"
        ]
      }
    }
};
generateExclusionMatrix(current_state);