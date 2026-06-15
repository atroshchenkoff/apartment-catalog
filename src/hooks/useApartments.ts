import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchApartments } from '../api/apartments';
import type { Apartment, ApartmentFilters } from '../types/apartment';
import { createDefaultFilters } from '../types/apartment';

const FILTER_DEBOUNCE_MS = 300;
const MIN_REFETCH_DISPLAY_MS = 600;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

interface UseApartmentsResult {
  apartments: Apartment[];
  total: number;
  filters: ApartmentFilters;
  isInitialLoading: boolean;
  isFetching: boolean;
  error: string | null;
  setFilters: (filters: ApartmentFilters) => void;
  updateFilters: (patch: Partial<ApartmentFilters>) => void;
  resetFilters: () => void;
}

export function useApartments(): UseApartmentsResult {
  const [filters, setFilters] = useState<ApartmentFilters>(createDefaultFilters);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [total, setTotal] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoadedRef = useRef(false);

  const updateFilters = useCallback((patch: Partial<ApartmentFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(createDefaultFilters());
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const shouldScrollToTop = hasLoadedRef.current;

    setIsFetching(true);

    const timeoutId = window.setTimeout(async () => {
      setError(null);

      const startedAt = Date.now();

      try {
        const data = await fetchApartments(filters, controller.signal);

        if (!controller.signal.aborted) {
          if (hasLoadedRef.current) {
            const elapsed = Date.now() - startedAt;
            const remaining = MIN_REFETCH_DISPLAY_MS - elapsed;
            if (remaining > 0) {
              await wait(remaining);
            }
          }

          if (!controller.signal.aborted) {
            setApartments(data.items);
            setTotal(data.total);
            hasLoadedRef.current = true;
            setHasLoaded(true);

            if (shouldScrollToTop) {
              scrollToTop();
            }
          }
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        if (!controller.signal.aborted) {
          setError('Не удалось загрузить квартиры. Попробуйте обновить страницу.');
          if (!hasLoadedRef.current) {
            setApartments([]);
            setTotal(0);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsFetching(false);
        }
      }
    }, FILTER_DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [filters]);

  return {
    apartments,
    total,
    filters,
    isInitialLoading: isFetching && !hasLoaded,
    isFetching,
    error,
    setFilters,
    updateFilters,
    resetFilters,
  };
}
