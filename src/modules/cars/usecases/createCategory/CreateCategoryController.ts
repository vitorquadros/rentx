import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryUsecase = container.resolve(CreateCategoryUsecase);

    await createCategoryUsecase.execute({ name, description });

    return res.status(201).send();
  }
}
