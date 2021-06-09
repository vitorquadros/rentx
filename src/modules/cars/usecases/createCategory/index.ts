import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUsecase = new CreateCategoryUsecase(categoriesRepository);

export const createCategoryController = new CreateCategoryController(
  createCategoryUsecase
);
