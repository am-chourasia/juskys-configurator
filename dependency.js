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


const image_pieces = [
    'background',
    'headrest',
    'foot_style',
    'boxes',
    'feet',
    'mattress',
    'topper',
    'lighting-color',
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
    // TODO: how to handle lighting?
    "lighting-headboard": [
        "headrest:model", "size:width"
    ],
    "lighting-box": [
        "storage:default", "size:width"
    ],
    "lighting-color": [
        "foot_style:default", "size:width"
    ],
}
