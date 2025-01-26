import { Router } from 'express';
import { themeController } from '../controllers';
import { validation } from '../middlewares';

export const themeRouter = Router();

themeRouter.get('/theme/:id', validation.idParams, themeController.getTheme);

themeRouter.patch('/theme/:id', validation.updateTheme, themeController.updateTheme);
