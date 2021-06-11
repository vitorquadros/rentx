import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUsecase } from './ImportCategoryUsecase';

const importCategoryUsecase = new ImportCategoryUsecase();

export const importCategoryController = new ImportCategoryController(
  importCategoryUsecase
);
