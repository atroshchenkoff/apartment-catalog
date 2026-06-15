import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { formatRooms } from '../../utils/format';

interface FilterRoomCheckboxProps {
  room: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function FilterRoomCheckbox({ room, checked, onCheckedChange }: FilterRoomCheckboxProps) {
  return (
    <label className="filter__checkbox-item">
      <Checkbox.Root
        className={clsx('filter__checkbox', checked && 'filter__checkbox--checked')}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      >
        <Checkbox.Indicator className="filter__checkbox-indicator">
          <CheckIcon className="filter__checkbox-icon" aria-hidden />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span className="filter__checkbox-label">{formatRooms(room)}</span>
    </label>
  );
}
