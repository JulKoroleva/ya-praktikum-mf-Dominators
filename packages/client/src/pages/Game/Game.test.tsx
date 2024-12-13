import { Game } from './Game';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/customRender';
import { hints } from './components/StartGame/utils/hints';

jest.setTimeout(10000);

describe('Game test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    customRender(<Game />);
  });

  test('game training', async () => {
    expect(screen.getByText(hints[0].text, { exact: false })).toBeDefined();

    for (let i = 1; i < hints.length; i += 1) {
      await user.click(screen.getByText(/Next/i));
      expect(screen.getByText(hints[i].text, { exact: false })).toBeDefined();
    }

    await user.click(screen.getByText(/Ready!/i));
    await waitFor(() => expect(screen.getByText('Score:')).toBeDefined(), { timeout: 5000 });
  });
});
