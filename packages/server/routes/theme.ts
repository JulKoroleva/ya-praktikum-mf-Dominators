import { Router } from 'express';
import { themeController } from '../controllers';
import { validation } from '../middlewares';

export const themeRouter = Router();

themeRouter.get('/theme/:id', validation.idParams, themeController.getTheme);

themeRouter.put('/theme/:id', validation.updateTheme, themeController.updateTheme);
