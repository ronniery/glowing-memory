import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonControl from './ButtonControl';

describe('ButtonControl', () => {
  const label = 'Submit';
  const onClickMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button with the correct label', () => {
    render(<ButtonControl label={label} onClick={onClickMock} />);

    const button = screen.getByTestId('button-control');

    expect(button).toBeTruthy();
  });

  it('calls the onClick callback when the button is clicked', () => {
    render(<ButtonControl label={label} onClick={onClickMock} />);

    const button = screen.getByTestId('button-control');

    userEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders the button with the end icon', () => {
    render(<ButtonControl label={label} onClick={onClickMock} />);

    const icon = screen.getByTestId('ChevronRightIcon');

    expect(icon).toBeTruthy();
  });

  it('renders the button with the "contained" variant and "medium" size', () => {
    render(<ButtonControl label={label} onClick={onClickMock} />);

    const button = screen.getByTestId('button-control');
    const classList = (button.attributes.getNamedItem('class')?.value || []) as string[];

    expect(classList.includes('MuiButton-contained')).toBeTruthy();
    expect(classList.includes('MuiButton-sizeMedium')).toBeTruthy();
  });
});
