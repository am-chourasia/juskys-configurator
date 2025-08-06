import { current_state } from "./current_selection.js";

// Background
// Background - Scene ID
// Kopfteil
// Kopfteil Model - Breite - Höhe des Kopfteil - Material
// Fußteil
// Fußteil Model - Breite - Füßenhöhe - Material
// Boxen (Seitenteile)
// Boxen Model (Ob mit Stauraum oder nicht) - Breite - Füßenhöhe - Material
// Füße
// Füße Model - Breite - Füßenhöhe
// Matratze
// Matratze Model - Stauraum Model - Breite
// Topper
// Breite
// Beleuchtung
// Belechtungsposition (auf welchem Teil liegt das Licht) - Teil Model - Breite
// Hier kann auch ein einfacher Variante von IDs verwendet, z.B Licht unter Bett ist nur abhängig von Breite, aber Licht auf dem Kopfteil ist abhängig von Breite und Kopfteil Model.
// USB Anschluss
// Kopfteil Model - Breite
// ------------------------------------------------------------


// IMAGE NAME:
// headrest~headrest_model__matisse~size_width__120cm~material_cord__grober-stoff_natur.jpeg
// from the dependency list, we get the following:
// <part>~<topic>_<tab>__<value>~<topic>_<tab>__<value>~...


const image_parts = [
    'headrest',
    'foot_style',
    'boxes',
    'feet',
    'mattress',
    'topper',
    'lighting-headboard',
    'lighting-box',
]



// Eg: headrest~headrest_model__matisse~size_width__120cm~material_cord__grober-stoff_natur.jpeg
// ORDER IS VERY IMPORTANT IN DEPENDENCY LIST

const image_dependencies = {
    "headrest": [
        "headrest:model", "size:width", "headrest:height", "material:cord,feiner-stoff,samt,boucle,grober-stoff,kunstleder"
    ],
    "foot_style": [
        "foot_style:default", "size:width", "feet:height", "material:cord,feiner-stoff,samt,boucle,grober-stoff,kunstleder"
    ],
    "boxes": [
        "storage:default", "size:width", "feet:height", "material:cord,feiner-stoff,samt,boucle,grober-stoff,kunstleder"
    ],
    "feet": [
        "feet:type", "size:width", "feet:height"
    ],
    "mattress": [
        "mattress:zwei-separate-matratzen,durchgaengig", "storage:default", "size:width"
    ],
    "topper": [
        "size:width"
    ],
    "lighting-headboard": [
        "headrest:model", "size:width", "extras:beleuchtungs-farbe"
    ],
    "lighting-box": [
        "storage:default", "size:width", "extras:beleuchtungs-farbe"
    ],
}

function createImageName(currentState) {
    const map = {};
    image_parts.forEach(part => {
        const dependencies = image_dependencies[part];
        const image_name = `${part}~`;
        const dependencyStrings = dependencies.map(dependency => {
            const [topic, tabs] = dependency.split(':');
            const tabList = tabs.split(',');
            for (const tab of tabList) {
                if (currentState[topic] && currentState[topic].selection[tab]) {
                    // TODO: How to handle multiselect for lighting?
                    const value = currentState[topic].selection[tab][0];
                    if (value) {
                        return `${topic}_${tab}__${value}`;
                    }
                }
            }
            return null;
        }).filter(Boolean).join('~');
        map[part] = `${image_name}${dependencyStrings}.png`;
    });
    return map;
}

const images = createImageName(current_state);
image_parts.forEach(part => {
    console.log(images[part]);
});