import { CanvasComponent } from './CanvasComponent';
import { screen, render } from '@testing-library/react';

describe('Canvas test', () => {
  beforeEach(() => {
    render(<CanvasComponent endGameCallback={() => {}} />);
  });

  test('render', () => {
    expect(screen.getByText('Игрок:')).toBeDefined();
  });

  test('canvas exist', async () => {
    expect(screen.getByTestId('canvas')).toBeDefined();
  });
});
