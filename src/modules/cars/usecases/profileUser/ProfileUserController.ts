import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserUsecase } from './ProfileUserUsecase';

export class ProfileUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const profileUserUsecase = container.resolve(ProfileUserUsecase);

    const user = await profileUserUsecase.execute(id);
    return res.json(user);
  }
}
