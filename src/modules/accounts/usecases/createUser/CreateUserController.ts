import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUsecase } from './CreateUserUsecase';

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;
    const createUserUsecase = container.resolve(CreateUserUsecase);

    await createUserUsecase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return res.status(201).send();
  }
}
