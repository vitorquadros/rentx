import { Router } from 'express';

import { createCategoryController } from '../modules/cars/usecases/createCategory';
import { listCategoriesController } from '../modules/cars/usecases/listCategories';

export const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});
