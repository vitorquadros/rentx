import { CreateRentalController } from '@modules/rentals/usecases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/usecases/devolutionRental/DevolutionRentalController';
import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post('/', ensureAuthentication, createRentalController.handle);
rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthentication,
  devolutionRentalController.handle
);
