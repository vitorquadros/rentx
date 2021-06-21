import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUsecase } from './CreateSpecificationUsecase';

export class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const createSpecificationUsecase = container.resolve(
      CreateSpecificationUsecase
    );

    createSpecificationUsecase.execute({ name, description });
    return res.status(201).send();
  }
}
