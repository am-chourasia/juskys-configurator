// Example current_state:
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
          id: 'farbe-cord-silbergrau',
          handle: 'farbe-cord-silbergrau',
          title: 'Cord  - Silbergrau',
          product_id: 8953982681323,
          price: '€99,99'
        },
      ],
      selection: {
        cord: [ 'farbe-cord-silbergrau' ],
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

// Example exclusion_matrix
const exclusion_matrix = {
  series: { default: [ 'kollektion-deluxe', 'kollektion-first-class' ] },
  storage: {
    default: [
      'stauraum-durchgangige-schubladen',
      'stauraum-geteilte-schubladen',
      'stauraum-hochklappbarer-bettkasten'
    ]
  },
  material: {
    'feiner-stoff': [],
    samt: [],
    cord: [],
    boucle: [],
    'grober-stoff': [],
    kunstleder: []
  },
  headrest: {
    height: [],
    model: [
      'kopfteil-modell-versailles',
      'kopfteil-modell-palais',
      'kopfteil-modell-chateau'
    ]
  },
  foot_style: {
    default: [ 'fussteil-tv-lift-salon', 'fussteil-tv-lift-versailles' ]
  },
  feet: { height: [], type: [] },
  upgrades: {
    'beleuchtung-kopfteil': [ 'beleuchtung-kopfteil-vorne' ],
    'beleuchtung-box': [
      'beleuchtung-box-led-seite',
      'beleuchtung-box-led-unterboden',
      'beleuchtung-box-led-fussteil'
    ]
  },
  extras: {
    'rueckseite-stofffarbe': [],
    'usb-anschluesse': [],
    'beleuchtungs-farbe': []
  }
}

// Example image_parts:
const image_parts = [
  'headrest___size__width_breite-100-cm___headrest__model_kopfteil-modell-louvre___headrest__height_kopfteil-hohe-115-cm___material__feiner-stoff_farbe-feiner-stoff-blossom.png',
  'foot_style___size__width_breite-100-cm___foot_style__default_fussteil-kein-fussteil___feet__height_fusshohe-10-cm___material__feiner-stoff_farbe-feiner-stoff-blossom.png',
  'storage___size__width_breite-100-cm___storage__default_stauraum-durchgangige-schubladen___feet__height_fusshohe-10-cm___material__feiner-stoff_farbe-feiner-stoff-blossom.png',
  'feet___size__width_breite-100-cm___feet__height_fusshohe-10-cm___feet__type_fusse-industrial-massivholz-schwarz.png',
  'mattress___.png',
  'topper___size__width_breite-100-cm.png',
  'lighting-headboard___size__width_breite-100-cm___upgrades__beleuchtung-kopfteil_beleuchtung-kopfteil-hinten___extras__beleuchtungs-farbe_beleuchtungs-farbe-led-weiss.png',
  'lighting-box___size__width_breite-100-cm___upgrades__beleuchtung-box_beleuchtung-box-keine___extras__beleuchtungs-farbe_beleuchtungs-farbe-led-weiss.png'
]