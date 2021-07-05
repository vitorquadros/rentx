import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUsecase } from './RefreshTokenUsecase';

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers['x-access-token'] || req.query.token;

    const refreshTokenUsecase = container.resolve(RefreshTokenUsecase);

    const refresh_token = await refreshTokenUsecase.execute(token);

    return res.json(refresh_token);
  }
}
