import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUsecase } from '../listCategories/ListCategoriesUsecase';

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUsecase = container.resolve(ListCategoriesUsecase);

    const all = await listCategoriesUsecase.execute();

    return res.json(all);
  }
}
