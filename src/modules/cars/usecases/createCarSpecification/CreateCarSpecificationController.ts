import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUsecase } from './CreateCarSpecificationUsecase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationUsecase = container.resolve(
      CreateCarSpecificationUsecase
    );

    const cars = await createCarSpecificationUsecase.execute({
      car_id: id,
      specifications_id,
    });

    return res.json(cars);
  }
}
