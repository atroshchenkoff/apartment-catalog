import type { ApartmentFilters } from '../../types/apartment';
import { FILTER_RANGES, ROOM_OPTIONS } from '../../types/apartment';
import { FilterRangeSlider } from './FilterRangeSlider';
import { FilterRoomCheckbox } from './FilterRoomCheckbox';
import { FilterSelect } from './FilterSelect';

interface FiltersProps {
  filters: ApartmentFilters;
  onChange: (patch: Partial<ApartmentFilters>) => void;
  onReset: () => void;
  className?: string;
  selectPortalContainer?: HTMLElement | null;
  inSheet?: boolean;
}

const LAYOUT_OPTIONS = [
  { value: 'all', label: 'Все типы' },
  { value: 'studio', label: 'Студия' },
  { value: 'euro', label: 'Евро' },
  { value: 'classic', label: 'Классика' },
];

const DELIVERY_OPTIONS = [
  { value: 'all', label: 'Любой статус' },
  { value: 'delivered', label: 'Сдан' },
  { value: 'not_delivered', label: 'Не сдан' },
];

export function Filters({ filters, onChange, onReset, className, selectPortalContainer, inSheet }: FiltersProps) {
  const toggleRoom = (room: number, checked: boolean) => {
    const rooms = checked
      ? [...filters.rooms, room]
      : filters.rooms.filter((value) => value !== room);

    onChange({ rooms: rooms.sort((a, b) => a - b) });
  };

  return (
    <aside className={className ? `filter ${className}` : 'filter'}>
      <div className="filter__header">
        <h2 className="filter__title">Фильтры</h2>
        <button type="button" className="filter__reset" onClick={onReset}>
          Сбросить
        </button>
      </div>

      <div className="filter__group">
        <span className="filter__label">Количество комнат</span>
        <div className="filter__checkbox-list">
          {ROOM_OPTIONS.map((room) => (
            <FilterRoomCheckbox
              key={room}
              room={room}
              checked={filters.rooms.includes(room)}
              onCheckedChange={(checked) => toggleRoom(room, checked)}
            />
          ))}
        </div>
      </div>

      <FilterRangeSlider
        label="Площадь"
        min={FILTER_RANGES.area.min}
        max={FILTER_RANGES.area.max}
        step={1}
        value={[filters.areaMin, filters.areaMax]}
        unit=" м²"
        onValueChange={([areaMin, areaMax]) => onChange({ areaMin, areaMax })}
      />

      <FilterRangeSlider
        label="Этаж"
        min={FILTER_RANGES.floor.min}
        max={FILTER_RANGES.floor.max}
        step={1}
        value={[filters.floorMin, filters.floorMax]}
        onValueChange={([floorMin, floorMax]) => onChange({ floorMin, floorMax })}
      />

      <FilterSelect
        label="Тип планировки"
        placeholder="Все типы"
        value={filters.layoutType || 'all'}
        options={LAYOUT_OPTIONS}
        portalContainer={selectPortalContainer}
        inSheet={inSheet}
        onValueChange={(value) =>
          onChange({ layoutType: value === 'all' ? '' : (value as ApartmentFilters['layoutType']) })
        }
      />

      <FilterSelect
        label="Статус сдачи"
        placeholder="Любой статус"
        value={filters.deliveryStatus || 'all'}
        options={DELIVERY_OPTIONS}
        portalContainer={selectPortalContainer}
        inSheet={inSheet}
        onValueChange={(value) =>
          onChange({
            deliveryStatus: value === 'all' ? '' : (value as ApartmentFilters['deliveryStatus']),
          })
        }
      />
    </aside>
  );
}
