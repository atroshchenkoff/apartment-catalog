import type { ApartmentFilters } from '../types/apartment';

export function buildApartmentsQuery(filters: ApartmentFilters): string {
  const params = new URLSearchParams();

  filters.rooms.forEach((room) => params.append('rooms', String(room)));
  params.set('areaMin', String(filters.areaMin));
  params.set('areaMax', String(filters.areaMax));
  params.set('floorMin', String(filters.floorMin));
  params.set('floorMax', String(filters.floorMax));

  if (filters.layoutType) {
    params.set('layoutType', filters.layoutType);
  }

  if (filters.deliveryStatus) {
    params.set('deliveryStatus', filters.deliveryStatus);
  }

  return params.toString();
}
