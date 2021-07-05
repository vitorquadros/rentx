import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserUsecase } from './ResetPasswordUserUsecase';

export class ResetPasswordUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;

    const { password } = req.body;

    const resetPasswordUserUsecase = container.resolve(
      ResetPasswordUserUsecase
    );

    await resetPasswordUserUsecase.execute({ token: String(token), password });

    return res.send();
  }
}
