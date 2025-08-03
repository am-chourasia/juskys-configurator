// if a query param is present -> show a loader and initialise with the query param values
// if not, initialise with the default values for each series.

/* Uses:
1. ATC
2. Checkout Info Last tab
3. Save your design -> Customer Metafield
4. Adding products through URL
5. Exclusion

6. Default Current State for each series.
*/


/*
Types:

product     -> product list that will be added to cart
property    -> propery that will be added to cart
placeholder -> shows the selection in the frontend, only for representation purposes
*/

// The current state is used to add the products to the cart
// AND
// Show the current selection in the frontend

/* Todo:
1. current state ko banana
2. checkout last stage UI through current state
3. ATC -> current state
*/


const current_state = {
    series: {
        products: [
            {
                id: 'komfort',
                handle: 'komfort',
                title: 'Komfort',
            }
        ],
        selection: {
            // tab : product-handle
            default: ['komfort'],
        }
    },
    size: {
        products: [
            {
                id: 'width-120',
                handle: '120cm',
                title: '120cm',
            },
            {
                id: 'length-200',
                handle: '200cm',
                title: '200cm',
            }
        ],
        selection: {
            // tab : selected
            width: ['120cm'],
            length: ['200cm']
        }
    },
    headrest: {
        products: [
            {
                id: 'matisse',
                handle: 'matisse',
                title: 'Matisse',
            },
            {
                id: 'height-120',
                handle: '120cm',
                title: '120cm',
            }
        ],
        selection: {
            // tab : product-handle
            model: ['matisse'],
            height: ['120cm'],
        }
    },
    storage: {
        products: [
            {
                id: 'kein-stauraum',
                handle: 'kein-stauraum',
                title: 'Kein Stauraum',
            }
        ],
        selection: {
            // tab : product-handle
            default: ['kein-stauraum'],
        }
    },
    foot_style: {
        products: [
            {
                id: 'opera',
                handle: 'opera',
                title: 'Opéra',
            }
        ],
        selection: {
            // tab : product-handle
            default: ['opera'],
        }
    },
    feet: {
        products: [
            {
                id: 'mit-fuesse',
                handle: 'mit-fuesse',
                title: 'Mit Füßen',
            },
            {
                id: 'schwebend',
                handle: 'schwebend',
                title: 'Schwebend',
            },
            {
                id: 'fusshoehe-15',
                handle: '15cm',
                title: '15cm',
            }
        ],
        selection: {
            // tab : product-handle
            type: ['mit-fuesse'],
            model: ['schwebend'],
            height: ['15cm'],
        }
    },
    material: {
        products: [
            {
                id: 'cord-farbe-1',
                handle: 'cord-farbe-1',
                title: 'Cord Farbe 1',
            }
        ],
        selection: {
            // tab : product-handle
            cord: ['cord-farbe-1'],
        }
    },
    mattress: {
        products: [
            {
                id: 'h3-zwei',
                handle: 'h3-zwei',
                title: 'H3',
            }
        ],
        selection: {
            // tab : product-handle
            'zwei-separate-matratzen': ['h3-zwei'],
        }
    },
    topper: {
        products: [
            {
                id: 'komfortschaum-topper',
                handle: 'komfortschaum-topper',
                title: 'Komfortschaum-Topper (6 cm)',
            }
        ],
        selection: {
            // tab : product-handle
            default: ['komfortschaum-topper'],
        }
    },
    upgrades: {
        products: [
            {
                id: 'hinten',
                handle: 'hinten',
                title: 'Hinten',
            },
            {
                id: 'led-front',
                handle: 'led-front',
                title: 'LED Front',
            }
        ],
        selection: {
            // tab : product-handle
            'beleuchtung-kopfteil': ['hinten'],
            'beleuchtung-box': ['led-front'],
        }
    },
    extras: {
        products: [
            {
                id: 'rueckseite-stofffarbe',
                handle: 'rueckseite-stofffarbe',
                title: 'Rückseite mit Stofffarbe bezogen',
            },
            {
                id: 'led-weiss',
                handle: 'led-weiss',
                title: 'LED weiß',
            }
        ],
        selection: {
            // tab : product-handle
            'rueckseite-stofffarbe': [],
            'beleuchtungs-farbe': ['led-weiss'],
        }
    },
}


/*
URL to be used in:
- changing url with every selection in the frontend (change in current state)
- Loading default selection from each series
- loading predefined selections
- saving the state somewhere (cusomter saves the design) or linking it in the website
- passing to checkout for the team to understand the selections visually
*/


// MAKING URL:

const exampleUrl = new URL('https://example.com/selection');

Object.keys(current_state).forEach(key => {
    const selection = current_state[key].selection;
    Object.entries(selection).forEach(([tab, items]) => {
        if (items.length === 0) return; // not adding empty selection
        const selectedItems = items.join(',');
        exampleUrl.searchParams.append(`${key}[${tab}]`, selectedItems);
    });
});

console.log(exampleUrl.toString());

// PARSING URL:

function parseUrlToState(url) {
    const urlObj = new URL(url);
    const newState = {};

    urlObj.searchParams.forEach((value, key) => {
        const [option, tab] = key.split('[');
        const cleanTab = tab.slice(0, -1); // Remove the trailing ']'
        if (!newState[option]) {
            newState[option] = { selection: {} };
        }
        newState[option].selection[cleanTab] = value.split(',');
    });

    return newState;
}

console.log();
console.log(JSON.stringify(parseUrlToState(exampleUrl.toString()), null, 2));