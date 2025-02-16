// const axios = require('axios');
import { Unauthorized } from '../errors';
import { Request, Response, NextFunction } from 'express';

const defaulUserData = {
  id: 0,
  first_name: 'Local',
  second_name: 'User',
  login: 'LocalUser',
  avatar: '',
  email: '',
  phone: '',
};

// const isDev = process.env.NODE_ENV === 'development';

export const checkAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // const isYaProd = req.get('Referer')?.includes('.ya-praktikum.tech');
  try {
    // if (isDev && !isYaProd) {
      // Если на локальном сервере работаем, проверку авторизации делаем по куке auth: true
      // которая установливается на фронте в момент успешной авторизации
      // устанавливаем моковые данные о пользователе
      const { auth } = req.cookies;

      if (!auth) {
        return next(new Unauthorized('Unauthorized'));
      }

      res.locals.user = defaulUserData;
      return next();
    // } else {
    //   // Если на проде работаем то проверяем куки authCookie и uuid
    //   // полученные при успешной авторизации с ya-praktikum.tech/api/v2
    //   // дергаем ручку /auth/user для проверки что токен не протух и  установливаем полученные данные о пользователе
    //   const { authCookie, uuid } = req.cookies;

    //   if (!authCookie || !uuid) {
    //     return next(new Unauthorized('Unauthorized'));
    //   }

    //   const apiResponse = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
    //     headers: {
    //       Cookie: `authCookie=${authCookie}; uuid=${uuid}`,
    //     },
    //   });

    //   if (apiResponse.status === 200) {
    //     res.locals.user = apiResponse.data;
    //     return next();
    //   }

    //   return next(new Unauthorized('Unauthorized'));
    // }
  } catch (e) {
    next(e);
  }
};
