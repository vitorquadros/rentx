import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';

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

  if (!authHeader) {
    throw new AppError('Missing token', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.jwt_secret) as IPayload;

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
