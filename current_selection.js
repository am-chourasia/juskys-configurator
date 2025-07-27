// if a query param is present -> show a loader and initialise with the query param values
// if not, initialise with the default values for each series.

/*
Types:

product     -> product list that will be added to cart
property    -> propery that will be added to cart
placeholder -> shows the selection in the frontend, only for representation purposes
*/

// The current state is used to add the products to the cart
// AND
// Show the current selection in the frontend

const current_state = {
    series: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                handle: 'komfort',
                title: 'Komfort',
            }
        ],
        selection: {
            // tab : products
            default: ['product-handle'],
        }
    },
    size: {
        type: 'property',
        properties: {
            height: '100cm',
            width: '120cm'
        },
        products: [],
        selection: {
            // tab : selected
            height: '120cm',
            width: '100cm'
        }
    },
    headrest: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                handle: 'matisse',
                title: 'Matisse',
            },
            {
                id: 123,
                title: '100cm',
            }
        ],
        selection: {
            // tab : products
            default: ['product-handle'],
            height: ['100cm'],
        }
    },
    storage: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: 'None',
            }
        ],
        selection: {
            // tab : products
            default: ['product-handle'],
        }
    },
    foot_style: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: 'Opéra',
            }
        ],
        selection: {
            // tab : products
            default: ['product-handle'],
        }
    },
    material: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: 'Cord Feiner Stoff',
            }
        ],
        selection: {
            // tab : products
            cord: ['product-handle'],
        }
    },
    foot: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: 'Foot Style 1',
            },
            {
                id: 123,
                title: '120ccm',
            }
        ],
        selection: {
            // tab : products
            default: ['product-handle'],
            foot_height: ['120cm'],
        }
    },
    mattress: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: '2 getrennte Matratzen',
            }
        ],
        selection: {
            // tab : products
            farbe: ['product-handle'],
        }
    },
    upgrades: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: 'Beleuchtung Kopfteil',
            },
            {
                id: 123,
                title: 'Beleuchtung Box',
            }
        ],
        selection: {
            // tab : products
            beleuchtung: ['product-handle', 'product-handle'],
        }
    },
    extras: {
        type: 'product',
        properties: {},
        products: [
            {
                id: 123,
                title: 'Beleuchtung Kopfteil',
            },
        ],
        selection: {
            // tab : products
            default: ['product-handle'],
        }
    },
}