import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { ApartmentImage } from '../apartment-image/ApartmentImage';
import { APARTMENT_IMAGE_LABELS } from '../../utils/apartmentImages';
import type { Apartment, ApartmentImages } from '../../types/apartment';
import {
  formatArea,
  formatDeliveryStatus,
  formatLayoutType,
  formatRooms,
} from '../../utils/format';

interface ApartmentModalProps {
  apartment: Apartment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GALLERY_ORDER: (keyof ApartmentImages)[] = ['plan', 'floor', 'building'];

function ApartmentModalContent({ apartment }: { apartment: Apartment }) {
  const [activeType, setActiveType] = useState<keyof ApartmentImages>('plan');
  const mainImage = apartment.images[activeType];

  return (
    <Dialog.Content className="modal__content">
      <div className="modal__scroll">
        <div className="modal__header">
          <Dialog.Title className="modal__title">
            {formatRooms(apartment.rooms)} — {apartment.building}
          </Dialog.Title>
          <Dialog.Close className="modal__close" aria-label="Закрыть">
            <Cross2Icon className="modal__close-icon" aria-hidden />
          </Dialog.Close>
        </div>

        <div className="modal__body">
          <div className="modal__gallery">
            <div className="modal__thumbs">
              {GALLERY_ORDER.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`modal__thumb${activeType === type ? ' modal__thumb--active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  <ApartmentImage
                    src={apartment.images[type]}
                    alt={APARTMENT_IMAGE_LABELS[type]}
                    loading="lazy"
                  />
                  <span className="modal__thumb-label">{APARTMENT_IMAGE_LABELS[type]}</span>
                </button>
              ))}
            </div>
            <ApartmentImage
              className="modal__main-image"
              src={mainImage}
              alt={`${APARTMENT_IMAGE_LABELS[activeType]} — ${apartment.building}`}
              loading="eager"
            />
          </div>

          <dl className="modal__details">
            <div className="modal__detail">
              <dt>Комнаты</dt>
              <dd>{formatRooms(apartment.rooms)}</dd>
            </div>
            <div className="modal__detail">
              <dt>Планировка</dt>
              <dd>{formatLayoutType(apartment.layoutType)}</dd>
            </div>
            <div className="modal__detail">
              <dt>Этаж</dt>
              <dd>{apartment.floor}</dd>
            </div>
            <div className="modal__detail">
              <dt>Статус сдачи</dt>
              <dd>{formatDeliveryStatus(apartment.deliveryStatus)}</dd>
            </div>
            <div className="modal__detail">
              <dt>Площадь</dt>
              <dd>{formatArea(apartment.area)}</dd>
            </div>
            <div className="modal__detail">
              <dt>Дом</dt>
              <dd>{apartment.building}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Dialog.Content>
  );
}

export function ApartmentModal({ apartment, open, onOpenChange }: ApartmentModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        {apartment && <ApartmentModalContent key={apartment.id} apartment={apartment} />}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
