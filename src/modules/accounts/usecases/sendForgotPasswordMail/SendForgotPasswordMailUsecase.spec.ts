import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUsecase } from './SendForgotPasswordMailUsecase';

let sendForgotPasswordMailUsecase: SendForgotPasswordMailUsecase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUsecase = new SendForgotPasswordMailUsecase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  test('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '027972',
      email: 'test@dev.com',
      name: 'Tester',
      password: 'pass',
    });

    await sendForgotPasswordMailUsecase.execute('test@dev.com');

    expect(sendMail).toHaveBeenCalled();
  });

  test('Should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUsecase.execute('test@dev.com')
    ).rejects.toEqual(new AppError('User does not exists'));
  });

  test('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: '000001',
      email: 'test@dev.com',
      name: 'Tester',
      password: 'pass',
    });

    await sendForgotPasswordMailUsecase.execute('test@dev.com');

    expect(generateTokenMail).toBeCalled();
  });
});
