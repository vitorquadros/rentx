import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUsecase } from './CreateRentalUsecase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let dayJsDateProvider: DayjsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUsecase: CreateRentalUsecase;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(async () => {
    dayJsDateProvider = new DayjsDateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUsecase = new CreateRentalUsecase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  test('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 100,
      category_id: '1234',
      brand: 'test',
    });

    const rental = await createRentalUsecase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  test('Should not be able to create a new rental if the user already has an active rental', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1212123',
      expected_return_date: dayAdd24Hours,
      user_id: '12345',
    });

    await expect(
      createRentalUsecase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError('There is already an active rental for the user')
    );
  });

  test('Should not be able to create a new rental if the car already has an active rental', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: 'user1',
      car_id: 'same_id',
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUsecase.execute({
        user_id: 'user2',
        car_id: 'same_id',
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  test('Should not be able to create a new rental with invalid return time (less than 24 hours)', async () => {
    await expect(
      createRentalUsecase.execute({
        user_id: 'user1',
        car_id: 'car1',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Invalid return time'));
  });
});
