import { Request, Response } from 'express';
import { CreateSpecificationUsecase } from './CreateSpecificationUsecase';

export class CreateSpecificationController {
  constructor(private createSpecificationUsecase: CreateSpecificationUsecase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createSpecificationUsecase.execute({ name, description });

    return res.status(201).send();
  }
}
