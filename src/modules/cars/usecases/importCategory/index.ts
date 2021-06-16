import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUsecase } from './ImportCategoryUsecase';

const categoriesRepository = null;
const importCategoryUsecase = new ImportCategoryUsecase(categoriesRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryUsecase
);
