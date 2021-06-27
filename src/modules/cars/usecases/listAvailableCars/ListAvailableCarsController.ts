import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUsecase } from './ListAvailableCarsUsecase';

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const listAvailableCarsUsecase = container.resolve(
      ListAvailableCarsUsecase
    );

    const cars = await listAvailableCarsUsecase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return res.json(cars);
  }
}
