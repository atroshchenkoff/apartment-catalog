import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createDefaultFilters } from '../../types/apartment';
import { FilterTags } from './FilterTags';

describe('FilterTags', () => {
  it('shows empty state when filters are default', () => {
    render(<FilterTags filters={createDefaultFilters()} />);

    expect(screen.getByText('Фильтров нет')).toBeInTheDocument();
  });

  it('renders active filter tags', () => {
    render(
      <FilterTags
        filters={{
          ...createDefaultFilters(),
          rooms: [2],
          deliveryStatus: 'delivered',
        }}
      />,
    );

    expect(screen.getByText('2 комнаты')).toBeInTheDocument();
    expect(screen.getByText('Сдан')).toBeInTheDocument();
    expect(screen.queryByText('Фильтров нет')).not.toBeInTheDocument();
  });
});
