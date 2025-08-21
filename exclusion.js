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

// OPERATIONS: in, not_in, less_than, greater_than, isEmpty
// CONDITIONS:
//   - Within a topic: different tab conditions are combined with AND
//   - Across topics: topic-level conditions are combined with OR


export const exclusion_rules = {
    series: [
        // Series: disable non-Comfort when drawers are selected (reciprocal of storage rule)
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
        // Storage: continuous/split drawers only available in Comfort series
        {
            condition: {
                series: { default: { not_in: ['bettboutique-kollektion-komfort'] } }
            },
            disable: {
                default: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen']
            },
            reason: "Only available in the Komfort series"
        },
        // Storage: drawers and fold-up base only with "without feet" and width from 120 cm
        {
            condition: {
                feet: { type: { not_in: ['fusse-ohne-fusse'] } },
                size: { width: { less_than: 'breite-120-cm' } }
            },
            disable: {
                default: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen', 'stauraum-hochklappbarer-bettkasten']
            },
            reason: "Not available with feet or width < 120 cm"
        },
        // Storage: reciprocal for Box side lighting (side lighting not with drawers)
        {
            condition: {
                upgrades: { 'beleuchtung-box': { in: ['beleuchtung-box-led-seite'] } }
            },
            disable: {
                default: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen']
            },
            reason: "Not available with box side lighting"
        }
    ],
    // Size (Width) reciprocals
    // If "zwei-separate-matratzen" is selected and width is less than 120cm, disable widths < 120cm.
    // If "eine-matratze" is selected and width is greater than 200cm, disable widths > 200cm.
    size: [
        // Size: disable widths < 120 when two separate mattresses are chosen
        {
            condition: {
                mattress: { 'zwei-separate-matratzen': { in: [
                    'hartegrad-matratze-1-h2',
                    'hartegrad-matratze-1-h3',
                    'hartegrad-matratze-1-h4',
                    'hartegrad-matratze-2-h2',
                    'hartegrad-matratze-2-h3',
                    'hartegrad-matratze-2-h4'
                ] } }
            },
            disable: {
                width: [
                    'breite-80-cm',
                    'breite-90-cm',
                    'breite-100-cm'
                ]
            },
            reason: "Widths less than 120 cm are not available with two separate mattresses"
        },
        // Size: disable widths > 200 when a continuous mattress is chosen
        {
            condition: {
                mattress: { 'eine-matratze': { in: [
                    'hartegrad-matratze-1-h2',
                    'hartegrad-matratze-1-h3',
                    'hartegrad-matratze-1-h4'
                ] } }
            },
            disable: {
                width: [
                    'breite-210-cm',
                    'breite-220-cm'
                ]
            },
            reason: "Widths greater than 200 cm are not available with a continuous mattress"
        },
        // Size: reciprocal for storage min width (drawers/fold-up require width >= 120)
        {
            condition: {
                storage: { default: { in: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen', 'stauraum-hochklappbarer-bettkasten'] } }
            },
            disable: {
                width: [
                    'breite-80-cm',
                    'breite-90-cm',
                    'breite-100-cm'
                ]
            },
            reason: "These storage options require width from 120 cm"
        },
        // Size: reciprocal for USB ports width restriction (USB not possible with width 90–120 cm)
        {
            condition: {
                extras: { 'usb-anschluesse': { in: ['upgrades-usb-anschlusse-am-kopfteil'] } }
            },
            disable: {
                width: ['breite-90-cm', 'breite-100-cm', 'breite-120-cm']
            },
            reason: "USB ports are not available with width 90–120 cm"
        }
    ],
    mattress: [
        // Mattress: two separate mattresses only possible from 120 cm width
        {
            condition: {
                size: { width: { less_than: 'breite-120-cm' } }
            },
            disable: {
                'zwei-separate-matratzen': [
                    'hartegrad-matratze-1-h2',
                    'hartegrad-matratze-1-h3',
                    'hartegrad-matratze-1-h4',
                    'hartegrad-matratze-2-h2',
                    'hartegrad-matratze-2-h3',
                    'hartegrad-matratze-2-h4'
                ]
            },
            reason: "Two separate mattresses are only possible from 120 cm width"
        },
        // Mattress: a continuous mattress is only possible up to 200 cm width
        {
            condition: {
                size: { width: { greater_than: 'breite-200-cm' } }
            },
            disable: {
                'eine-matratze': [
                    'hartegrad-matratze-1-h2',
                    'hartegrad-matratze-1-h3',
                    'hartegrad-matratze-1-h4'
                ]
            },
            reason: "A continuous mattress is only possible up to 200 cm width"
        }
    ],
    material: [
        // Material: Cord not possible with headboards 1,4,7 or with footboards TV Lift Versailles/Louvre
        {
            condition: {
                headrest: { model: { in: ['kopfteil-modell-versailles', 'kopfteil-modell-palais', 'kopfteil-modell-louvre'] } },
                foot_style: { default: { in: ['fussteil-tv-lift-versailles', 'fussteil-louvre'] } }
            },
            disable: {
                cord: ['farbe-cord-silbergrau', 'farbe-cord-korallenrosa', 'farbe-cord-hazel', 'farbe-cord-erdbraun', 'farbe-cord-elfenbein', 'farbe-cord-cremeweiss', 'farbe-cord-blutenrosa', 'farbe-cord-anthrazit']
            },
            reason: "Not available with Versailles/Palais/Louvre headrest or Versailles Lift/Louvre foot style"
        }
    ],
    headrest: [
        // Headboard: not possible with Cord (cord excludes models 1,4,7)
        {
            condition: {
                material: { cord: { in: ['farbe-cord-silbergrau', 'farbe-cord-korallenrosa', 'farbe-cord-hazel', 'farbe-cord-erdbraun', 'farbe-cord-elfenbein', 'farbe-cord-cremeweiss', 'farbe-cord-blutenrosa', 'farbe-cord-anthrazit'] } }
            },
            disable: {
                model: ['kopfteil-modell-versailles', 'kopfteil-modell-palais', 'kopfteil-modell-louvre']
            },
            reason: "Not available with Cord"
        },
        // Headboard: reciprocal for headboard front lighting (only with 1,4,6)
        {
            condition: {
                upgrades: { 'beleuchtung-kopfteil': { in: ['beleuchtung-kopfteil-vorne'] } }
            },
            disable: {
                model: [
                    'kopfteil-modell-palais',
                    'kopfteil-modell-belleville',
                    'kopfteil-modell-bijou',
                    'kopfteil-modell-monet',
                    'kopfteil-modell-matisse',
                    'kopfteil-modell-chateau'
                ]
            },
            reason: "Headboard front lighting only with Versailles, Palais, Maison"
        },
        // Headboard: reciprocal for USB ports (USB not possible with headboard 9 Monet)
        {
            condition: {
                extras: { 'usb-anschluesse': { in: ['upgrades-usb-anschlusse-am-kopfteil'] } }
            },
            disable: {
                model: ['kopfteil-modell-monet']
            },
            reason: "USB ports are not available with Monet"
        }
    ],
    foot_style: [
        // Footboard: “TV Lift Salon” & “TV Lift Versailles” only with the “without feet” option
        {
            condition: {
                feet: { type: { not_in: ['fusse-ohne-fusse'] } }
            },
            disable: {
                default: ['fussteil-tv-lift-salon', 'fussteil-tv-lift-versailles']
            },
            reason: "Not available with feet"
        },
        // Footboard: reciprocal for Material Cord (Cord excludes Versailles/Louvre footboards)
        {
            condition: {
                material: { cord: { in: ['farbe-cord-silbergrau', 'farbe-cord-korallenrosa', 'farbe-cord-hazel', 'farbe-cord-erdbraun', 'farbe-cord-elfenbein', 'farbe-cord-cremeweiss', 'farbe-cord-blutenrosa', 'farbe-cord-anthrazit'] } }
            },
            disable: {
                default: ['fussteil-tv-lift-versailles', 'fussteil-louvre']
            },
            reason: "Cord not possible with Versailles/Louvre footboards"
        },
        // Footboard: reciprocal for Box front lighting (only possible without footboard)
        {
            condition: {
                upgrades: { 'beleuchtung-box': { in: ['beleuchtung-box-led-front'] } }
            },
            disable: {
                default: ['fussteil-louvre', 'fussteil-tv-lift-versailles', 'fussteil-tv-lift-salon', 'fussteil-opera']
            },
            reason: "Box front lighting only possible without footboard"
        },
        // Footboard: reciprocal for Foot section lighting (only TV Lift Salon can be illuminated)
        {
            condition: {
                upgrades: { 'beleuchtung-box': { in: ['beleuchtung-box-led-fussteil'] } }
            },
            disable: {
                default: ['fussteil-kein-fussteil', 'fussteil-louvre', 'fussteil-tv-lift-versailles', 'fussteil-opera']
            },
            reason: "Foot section lighting only with TV Lift Salon"
        }
    ],
    feet: [
        // Feet: the “floating” model is only available with a foot height of 10 cm
        {
            condition: {
                feet: { height: { not_in: ['fusshohe-10-cm'] } }
            },
            disable: {
                type: ['fusse-schwebend-nur-10cm']
            },
            reason: "Not available with other heights"
        },
        // Feet: reciprocal of the “floating” model is only available with a foot height of 10 cm
        {
            condition: {
                feet: { type: { in: ['fusse-schwebend-nur-10cm'] } }
            },
            disable: {
                height: ['fusshohe-15-cm']
            },
            reason: "Not available with other heights"
        },
        // Feet: reciprocal for Storage (drawers/fold-up require “without feet”)
        {
            condition: {
                storage: { default: { in: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen', 'stauraum-hochklappbarer-bettkasten'] } }
            },
            disable: {
                type: ['fusse-industrial-massivholz-schwarz', 'fusse-klassisch-holz-natur-eckig', 'fusse-modern-metall-chrom', 'fusse-skandinavisch-rundholz-natur', 'fusse-schwebend-nur-10cm']
            },
            reason: "These storage options are only available without feet"
        },
        // Feet: reciprocal for Footboard (Salon/Versailles require “without feet”)
        {
            condition: {
                foot_style: { default: { in: ['fussteil-tv-lift-salon', 'fussteil-tv-lift-versailles'] } }
            },
            disable: {
                type: ['fusse-industrial-massivholz-schwarz', 'fusse-klassisch-holz-natur-eckig', 'fusse-modern-metall-chrom', 'fusse-skandinavisch-rundholz-natur', 'fusse-schwebend-nur-10cm']
            },
            reason: "These footboards are only available without feet"
        },
        // Feet: reciprocal for Underbody lighting (underbody lighting requires feet)
        {
            condition: {
                upgrades: { 'beleuchtung-box': { in: ['beleuchtung-box-led-unterboden'] } }
            },
            disable: {
                type: ['fusse-ohne-fusse']
            },
            reason: "Underbody lighting requires feet"
        }
    ],
    upgrades: [
        // Lighting Headboard front: only with headboards 1, 4, and 6 (Versailles, Louvre, Maison)
        {
            condition: {
                headrest: { model: { not_in: ['kopfteil-modell-versailles', 'kopfteil-modell-louvre', 'kopfteil-modell-maison'] } }
            },
            disable: {
                'beleuchtung-kopfteil': ['beleuchtung-kopfteil-vorne']
            },
            reason: "Not available with headboards other than Versailles, Louvre or Maison"
        },
        // Lighting Box front: not possible when footboards are selected (only with “kein Fußteil”)
        {
            condition: {
                foot_style: { default: { not_in: ['fussteil-kein-fussteil'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-front']
            },
            reason: "Not available when a footboard is selected"
        },
        // Box side lighting: not available for Continuous/Split drawers
        {
            condition: {
                storage: { default: { in: ['stauraum-durchgangige-schubladen', 'stauraum-geteilte-schubladen'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-seite']
            },
            reason: "Not available with continuous/divided drawers"
        },
        // Box underbody lighting: only available when feet are selected (i.e., not with "without feet")
        {
            condition: {
                feet: { type: { in: ['fusse-ohne-fusse'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-unterboden']
            },
            reason: "Not available without feet"
        },
        // Foot section lighting: only the “TV Lift Salon” foot section can be illuminated
        {
            condition: {
                foot_style: { default: { not_in: ['fussteil-tv-lift-salon'] } }
            },
            disable: {
                'beleuchtung-box': ['beleuchtung-box-led-fussteil']
            },
            reason: "Not available with footboards other than TV Lift Salon"
        }
    ],
    extras: [
        // USB ports: not possible with headboard 9 (Monet)
        {
            condition: {
                headrest: { model: { in: ['kopfteil-modell-monet'] } }
            },
            disable: {
                'usb-anschluesse': ['upgrades-usb-anschlusse-am-kopfteil']
            },
            reason: "Not available with Monet"
        },
        // Lighting color: only selectable if at least one lighting option has been selected
        // TODO: AND/OR in conditions
        {
            condition: {
                upgrades: {
                    'beleuchtung-kopfteil': { in: ['beleuchtung-kopfteil-keine'] },
                    'beleuchtung-box': { in: ['beleuchtung-box-keine'] }
                }
            },
            disable: {
                'beleuchtungs-farbe': ['beleuchtungs-farbe-rgb-mit-fernbedienung']
            },
            reason: "Not available without lighting"
        },
        // USB ports: not possible with a width of 90–120 cm
        {
            condition: {
                size: { width: { in: ['breite-90-cm', 'breite-100-cm', 'breite-120-cm'] } }
            },
            disable: {
                'usb-anschluesse': ['upgrades-usb-anschlusse-am-kopfteil']
            },
            reason: "USB ports are not available with width 90–120 cm"
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
 * @returns {boolean} - True if condition is met. Tabs within a topic are ANDed; topics are ORed.
 */
function isConditionMet(condition, currentState) {
    // Topics are ORed; tabs within a topic are ANDed
    return Object.keys(condition).some(topic => {
        const topicCondition = condition[topic];
        const tabs = Object.keys(topicCondition);
        // Every tab condition within this topic must be satisfied
        return tabs.every(tab => {
            const tabCondition = topicCondition[tab];
            // Operations within a tab are ORed
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
            // Compare numeric values parsed from selection and operationValue (handles strings like 'breite-120-cm')
            return selection.some(item => {
                const numValue = parseFloat(String(item).replace(/[^\d.]/g, ''));
                const opValue = parseFloat(String(operationValue).replace(/[^\d.]/g, ''));
                return !isNaN(numValue) && !isNaN(opValue) && numValue < opValue;
            });
        case 'greater_than':
            return selection.some(item => {
                const numValue = parseFloat(String(item).replace(/[^\d.]/g, ''));
                const opValue = parseFloat(String(operationValue).replace(/[^\d.]/g, ''));
                return !isNaN(numValue) && !isNaN(opValue) && numValue > opValue;
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
    if (!exclusion_rules[topic]) return [];

    const allCauses = [];
    const matchedReasons = [];

    exclusion_rules[topic].forEach(rule => {
        if (isConditionMet(rule.condition, currentState) && rule.disable[tab]) {
            // Collect condition topic:tab pairs that actually matched
            Object.keys(rule.condition).forEach(condTopic => {
                const tabsObj = rule.condition[condTopic];
                Object.keys(tabsObj).forEach(condTab => {
                    const ops = tabsObj[condTab];
                    const selection = currentState[condTopic]?.selection?.[condTab] || [];
                    const matched = Object.keys(ops).some(op => checkOperation(op, selection, ops[op]));
                    if (matched) allCauses.push(`${condTopic}:${condTab}`);
                });
            });
            matchedReasons.push(rule.reason);
        }
    });

    if (matchedReasons.length === 0) return [];

    const uniqueAffected = Array.from(new Set(allCauses));

    if (matchedReasons.length > 1) {
        return [{
            reason: "Unfortunately, some of the options above cannot be combined with the option below. If you prefer, deselect the option below:",
            affected: uniqueAffected
        }];
    }

    return [{
        reason: matchedReasons[0],
        affected: uniqueAffected
    }];
}
