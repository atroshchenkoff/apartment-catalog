import * as Dialog from '@radix-ui/react-dialog';
import { DismissableLayerBranch } from '@radix-ui/react-dismissable-layer';
import { useCallback, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import type { ApartmentFilters } from '../../types/apartment';
import { hasOpenFilterSelect } from '../../utils/filterSelect';
import { Filters } from './Filters';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ApartmentFilters;
  onChange: (patch: Partial<ApartmentFilters>) => void;
  onReset: () => void;
}

export function FilterSheet({ open, onOpenChange, filters, onChange, onReset }: FilterSheetProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const hadOpenSelectRef = useRef(false);

  const handleContentRef = useCallback((node: HTMLDivElement | null) => {
    setPortalContainer(node);
  }, []);

  const preventAutoDismiss = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  const handleDialogOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen && hasOpenFilterSelect(document)) {
        return;
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  const handleOverlayPointerDownCapture = useCallback((event: PointerEvent<HTMLDivElement>) => {
    hadOpenSelectRef.current = hasOpenFilterSelect(event.currentTarget.ownerDocument);
  }, []);

  const handleOverlayPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    // Блокируем «ghost click» на мобильных: иначе после закрытия шита click уходит в карточку под оверлеем.
    event.preventDefault();
  }, []);

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (hadOpenSelectRef.current) {
        hadOpenSelectRef.current = false;
        return;
      }

      onOpenChange(false);
    },
    [onOpenChange],
  );

  return (
    <Dialog.Root open={open} onOpenChange={handleDialogOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="filter-sheet__overlay"
          onPointerDownCapture={handleOverlayPointerDownCapture}
          onPointerDown={handleOverlayPointerDown}
          onClick={handleOverlayClick}
        />
        <Dialog.Content
          ref={handleContentRef}
          className="filter-sheet__content"
          aria-describedby={undefined}
          onPointerDownOutside={preventAutoDismiss}
          onInteractOutside={preventAutoDismiss}
        >
          <DismissableLayerBranch className="filter-sheet__branch">
            <div className="filter-sheet__handle" aria-hidden />

            <div className="filter-sheet__scroll">
              <Filters
                className="filter--sheet"
                filters={filters}
                onChange={onChange}
                onReset={onReset}
                selectPortalContainer={portalContainer}
                inSheet
              />
            </div>

            <div className="filter-sheet__footer">
              <Dialog.Close type="button" className="filter-sheet__apply">
                Показать результаты
              </Dialog.Close>
            </div>
          </DismissableLayerBranch>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
