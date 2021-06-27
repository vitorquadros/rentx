import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUsecase } from './CreateCarSpecificationUsecase';

let createCarSpecificationUsecase: CreateCarSpecificationUsecase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUsecase = new CreateCarSpecificationUsecase(
      carsRepositoryInMemory
    );
  });

  test('Should not be able to add a new specification to a non-existant car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['54321'];
      await createCarSpecificationUsecase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
