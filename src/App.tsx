import { useState } from 'react';
import { ApartmentList } from './components/apartment-list/ApartmentList';
import { ApartmentModal } from './components/apartment-modal/ApartmentModal';
import { FilterFab } from './components/filters/FilterFab';
import { FilterSheet } from './components/filters/FilterSheet';
import { FilterTags } from './components/filters/FilterTags';
import { Filters } from './components/filters/Filters';
import { useApartments } from './hooks/useApartments';
import type { Apartment, ApartmentFilters } from './types/apartment';
import { createDefaultFilters } from './types/apartment';
import { isFiltersDefault, areFiltersEqual } from './utils/filterTags';

function App() {
  const {
    apartments,
    total,
    filters,
    isInitialLoading,
    isFetching,
    error,
    setFilters,
    updateFilters,
    resetFilters,
  } = useApartments();
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<ApartmentFilters>(createDefaultFilters);

  const handleCardClick = (apartment: Apartment) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setSelectedApartment(apartment);
    setModalOpen(true);
  };

  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      setSelectedApartment(null);
    }
  };

  const handleFilterSheetOpenChange = (open: boolean) => {
    if (open) {
      setDraftFilters(filters);
    } else if (!areFiltersEqual(filters, draftFilters)) {
      setFilters(draftFilters);
    }
    setFilterSheetOpen(open);
  };

  const updateDraftFilters = (patch: Partial<ApartmentFilters>) => {
    setDraftFilters((current) => ({ ...current, ...patch }));
  };

  const resetDraftFilters = () => {
    setDraftFilters(createDefaultFilters());
  };

  const hasActiveFilters = !isFiltersDefault(filters);

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Каталог квартир</h1>
        <p className="page__subtitle">Подберите квартиру по параметрам</p>
      </header>

      <div className="page__mobile-filters">
        <FilterTags filters={filters} />
      </div>

      <div className="page__body">
        <div className="page__sidebar">
          <Filters filters={filters} onChange={updateFilters} onReset={resetFilters} />
        </div>

        <main className="page__content">
          <ApartmentList
            apartments={apartments}
            isInitialLoading={isInitialLoading}
            isFetching={isFetching}
            error={error}
            total={total}
            onCardClick={handleCardClick}
          />
        </main>
      </div>

      <FilterFab
        hasActiveFilters={hasActiveFilters}
        onClick={() => handleFilterSheetOpenChange(true)}
      />

      <FilterSheet
        open={filterSheetOpen}
        onOpenChange={handleFilterSheetOpenChange}
        filters={draftFilters}
        onChange={updateDraftFilters}
        onReset={resetDraftFilters}
      />

      <ApartmentModal
        apartment={selectedApartment}
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  );
}

export default App;
