import type { ApartmentFilters } from '../../types/apartment';
import { getFilterTags, isFiltersDefault } from '../../utils/filterTags';

interface FilterTagsProps {
  filters: ApartmentFilters;
}

export function FilterTags({ filters }: FilterTagsProps) {
  if (isFiltersDefault(filters)) {
    return <p className="filter-tags__empty">Фильтров нет</p>;
  }

  const tags = getFilterTags(filters);

  return (
    <div className="filter-tags">
      {tags.map((tag) => (
        <span key={tag.id} className="filter-tags__tag">
          {tag.label}
        </span>
      ))}
    </div>
  );
}
