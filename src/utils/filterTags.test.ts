import { describe, expect, it } from 'vitest';
import { createDefaultFilters } from '../types/apartment';
import { getFilterTags, isFiltersDefault, areFiltersEqual } from './filterTags';

describe('isFiltersDefault', () => {
  it('returns true for default filters', () => {
    expect(isFiltersDefault(createDefaultFilters())).toBe(true);
  });

  it('returns false when rooms are selected', () => {
    expect(isFiltersDefault({ ...createDefaultFilters(), rooms: [2] })).toBe(false);
  });
});

describe('areFiltersEqual', () => {
  it('returns true for identical filters', () => {
    const filters = createDefaultFilters();
    expect(areFiltersEqual(filters, { ...filters, rooms: [...filters.rooms] })).toBe(true);
  });

  it('returns true when rooms differ only by order', () => {
    const left = { ...createDefaultFilters(), rooms: [2, 1] };
    const right = { ...createDefaultFilters(), rooms: [1, 2] };
    expect(areFiltersEqual(left, right)).toBe(true);
  });

  it('returns false when a filter value changed', () => {
    const base = createDefaultFilters();
    expect(areFiltersEqual(base, { ...base, deliveryStatus: 'delivered' })).toBe(false);
  });
});

describe('getFilterTags', () => {
  it('returns empty list for default filters', () => {
    expect(getFilterTags(createDefaultFilters())).toEqual([]);
  });

  it('builds tags for active filters', () => {
    const tags = getFilterTags({
      ...createDefaultFilters(),
      rooms: [1, 2],
      areaMin: 30,
      areaMax: 60,
      layoutType: 'euro',
      deliveryStatus: 'delivered',
    });

    expect(tags).toEqual([
      { id: 'room-1', label: '1 комната' },
      { id: 'room-2', label: '2 комнаты' },
      { id: 'area', label: 'Площадь: 30–60 м²' },
      { id: 'layout', label: 'Евро' },
      { id: 'delivery', label: 'Сдан' },
    ]);
  });
});
