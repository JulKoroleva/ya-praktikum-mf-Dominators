import { Authorization } from './Authorization';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/customRender';
import { authorizationPageFields } from './AuthorizationPageData';

describe('Authorization test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    customRender(<Authorization />);
  });

  test('render', () => {
    expect(screen.getByText('Authorization')).toBeDefined();
  });

  test('required fields', async () => {
    await user.click(screen.getByText(/Sign in/i));

    expect(screen.getAllByText('This field is required')).toHaveLength(
      authorizationPageFields.filter(field => field.isRequired).length,
    );
  });
});
