import { Router } from 'express';
import multer from 'multer';
import { CreateCarController } from '@modules/cars/usecases/createCar/CreateCarController';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/usecases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/usecases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/usecases/uploadImages/UploadCarImagesController';
import uploadConfig from '@config/upload';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig);

carsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthentication,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAuthentication,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle
);
