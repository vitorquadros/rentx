import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

const categoriesRepository = new CategoriesRepository();

const createCategoryUsecase = new CreateCategoryUsecase(categoriesRepository);

export const createCategoryController = new CreateCategoryController(
  createCategoryUsecase
);
