import type { ApartmentFilters, ApartmentsResponse } from '../types/apartment';
import { buildApartmentsQuery } from '../utils/apartmentQuery';

export async function fetchApartments(
  filters: ApartmentFilters,
  signal?: AbortSignal,
): Promise<ApartmentsResponse> {
  const query = buildApartmentsQuery(filters);
  const response = await fetch(`/api/apartments?${query}`, { signal });

  if (!response.ok) {
    throw new Error('Не удалось загрузить квартиры');
  }

  return response.json() as Promise<ApartmentsResponse>;
}
