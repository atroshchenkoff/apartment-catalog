import { describe, expect, it } from 'vitest';
import { fetchApartments } from './apartments';
import { createDefaultFilters } from '../types/apartment';
import { setupMswServer } from '../test/msw';

setupMswServer();

describe('fetchApartments', () => {
  it('loads apartments with default filters', async () => {
    const data = await fetchApartments(createDefaultFilters());

    expect(data.total).toBe(24);
    expect(data.items).toHaveLength(24);
  });

  it('returns filtered apartments from API', async () => {
    const data = await fetchApartments({
      ...createDefaultFilters(),
      rooms: [0],
      layoutType: 'studio',
    });

    expect(data.total).toBeGreaterThan(0);
    expect(data.items.every((item) => item.rooms === 0 && item.layoutType === 'studio')).toBe(true);
  });

  it('aborts in-flight request when signal is aborted', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(fetchApartments(createDefaultFilters(), controller.signal)).rejects.toMatchObject({
      name: 'AbortError',
    });
  });
});
