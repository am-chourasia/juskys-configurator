const matrix = {
    series: {
        frontend_name: 'Kollektion',
        orientation: 'normal',
        next_button: 'Weiter zur Größe',
        tabs: {
            default: {
                frontend_name: '',
                type: 'descriptive',
                products: [
                    {
                        product_id: 'komfort',
                        product_title: 'Komfort',
                        product_description: 'Komfort Kollektion',
                        handle: 'komfort',
                        price: '$0.00'
                    },
                    {
                        product_id: 'deluxe',
                        product_title: 'Deluxe',
                        product_description: 'Deluxe Kollektion',
                        handle: 'deluxe',
                        price: '$0.00'
                    },
                    {
                        product_id: 'first-class',
                        product_title: 'First Class',
                        product_description: 'First Class Kollektion',
                        handle: 'first-class',
                        price: '$0.00'
                    },
                ]
            }
        }
    },
    size: {
        frontend_name: 'Größe',
        orientation: 'vertical',
        next_button: 'Weiter zum Kopfteil',
        tabs: {
            'width': {
                frontend_name: 'Breite',
                type: 'pills',
                products: [
                    { product_id: 'width-90', product_title: '90cm', handle: '90cm', price: '$0.00' },
                    { product_id: 'width-100', product_title: '100cm', handle: '100cm', price: '$0.00' },
                    { product_id: 'width-120', product_title: '120cm', handle: '120cm', price: '$0.00' },
                    { product_id: 'width-140', product_title: '140cm', handle: '140cm', price: '$0.00' },
                    { product_id: 'width-160', product_title: '160cm', handle: '160cm', price: '$0.00' },
                    { product_id: 'width-180', product_title: '180cm', handle: '180cm', price: '$0.00' },
                    { product_id: 'width-200', product_title: '200cm', handle: '200cm', price: '$0.00' },
                    { product_id: 'width-240', product_title: '240cm', handle: '240cm', price: '$0.00' },
                ]
            },
            'length': {
                frontend_name: 'Länge',
                type: 'pills',
                products: [
                    { product_id: 'length-180', product_title: '180cm', handle: '180cm', price: '$0.00' },
                    { product_id: 'length-190', product_title: '190cm', handle: '190cm', price: '$0.00' },
                    { product_id: 'length-200', product_title: '200cm', handle: '200cm', price: '$0.00' },
                    { product_id: 'length-210', product_title: '210cm', handle: '210cm', price: '$0.00' },
                ]
            }
        }
    },
    headrest: {
        frontend_name: 'Kopfteil',
        orientation: 'vertical',
        next_button: 'Weiter zum Stauraum',
        tabs: {
            'model': {
                frontend_name: 'Modell',
                type: 'single-select',
                products: [
                    {
                        product_id: 'versailles',
                        product_title: 'Versailles',
                        product_description: 'Versailles Kopfteil',
                        handle: 'versailles',
                        price: '$0.00'
                    },
                    {
                        product_id: 'matisse',
                        product_title: 'Matisse',
                        product_description: 'Matisse Kopfteil',
                        handle: 'matisse',
                        price: '$0.00'
                    },
                    {
                        product_id: 'bijou',
                        product_title: 'Bijou',
                        product_description: 'Bijou Kopfteil',
                        handle: 'bijou',
                        price: '$0.00'
                    },
                    {
                        product_id: 'louvre',
                        product_title: 'Louvre',
                        product_description: 'Louvre Kopfteil',
                        handle: 'louvre',
                        price: '$0.00'
                    },
                    {
                        product_id: 'belleville',
                        product_title: 'Belleville',
                        product_description: 'Belleville Kopfteil',
                        handle: 'belleville',
                        price: '$0.00'
                    },
                    {
                        product_id: 'maison',
                        product_title: 'Maison',
                        product_description: 'Maison Kopfteil',
                        handle: 'maison',
                        price: '$0.00'
                    },
                    {
                        product_id: 'palais',
                        product_title: 'Palais',
                        product_description: 'Palais Kopfteil',
                        handle: 'palais',
                        price: '$0.00'
                    },
                    {
                        product_id: 'chateau',
                        product_title: 'Château',
                        product_description: 'Château Kopfteil',
                        handle: 'chateau',
                        price: '$0.00'
                    },
                    {
                        product_id: 'monet',
                        product_title: 'Monet',
                        product_description: 'Monet Kopfteil',
                        handle: 'monet',
                        price: '$0.00'
                    }
                ]
            },
            'height': {
                frontend_name: 'Höhe',
                type: 'pills',
                products: [
                    {
                        product_id: 'height-115',
                        product_title: '115cm',
                        product_description: '115cm Höhe',
                        handle: '115cm',
                        price: '$0.00'
                    },
                    {
                        product_id: 'height-120',
                        product_title: '120cm',
                        product_description: '120cm Höhe',
                        handle: '120cm',
                        price: '$0.00'
                    },
                    {
                        product_id: 'height-125',
                        product_title: '125cm',
                        product_description: '125cm Höhe',
                        handle: '125cm',
                        price: '$0.00'
                    },
                    {
                        product_id: 'height-130',
                        product_title: '130cm',
                        product_description: '130cm Höhe',
                        handle: '130cm',
                        price: '$0.00'
                    },
                    {
                        product_id: 'height-135',
                        product_title: '135cm',
                        product_description: '135cm Höhe',
                        handle: '135cm',
                        price: '$0.00'
                    },
                    {
                        product_id: 'height-140',
                        product_title: '140cm',
                        product_description: '140cm Höhe',
                        handle: '140cm',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
    storage: {
        frontend_name: 'Stauraum',
        orientation: 'normal',
        next_button: 'Weiter zum Fußteil',
        tabs: {
            default: {
                frontend_name: '',
                type: 'single-select',
                products: [
                    {
                        product_id: 'kein-stauraum',
                        product_title: 'Kein Stauraum',
                        product_description: 'Ohne Stauraum',
                        handle: 'kein-stauraum',
                        price: '$0.00'
                    },
                    {
                        product_id: 'durchgaengige-schubladen',
                        product_title: 'Durchgängige Schubladen',
                        product_description: 'Durchgängige Schubladen',
                        handle: 'durchgaengige-schubladen',
                        price: '$0.00'
                    },
                    {
                        product_id: 'geteilte-schubladen',
                        product_title: 'Geteilte Schubladen',
                        product_description: 'Geteilte Schubladen',
                        handle: 'geteilte-schubladen',
                        price: '$0.00'
                    },
                    {
                        product_id: 'hochklappbarer-bettkasten',
                        product_title: 'Hochklappbarer Bettkasten',
                        product_description: 'Hochklappbarer Bettkasten',
                        handle: 'hochklappbarer-bettkasten',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
    foot_style: {
        frontend_name: 'Fußteil',
        orientation: 'normal',
        next_button: 'Weiter zu den Füßen',
        tabs: {
            default: {
                frontend_name: '',
                type: 'single-select',
                products: [
                    {
                        product_id: 'kein-fussteil',
                        product_title: 'Kein Fußteil',
                        product_description: 'Ohne Fußteil',
                        handle: 'kein-fussteil',
                        price: '$0.00'
                    },
                    {
                        product_id: 'opera',
                        product_title: 'Opéra',
                        product_description: 'Opéra Fußteil',
                        handle: 'opera',
                        price: '$0.00'
                    },
                    {
                        product_id: 'louvre-fussteil',
                        product_title: 'Louvre',
                        product_description: 'Louvre Fußteil',
                        handle: 'louvre-fussteil',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tv-lift-salon',
                        product_title: 'TV Lift Salon',
                        product_description: 'TV Lift Salon',
                        handle: 'tv-lift-salon',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tv-lift-versailles',
                        product_title: 'TV Lift Versailles',
                        product_description: 'TV Lift Versailles',
                        handle: 'tv-lift-versailles',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
    feet: {
        frontend_name: 'Füße',
        orientation: 'horizontal',
        next_button: 'Weiter zum Material',
        tabs: {
            'type': {
                frontend_name: 'Auswahl',
                type: 'single-select',
                products: [
                    {
                        product_id: 'ohne-fuesse',
                        product_title: 'Ohne Füße',
                        product_description: 'Ohne Füße',
                        handle: 'ohne-fuesse',
                        price: '$0.00'
                    },
                    {
                        product_id: 'mit-fuesse',
                        product_title: 'Mit Füßen',
                        product_description: 'Mit Füßen',
                        handle: 'mit-fuesse',
                        price: '$0.00'
                    }
                ]
            },
            'model': {
                frontend_name: 'Modelle',
                type: 'single-select',
                products: [
                    {
                        product_id: 'schwebend',
                        product_title: 'Schwebend',
                        product_description: 'Schwebend Modell',
                        handle: 'schwebend',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tbd-1',
                        product_title: 'tbd',
                        product_description: 'To be determined',
                        handle: 'tbd-1',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tbd-2',
                        product_title: 'tbd',
                        product_description: 'To be determined',
                        handle: 'tbd-2',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tbd-3',
                        product_title: 'tbd',
                        product_description: 'To be determined',
                        handle: 'tbd-3',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tbd-4',
                        product_title: 'tbd',
                        product_description: 'To be determined',
                        handle: 'tbd-4',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tbd-5',
                        product_title: 'tbd',
                        product_description: 'To be determined',
                        handle: 'tbd-5',
                        price: '$0.00'
                    },
                    {
                        product_id: 'tbd-6',
                        product_title: 'tbd',
                        product_description: 'To be determined',
                        handle: 'tbd-6',
                        price: '$0.00'
                    }
                ]
            },
            'height': {
                frontend_name: 'Fußhöhe',
                type: 'single-select',
                products: [
                    {
                        product_id: 'fusshoehe-10',
                        product_title: '10cm',
                        product_description: '10cm Fußhöhe',
                        handle: '10cm',
                        price: '$0.00'
                    },
                    {
                        product_id: 'fusshoehe-15',
                        product_title: '15cm',
                        product_description: '15cm Fußhöhe',
                        handle: '15cm',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
    material: {
        frontend_name: 'Material',
        orientation: 'horizontal',
        next_button: 'Weiter zur Matratze',
        tabs: {
            'feiner-stoff': {
                frontend_name: 'Feiner Stoff',
                type: 'single-select',
                products: [
                    {
                        product_id: 'feiner-stoff-farbe-1',
                        product_title: 'Farbe 1',
                        product_description: 'Feiner Stoff Farbe 1',

                        handle: 'feiner-stoff-farbe-1',
                        price: '$0.00'
                    },
                    {
                        product_id: 'feiner-stoff-farbe-2',
                        product_title: 'Farbe 2',
                        product_description: 'Feiner Stoff Farbe 2',
                        handle: 'feiner-stoff-farbe-2',
                        price: '$0.00'
                    }
                    // Add more colors as needed (11 total)
                ]
            },
            'samt': {
                frontend_name: 'Samt',
                type: 'single-select',
                products: [
                    {
                        product_id: 'samt-farbe-1',
                        product_title: 'Farbe 1',
                        product_description: 'Samt Farbe 1',
                        handle: 'samt-farbe-1',
                        price: '$0.00'
                    }
                    // Add more colors as needed (9 total)
                ]
            },
            'cord': {
                frontend_name: 'Cord',
                type: 'single-select',
                products: [
                    {
                        product_id: 'cord-farbe-1',
                        product_title: 'Farbe 1',
                        product_description: 'Cord Farbe 1',
                        handle: 'cord-farbe-1',
                        price: '$0.00'
                    }
                    // Add more colors as needed (8 total)
                ]
            },
            'boucle': {
                frontend_name: 'Bouclé',
                type: 'single-select',
                products: [
                    {
                        product_id: 'boucle-farbe-1',
                        product_title: 'Farbe 1',
                        product_description: 'Bouclé Farbe 1',
                        handle: 'boucle-farbe-1',
                        price: '$0.00'
                    }
                    // Add more colors as needed (9 total)
                ]
            },
            'grober-stoff': {
                frontend_name: 'Grober Stoff',
                type: 'single-select',
                products: [
                    {
                        product_id: 'grober-stoff-farbe-1',
                        product_title: 'Farbe 1',
                        product_description: 'Grober Stoff Farbe 1',
                        handle: 'grober-stoff-farbe-1',
                        price: '$0.00'
                    }
                    // Add more colors as needed (7 total)
                ]
            },
            'kunstleder': {
                frontend_name: 'Kunstleder',
                type: 'single-select',
                products: [
                    {
                        product_id: 'kunstleder-farbe-1',
                        product_title: 'Farbe 1',
                        product_description: 'Kunstleder Farbe 1',
                        handle: 'kunstleder-farbe-1',
                        price: '$0.00'
                    }
                    // Add more colors as needed (8 total)
                ]
            }
        }
    },
    mattress: {
        frontend_name: 'Matratze',
        orientation: 'horizontal',
        next_button: 'Weiter zum Topper',
        tabs: {
            'zwei-separate-matratzen': {
                frontend_name: 'Zwei separate Matratzen',
                type: 'dropdown',
                // TODO: OPTIONAL: 'split' property for two dropdowns on single tab
                products: [
                    {
                        product_id: 'h2-zwei',
                        product_title: 'H2',
                        product_description: 'Härtegrad H2',
                        handle: 'h2-zwei',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h3-zwei',
                        product_title: 'H3',
                        product_description: 'Härtegrad H3',
                        handle: 'h3-zwei',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h4-zwei',
                        product_title: 'H4',
                        product_description: 'Härtegrad H4',
                        handle: 'h4-zwei',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h2-durchgaengig',
                        product_title: 'H2',
                        product_description: 'Härtegrad H2',
                        handle: 'h2-durchgaengig',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h3-durchgaengig',
                        product_title: 'H3',
                        product_description: 'Härtegrad H3',
                        handle: 'h3-durchgaengig',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h4-durchgaengig',
                        product_title: 'H4',
                        product_description: 'Härtegrad H4',
                        handle: 'h4-durchgaengig',
                        price: '$0.00'
                    },
                ]
            },
            'durchgaengig': {
                frontend_name: 'Durchgängig',
                type: 'dropdown',
                products: [
                    {
                        product_id: 'h2-durchgaengig',
                        product_title: 'H2',
                        product_description: 'Härtegrad H2',
                        handle: 'h2-durchgaengig',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h3-durchgaengig',
                        product_title: 'H3',
                        product_description: 'Härtegrad H3',
                        handle: 'h3-durchgaengig',
                        price: '$0.00'
                    },
                    {
                        product_id: 'h4-durchgaengig',
                        product_title: 'H4',
                        product_description: 'Härtegrad H4',
                        handle: 'h4-durchgaengig',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
    topper: {
        frontend_name: 'Topper',
        orientation: 'normal',
        next_button: 'Weiter zu den Extras',
        tabs: {
            default: {
                frontend_name: '',
                type: 'single-select',
                products: [
                    {
                        product_id: 'komfortschaum-topper',
                        product_title: 'Komfortschaum-Topper (6 cm)',
                        product_description: 'Komfortschaum-Topper 6cm',
                        handle: 'komfortschaum-topper',
                        price: '$0.00'
                    },
                    {
                        product_id: 'kaltschaum-topper',
                        product_title: 'Kaltschaum-Topper (8 cm)',
                        product_description: 'Kaltschaum-Topper 8cm',
                        handle: 'kaltschaum-topper',
                        price: '$0.00'
                    },
                    {
                        product_id: 'visco-schaum-topper',
                        product_title: 'Visco-Schaum-Topper (8 cm)',
                        product_description: 'Visco-Schaum-Topper 8cm',
                        handle: 'visco-schaum-topper',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
    upgrades: {
        frontend_name: 'Upgrades',
        orientation: 'vertical',
        next_button: 'Weiter zu den Extras',
        tabs: {
            'beleuchtung-kopfteil': {
                frontend_name: 'Beleuchtung Kopfteil',
                type: 'multiselect-with-none',
                products: [
                    {
                        product_id: 'hinten',
                        product_title: 'Hinten',
                        product_description: 'Beleuchtung hinten',
                        handle: 'hinten',
                        price: '$0.00'
                    },
                    {
                        product_id: 'vorne',
                        product_title: 'Vorne',
                        product_description: 'Beleuchtung vorne',
                        handle: 'vorne',
                        price: '$0.00'
                    }
                ]
            },
            'beleuchtung-box': {
                frontend_name: 'Beleuchtung Box',
                type: 'multiselect-with-none',
                products: [
                    {
                        product_id: 'led-front',
                        product_title: 'LED Front',
                        product_description: 'LED Front Beleuchtung',
                        handle: 'led-front',
                        price: '$0.00'
                    },
                    {
                        product_id: 'led-seite',
                        product_title: 'LED Seite',
                        product_description: 'LED Seiten Beleuchtung',
                        handle: 'led-seite',
                        price: '$0.00'
                    },
                    {
                        product_id: 'led-unterboden',
                        product_title: 'LED Unterboden',
                        product_description: 'LED Unterboden Beleuchtung',
                        handle: 'led-unterboden',
                        price: '$0.00'
                    },
                    {
                        product_id: 'led-fussteil',
                        product_title: 'LED Fußteil',
                        product_description: 'LED Fußteil Beleuchtung',
                        handle: 'led-fussteil',
                        price: '$0.00'
                    }
                ]
            },
        }
    },
    extras: {
        frontend_name: 'Extras',
        orientation: 'vertical',
        next_button: 'Weiter zur Lieferung',
        tabs: {
            'rueckseite-stofffarbe': {
                frontend_name: 'Rückseite mit Stofffarbe bezogen',
                type: 'checkbox',
                products: [
                    {
                        product_id: 'rueckseite-stofffarbe',
                        product_title: 'Rückseite mit Stofffarbe bezogen',
                        product_description: 'Rückseite mit Stofffarbe bezogen',
                        handle: 'rueckseite-stofffarbe',
                        price: '$0.00'
                    }
                ]
            },
            'usb-anschluesse': {
                frontend_name: 'USB-Anschlüsse',
                type: 'checkbox',
                products: [
                    {
                        product_id: 'usb-anschluesse',
                        product_title: 'USB-Anschlüsse',
                        product_description: 'USB-Anschlüsse',
                        handle: 'usb-anschluesse',
                        price: '$0.00'
                    }
                ]
            },
            'beleuchtungs-farbe': {
                frontend_name: 'Beleuchtungs-Farbe',
                type: 'single-select',
                products: [
                    {
                        product_id: 'led-weiss',
                        product_title: 'LED weiß',
                        product_description: 'LED weiß Beleuchtung',
                        handle: 'led-weiss',
                        price: '$0.00'
                    },
                    {
                        product_id: 'led-blau',
                        product_title: 'LED blau',
                        product_description: 'LED blau Beleuchtung',
                        handle: 'led-blau',
                        price: '$0.00'
                    },
                    {
                        product_id: 'rgb-fernbedienung',
                        product_title: 'RGB mit Fernbedienung',
                        product_description: 'RGB Beleuchtung mit Fernbedienung',
                        handle: 'rgb-fernbedienung',
                        price: '$0.00'
                    }
                ]
            }
        }
    },
};

/*
Types:

descriptive             -> used in "Series", shows as tabs with description and title
pills                   -> shows as pills with title, single select
single-select           -> only allowed to choose one option
dropdown                -> allows to choose one option from a dropdown
multiselect-with-none   -> allows to choose multiple options, except in none
checkbox                -> allows to choose multiple options as checkbox
cart-property           -> added to cart as a property (used in size)

*/

module.exports = matrix;
