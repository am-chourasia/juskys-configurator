import { parseUrlToState } from './url_utils.js';
import { generateExclusionMatrix } from './exclusion.js';
import { getImagesFromCurrentState } from './dependency.js';
import fs from 'fs';
import path from 'path';

/**
 * Main function to process a URL and generate output
 * @param {string} url - The URL containing the current state
 * @returns {Object} - The processed data including current state, exclusion matrix, and image parts
 */
function processUrl(url) {
    try {
        // Parse the URL to get current state
        const currentState = parseUrlToState(url);

        // Generate exclusion matrix based on current state
        const exclusionMatrix = generateExclusionMatrix(currentState);

        // Get image parts based on current state
        const imageParts = getImagesFromCurrentState(currentState);

        return {
            inputUrl: url,
            currentState: currentState,
            exclusionMatrix: exclusionMatrix,
            imageParts: imageParts,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error processing URL:', error.message);
        throw error;
    }
}

/**
 * Save data to a JSON output file
 * @param {Object} data - The data to save
 * @param {string} outputPath - The path for the output file
 */
function saveToFile(data, outputPath = './output.json') {
    try {
        // Create output directory if it doesn't exist
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write data to file
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Output saved to: ${outputPath}`);
    } catch (error) {
        console.error('Error saving to file:', error.message);
        throw error;
    }
}

/**
 * Main execution function
 * @param {string} url - The URL to process (can be changed each time)
 */
function main(url) {
    if (!url) {
        console.error('Please provide a URL as an argument');
        console.log('Usage: node index.js "https://example.com?param=value"');
        return;
    }

    try {
        console.log('Processing URL:', url);

        // Process the URL
        const result = processUrl(url);

        // Generate output filename with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputPath = `./output/url_analysis_${timestamp}.json`;
        // Save to file
        saveToFile(result, outputPath);
        console.log('Processing completed successfully!');

    } catch (error) {
        console.error('Failed to process URL:', error.message);
        process.exit(1);
    }
}

// Check if running directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
    // Get URL from command line arguments
    const url = process.argv[2];
    main(url);
}

// Export functions for use in other modules
export {
    processUrl,
    saveToFile,
    main
};
