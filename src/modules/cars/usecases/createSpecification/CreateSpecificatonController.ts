import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUsecase } from './CreateSpecificationUsecase';

export class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationUsecase = container.resolve(
      CreateSpecificationUsecase
    );

    await createSpecificationUsecase.execute({ name, description });
    return res.status(201).send();
  }
}
