import { MixerHorizontalIcon } from '@radix-ui/react-icons';

interface FilterFabProps {
  onClick: () => void;
  hasActiveFilters: boolean;
}

export function FilterFab({ onClick, hasActiveFilters }: FilterFabProps) {
  return (
    <button type="button" className="filter-fab" onClick={onClick} aria-label="Открыть фильтры">
      <MixerHorizontalIcon className="filter-fab__icon" aria-hidden />
      {hasActiveFilters && <span className="filter-fab__badge" aria-hidden />}
    </button>
  );
}
