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

const image_dependencies = {
    "kopfteil": [
        "kopfteil Model", "Breite", "Höhe des Kopfteil", "Material"
    ],
    "fussteil": [
        "fussteil Model", "Breite", "Füßenhöhe", "Material"
    ],
    "boxen": [
        "boxen Model", "Breite", "Füßenhöhe", "Material"
    ],
    "fuesse": [
        "fuesse Model", "Breite", "Füßenhöhe"
    ],
    "matratze": [
        "matratze Model", "Stauraum Model", "Breite"
    ],
    "topper": [
        "Breite"
    ],
    "beleuchtung": [
        "Belechtungsposition", "Teil Model", "Breite"
    ],
    "usbAnschluss": [
        "kopfteil Model", "Breite"
    ]
}
