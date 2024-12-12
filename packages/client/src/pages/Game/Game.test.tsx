import { Game } from './Game';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/customRender';

jest.setTimeout(10000);

describe('Game test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    customRender(<Game />);
  });

  test('render', () => {
    expect(screen.getByText('Добро пожаловать в игру', { exact: false })).toBeDefined();
  });

  test('game training', async () => {
    await user.click(screen.getByText(/Next/i));
    expect(screen.getByText('Собирайте небольшие клетки', { exact: false })).toBeDefined();

    await user.click(screen.getByText(/Next/i));
    expect(screen.getByText('Избегайте более крупных игроков', { exact: false })).toBeDefined();

    await user.click(screen.getByText(/Next/i));
    expect(screen.getByText('Используйте зелёные вирусы', { exact: false })).toBeDefined();

    await user.click(screen.getByText(/Next/i));
    expect(screen.getByText('Разделяйтесь (клавиша Space)', { exact: false })).toBeDefined();

    await user.click(screen.getByText(/Ready!/i));
    expect(screen.getByText('3', { exact: false })).toBeDefined();

    await new Promise(r => setTimeout(r, 5000));
    expect(screen.getByText('Score:')).toBeDefined();
  });
});
