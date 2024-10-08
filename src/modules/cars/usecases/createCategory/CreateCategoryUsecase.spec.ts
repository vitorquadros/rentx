import { AppError } from '@shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

let createCategoryUsecase: CreateCategoryUsecase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUsecase = new CreateCategoryUsecase(
      categoriesRepositoryInMemory
    );
  });

  test('Should be able to create a new category', async () => {
    const category = {
      name: 'Name test',
      description: 'Description test',
    };

    await createCategoryUsecase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  test('Should not be able to create a new category with an already existing name', async () => {
    const category = {
      name: 'Name test',
      description: 'Description test',
    };

    await createCategoryUsecase.execute({
      name: category.name,
      description: category.description,
    });

    await expect(
      createCategoryUsecase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError('Category already exists'));
  });
});
