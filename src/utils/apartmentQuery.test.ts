import { describe, expect, it } from 'vitest';
import { createDefaultFilters } from '../types/apartment';
import { buildApartmentsQuery } from './apartmentQuery';

describe('buildApartmentsQuery', () => {
  it('serializes default filters', () => {
    const filters = createDefaultFilters();
    const query = new URLSearchParams(buildApartmentsQuery(filters));

    expect(query.getAll('rooms')).toEqual([]);
    expect(query.get('areaMin')).toBe('20');
    expect(query.get('areaMax')).toBe('155');
    expect(query.get('floorMin')).toBe('1');
    expect(query.get('floorMax')).toBe('25');
    expect(query.has('layoutType')).toBe(false);
    expect(query.has('deliveryStatus')).toBe(false);
  });

  it('serializes rooms and optional filters', () => {
    const filters = {
      ...createDefaultFilters(),
      rooms: [1, 3],
      layoutType: 'euro' as const,
      deliveryStatus: 'delivered' as const,
    };
    const query = new URLSearchParams(buildApartmentsQuery(filters));

    expect(query.getAll('rooms')).toEqual(['1', '3']);
    expect(query.get('layoutType')).toBe('euro');
    expect(query.get('deliveryStatus')).toBe('delivered');
  });
});
