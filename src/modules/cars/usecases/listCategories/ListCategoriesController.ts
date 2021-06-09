import { Request, Response } from 'express';
import { ListCategoriesUsecase } from '../listCategories/ListCategoriesUsecase';

export class ListCategoriesController {
  constructor(private listCategoriesUsecase: ListCategoriesUsecase) {}

  handle(req: Request, res: Response): Response {
    const all = this.listCategoriesUsecase.execute();

    return res.json(all);
  }
}
