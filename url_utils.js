// URL utility functions for the bed configurator
// These functions handle creating and parsing URLs for the current state

import { current_state } from './current_selection.js';

/**
 * Creates a URL with query parameters representing the current state
 * @param {Object} currentState - The current state object
 * @returns {string} - The URL with query parameters
 */
export function makeUrl(currentState) {
    const url = new URL('https://localhost:3000/');

    Object.keys(currentState).forEach(key => {
        const selection = currentState[key].selection;
        Object.entries(selection).forEach(([tab, items]) => {
            if (items.length === 0) return; // not adding empty selection
            const selectedItems = items.join(',');
            url.searchParams.append(`${key}[${tab}]`, selectedItems);
        });
    });

    return url.toString();
}

/**
 * Parses a URL and converts it back to a state object
 * @param {string} url - The URL to parse
 * @returns {Object} - The parsed state object
 */
export function parseUrlToState(url) {
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

/**
 * Creates a URL for the current state
 * @returns {string} - The URL with current state as query parameters
 */
export function getCurrentStateUrl() {
    return makeUrl(current_state);
}

/**
 * Updates the current state based on a URL
 * @param {string} url - The URL containing the state
 * @returns {Object} - The updated state
 */
export function updateStateFromUrl(url) {
    return parseUrlToState(url);
}