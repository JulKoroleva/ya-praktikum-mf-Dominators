import { Theme } from '../init';
import { ITheme } from '../models';

export async function getTheme(userId: ITheme['userId']) {
  const result = await Theme.findOne({ where: { userId }, attributes: ['darkTheme'] });

  return Boolean(result);
}

export async function setTheme(userId: ITheme['userId'], darkTheme: ITheme['darkTheme']) {
  const [result] = await Theme.findOrCreate({ where: { userId } });

  result.darkTheme = darkTheme;

  await result.save();
}
