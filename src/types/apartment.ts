export type LayoutType = 'studio' | 'euro' | 'classic';
export type DeliveryStatus = 'delivered' | 'not_delivered';

export interface ApartmentImages {
  plan: string;
  floor: string;
  building: string;
}

export interface Apartment {
  id: string;
  rooms: number;
  layoutType: LayoutType;
  floor: number;
  deliveryStatus: DeliveryStatus;
  area: number;
  building: string;
  images: ApartmentImages;
}

export interface ApartmentFilters {
  rooms: number[];
  areaMin: number;
  areaMax: number;
  floorMin: number;
  floorMax: number;
  layoutType: LayoutType | '';
  deliveryStatus: DeliveryStatus | '';
}

export interface ApartmentsResponse {
  items: Apartment[];
  total: number;
}

export const FILTER_RANGES = {
  area: { min: 20, max: 155 },
  floor: { min: 1, max: 25 },
} as const;

export const ROOM_OPTIONS = [0, 1, 2, 3, 4] as const;

export function createDefaultFilters(): ApartmentFilters {
  return {
    rooms: [],
    areaMin: FILTER_RANGES.area.min,
    areaMax: FILTER_RANGES.area.max,
    floorMin: FILTER_RANGES.floor.min,
    floorMax: FILTER_RANGES.floor.max,
    layoutType: '',
    deliveryStatus: '',
  };
}

export const DEFAULT_FILTERS: ApartmentFilters = createDefaultFilters();
