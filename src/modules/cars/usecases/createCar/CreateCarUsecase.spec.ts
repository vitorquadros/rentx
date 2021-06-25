import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUsecase } from './CreateCarUsecase';

let createCarUsecase: CreateCarUsecase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUsecase = new CreateCarUsecase(carsRepositoryInMemory);
  });

  test('Should be able to create a new car', async () => {
    const car = await createCarUsecase.execute({
      brand: 'test brand',
      category_id: 'category',
      daily_rate: 100,
      description: 'description_car',
      fine_amount: 60,
      license_plate: 'TES-0000',
      name: 'Test car',
    });

    expect(car).toHaveProperty('id');
  });

  test('Should not be able to create a car with existing license plate', () => {
    expect(async () => {
      await createCarUsecase.execute({
        name: 'Test car1',
        description: 'description_car',
        category_id: 'category',
        brand: 'test brand',
        daily_rate: 100,
        fine_amount: 60,
        license_plate: 'TES-0001',
      });

      await createCarUsecase.execute({
        name: 'Test car2',
        description: 'description_car',
        category_id: 'category',
        brand: 'test brand',
        daily_rate: 100,
        fine_amount: 60,
        license_plate: 'TES-0001',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
