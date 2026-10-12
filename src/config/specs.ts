/**
 * PRODUCT SPECS — every product number used in copy lives here, once.
 *
 * ALL VALUES ARE PROVISIONAL (pending engineering lab confirmation and national
 * electrical code listings). Never present them as certified. Content files
 * interpolate from `SPEC` so a change here updates every page, FAQ answer and table.
 * See docs/requirements.md §2.2.
 */
export const PRODUCT_SPECS = {
  voltage: '110V – 240V AC, 50/60Hz',
  loadPerGang: '10A resistive',
  boxDepthMm: 35,
  temperature: '-10°C to +45°C',
  humidity: '5–90% RH non-condensing',
  neutral: 'Required for standard models',
  warrantyMonths: 24,
  connectivity: 'Wi-Fi 2.4 GHz + Bluetooth LE pairing; Matter readiness',
} as const;

/** Ready-to-print strings derived from PRODUCT_SPECS. */
export const SPEC = {
  ...PRODUCT_SPECS,
  boxDepth: `${PRODUCT_SPECS.boxDepthMm} mm`,
  warranty: `${PRODUCT_SPECS.warrantyMonths} months`,
  operatingRange: `${PRODUCT_SPECS.temperature}, ${PRODUCT_SPECS.humidity}`,
} as const;
