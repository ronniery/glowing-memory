import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useTickets } from '../../utils/contexts/ticket.context';
import TicketList from './TicketList';
import { factory } from '../../utils/factory';

jest.mock('../../utils/contexts/ticket.context', () => ({
  useTickets: jest.fn(),
}));

describe('TicketList', () => {
  const tickets = factory.ticket.withId.buildList(2);
  const createNewTicketMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTickets as jest.Mock).mockReturnValue({
      tickets,
      createNewTicket: createNewTicketMock,
    });
  });

  it('renders no ticket message when there are no tickets', () => {
    (useTickets as jest.Mock).mockReturnValue({
      tickets: [],
      createNewTicket: createNewTicketMock,
    });

    render(<TicketList />);

    const noTicketMessage = screen.getByText(/There are no tickets created yet/i);
    const createRandomlyLink = screen.getByTestId('link-create-randomly');

    expect(noTicketMessage).toBeDefined();
    expect(createRandomlyLink).toBeDefined();

    // Click on link to create a new ticket
    userEvent.click(createRandomlyLink);

    expect(createNewTicketMock).toHaveBeenCalledTimes(1);
  });

  it('renders the ticket section when there are tickets', () => {
    render(<TicketList />);

    const ticketViewers = screen.getAllByTestId('ticket-viewer');
    const createRandomlyLink = screen.queryByRole('link', {
      name: /create randomly/i,
    });

    expect(ticketViewers).toHaveLength(tickets.length);
    expect(createRandomlyLink).toBeNull();
  });
});
