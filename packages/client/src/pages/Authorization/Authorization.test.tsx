import { Authorization } from './Authorization';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/customRender';
import { authorizationPageFields } from './AuthorizationPageData';
import { HEADERS } from '@/constants/headers';
import { REQUIRED_FIELD_ERROR } from '@/constants/letters';

describe('Authorization test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    customRender(<Authorization />);
  });

  test('render', () => {
    expect(screen.getByText(HEADERS.authorization)).toBeDefined();
  });

  test('required fields', async () => {
    await user.click(screen.getByText(/Sign in/i));

    expect(screen.getAllByText(REQUIRED_FIELD_ERROR)).toHaveLength(
      authorizationPageFields.filter(field => field.isRequired).length,
    );
  });
});
