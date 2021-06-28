import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICarsImagesRepository {
  create(car_id: string, name: string): Promise<CarImage>;
}
