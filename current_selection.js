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