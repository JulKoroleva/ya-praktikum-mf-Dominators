import { CanvasComponent } from './CanvasComponent';
import { screen } from '@testing-library/react';
import { customRender } from '@/utils/customRender';

describe('Canvas test', () => {
  beforeEach(() => {
    customRender(
      <CanvasComponent
        // eslint-disable-next-line no-empty-pattern
        endGameCallback={([]) => {}}
        isPaused={false}
        isEndedGame={false}
        onBackButtonClick={() => {}}
      />,
    );
  });

  test('render', () => {
    expect(screen.getByText('Score:')).toBeDefined();
  });

  test('canvas exist', async () => {
    expect(screen.getByTestId('canvas')).toBeDefined();
  });
});
