import type { Apartment } from '../../types/apartment';
import { ApartmentImage } from '../apartment-image/ApartmentImage';
import {
  formatArea,
  formatDeliveryStatus,
  formatLayoutType,
  formatRooms,
} from '../../utils/format';

interface ApartmentCardProps {
  apartment: Apartment;
  onClick: (apartment: Apartment) => void;
}

export function ApartmentCard({ apartment, onClick }: ApartmentCardProps) {
  return (
    <article
      className="apartment-card"
      onClick={() => onClick(apartment)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(apartment);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="apartment-card__image-wrap">
        <ApartmentImage
          className="apartment-card__image"
          src={apartment.images.plan}
          alt={`Планировка — ${apartment.building}`}
          loading="lazy"
        />
        <span
          className={`apartment-card__badge apartment-card__badge--${apartment.deliveryStatus}`}
        >
          {formatDeliveryStatus(apartment.deliveryStatus)}
        </span>
      </div>

      <div className="apartment-card__body">
        <h3 className="apartment-card__title">{formatRooms(apartment.rooms)}</h3>
        <ul className="apartment-card__details">
          <li className="apartment-card__detail">
            <span className="apartment-card__detail-label">Планировка</span>
            <span className="apartment-card__detail-value">{formatLayoutType(apartment.layoutType)}</span>
          </li>
          <li className="apartment-card__detail">
            <span className="apartment-card__detail-label">Этаж</span>
            <span className="apartment-card__detail-value">{apartment.floor}</span>
          </li>
          <li className="apartment-card__detail">
            <span className="apartment-card__detail-label">Площадь</span>
            <span className="apartment-card__detail-value">{formatArea(apartment.area)}</span>
          </li>
          <li className="apartment-card__detail">
            <span className="apartment-card__detail-label">Дом</span>
            <span className="apartment-card__detail-value">{apartment.building}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}
