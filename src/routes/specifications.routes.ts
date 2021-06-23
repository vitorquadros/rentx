import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/usecases/createSpecification/CreateSpecificatonController';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post('/', createSpecificationController.handle);
