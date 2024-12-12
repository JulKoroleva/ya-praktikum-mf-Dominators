import { Registration } from './Registration';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender } from '@/utils/customRender';
import { registrationPageFields } from './RegistrationPageData';

describe('Registration test', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    customRender(<Registration />);
  });

  test('render', () => {
    expect(screen.getByText('Create account')).toBeDefined();
  });

  test('required fields', async () => {
    await user.click(screen.getByText(/Sign up/i));

    expect(screen.getAllByText('This field is required')).toHaveLength(
      registrationPageFields.filter(field => field.isRequired).length,
    );
  });
});
