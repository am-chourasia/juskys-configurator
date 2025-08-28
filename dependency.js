import { current_state } from "./current_selection.js";

// Background
// Background - Scene ID
// Kopfteil (headrest)
// Kopfteil Model - Breite - Höhe des Kopfteil - Material
// Fußteil (foot_style)
// Fußteil Model - Breite - Füßenhöhe - Material
// Boxen (storage) - Ob mit Stauraum oder nicht
// Boxen Model - Breite - Füßenhöhe - Material
// Füße (feet)
// Füße Model - Breite - Füßenhöhe
// Matratze (mattress) - Not in current matrix
// Matratze Model - Stauraum Model - Breite
// Topper
// Breite
// Beleuchtung (upgrades)
// Beleuchtungsposition (auf welchem Teil liegt das Licht) - Teil Model - Breite
// Hier kann auch ein einfacher Variante von IDs verwendet, z.B Licht unter Bett ist nur abhängig von Breite, aber Licht auf dem Kopfteil ist abhängig von Breite und Kopfteil Model.
// USB Anschluss (extras)
// Kopfteil Model - Breite
// ------------------------------------------------------------

// IMAGE NAME FORMAT:
// headrest__headrest_model__matisse~size_width__120cm~material_cord__grober-stoff_natur.jpeg
// from the dependency list, we get the following:
// <part>___<topic>_<tab>__<value>___<topic>_<tab>__<value>___...
// <part>___<value>___<value>___...

const image_parts = [
    'headrest',
    'foot_style',
    'storage',
    'feet',
    'mattress',
    'topper',
    'lighting-headboard', // Changed from 'lighting-headboard' to match upgrades
    'lighting-box', // Changed from 'lighting-box' to match upgrades
]
// + background

// Eg: headrest___width_120cm___headrest_matisse___headrest__120cm___material_cord-farbe-1.png
// ORDER IS VERY IMPORTANT IN DEPENDENCY LIST

// headrest___120cm___kopftiel___120cm___farbe2.png

const image_dependencies = {
    "headrest": [
        "size:width",
        "headrest:model",
        "headrest:height",
        "material:feiner-stoff,samt,cord,boucle,grober-stoff,kunstleder"
    ],
    "foot_style": [
        "size:width",
        "foot_style:default",
        "feet:height",
        "material:feiner-stoff,samt,cord,boucle,grober-stoff,kunstleder"
    ],
    "storage": [
        "size:width",
        "storage:default",
        "feet:height",
        "material:feiner-stoff,samt,cord,boucle,grober-stoff,kunstleder"
    ],
    "feet": [
        "size:width",
        "feet:type",
        "feet:height",
    ],
    "mattress": [
        "size:width",
        "storage:default",
        "mattress:eine-matratze,zwei-separate-matratzen",
    ],
    "topper": [
        "size:width"
    ],
    "lighting-headboard": [
        "size:width",
        "upgrades:beleuchtung-kopfteil",
        "extras:beleuchtungs-farbe"
    ],
    "lighting-box": [
        "size:width",
        "upgrades:beleuchtung-box",
        "extras:beleuchtungs-farbe"
    ],
}

/**
 * Creates a map of image file names based on the current_state.
 * @param {Object} currentState - The current state object (as in example_current_state)
 * @returns {Object} Map of image file names (strings)
 */
function createImageName(currentState) {
    const map = {};

    image_parts.forEach(part => {
        const dependencies = image_dependencies[part];
        // Skip if no dependencies (like mattress)
        if (!dependencies || dependencies.length === 0) {
            map[part] = `${part}___.png`;
            return;
        }
        const image_name = `${part}___`;
        const dependencyStrings = dependencies.map(dependency => {
            const [topic, tabs] = dependency.split(':');
            const tabList = tabs.split(',');

            for (const tab of tabList) {
                if (currentState[topic] && currentState[topic].selection[tab]) {
                    const value = currentState[topic].selection[tab].sort().join('_');
                    if (value) {
                        return `${topic}__${tab}_${value}`;
                    }
                }
            }
            return null;
        }).filter(Boolean).join('___');
        map[part] = `${image_name}${dependencyStrings}.png`;
    });
    return map;
}

/**
 * Returns an array of image file names based on the current_state.
 * Each image corresponds to an image part, with its dependencies resolved from current_state.
 * @param {Object} current_state - The current state object (as in example_current_state)
 * @returns {Array} Array of image file names (strings)]
 */
function getImagesFromCurrentState(current_state) {
    const imageMap = createImageName(current_state);
    return image_parts.map(part => imageMap[part]);
}

export {
    image_parts,
    image_dependencies,
    createImageName,
    getImagesFromCurrentState,
};