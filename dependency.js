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
    'kopfteil',
    'fussteil',
    'boxen',
    'fuesse',
    'matratze',
    'topper',
    'beleuchtungs-farbe',
    'beleuchtung-kopfteil',
    'beleuchtung-box',
]


const image_dependencies = {
    "kopfteil": [
        "headrest:model", "size:width", "headrest:height", "material:cord,feiner-stoff,samt,boucle,grober-stoff,kunstleder"
    ],
    "fussteil": [
        "foot_style:default", "size:width", "feet:height", "material:cord,feiner-stoff,samt,boucle,grober-stoff,kunstleder"
    ],
    "boxen": [
        "storage:default", "size:width", "feet:height", "material:cord,feiner-stoff,samt,boucle,grober-stoff,kunstleder"
    ],
    "fuesse": [
        "feet:type", "size:width", "feet:height"
    ],
    "matratze": [
        "mattress:zwei-separate-matratzen,durchgaengig", "storage:default", "size:width"
    ],
    "topper": [
        "size:width"
    ],
    // TODO: how to handle lighting?
    "beleuchtung-kopfteil": [
        "headrest:model", "size:width"
    ],
    "beleuchtung-box": [
        "storage:default", "size:width"
    ],
    "beleuchtung-farbe": [
        "foot_style:default", "size:width"
    ],
}
