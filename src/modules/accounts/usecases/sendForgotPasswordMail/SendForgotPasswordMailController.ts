import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUsecase } from './SendForgotPasswordMailUsecase';

export class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordMailUsecase = container.resolve(
      SendForgotPasswordMailUsecase
    );

    await sendForgotPasswordMailUsecase.execute(email);

    return res.send();
  }
}
