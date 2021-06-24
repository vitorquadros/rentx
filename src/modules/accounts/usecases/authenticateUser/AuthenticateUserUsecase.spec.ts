import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUsecase } from '@modules/accounts/usecases/createUser/CreateUserUsecase';
import { AuthenticateUserUsecase } from './AuthenticateUserUsecase';

let authenticateUserUsecase: AuthenticateUserUsecase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUsecase: CreateUserUsecase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUsecase = new AuthenticateUserUsecase(
      usersRepositoryInMemory
    );
    createUserUsecase = new CreateUserUsecase(usersRepositoryInMemory);
  });

  test('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000-00',
      email: 'user@test.com',
      password: 'password_test',
      name: 'test user',
    };

    await createUserUsecase.execute(user);

    const result = await authenticateUserUsecase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  test('Should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUsecase.execute({
        email: 'user@test.com',
        password: 'testpassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('Should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000-00',
        email: 'user@test.com',
        password: 'testpassword',
        name: 'Test User',
      };

      await createUserUsecase.execute(user);

      await authenticateUserUsecase.execute({
        email: user.email,
        password: 'incorrect_password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
