import type { DeliveryStatus, LayoutType } from '../types/apartment';

const LAYOUT_LABELS: Record<LayoutType, string> = {
  studio: 'Студия',
  euro: 'Евро',
  classic: 'Классика',
};

const DELIVERY_LABELS: Record<DeliveryStatus, string> = {
  delivered: 'Сдан',
  not_delivered: 'Не сдан',
};

export function formatRooms(rooms: number): string {
  if (rooms === 0) return 'Студия';
  if (rooms === 1) return '1 комната';
  if (rooms >= 2 && rooms <= 4) return `${rooms} комнаты`;
  return `${rooms} комнат`;
}

export function formatLayoutType(layoutType: LayoutType): string {
  return LAYOUT_LABELS[layoutType];
}

export function formatDeliveryStatus(status: DeliveryStatus): string {
  return DELIVERY_LABELS[status];
}

export function formatArea(area: number): string {
  return `${area.toFixed(2)} м²`;
}
