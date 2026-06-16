import { describe, expect, it } from 'vitest';
import type { Apartment } from '../types/apartment';
import { createDefaultFilters } from '../types/apartment';
import { filterApartments } from './apartmentFilters';

const sampleApartments: Apartment[] = [
  {
    id: 'a1',
    rooms: 1,
    layoutType: 'classic',
    floor: 5,
    deliveryStatus: 'delivered',
    area: 35,
    building: 'Корпус 1',
    images: { plan: '', floor: '', building: '' },
  },
  {
    id: 'a2',
    rooms: 2,
    layoutType: 'euro',
    floor: 10,
    deliveryStatus: 'not_delivered',
    area: 50,
    building: 'Корпус 2',
    images: { plan: '', floor: '', building: '' },
  },
  {
    id: 'a3',
    rooms: 0,
    layoutType: 'studio',
    floor: 3,
    deliveryStatus: 'delivered',
    area: 22,
    building: 'Корпус 1',
    images: { plan: '', floor: '', building: '' },
  },
];

describe('filterApartments', () => {
  it('returns all apartments when filters are default', () => {
    const filters = createDefaultFilters();
    expect(filterApartments(sampleApartments, filters)).toHaveLength(3);
  });

  it('filters by room count', () => {
    const filters = { ...createDefaultFilters(), rooms: [2] };
    const result = filterApartments(sampleApartments, filters);

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('a2');
  });

  it('filters by area range', () => {
    const filters = { ...createDefaultFilters(), areaMin: 30, areaMax: 40 };
    const result = filterApartments(sampleApartments, filters);

    expect(result.map((item) => item.id)).toEqual(['a1']);
  });

  it('filters by floor range', () => {
    const filters = { ...createDefaultFilters(), floorMin: 8, floorMax: 12 };
    const result = filterApartments(sampleApartments, filters);

    expect(result.map((item) => item.id)).toEqual(['a2']);
  });

  it('filters by layout type', () => {
    const filters = { ...createDefaultFilters(), layoutType: 'studio' as const };
    const result = filterApartments(sampleApartments, filters);

    expect(result.map((item) => item.id)).toEqual(['a3']);
  });

  it('filters by delivery status', () => {
    const filters = { ...createDefaultFilters(), deliveryStatus: 'not_delivered' as const };
    const result = filterApartments(sampleApartments, filters);

    expect(result.map((item) => item.id)).toEqual(['a2']);
  });

  it('combines multiple filters', () => {
    const filters = {
      ...createDefaultFilters(),
      rooms: [1, 2],
      deliveryStatus: 'delivered' as const,
    };
    const result = filterApartments(sampleApartments, filters);

    expect(result.map((item) => item.id)).toEqual(['a1']);
  });
});
