// Import the matrix data
import matrix from './matrix.js';

// Transform matrix data to current_state format
const transformMatrixToCurrentState = () => {
    const transformed = {};

    Object.keys(matrix).forEach(category => {
        const categoryData = matrix[category];
        transformed[category] = {
            products: [],
            selection: {}
        };

        // Set default selections based on first available product in each tab
        Object.keys(categoryData.tabs).forEach(tab => {
            const tabData = categoryData.tabs[tab];
            if (tabData.products.length > 0) {
                const firstProduct = tabData.products[0];
                transformed[category].selection[tab] = [firstProduct.handle];
            }
        });

        // Now populate products array with ONLY the selected products
        Object.keys(transformed[category].selection).forEach(tab => {
            const selectedHandles = transformed[category].selection[tab];
            selectedHandles.forEach(handle => {
                // Find the product details from the matrix
                Object.keys(categoryData.tabs).forEach(matrixTab => {
                    const tabData = categoryData.tabs[matrixTab];
                    const product = tabData.products.find(p => p.handle === handle);
                    if (product) {
                        transformed[category].products.push({
                            id: product.handle,
                            handle: product.handle,
                            title: product.product_title.split(': ').pop() || product.product_title,
                            product_id: product.product_id,
                            price: product.price
                        });
                    }
                });
            });
        });
    });

    return transformed;
};

export const current_state = transformMatrixToCurrentState();

// Exampl current_state:
const example_current_state = {
    series: {
      products: [
        {
          id: 'bettboutique-kollektion-komfort',
          handle: 'bettboutique-kollektion-komfort',
          title: 'Komfort',
          product_id: 8953654575339,
          price: '€99,99'
        }
      ],
      selection: { default: [ 'bettboutique-kollektion-komfort' ] }
    },
    size: {
      products: [
        {
          id: 'lange-180-cm',
          handle: 'lange-180-cm',
          title: '180 cm',
          product_id: 8953977635051,
          price: '€139,00'
        },
        {
          id: 'breite-100-cm',
          handle: 'breite-100-cm',
          title: '100 cm',
          product_id: 8953975439595,
          price: '€179,99'
        }
      ],
      selection: { length: [ 'lange-180-cm' ], width: [ 'breite-100-cm' ] }
    },
    headrest: {
      products: [
        {
          id: 'kopfteil-hohe-115-cm',
          handle: 'kopfteil-hohe-115-cm',
          title: '115 cm',
          product_id: 8953978323179,
          price: '€99,99'
        },
        {
          id: 'kopfteil-modell-louvre',
          handle: 'kopfteil-modell-louvre',
          title: ' Louvre',
          product_id: 8953977962731,
          price: '€99,99'
        }
      ],
      selection: {
        height: [ 'kopfteil-hohe-115-cm' ],
        model: [ 'kopfteil-modell-louvre' ]
      }
    },
    storage: {
      products: [
        {
          id: 'stauraum-durchgangige-schubladen',
          handle: 'stauraum-durchgangige-schubladen',
          title: 'Durchgängige Schubladen',
          product_id: 8953978978539,
          price: '€99,99'
        }
      ],
      selection: { default: [ 'stauraum-durchgangige-schubladen' ] }
    },
    foot_style: {
      products: [
        {
          id: 'fussteil-kein-fussteil',
          handle: 'fussteil-kein-fussteil',
          title: 'Kein Fußteil',
          product_id: 8953979306219,
          price: '€99,99'
        }
      ],
      selection: { default: [ 'fussteil-kein-fussteil' ] }
    },
    material: {
      products: [
        {
          id: 'farbe-feiner-stoff-blossom',
          handle: 'farbe-feiner-stoff-blossom',
          title: 'Feiner Stoff - Blossom',
          product_id: 8953980027115,
          price: '€99,99'
        },
        {
          id: 'farbe-samt-altrosa',
          handle: 'farbe-samt-altrosa',
          title: 'Samt - Altrosa',
          product_id: 8953980911851,
          price: '€99,99'
        },
        {
          id: 'farbe-cord-silbergrau',
          handle: 'farbe-cord-silbergrau',
          title: 'Cord  - Silbergrau',
          product_id: 8953982681323,
          price: '€99,99'
        },
        {
          id: 'farbe-boucle-apricot',
          handle: 'farbe-boucle-apricot',
          title: 'Bouclé - Apricot',
          product_id: 8953983828203,
          price: '€99,99'
        },
        {
          id: 'farbe-grober-stoff-waldgrun',
          handle: 'farbe-grober-stoff-waldgrun',
          title: 'Grober Stoff - Waldgrün',
          product_id: 8953981698283,
          price: '€99,99'
        },
        {
          id: 'farbe-kunstleder-schiefer',
          handle: 'farbe-kunstleder-schiefer',
          title: 'Kunstleder - Schiefer',
          product_id: 8953983500523,
          price: '€99,99'
        }
      ],
      selection: {
        'feiner-stoff': [ 'farbe-feiner-stoff-blossom' ],
        samt: [ 'farbe-samt-altrosa' ],
        cord: [ 'farbe-cord-silbergrau' ],
        boucle: [ 'farbe-boucle-apricot' ],
        'grober-stoff': [ 'farbe-grober-stoff-waldgrun' ],
        kunstleder: [ 'farbe-kunstleder-schiefer' ]
      }
    },
    topper: {
      products: [
        {
          id: 'topper-kaltschaum-topper-8-cm',
          handle: 'topper-kaltschaum-topper-8-cm',
          title: 'Kaltschaum-Topper (8 cm)',
          product_id: 8953985106155,
          price: '€99,99'
        }
      ],
      selection: { default: [ 'topper-kaltschaum-topper-8-cm' ] }
    },
    upgrades: {
      products: [
        {
          id: 'beleuchtung-kopfteil-hinten',
          handle: 'beleuchtung-kopfteil-hinten',
          title: 'Hinten',
          product_id: 8953985401067,
          price: '€99,99'
        },
        {
          id: 'beleuchtung-box-keine',
          handle: 'beleuchtung-box-keine',
          title: 'Keine',
          product_id: 8953985564907,
          price: '€99,99'
        }
      ],
      selection: {
        'beleuchtung-kopfteil': [ 'beleuchtung-kopfteil-hinten' ],
        'beleuchtung-box': [ 'beleuchtung-box-keine' ]
      }
    },
    extras: {
      products: [
        {
          id: 'upgrades-ruckseite-mit-mobelstoff-bezogen',
          handle: 'upgrades-ruckseite-mit-mobelstoff-bezogen',
          title: 'Rückseite mit Möbelstoff bezogen',
          product_id: 8953986023659,
          price: '€99,99'
        },
        {
          id: 'upgrades-usb-anschlusse-am-kopfteil',
          handle: 'upgrades-usb-anschlusse-am-kopfteil',
          title: 'USB-Anschlüsse am Kopfteil',
          product_id: 8953986089195,
          price: '€99,99'
        },
        {
          id: 'beleuchtungs-farbe-led-weiss',
          handle: 'beleuchtungs-farbe-led-weiss',
          title: 'LED weiß',
          product_id: 8953986187499,
          price: '€99,99'
        }
      ],
      selection: {
        'rueckseite-stofffarbe': [ 'upgrades-ruckseite-mit-mobelstoff-bezogen' ],
        'usb-anschluesse': [ 'upgrades-usb-anschlusse-am-kopfteil' ],
        'beleuchtungs-farbe': [ 'beleuchtungs-farbe-led-weiss' ]
      }
    },
    feet: {
      products: [
        {
          id: 'fusshohe-10-cm',
          handle: 'fusshohe-10-cm',
          title: '10 cm',
          product_id: 8978315247851,
          price: '€99,99'
        },
        {
          id: 'fusse-industrial-massivholz-schwarz',
          handle: 'fusse-industrial-massivholz-schwarz',
          title: 'Industrial – Massivholz Schwarz',
          product_id: 8978315542763,
          price: '€99,99'
        }
      ],
      selection: {
        height: [ 'fusshohe-10-cm' ],
        type: [ 'fusse-industrial-massivholz-schwarz' ]
      }
    }
  }

/*
URL utilities have been moved to url_utils.js
Import and use the functions from there:
- makeUrl(currentState) - creates URL from state
- parseUrlToState(url) - parses URL back to state
- getCurrentStateUrl() - gets URL for current state
- updateStateFromUrl(url) - updates state from URL
*/