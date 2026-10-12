export type SeriesId = 'color' | 'edge';
export type ModuleId = '2M' | '3M' | '4M' | '6M' | '8M' | '12M';
export type MaterialId = 'glass' | 'acrylic';
export type ConnectivityId = 'wifi' | 'zigbee';
export type ProductKind = 'switch' | 'socket' | 'fan' | 'curtain' | 'scene' | 'dimmer' | 'usb' | 'doorbell';

/** List prices as [wifi glass, wifi acrylic, zigbee glass, zigbee acrylic]. 0 = not offered. */
export type PriceSet = readonly [number, number, number, number];

/** One row of the generated data file (src/content/catalog/products.data.ts). */
export interface CatalogRow {
  id: string;
  module: ModuleId;
  label: string;
  color?: PriceSet;
  edge?: PriceSet;
}

export interface SeriesOffer {
  prices: PriceSet;
  materials: MaterialId[];
  connectivity: ConnectivityId[];
  /** Public path of the product render. */
  image: string;
  /** Pixel size of the render. */
  size: readonly [number, number];
}

export interface CatalogProduct {
  id: string;
  module: ModuleId;
  /** Label as written in the price list. */
  label: string;
  /** Readable name, e.g. "4 switches + 1 fan control". */
  title: string;
  kinds: ProductKind[];
  counts: { switches: number; sockets: number; fans: number; dimmers: number };
  /** Set when two products share the same label (e.g. two 6A socket styles). */
  variant?: string;
  series: Partial<Record<SeriesId, SeriesOffer>>;
  /** Lower-case text used by the catalogue search box. */
  searchText: string;
}
