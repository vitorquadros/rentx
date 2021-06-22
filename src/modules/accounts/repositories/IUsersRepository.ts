import { ICreateUserDTO } from '../DTOs/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}
