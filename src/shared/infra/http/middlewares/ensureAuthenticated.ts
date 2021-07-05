import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.jwt_refresh_token_secret
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError('User does not exists', 401);
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
