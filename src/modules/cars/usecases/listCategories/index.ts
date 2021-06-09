import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUsecase } from './ListCategoriesUsecase';

const categoriesRepository = new CategoriesRepository();
const listCategoriesUsecase = new ListCategoriesUsecase(categoriesRepository);

export const listCategoriesController = new ListCategoriesController(
  listCategoriesUsecase
);
