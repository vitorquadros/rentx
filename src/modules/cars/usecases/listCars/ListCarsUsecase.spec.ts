import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUsecase } from './ListCarsUsecase';

let listCarsUsecase: ListCarsUsecase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUsecase = new ListCarsUsecase(carsRepositoryInMemory);
  });

  test('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car',
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'Car Test',
      fine_amount: 100,
      license_plate: 'DEF-4140',
      name: 'Car A-1',
    });

    const cars = await listCarsUsecase.execute({});

    expect(cars).toEqual([car]);
  });

  test('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_test',
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'Car Test',
      fine_amount: 100,
      license_plate: 'DEF-4140',
      name: 'Car A-1',
    });

    const cars = await listCarsUsecase.execute({
      brand: 'Car_brand_test',
    });

    expect(cars).toEqual([car]);
  });

  test('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_test',
      category_id: 'category_id',
      daily_rate: 110.0,
      description: 'Car Test',
      fine_amount: 100,
      license_plate: 'DEF-4141',
      name: 'Car 5',
    });

    const cars = await listCarsUsecase.execute({
      name: 'Car 5',
    });

    expect(cars).toEqual([car]);
  });

  test('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Car_brand_test',
      category_id: '12345',
      daily_rate: 110.0,
      description: 'Car Test',
      fine_amount: 100,
      license_plate: 'DEF-4141',
      name: 'Car 5',
    });

    const cars = await listCarsUsecase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
