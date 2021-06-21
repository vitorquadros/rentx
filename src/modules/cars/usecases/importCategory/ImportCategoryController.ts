import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUsecase } from './ImportCategoryUsecase';

export class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importCategoryUsecase = container.resolve(ImportCategoryUsecase);

    await importCategoryUsecase.execute(file);

    return res.status(201).send();
  }
}
