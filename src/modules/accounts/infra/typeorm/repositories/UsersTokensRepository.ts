import { getRepository, Repository } from 'typeorm';
import { ICreateUserTokenDTO } from '@modules/accounts/DTOs/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UserTokens';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);
    return userToken;
  }

  async findByUserId(user_id: string): Promise<UserTokens[]> {
    const usersTokens = await this.repository.find({
      user_id,
    });

    return usersTokens;
  }
}
