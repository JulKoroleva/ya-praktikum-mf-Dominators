import { NextFunction, Request, Response } from 'express';
import { getTheme, setTheme } from '../handlers';

class ThemeController {
  async getTheme(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const darkTheme = await getTheme(Number(id));
      res.send({ darkTheme });
    } catch (err) {
      next(err);
    }
  }

  async updateTheme(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { darkTheme } = req.body;
      await setTheme(Number(id), darkTheme);
    } catch (err) {
      next(err);
    }
  }
}

const themeController = new ThemeController();

export { themeController };
