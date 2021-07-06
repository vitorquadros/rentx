import { classToClass } from 'class-transformer';
import { IUserResponseDTO } from '../DTOs/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
