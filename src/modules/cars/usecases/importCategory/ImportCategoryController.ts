import { Request, Response } from 'express';
import { ImportCategoryUsecase } from './ImportCategoryUsecase';

export class ImportCategoryController {
  constructor(private importCategoryUsecase: ImportCategoryUsecase) {}

  handle(req: Request, res: Response): Response {
    const { file } = req.body;

    this.importCategoryUsecase.execute(file);
    console.log(file);

    return res.send();
  }
}
