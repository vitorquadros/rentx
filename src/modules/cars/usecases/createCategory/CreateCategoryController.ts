import { Request, Response } from 'express';
import { CreateCategoryUsecase } from './CreateCategoryUsecase';

export class CreateCategoryController {
  constructor(private createCategoryUsecase: CreateCategoryUsecase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    this.createCategoryUsecase.execute({ name, description });

    return res.status(201).send();
  }
}
