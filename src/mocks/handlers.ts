import { http, HttpResponse } from 'msw';
import { filterApartments, parseApartmentFilters } from '../utils/apartmentFilters';
import { apartments } from './data';

export const handlers = [
  http.get('/api/apartments', ({ request }) => {
    const url = new URL(request.url);
    const filters = parseApartmentFilters(url);
    const items = filterApartments(apartments, filters);

    return HttpResponse.json({
      items,
      total: items.length,
    });
  }),
];
