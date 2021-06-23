import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUsecase } from './UpdateUserAvatarUsecase';

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const updateUserAvatarUsecase = container.resolve(UpdateUserAvatarUsecase);

    await updateUserAvatarUsecase.execute({ user_id: id, avatar_file });

    return res.status(204).send();
  }
}
