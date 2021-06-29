import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUsecase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<void> {
    // 1) Must not be possible to register a rental if the car is already rented.
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    // 2) Must not be possible to register a rental if the user already has an active rental.
    const rentalOpenToUser =
      this.rentalsRepository.findOpenRetalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is already an active rental for the user');
    }
  }
}
