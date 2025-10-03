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
// Disable:
//   - '*' means all options in the matrix for this topic/tab
//   - [option1, option2] means the options with the given handles


export const exclusion_rules = {
    series: [
        // Series: disable non-Comfort when drawers are selected (reciprocal of storage rule)
        {
            condition: {
                storage: { default: { in: ['storage-model_continuous', 'storage-model_split'] } }
            },
            disable: {
                default: ['kollektion-deluxe', 'kollektion-first-class']
            },
            reason: "Nicht verfügbar mit den Optionen Durchgängige oder Geteilte Schubladen"
        }
    ],
    storage: [
        // Storage: continuous/split drawers only available in Comfort series
        {
            condition: {
                series: { default: { not_in: ['bettboutique-kollektion-komfort'] } }
            },
            disable: {
                default: ['storage-model_continuous', 'storage-model_split']
            },
            reason: "Nur in der Komfort-Serie verfügbar"
        },
        // Storage: drawers and fold-up base only with "without feet" and width from 120 cm
        {
            condition: {
                feet: { type: { not_in: ['feet-hight_00'] } },
                size: { width: { less_than: 'width_120' } }
            },
            disable: {
                default: ['storage-model_continuous', 'storage-model_split', 'storage-model_liftup']
            },
            reason: "Nur ohne Füße und einer Breite ab 120 cm verfügbar"
        },
        // Storage: reciprocal for Box side lighting (side lighting not with drawers)
        {
            condition: {
                beleuchtung: { 'beleuchtung-box': { in: ['light-position_sidelighting'] } }
            },
            disable: {
                default: ['storage-model_continuous', 'storage-model_split']
            },
            reason: "Nicht kombinierbar mit: Beleuchtungs Box - LED Seite"
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
                    'width_80',
                    'width_90',
                    'width_100'
                ]
            },
            reason: "Zwei separate Matratzen sind nur ab einer Breite von 120cm möglich"
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
                    'width_210',
                    'width_220'
                ]
            },
            reason: "Durchgehende Matratze sind nur bis eine Breite von 200cm verfügbar"
        },
        // Size: reciprocal for storage min width (drawers/fold-up require width >= 120)
        {
            condition: {
                storage: { default: { in: ['storage-model_continuous', 'storage-model_split', 'storage-model_liftup'] } }
            },
            disable: {
                width: [
                    'width_90',
                    'width_100'
                ]
            },
            reason: "Die Option Stauraum ist erst ab einer Breite von 120cm verfügbar"
        },
        // Size: reciprocal for USB ports width restriction (USB not possible with width 90–120 cm)
        {
            condition: {
                upgrades: { 'usb-anschluesse': { in: ['upgrades-usb-anschlusse-am-kopfteil'] } }
            },
            disable: {
                width: ['width_90', 'width_100', 'width_120']
            },
            reason: "USB-Anschlüsse sind für die Breiten 90–120 cm nicht verfügbar"
        },
        // Size: reciprocal for TV Lift footboards (TV Lift Salon/Versailles only from width 140 cm)
        {
            condition: {
                foot_style: { default: { in: ['footboard-model_tv-lift-salon', 'footboard-model_tv-lift-versailles'] } }
            },
            disable: {
                width: ['width_90', 'width_100', 'width_120']
            },
            reason: "Fußteile 'TV Lift Salon' und 'TV Lift Versailles' sind erst ab 140 cm Breite verfügbar"
        }
    ],
    mattress: [
        // Mattress: two separate mattresses only possible from 120 cm width
        {
            condition: {
                size: { width: { less_than: 'width_120' } }
            },
            disable: {
                'zwei-separate-matratzen': ['*']
            },
            reason: "Zwei separate Matratzen sind nur ab einer Breite von 120cm verfügbar"
        },
        // Mattress: a continuous mattress is only possible up to 200 cm width
        {
            condition: {
                size: { width: { greater_than: 'width_200' } }
            },
            disable: {
                'eine-matratze': ['*']
            },
            reason: "Durchgehende Matratzen sind nur bis zu einer Breite von 200cm verfügbar"
        }
    ],
    material: [
        // Material: Cord not possible with headboards 1,4,7 or with footboards TV Lift Versailles/Louvre
        {
            condition: {
                headrest: { model: { in: ['headboard-model_versailles', 'headboard-model_palais', 'headboard-model_louvre'] } },
                foot_style: { default: { in: ['footboard-model_tv-lift-versailles', 'footboard-model_louvre'] } }
            },
            disable: {
                cord: ['*']
            },
            reason: "Nicht Verfügbar mit den Kopfteilen: Versailles/Palais/Louvre oder den Fußteilen: TV Lift Versailles/Louvre"
        }
    ],
    headrest: [
        // Headboard: not possible with Cord (cord excludes models 1,4,7)
        {
            condition: {
                material: { cord: { in: ['material_cord__color_silbergrau', 'material_cord__color_levendel', 'material_cord__color_taupe', 'material_cord__color_kaffe', 'material_cord__color_beige', 'material_cord__color_creme', 'material_cord__color_rose', 'material_cord__color_athrazit'] } }
            },
            disable: {
                model: ['headboard-model_versailles', 'headboard-model_palais', 'headboard-model_louvre']
            },
            reason: "Nicht verfügbar mit der Option: Cord"
        },
        // Headboard: reciprocal for headboard front lighting (only with 1,4,6)
        {
            condition: {
                beleuchtung: { 'beleuchtung-kopfteil-vorne': { in: ['light-position_headboardfrontlighting'] } }
            },
            disable: {
                model: [ "headboard-model_matisse", "headboard-model_bijou", "headboard-model_belleville", "headboard-model_palais", "headboard-model_chateau", "headboard-model_monet"]
            },
            reason: "Nur verfügbar mit den Kopfteilen: Versailles, Palais, Maison"
        },
        // Headboard: reciprocal for USB ports (USB not possible with headboard 9 Monet)
        {
            condition: {
                upgrades: { 'usb-anschluesse': { in: ['upgrades-usb-anschlusse-am-kopfteil'] } }
            },
            disable: {
                model: ['headboard-model_monet']
            },
            reason: "Nicht verfügbar mit dem Kopfteil: Monet"
        }
    ],
    foot_style: [
        // Footboard: “TV Lift Salon” & “TV Lift Versailles” only with the “without feet” option
        {
            condition: {
                feet: { type: { not_in: ['feet-hight_00'] } }
            },
            disable: {
                default: ['footboard-model_tv-lift-salon', 'footboard-model_tv-lift-versailles']
            },
            reason: "Nur verfügbar mit der Option: Ohne Füße"
        },
        // Footboard: reciprocal for Material Cord (Cord excludes Versailles/Louvre footboards)
        {
            condition: {
                material: { cord: { in: ['*'] } }
            },
            disable: {
                default: ['footboard-model_tv-lift-versailles', 'footboard-model_louvre']
            },
            reason: "Cord kann nicht mit den Fußteilen TV Lift Versailles oder Louvre kombiniert werden"
        },
        // Footboard: reciprocal for Box front lighting (only possible without footboard)
        {
            condition: {
                beleuchtung: { 'beleuchtung-box-led-front': { in: ['light-position_frontlighting'] } }
            },
            disable: {
                default: ['footboard-model_louvre', 'footboard-model_tv-lift-versailles', 'footboard-model_tv-lift-salon', 'footboard-model_opera']
            },
            reason: "Beleuchtung Box LED Front ist nur ohne die Option Fußteil verfügbar"
        },
        // Footboard: reciprocal for Foot section lighting (only TV Lift Salon can be illuminated)
        {
            condition: {
                beleuchtung: { 'beleuchtung-box-led-fussteil': { in: ['light-position_footboardlighting'] } }
            },
            disable: {
                default: ['footboard-model_louvre', 'footboard-model_tv-lift-versailles', 'footboard-model_opera']
            },
            reason: "Die Beleuchtungs Box LED Fußteil ist nur mit dem Fußteil TV Lift Salon kombinierbar"
        }
        ,
        // Footboard: TV Lift Salon/Versailles not configurable at 90–120 cm width (from 140 cm)
        {
            condition: {
                size: { width: { in: ['width_90', 'width_100', 'width_120'] } }
            },
            disable: {
                default: ['footboard-model_tv-lift-salon', 'footboard-model_tv-lift-versailles']
            },
            reason: "Fußteile 'TV Lift Salon' und 'TV Lift Versailles' sind bei 90–120 cm nicht konfigurierbar (erst ab 140 cm)"
        }
    ],
    feet: [
        // Feet: the “floating” model is only available with a foot height of 10 cm
        {
            condition: {
                feet: { height: { in: ['fusshohe-15-cm'] } }
            },
            disable: {
                type: ['feet-model_none']
            },
            reason: "Die Option schwebend ist nur mit der Option Fußhöhe 15cm kombinierbar"
        },
        // Feet: reciprocal of the “floating” model is only available with a foot height of 10 cm
        {
            condition: {
                feet: { type: { in: ['feet-model_none'] } }
            },
            disable: {
                height: ['fusshohe-15-cm']
            },
            reason: "Die Option schwebend ist nur mit der Option Fußhöhe 15cm kombinierbar"
        },
        // Feet: reciprocal for Storage (drawers/fold-up require “without feet”)
        {
            condition: {
                storage: { default: { in: ['storage-model_continuous', 'storage-model_split', 'storage-model_liftup'] } }
            },
            disable: {
                type: ['feet-model_02', 'feet-model_03', 'feet-model_01', 'feet-model_04', 'feet-model_none']
            },
            reason: "Die Option Stauraum ist nur mit der Option Ohne Füße kombinierbar"
        },
        // Feet: reciprocal for Footboard (Salon/Versailles require “without feet”)
        {
            condition: {
                foot_style: { default: { in: ['footboard-model_tv-lift-salon', 'footboard-model_tv-lift-versailles'] } }
            },
            disable: {
                type: ['feet-model_02', 'feet-model_03', 'feet-model_01', 'feet-model_04', 'feet-model_none']
            },
            reason: "Diese Option ist nur mit der Option Ohne Füße kombinierbar"
        },
        // Feet: reciprocal for Underbody lighting (underbody lighting requires feet)
        {
            condition: {
                beleuchtung: { 'beleuchtung-box-led-unterboden': { in: ['light-position_bottomlighting'] } }
            },
            disable: {
                type: ['feet-hight_00']
            },
            reason: "Nur möglich bei Auswahl von Füßen "
        }
    ],
    beleuchtung: [
        // Lighting Headboard front: only with headboards 1, 4, and 6 (Versailles, Louvre, Maison)
        {
            condition: {
                headrest: { model: { not_in: ['headboard-model_versailles', 'headboard-model_louvre', 'headboard-model_maison'] } }
            },
            disable: {
                'beleuchtung-kopfteil-vorne': ['light-position_headboardfrontlighting']
            },
            reason: "Nur mit folgenden Kopfteilen verfügbar: Versailles, Louvre or Maison"
        },
        // Lighting Box front: not possible when footboards are selected (only with “kein Fußteil”)
        {
            condition: {
                foot_style: { default: { not_in: ['footboard-model_none'] } }
            },
            disable: {
                'beleuchtung-box-led-front': ['light-position_frontlighting']
            },
            reason: "Nur verfügbar ohne Fußteil"
        },
        // Box side lighting: not available for Continuous/Split drawers
        {
            condition: {
                storage: { default: { in: ['storage-model_continuous', 'storage-model_split'] } }
            },
            disable: {
                'beleuchtung-box-seite': ['light-position_sidelighting']
            },
            reason: "Nicht verfügbar mit den Optionen Durchgängige Schubladen und Geteilte Schubladen"
        },
        // Box underbody lighting: only available when feet are selected (i.e., not with "without feet")
        {
            condition: {
                feet: { type: { in: ['feet-hight_00'] } }
            },
            disable: {
                'beleuchtung-box-led-unterboden': ['light-position_bottomlighting']
            },
            reason: "Nicht mit der Option: Ohne Füße kombinierbar"
        },
        // Foot section lighting: only the “TV Lift Salon” foot section can be illuminated
        {
            condition: {
                foot_style: { default: { not_in: ['footboard-model_tv-lift-salon'] } }
            },
            disable: {
                'beleuchtung-box-led-fussteil': ['light-position_footboardlighting']
            },
            reason: "Nur mit dem Fußteil TV Lift Salon kombinierbar"
        },
        // Lighting: reciprocal for lighting color (color requires at least one lighting option)
        {
            condition: {
                upgrades: { 
                    'beleuchtungs-farbe': { in: ['beleuchtungs-farbe-rgb-mit-fernbedienung'] },
                }
            },
            disable: {
                'beleuchtung-kopfteil-keine': ['beleuchtung-kopfteil-keine'],
                'beleuchtung-box-keine': ['beleuchtung-box-keine']
            },
            reason: "Beleuchtungsfarbe erfordert eine Option aus Beleuchtung"
        }
    ],
    upgrades: [
        // USB ports: not possible with headboard 9 (Monet)
        {
            condition: {
                headrest: { model: { in: ['headboard-model_monet'] } }
            },
            disable: {
                'usb-anschluesse': ['upgrades-usb-anschlusse-am-kopfteil']
            },
            reason: "Nicht verfügbar mit Kopfteil: Monet"
        },
        // Lighting color: only selectable if at least one lighting option has been selected
        {
            condition: {
                beleuchtung: {
                    'beleuchtung-kopfteil-keine': { in: ['beleuchtung-kopfteil-keine'] },
                    'beleuchtung-kopfteil-hinten': { isEmpty: true },
                    'beleuchtung-kopfteil-vorne': { isEmpty: true },
                    'beleuchtung-box-keine': { in: ['beleuchtung-box-keine'] },
                    'beleuchtung-box-led-front': { isEmpty: true },
                    'beleuchtung-box-seite': { isEmpty: true },
                    'beleuchtung-box-led-unterboden': { isEmpty: true },
                    'beleuchtung-box-led-fussteil': { isEmpty: true },
                }
            },
            disable: {
                'beleuchtungs-farbe': ['beleuchtungs-farbe-rgb-mit-fernbedienung']
            },
            reason: "Nicht verfügbar ohne die Option: Beleuchtung"
        },
        // USB ports: not possible with a width of 90–120 cm
        {
            condition: {
                size: { width: { in: ['width_90', 'width_100', 'width_120'] } }
            },
            disable: {
                'usb-anschluesse': ['upgrades-usb-anschlusse-am-kopfteil']
            },
            reason: "USB-Anschlüsse sind erst bei einer Breite über 120cm verfügbar"
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
            // Support wildcard: ['*'] means any selection
            if (Array.isArray(operationValue) && operationValue.length === 1 && operationValue[0] === '*') {
                return selection.length > 0;
            }
            return selection.some(item => operationValue.includes(item));
        case 'not_in':
            // Support wildcard: ['*'] means no selection
            if (Array.isArray(operationValue) && operationValue.length === 1 && operationValue[0] === '*') {
                return selection.length === 0;
            }
            return !selection.some(item => operationValue.includes(item));
        case 'isEmpty':
            return operationValue ? selection.length === 0 : selection.length > 0;
        case 'less_than':
            // Compare numeric values parsed from selection and operationValue (handles strings like 'width_120')
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

    return {
        reasons: matchedReasons,
        affected: uniqueAffected
    };
}
