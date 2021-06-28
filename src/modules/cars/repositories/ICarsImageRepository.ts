import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICarsImageRepository {
  create(car_id: string, name: string): Promise<CarImage>;
}
