import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { matrix } from './matrix.js';
import { image_parts, image_dependencies } from './dependency.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
// CLI helpers
// -----------------------------

function parseCliArgs(argv) {
  // Default limit to 100 so running without flags creates 100 images per part
  const args = { parts: image_parts.slice(), outDir: 'output', filters: {}, limit: 100, dry: false };

  for (const token of argv.slice(2)) {
    if (token.startsWith('--parts=')) {
      const list = token.split('=')[1];
      args.parts = list.split(',').map(s => s.trim()).filter(Boolean);
    } else if (token.startsWith('--outDir=')) {
      args.outDir = token.split('=')[1];
    } else if (token.startsWith('--filter=') || token.startsWith('--only=')) {
      const expr = token.split('=')[1];
      addFilter(args.filters, expr);
    } else if (token.startsWith('--limit=')) {
      const n = Number(token.split('=')[1]);
      if (!Number.isNaN(n) && n > 0) args.limit = n;
    } else if (token === '--dry') {
      args.dry = true;
    }
  }
  return args;
}

function addFilter(filterMap, expr) {
  // Format: topic.tab=value1,value2 or topic.tab=value+value
  // Multiple --filter can be passed
  const [left, right] = expr.split('=');
  if (!left || !right) return;
  const [topic, tab] = left.split('.');
  if (!topic || !tab) return;
  const key = `${topic}:${tab}`;
  filterMap[key] = right.split(',').map(v => v.trim()).filter(Boolean);
}

// -----------------------------
// Matrix helpers
// -----------------------------

function getProductsForTab(topic, tab) {
  const topicData = matrix[topic];
  if (!topicData) return [];
  const tabData = topicData.tabs?.[tab];
  if (!tabData || !Array.isArray(tabData.products)) return [];
  return tabData.products.map(p => p.handle);
}

function isLighting(topic, tab) {
  return topic === 'upgrades' && (tab === 'beleuchtung-kopfteil' || tab === 'beleuchtung-box');
}

function powerSet(array) {
  // Returns all non-empty subsets
  const results = [];
  const n = array.length;
  for (let mask = 1; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) subset.push(array[i]);
    results.push(subset);
  }
  return results;
}

function buildOptionsForDependency(depSpec, filters) {
  // depSpec example: "material:feiner-stoff,samt,cord,boucle,grober-stoff,kunstleder"
  const [topic, tabsCsv] = depSpec.split(':');
  const tabs = tabsCsv.split(',');

  const options = [];

  for (const tab of tabs) {
    const key = `${topic}:${tab}`;
    let handles = getProductsForTab(topic, tab);

    // Special handling for multiselect lighting: generate combinations
    if (isLighting(topic, tab)) {
      const none = handles.find(h => h.endsWith('-keine'));
      const nonNone = handles.filter(h => h !== none);
      const combos = [];
      if (none) combos.push([none]);
      for (const subset of powerSet(nonNone)) combos.push(subset);

      for (const combo of combos) {
        const value = combo.join('+');
        if (filters[key] && !filters[key].some(f => f === value)) continue;
        options.push({ topic, tab, value });
      }
      continue;
    }

    if (filters[key]) {
      handles = handles.filter(h => filters[key].includes(h));
    }

    for (const h of handles) {
      options.push({ topic, tab, value: h });
    }
  }

  return options;
}

function cartesianProduct(arrays) {
  return arrays.reduce((acc, curr) => {
    const next = [];
    for (const a of acc) {
      for (const b of curr) next.push(a.concat([b]));
    }
    return next;
  }, [[]]);
}

function combosForPart(part, filters) {
  const deps = image_dependencies[part] || [];
  if (!deps.length) return [];
  const optionsPerDep = deps.map(d => buildOptionsForDependency(d, filters));
  return cartesianProduct(optionsPerDep);
}

// -----------------------------
// Rendering
// -----------------------------

const CANVAS_SIZE = 1120;
const GRID_COLS = 3;
const GRID_ROWS = 3;
const MARGIN = 64;
const GAP = 48;
const RADIUS = 28;
const STROKE = 5;
const FONT_SIZE = 28;

function cellRect(index) {
  const col = index % GRID_COLS;
  const row = Math.floor(index / GRID_COLS);
  const totalGapX = GAP * (GRID_COLS - 1);
  const totalGapY = GAP * (GRID_ROWS - 1);
  const w = (CANVAS_SIZE - 2 * MARGIN - totalGapX) / GRID_COLS;
  const h = (CANVAS_SIZE - 2 * MARGIN - totalGapY) / GRID_ROWS;
  const x = MARGIN + col * (w + GAP);
  const y = MARGIN + row * (h + GAP);
  return { x, y, w, h };
}

function svgForPart(index, lines) {
  const { x, y, w, h } = cellRect(index);
  const lineHeight = Math.round(FONT_SIZE * 1.35);
  const textX = Math.round(x + 20);
  const textYStart = Math.round(y + 40);

  const textLines = lines
    .map((t, i) => `<text x="${textX}" y="${textYStart + i * lineHeight}" fill="#111" font-size="${FONT_SIZE}" font-family="-apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif">${escapeXml(t)}</text>`) 
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="rgba(0,0,0,0)"/>
  <rect x="${x}" y="${y}" rx="${RADIUS}" ry="${RADIUS}" width="${w}" height="${h}" fill="none" stroke="#111" stroke-width="${STROKE}"/>
  ${textLines}
</svg>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function renderPng(svgString, outPath) {
  const svgBuffer = Buffer.from(svgString);
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
  const img = sharp({ create: { width: CANVAS_SIZE, height: CANVAS_SIZE, channels: 4, background: transparent } });
  await img.composite([{ input: svgBuffer }]).png().toFile(outPath);
}

function filenameFor(part, combo) {
  const segments = combo.map(({ topic, tab, value }) => `${topic}__${tab}_${value}`);
  return `${part}___${segments.join('___')}.png`;
}

function linesFor(combo) {
  return combo.map(({ topic, tab, value }) => `${topic}/${tab}: ${value}`);
}

// -----------------------------
// Main
// -----------------------------

async function main() {
  const args = parseCliArgs(process.argv);

  for (const part of args.parts) {
    const index = image_parts.indexOf(part);
    if (index === -1) {
      console.warn(`Unknown part '${part}', skipping.`);
      continue;
    }

    const combos = combosForPart(part, args.filters);
    const total = args.limit ? Math.min(args.limit, combos.length) : combos.length;
    console.log(`${part}: generating ${total} of ${combos.length} combinations...`);

    const outDir = path.join(__dirname, args.outDir, part);

    for (let i = 0; i < total; i++) {
      const combo = combos[i];
      const file = filenameFor(part, combo);
      const outPath = path.join(outDir, file);
      const svg = svgForPart(index, linesFor(combo));
      if (!args.dry) {
        // eslint-disable-next-line no-await-in-loop
        await renderPng(svg, outPath);
      }
    }
  }

  console.log('Done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


