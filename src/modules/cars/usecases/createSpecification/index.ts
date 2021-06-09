import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { CreateSpecificationUsecase } from './CreateSpecificationUsecase';
import { CreateSpecificationController } from './CreateSpecificatonController';

const specificationRepository = SpecificationRepository.getInstance();

const createSpecificationUsecase = new CreateSpecificationUsecase(
  specificationRepository
);

export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUsecase
);
