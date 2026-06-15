import type { ApartmentFilters } from '../types/apartment';
import { DEFAULT_FILTERS } from '../types/apartment';
import { formatDeliveryStatus, formatLayoutType, formatRooms } from './format';

export interface FilterTag {
  id: string;
  label: string;
}

export function isFiltersDefault(filters: ApartmentFilters): boolean {
  return (
    filters.rooms.length === 0 &&
    filters.areaMin === DEFAULT_FILTERS.areaMin &&
    filters.areaMax === DEFAULT_FILTERS.areaMax &&
    filters.floorMin === DEFAULT_FILTERS.floorMin &&
    filters.floorMax === DEFAULT_FILTERS.floorMax &&
    !filters.layoutType &&
    !filters.deliveryStatus
  );
}

export function areFiltersEqual(a: ApartmentFilters, b: ApartmentFilters): boolean {
  if (
    a.areaMin !== b.areaMin ||
    a.areaMax !== b.areaMax ||
    a.floorMin !== b.floorMin ||
    a.floorMax !== b.floorMax ||
    a.layoutType !== b.layoutType ||
    a.deliveryStatus !== b.deliveryStatus ||
    a.rooms.length !== b.rooms.length
  ) {
    return false;
  }

  const roomsA = [...a.rooms].sort((left, right) => left - right);
  const roomsB = [...b.rooms].sort((left, right) => left - right);

  return roomsA.every((room, index) => room === roomsB[index]);
}

export function getFilterTags(filters: ApartmentFilters): FilterTag[] {
  const tags: FilterTag[] = [];

  filters.rooms.forEach((room) => {
    tags.push({ id: `room-${room}`, label: formatRooms(room) });
  });

  if (filters.areaMin !== DEFAULT_FILTERS.areaMin || filters.areaMax !== DEFAULT_FILTERS.areaMax) {
    tags.push({
      id: 'area',
      label: `Площадь: ${filters.areaMin}–${filters.areaMax} м²`,
    });
  }

  if (filters.floorMin !== DEFAULT_FILTERS.floorMin || filters.floorMax !== DEFAULT_FILTERS.floorMax) {
    tags.push({
      id: 'floor',
      label: `Этаж: ${filters.floorMin}–${filters.floorMax}`,
    });
  }

  if (filters.layoutType) {
    tags.push({
      id: 'layout',
      label: formatLayoutType(filters.layoutType),
    });
  }

  if (filters.deliveryStatus) {
    tags.push({
      id: 'delivery',
      label: formatDeliveryStatus(filters.deliveryStatus),
    });
  }

  return tags;
}
