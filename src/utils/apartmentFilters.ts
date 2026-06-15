import type { Apartment, ApartmentFilters } from '../types/apartment';

export function parseApartmentFilters(url: URL): ApartmentFilters {
  const rooms = url.searchParams
    .getAll('rooms')
    .map(Number)
    .filter((value) => !Number.isNaN(value));

  return {
    rooms,
    areaMin: Number(url.searchParams.get('areaMin') ?? 0),
    areaMax: Number(url.searchParams.get('areaMax') ?? Infinity),
    floorMin: Number(url.searchParams.get('floorMin') ?? 0),
    floorMax: Number(url.searchParams.get('floorMax') ?? Infinity),
    layoutType: (url.searchParams.get('layoutType') ?? '') as ApartmentFilters['layoutType'],
    deliveryStatus: (url.searchParams.get('deliveryStatus') ?? '') as ApartmentFilters['deliveryStatus'],
  };
}

export function filterApartments(items: Apartment[], filters: ApartmentFilters): Apartment[] {
  return items.filter((apartment) => {
    if (filters.rooms.length > 0 && !filters.rooms.includes(apartment.rooms)) {
      return false;
    }

    if (apartment.area < filters.areaMin || apartment.area > filters.areaMax) {
      return false;
    }

    if (apartment.floor < filters.floorMin || apartment.floor > filters.floorMax) {
      return false;
    }

    if (filters.layoutType && apartment.layoutType !== filters.layoutType) {
      return false;
    }

    if (filters.deliveryStatus && apartment.deliveryStatus !== filters.deliveryStatus) {
      return false;
    }

    return true;
  });
}
