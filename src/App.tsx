import { ApartmentList } from './components/apartment-list/ApartmentList';
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

  const handleCardClick = (_apartment: Apartment) => {
    // Modal will be added in the next iteration.
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
    </div>
  );
}

export default App;
