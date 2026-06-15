import type { Apartment } from '../types/apartment';
import { imagesForRooms } from '../utils/apartmentImages';

type ApartmentSeed = Omit<Apartment, 'images'>;

const roomVariantCounter: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

function apt(data: ApartmentSeed): Apartment {
  const variantIndex = roomVariantCounter[data.rooms]++;

  return {
    ...data,
    images: imagesForRooms(data.rooms, variantIndex),
  };
}

export const apartments: Apartment[] = [
  apt({ id: 'apt-01', rooms: 0, layoutType: 'studio', floor: 3, deliveryStatus: 'delivered', area: 20.4, building: 'Корпус 1' }),
  apt({ id: 'apt-02', rooms: 1, layoutType: 'classic', floor: 5, deliveryStatus: 'delivered', area: 31.3, building: 'Корпус 1' }),
  apt({ id: 'apt-03', rooms: 2, layoutType: 'euro', floor: 8, deliveryStatus: 'not_delivered', area: 49.3, building: 'Корпус 2' }),
  apt({ id: 'apt-04', rooms: 3, layoutType: 'classic', floor: 12, deliveryStatus: 'not_delivered', area: 57.3, building: 'Корпус 2' }),
  apt({ id: 'apt-05', rooms: 4, layoutType: 'classic', floor: 15, deliveryStatus: 'delivered', area: 147.2, building: 'Корпус 3' }),
  apt({ id: 'apt-06', rooms: 1, layoutType: 'euro', floor: 2, deliveryStatus: 'delivered', area: 30.1, building: 'Корпус 1' }),
  apt({ id: 'apt-07', rooms: 2, layoutType: 'classic', floor: 7, deliveryStatus: 'delivered', area: 49.3, building: 'Корпус 2' }),
  apt({ id: 'apt-08', rooms: 0, layoutType: 'studio', floor: 10, deliveryStatus: 'not_delivered', area: 20.4, building: 'Корпус 3' }),
  apt({ id: 'apt-09', rooms: 3, layoutType: 'euro', floor: 4, deliveryStatus: 'delivered', area: 57.3, building: 'Корпус 1' }),
  apt({ id: 'apt-10', rooms: 2, layoutType: 'euro', floor: 18, deliveryStatus: 'not_delivered', area: 49.3, building: 'Корпус 3' }),
  apt({ id: 'apt-11', rooms: 1, layoutType: 'classic', floor: 6, deliveryStatus: 'not_delivered', area: 30.1, building: 'Корпус 2' }),
  apt({ id: 'apt-12', rooms: 4, layoutType: 'euro', floor: 20, deliveryStatus: 'delivered', area: 146.8, building: 'Корпус 3' }),
  apt({ id: 'apt-13', rooms: 2, layoutType: 'classic', floor: 1, deliveryStatus: 'delivered', area: 49.3, building: 'Корпус 1' }),
  apt({ id: 'apt-14', rooms: 3, layoutType: 'classic', floor: 9, deliveryStatus: 'not_delivered', area: 57.3, building: 'Корпус 2' }),
  apt({ id: 'apt-15', rooms: 0, layoutType: 'studio', floor: 14, deliveryStatus: 'delivered', area: 20.4, building: 'Корпус 3' }),
  apt({ id: 'apt-16', rooms: 1, layoutType: 'euro', floor: 11, deliveryStatus: 'delivered', area: 31.8, building: 'Корпус 2' }),
  apt({ id: 'apt-17', rooms: 2, layoutType: 'euro', floor: 16, deliveryStatus: 'not_delivered', area: 49.3, building: 'Корпус 3' }),
  apt({ id: 'apt-18', rooms: 3, layoutType: 'euro', floor: 22, deliveryStatus: 'delivered', area: 57.3, building: 'Корпус 3' }),
  apt({ id: 'apt-19', rooms: 4, layoutType: 'classic', floor: 13, deliveryStatus: 'not_delivered', area: 146.9, building: 'Корпус 2' }),
  apt({ id: 'apt-20', rooms: 1, layoutType: 'classic', floor: 19, deliveryStatus: 'delivered', area: 31.3, building: 'Корпус 1' }),
  apt({ id: 'apt-21', rooms: 2, layoutType: 'classic', floor: 21, deliveryStatus: 'delivered', area: 49.3, building: 'Корпус 2' }),
  apt({ id: 'apt-22', rooms: 0, layoutType: 'studio', floor: 17, deliveryStatus: 'not_delivered', area: 20.4, building: 'Корпус 1' }),
  apt({ id: 'apt-23', rooms: 3, layoutType: 'classic', floor: 24, deliveryStatus: 'delivered', area: 57.3, building: 'Корпус 3' }),
  apt({ id: 'apt-24', rooms: 4, layoutType: 'euro', floor: 25, deliveryStatus: 'not_delivered', area: 154.8, building: 'Корпус 3' }),
];
