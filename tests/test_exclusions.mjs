import { generateExclusionMatrix, getExclusionReasons } from '../exclusion.js';
import assert from 'node:assert/strict';

function log(title, data) {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
}

// Helper to build current state skeletons
function state(partial) {
  return {
    series: { selection: { default: [] } },
    size: { selection: { width: [] } },
    storage: { selection: { default: [] } },
    headrest: { selection: { model: [], height: [] } },
    foot_style: { selection: { default: [] } },
    feet: { selection: { type: [], height: [] } },
    material: { selection: { cord: [] } },
    mattress: { selection: { 'zwei-separate-matratzen': [], 'eine-matratze': [] } },
    upgrades: { selection: { 'beleuchtung-kopfteil': [], 'beleuchtung-box': [] } },
    extras: { selection: { 'usb-anschluesse': [], 'beleuchtungs-farbe': [] } },
    ...partial,
  };
}

// Test 1: Storage drawers selected should cause side lighting disable (cause: storage:default)
{
  const cs = state({
    storage: { selection: { default: ['stauraum-durchgangige-schubladen'] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T1 exclusionMatrix.upgrades', matrix.upgrades);
  const reasons = getExclusionReasons('upgrades', 'beleuchtung-box', cs);
  log('T1 reasons for upgrades:beleuchtung-box', reasons);
}

// Test 2: USB not possible with width 90–120 (cause: size:width)
{
  const cs = state({
    size: { selection: { width: ['breite-100-cm'] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T2 exclusionMatrix.extras', matrix.extras);
  const reasons = getExclusionReasons('extras', 'usb-anschluesse', cs);
  log('T2 reasons for extras:usb-anschluesse', reasons);
}

// Test 3: Headboard front lighting only with Versailles/Louvre/Maison; pick Belleville (cause: headrest:model)
{
  const cs = state({
    headrest: { selection: { model: ['kopfteil-modell-belleville'], height: [] } },
    upgrades: { selection: { 'beleuchtung-kopfteil': ['beleuchtung-kopfteil-vorne'], 'beleuchtung-box': [] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T3 exclusionMatrix.upgrades', matrix.upgrades);
  const reasons = getExclusionReasons('upgrades', 'beleuchtung-kopfteil', cs);
  log('T3 reasons for upgrades:beleuchtung-kopfteil', reasons);
}

// Test 4: Underbody lighting only with feet; pick without feet (cause: feet:type)
{
  const cs = state({
    feet: { selection: { type: ['fusse-ohne-fusse'], height: [] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T4 exclusionMatrix.upgrades', matrix.upgrades);
  const reasons = getExclusionReasons('upgrades', 'beleuchtung-box', cs);
  log('T4 reasons for upgrades:beleuchtung-box', reasons);

  // Assert: Underbody lighting is disabled when feet are 'none'
  assert(matrix.upgrades['beleuchtung-box'].includes('beleuchtung-box-led-unterboden'));
}

// Test 5: Mattress reciprocals - two separate mattresses selected should disable widths < 120 (cause: mattress:zwei-separate-matratzen)
{
  const cs = state({
    mattress: { selection: { 'zwei-separate-matratzen': ['hartegrad-matratze-1-h2'], 'eine-matratze': [] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T5 exclusionMatrix.size', matrix.size);
  const reasons = getExclusionReasons('size', 'width', cs);
  log('T5 reasons for size:width', reasons);

  // Assert: Only widths below 120 are disabled; 120 cm is allowed
  assert(matrix.size.width.includes('breite-80-cm'));
  assert(matrix.size.width.includes('breite-90-cm'));
  assert(matrix.size.width.includes('breite-100-cm'));
  assert(!matrix.size.width.includes('breite-120-cm'));
}

// Test 6: Feet present should disable certain footboards (uses not_in on 'fusse-ohne-fusse')
{
  const cs = state({
    feet: { selection: { type: ['fusse-industrial-massivholz-schwarz'], height: [] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T6 exclusionMatrix.foot_style', matrix.foot_style);
  const t6Reasons = getExclusionReasons('foot_style', 'default', cs);
  log('T6 reasons for foot_style:default', t6Reasons);

  // Assert: reasons exist for disabled footboards
  assert(t6Reasons && t6Reasons.reasons && t6Reasons.reasons.length > 0);

  // Assert: TV Lift Salon and Versailles footboards are disabled when feet are present
  assert(matrix.foot_style.default.includes('fussteil-tv-lift-salon'));
  assert(matrix.foot_style.default.includes('fussteil-tv-lift-versailles'));
}

// Test 7: Lighting 'none' disables lighting color selection
{
  const cs = state({
    upgrades: { selection: { 'beleuchtung-kopfteil': ['beleuchtung-kopfteil-keine'], 'beleuchtung-box': ['beleuchtung-box-keine'] } },
  });
  const matrix = generateExclusionMatrix(cs);
  log('T7 exclusionMatrix.extras', matrix.extras);
  const t7Reasons = getExclusionReasons('extras', 'beleuchtungs-farbe', cs);
  log('T7 reasons for extras:beleuchtungs-farbe', t7Reasons);

  // Assert: Lighting color RGB is disabled when any lighting selection is 'none'
  assert(matrix.extras['beleuchtungs-farbe'].includes('beleuchtungs-farbe-rgb-mit-fernbedienung'));
  // Assert: reasons exist for disabled lighting color
  assert(t7Reasons && t7Reasons.reasons && t7Reasons.reasons.length > 0);
}


