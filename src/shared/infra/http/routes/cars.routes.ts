import { Router } from 'express';
import { CreateCarController } from '@modules/cars/usecases/createCar/CreateCarController';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', createCarController.handle);
