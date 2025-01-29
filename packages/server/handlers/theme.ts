import { Theme } from '../init';
import { ITheme } from '../models';

export async function getTheme(userId: ITheme['userId']): Promise<ITheme['darkTheme']> {
  const result = await Theme.findOne({ where: { userId }, attributes: ['darkTheme'] });

  return Boolean(result);
}

export async function setTheme(userId: ITheme['userId'], darkTheme: ITheme['darkTheme']) {
  const [result] = await Theme.findOrCreate({ where: { userId } });

  if ('darkTheme' in result) {
    result.darkTheme = darkTheme;

    await result.save();
  }

  return result;
}
