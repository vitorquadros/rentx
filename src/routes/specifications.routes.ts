import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/usecases/createSpecification';

export const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res);
});
