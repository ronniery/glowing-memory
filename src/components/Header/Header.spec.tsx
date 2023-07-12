import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders the header component correctly', () => {
    render(<Header />);

    const icon = screen.getByTestId('header-icon');
    const title = screen.getByTestId('header-title');

    expect(icon).toBeDefined();
    expect(title).toBeDefined();
  });

  it('renders the correct icon with the specified color', () => {
    render(<Header />);

    const icon = screen.getByTestId('header-icon');

    expect(icon).toBeDefined();
    expect(icon.getAttribute('color')).toEqual('#1d476f');
  });

  it('renders the heading with the correct typography', () => {
    render(<Header />);

    const title = screen.getByTestId('header-title');

    expect(title).toBeDefined();
    expect(title.innerHTML.includes('Timeline')).toBeTruthy();
  });
});
