import App from './App';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from './redux/store/store';
import { ROUTES } from '@/constants/routes';
import { HEADERS } from '@/constants/headers';

// @ts-expect-error
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('hey'),
  }),
);

describe('Full app rendering/routing', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    window.history.pushState({}, '', ROUTES.home());
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  test('render', () => {
    expect(screen.getByText(HEADERS.main)).toBeDefined();
  });

  test('authorization page', async () => {
    await user.click(screen.getByText(/Log in/i));

    expect(window.location.pathname).toBe(ROUTES.authorization());
    expect(screen.getByText(HEADERS.authorization)).toBeDefined();
  });

  test('registration page', async () => {
    await user.click(screen.getByText(/Log in/i));
    await user.click(screen.getByText(/Create account/i));

    expect(window.location.pathname).toBe(ROUTES.registration());
    expect(screen.getByText(HEADERS.registration)).toBeDefined();
  });

  test('leaderboard page', async () => {
    await user.click(screen.getByText(/Leaderboard/i));

    expect(window.location.pathname).toBe(ROUTES.leaderboard());
    expect(screen.getByText(HEADERS.leaderboard)).toBeDefined();
  });

  test('forum page', async () => {
    await user.click(screen.getByText(/Forum/i));

    expect(window.location.pathname).toBe(ROUTES.forum());
    expect(screen.getByText(HEADERS.forum)).toBeDefined();
  });

  test('game page', async () => {
    await user.click(screen.getByText(/Start Game!/i));

    expect(window.location.pathname).toBe(ROUTES.game());
    expect(screen.getByText('Добро пожаловать в игру', { exact: false })).toBeDefined();
  });
});
