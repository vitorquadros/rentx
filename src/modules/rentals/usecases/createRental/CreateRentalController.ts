import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUsecase } from './CreateRentalUsecase';

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { expected_return_date, car_id } = req.body;
    const { id } = req.user;

    const createRentalUsecase = container.resolve(CreateRentalUsecase);

    const rental = await createRentalUsecase.execute({
      car_id,
      expected_return_date,
      user_id: id,
    });

    return res.status(201).json(rental);
  }
}
