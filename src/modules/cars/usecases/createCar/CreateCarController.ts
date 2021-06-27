import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUsecase } from './CreateCarUsecase';

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = req.body;

    const createCarUsecase = container.resolve(CreateCarUsecase);

    const car = await createCarUsecase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return res.status(201).json(car);
  }
}
