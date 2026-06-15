import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: FilterSelectOption[];
  onValueChange: (value: string) => void;
  portalContainer?: HTMLElement | null;
  inSheet?: boolean;
}

function isSelectTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(target.closest('.filter__select-content') || target.closest('.filter__select-trigger'));
}

export function FilterSelect({
  label,
  value,
  placeholder,
  options,
  onValueChange,
  portalContainer,
  inSheet = false,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!inSheet || !open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (isSelectTarget(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [inSheet, open]);

  const selectContent = (
    <Select.Content className="filter__select-content" position="popper">
      <Select.Viewport className="filter__select-viewport">
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value} className="filter__select-item">
            <Select.ItemText>{option.label}</Select.ItemText>
            <Select.ItemIndicator className="filter__select-item-indicator">
              <CheckIcon aria-hidden />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Viewport>
    </Select.Content>
  );

  return (
    <div className="filter__group">
      <span className="filter__label">{label}</span>
      <Select.Root
        open={inSheet ? open : undefined}
        onOpenChange={inSheet ? setOpen : undefined}
        value={value || undefined}
        onValueChange={onValueChange}
      >
        <Select.Trigger className="filter__select-trigger" aria-label={label}>
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="filter__select-icon">
            <ChevronDownIcon aria-hidden />
          </Select.Icon>
        </Select.Trigger>
        {inSheet ? (
          <Select.Portal container={portalContainer ?? undefined}>{selectContent}</Select.Portal>
        ) : (
          <Select.Portal>{selectContent}</Select.Portal>
        )}
      </Select.Root>
    </div>
  );
}
