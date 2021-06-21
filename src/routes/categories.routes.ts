import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/usecases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/usecases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/usecases/listCategories/ListCategoriesController';

export const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);
