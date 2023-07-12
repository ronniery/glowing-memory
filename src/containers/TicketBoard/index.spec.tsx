import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TicketBoard from './index';

describe('TicketBoard', () => {
  test('renders TicketBoard component', () => {
    render(<TicketBoard />);

    // Assert that the TicketBoard component is rendered
    const ticketBoardElement = screen.getByTestId('ticket-board');
    expect(ticketBoardElement).toBeInTheDocument();

    // Assert that the Header component is rendered
    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    // Assert that the TicketList component is rendered
    const ticketListElement = screen.getByRole('ticket-list');
    expect(ticketListElement).toBeInTheDocument();

    // Assert that the FooterControls component is rendered
    const footerControlsElement = screen.getByRole('footer-controls');

    expect(footerControlsElement).toBeInTheDocument();
  });
});
