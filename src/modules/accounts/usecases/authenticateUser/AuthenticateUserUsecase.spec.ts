import { ICreateUserDTO } from '@modules/accounts/DTOs/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUsecase } from '@modules/accounts/usecases/createUser/CreateUserUsecase';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { AuthenticateUserUsecase } from './AuthenticateUserUsecase';

let authenticateUserUsecase: AuthenticateUserUsecase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUsecase: CreateUserUsecase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUsecase = new AuthenticateUserUsecase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
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

  test('Should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUserUsecase.execute({
        email: 'user@test.com',
        password: 'testpassword',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  test('Should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000-00',
      email: 'user@test.com',
      password: 'testpassword',
      name: 'Test User',
    };

    await createUserUsecase.execute(user);

    await expect(
      authenticateUserUsecase.execute({
        email: user.email,
        password: 'incorrect_password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect'));
  });
});
