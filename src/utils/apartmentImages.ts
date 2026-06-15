import type { ApartmentImages } from '../types/apartment';

export const APARTMENT_IMAGE_LABELS: Record<keyof ApartmentImages, string> = {
  plan: 'Планировка',
  floor: 'Этаж',
  building: 'Корпус',
};

const ROOM_IMAGE_START: Record<number, number> = {
  0: 1,
  1: 13,
  2: 28,
  3: 46,
  4: 61,
};

function imagePath(number: number): string {
  return `/images/apartments/${number}.webp`;
}

export function imagesForRooms(rooms: number, variantIndex: number): ApartmentImages {
  const start = ROOM_IMAGE_START[rooms];
  const base = start + variantIndex * 3;

  return {
    plan: imagePath(base),
    floor: imagePath(base + 1),
    building: imagePath(base + 2),
  };
}
