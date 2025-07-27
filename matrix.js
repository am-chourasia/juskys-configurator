const matrix = {
    series: {
        display_name: 'Kollektion',
        orientation: 'normal', // when no tabs need to be shown, use this orientation
        next_button: 'Weiter zur Größe ',
        tabs: {
            default: {
                display_name: '', // no tabs will be shown
                type: 'single-select',
            }
        },
        products: {
            default: [
                {
                    product_id: '1311',
                    product_title: 'Komfort',
                    product_description: 'this is a sample desc',
                    handle: 'komfort',
                    price: '$23.00'
                },
                {
                    product_id: '1312',
                    product_title: 'Deluxe',
                    product_description: 'this is a sample desc',
                    handle: 'deluxe',
                    price: '$23.00'
                },
                {
                    product_id: '1313',
                    product_title: 'First Class',
                    product_description: 'this is a sample desc',
                    handle: 'first-class',
                    price: '$23.00'
                },
            ]
        }
    },
    storage: {
        display_name: 'German_name',
        orientation: 'normal', // when no tabs need to be shown, use this orientation
        next_button: 'Proceed to Material',
        tabs: {
            default: {
                display_name: '', // no tabs will be shown
                type: 'single-select',
            }
        },
        products: {
            default: [
                {
                    product_id: '1312',
                    product_title: 'None',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                {
                    product_id: '1313',
                    product_title: 'adfasdf',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
            ]
        }
    },
    material: {
        display_name: 'German_name',
        orientation: 'horizontal',
        next_step: 'Choose Topper',
        next_button: 'Proceed to Mattress',
        tabs: {
            'cordFeiner-stoff': {
                display_name: 'Cord Feiner Stoff',
                type: 'single-select',
            },
            'cord': {
                display_name: 'Cord',
                type: 'single-select',
            },
            // ...
        },
        products: {
            'cordFeiner-stoff': [
                {
                    product_id: '1312',
                    product_title: 'None',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                // ...
            ],
            'cord': [
                {
                    product_id: '1312',
                    product_title: 'None',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                }
                // ...
            ],
            // ...
        }
    },
    mattress: {
        display_name: 'German_name',
        orientation: 'horizontal',
        next_button: 'Proceed to Upgrades',
        tabs: {
            '2-getrennte-matratzen': {
                display_name: '2 getrennte Matratzen',
                type: 'dropdown', // shown as dropdown with single select
            },
            '1-getrennte-matratzen': {
                display_name: '1 getrennte Matratzen',
                type: 'dropdown',
            },
        },
        products: {
            '2-getrennte-matratzen': [
                {
                    product_id: '1312',
                }
                // all the thicknesses will be shown here
            ],
            '1-getrennte-matratzen': [
                {
                    product_id: '1312',
                }
                // only the thickness of first matratze will be shown here
            ],
        }
    },
    upgrades: {
        display_name: 'German_name',
        orientation: 'vertical',
        next_button: 'Proceed to Extras',
        tabs: {
            'beleuchtung-kopfteil': {
                display_name: 'Beleuchtung Kopfteil',
                type: 'multiselect-with-none', // None option behaves differently than multiselect
            },
            'beleuchtung-box': {
                display_name: 'Beleuchtung Box',
                type: 'multiselect-with-none',
            },
        },
        products: {
            'beleuchtung-kopfteil': [
                {
                    product_id: '1312',
                    product_title: 'None',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                {
                    product_id: '1313',
                    product_title: 'adfasdf',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                // ...
            ],
            'beleuchtung-box': [
                {
                    product_id: '1312',
                    product_title: 'adfasdf',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                // ...
            ]
        }
    },
    extras: {
        display_name: 'German_name',
        orientation: 'vertical',
        next_button: 'Complete Selection',
        tabs: {
            checkboxes: {
                display_name: '',
                type: 'checkbox', // displayed as checkboxes with multiselect functionality
            },
            lightning_color: {
                display_name: 'Beleuchtungsfarbe',
                type: 'single-select', // only allowed to choose one option
            }
        },
        products: {
            checkboxes: [
                {
                    product_id: '1312',
                    product_title: 'adfasdf',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                {
                    product_id: '1313',
                    product_title: 'adfasdf',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
            ],
            lightning: [
                {
                    product_id: '1312',
                    product_title: 'adfasdf',
                    product_description: 'this is a sample desc',
                    handle: 'adfasdf',
                    price: '$23.00'
                },
                //...
            ]
        }
    },
}


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