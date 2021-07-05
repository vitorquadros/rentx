import { SendForgotPasswordMailController } from '@modules/accounts/usecases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

export const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
