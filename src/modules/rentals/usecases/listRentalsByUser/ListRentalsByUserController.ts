import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalsByUserUsecase } from './ListRentalsByUserUsecase';

export class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listRentalsByUserUsecase = container.resolve(
      ListRentalsByUserUsecase
    );

    const rentals = await listRentalsByUserUsecase.execute(id);

    return res.status(200).json(rentals);
  }
}
