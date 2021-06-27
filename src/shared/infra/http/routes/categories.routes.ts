import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/usecases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/usecases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/usecases/listCategories/ListCategoriesController';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

export const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthentication,
  ensureAdmin,
  importCategoryController.handle
);
