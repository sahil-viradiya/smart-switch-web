export type GangVariant = '1_GANG' | '2_GANG' | '3_GANG' | 'DIMMER';

export type FinishColor = 'MATTE_CHARCOAL' | 'ARCHITECTURAL_WHITE' | 'BRUSHED_ALUMINUM';

export interface ProductVariant {
  id: GangVariant;
  name: string;
  tagline: string;
  gangs: number;
  dimensions: {
    widthMm: number;
    heightMm: number;
    depthWallMm: number;
    depthCavityMm: number;
  };
  supportedLoads: string[];
  maxCurrentAmps: number;
  voltageRange: string;
  requiresNeutral: boolean;
  colors: {
    id: FinishColor;
    name: string;
    hex: string;
  }[];
}

export interface ProductSpecification {
  category: string;
  items: {
    label: string;
    value: string;
    verified: boolean;
    note?: string;
  }[];
}
