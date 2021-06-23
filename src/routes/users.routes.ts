import { Router } from 'express';
import multer from 'multer';
import { CreateUserController } from '../modules/accounts/usecases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/usecases/updateUserAvatar/UpdateUserAvatarController';
import uploadConfig from '../config/upload';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updaterUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updaterUserAvatarController.handle
);
