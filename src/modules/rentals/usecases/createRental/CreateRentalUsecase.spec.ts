import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUsecase } from './CreateRentalUsecase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let dayJsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUsecase: CreateRentalUsecase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(async () => {
    dayJsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUsecase = new CreateRentalUsecase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  test('Should be able to create a new rental', async () => {
    const rental = await createRentalUsecase.execute({
      user_id: '123456',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  test('Should not be able to create a new rental if the user already has an active rental', async () => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: '123456',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUsecase.execute({
        user_id: '123456',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('Should not be able to create a new rental if the car already has an active rental', async () => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: 'user1',
        car_id: 'same_id',
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUsecase.execute({
        user_id: 'user2',
        car_id: 'same_id',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('Should not be able to create a new rental with invalid return time (less than 24 hours)', async () => {
    expect(async () => {
      await createRentalUsecase.execute({
        user_id: 'user1',
        car_id: 'car1',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
