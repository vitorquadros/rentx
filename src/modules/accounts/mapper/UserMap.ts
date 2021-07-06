import { IUserResponseDTO } from '../DTOs/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
  }: User): IUserResponseDTO {
    return { email, name, id, avatar, driver_license };
  }
}
