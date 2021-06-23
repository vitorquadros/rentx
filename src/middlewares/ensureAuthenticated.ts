import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

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
    throw new Error('Missing token');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch {
    throw new Error('Invalid token');
  }
}
