import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/usecases/createCategory';
import { importCategoryController } from '../modules/cars/usecases/importCategory';
import { listCategoriesController } from '../modules/cars/usecases/listCategories';

export const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);
});
