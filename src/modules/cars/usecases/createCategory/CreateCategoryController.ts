import { Request, Response } from 'express';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

export class CreateCategoryController {
  constructor(private createCategoryUsecase: CreateCategoryUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    await this.createCategoryUsecase.execute({ name, description });

    return res.status(201).send();
  }
}
