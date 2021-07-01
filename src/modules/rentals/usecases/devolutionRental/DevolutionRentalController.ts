import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUsecase } from './DevolutionRentalUsecase';

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;

    const devolutionRentalUsecase = container.resolve(DevolutionRentalUsecase);

    const rental = await devolutionRentalUsecase.execute({ id, user_id });

    return res.status(200).json(rental);
  }
}
