import { useState } from 'react';
import { ApartmentList } from './components/apartment-list/ApartmentList';
import { ApartmentModal } from './components/apartment-modal/ApartmentModal';
import { Filters } from './components/filters/Filters';
import { useApartments } from './hooks/useApartments';
import type { Apartment } from './types/apartment';

function App() {
  const {
    apartments,
    total,
    filters,
    isInitialLoading,
    isFetching,
    error,
    updateFilters,
    resetFilters,
  } = useApartments();
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  return (
    <div className="page">
      <header className="page__header">
        <h1 className="page__title">Каталог квартир</h1>
        <p className="page__subtitle">Подберите квартиру по параметрам</p>
      </header>

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

      <ApartmentModal
        apartment={selectedApartment}
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
      />
    </div>
  );
}

export default App;
