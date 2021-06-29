import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUsecase } from './CreateRentalUsecase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUsecase: CreateRentalUsecase;

describe('Create Rental', () => {
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUsecase = new CreateRentalUsecase(rentalsRepositoryInMemory);
  });

  test('Should be able to create a new rental', async () => {
    const rental = await createRentalUsecase.execute({
      user_id: '123456',
      car_id: '121212',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  test('Should not be able to create a new rental if the user already has an active rental', async () => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: '123456',
        car_id: '121212',
        expected_return_date: new Date(),
      });

      await createRentalUsecase.execute({
        user_id: '123456',
        car_id: '121212',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
