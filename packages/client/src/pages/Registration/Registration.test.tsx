import { Registration } from './Registration';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/customRender';
import { registrationPageFields } from './RegistrationPageData';
import { HEADERS } from '@/constants/headers';
import { REQUIRED_FIELD_ERROR } from '@/constants/letters';

describe('Registration test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    customRender(<Registration />);
  });

  test('render', () => {
    expect(screen.getByText(HEADERS.registration)).toBeDefined();
  });

  test('required fields', async () => {
    await user.click(screen.getByText(/Sign up/i));

    expect(screen.getAllByText(REQUIRED_FIELD_ERROR)).toHaveLength(
      registrationPageFields.filter(field => field.isRequired).length,
    );
  });
});
