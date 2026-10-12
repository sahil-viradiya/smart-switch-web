/**
 * PRODUCT FACTS - numbers and short statements used in copy, in one place.
 *
 * Source: the 2026 product price lists supplied by the owner. Anything the price lists do not
 * state (electrical supply range, dimensions in millimetres, certifications) is listed in
 * UNPUBLISHED_SPECS and shown as "to be confirmed" - never guessed.
 */
export const PRODUCT_SPECS = {
  warrantyYears: 10,
  ratings: '6A and 16A',
  moduleSizes: '2M, 3M, 4M, 6M, 8M and 12M',
  panels: 'glass or acrylic',
} as const;

export const SPEC = {
  ...PRODUCT_SPECS,
  warranty: `${PRODUCT_SPECS.warrantyYears} years`,
  /** For running text: "a 10-year warranty". */
  warrantyTerm: `${PRODUCT_SPECS.warrantyYears}-year`,
} as const;

/** Things we have not published. Shown on the product page as "To be confirmed". */
export const UNPUBLISHED_SPECS = [
  { label: 'Supply voltage range', value: 'To be confirmed' },
  { label: 'Dimensions in millimetres', value: 'Available on request' },
  { label: 'Certifications', value: 'None claimed yet' },
] as const;
