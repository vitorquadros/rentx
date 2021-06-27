import { Router } from 'express';
import { CreateCarController } from '@modules/cars/usecases/createCar/CreateCarController';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCarController.handle
);
