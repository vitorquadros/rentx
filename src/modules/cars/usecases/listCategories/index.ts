import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUsecase } from './ListCategoriesUsecase';

const categoriesRepository = null;
const listCategoriesUsecase = new ListCategoriesUsecase(categoriesRepository);

export const listCategoriesController = new ListCategoriesController(
  listCategoriesUsecase
);
