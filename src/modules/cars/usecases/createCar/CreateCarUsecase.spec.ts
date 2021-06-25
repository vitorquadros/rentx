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
});
