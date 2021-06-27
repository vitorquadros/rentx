import { Router } from 'express';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/usecases/createSpecification/CreateSpecificatonController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createSpecificationController.handle
);
