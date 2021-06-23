import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUsecase } from './AuthenticateUserUsecase';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateUserUsecase = container.resolve(AuthenticateUserUsecase);

    const token = await authenticateUserUsecase.execute({ email, password });

    return res.json(token);
  }
}
