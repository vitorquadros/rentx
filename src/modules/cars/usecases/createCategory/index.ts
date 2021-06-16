import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository();

  const createCategoryUsecase = new CreateCategoryUsecase(categoriesRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUsecase
  );

  return createCategoryController;
};
