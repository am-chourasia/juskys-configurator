

const exclusion_principles = [
    {
        compare: [
            {
                key: 'series',
                relation: 'not_in',
                values: ['komfort'],
            }, // always joined by AND logic
        ],
        exclude: [
            {
                key: 'storage',
                tab: 'default',
                value: ['product_handle1', 'product_handle2']
            }
        ]
    },
    {
        compare: [
            {
                key: 'Storage',
                relation: 'in',
                values: ['product_handle1', 'product_handle2'],
            }, // always joined by AND logic
        ],
        exclude: [
            {
                key: 'feet',
                tab: 'default',
                value: ['ohne Füße']
            }
        ]
    },
    {
        compare_to: 'size',
        property: 'height',
        exclude: ['foot']
    }
]

/*

Stauraum:	in
        Durchgängige Schubladen
		Geteilte Schubladen
        Hochklappbarer Bettkasten
    exclude:
        Feet: everything but 'No Feet' -> will have to list all other feet

Headboard:	in
        1, 4, 7
    exclude:
        Material: All Cord option is blocked

Fußteil:	in
        TV Lift Versailles,
        Louvre
    exclude:
        Material: All Cord option is blocked



*/