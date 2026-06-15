import clsx from 'clsx';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { Apartment } from '../../types/apartment';
import { ApartmentCard } from '../apartment-card/ApartmentCard';

interface ApartmentListProps {
  apartments: Apartment[];
  isInitialLoading: boolean;
  isFetching: boolean;
  error: string | null;
  total: number;
  onCardClick: (apartment: Apartment) => void;
}

interface OverlayPosition {
  top: number;
  left: number;
}

function getVisibleCenter(element: HTMLElement): OverlayPosition {
  const rect = element.getBoundingClientRect();
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, window.innerHeight);

  return {
    top: (visibleTop + visibleBottom) / 2,
    left: rect.left + rect.width / 2,
  };
}

export function ApartmentList({
  apartments,
  isInitialLoading,
  isFetching,
  error,
  total,
  onCardClick,
}: ApartmentListProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [overlayPosition, setOverlayPosition] = useState<OverlayPosition | null>(null);

  const updateOverlayPosition = useCallback(() => {
    if (!viewportRef.current) {
      return;
    }

    setOverlayPosition(getVisibleCenter(viewportRef.current));
  }, []);

  useLayoutEffect(() => {
    if (!isFetching) {
      return;
    }

    updateOverlayPosition();

    window.addEventListener('scroll', updateOverlayPosition, true);
    window.addEventListener('resize', updateOverlayPosition);

    return () => {
      window.removeEventListener('scroll', updateOverlayPosition, true);
      window.removeEventListener('resize', updateOverlayPosition);
    };
  }, [isFetching, updateOverlayPosition, apartments.length, total]);

  if (isInitialLoading) {
    return <div className="apartment-list__state">Загрузка квартир...</div>;
  }

  if (error && apartments.length === 0) {
    return <div className="apartment-list__state apartment-list__state--error">{error}</div>;
  }

  const isEmpty = apartments.length === 0 && total === 0;

  return (
    <section className={clsx('apartment-list', isFetching && 'apartment-list--fetching')}>
      {error && (
        <p className="apartment-list__error-banner" role="alert">
          {error}
        </p>
      )}

      <p className="apartment-list__count">Найдено: {total}</p>

      <div ref={viewportRef} className="apartment-list__viewport">
        {isEmpty ? (
          <div className="apartment-list__state apartment-list__state--inline">
            По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
          </div>
        ) : (
          <div className="apartment-list__grid">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} onClick={onCardClick} />
            ))}
          </div>
        )}
      </div>

      {isFetching && overlayPosition && (
        <div
          className="apartment-list__overlay"
          style={{ top: overlayPosition.top, left: overlayPosition.left }}
          aria-live="polite"
          aria-busy="true"
        >
          <div className="apartment-list__overlay-panel">
            <span className="apartment-list__spinner" />
            <span className="apartment-list__overlay-text">Обновление...</span>
          </div>
        </div>
      )}
    </section>
  );
}
