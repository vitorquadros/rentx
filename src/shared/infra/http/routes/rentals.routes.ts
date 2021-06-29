import { CreateRentalController } from '@modules/rentals/usecases/createRental/CreateRentalController';
import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', ensureAuthentication, createRentalController.handle);
