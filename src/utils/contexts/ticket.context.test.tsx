import { render, act, fireEvent } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import TicketProvider, { useTickets } from './ticket.context';
import { createTicket, getTickets, updateTicket } from '../../services/ticket.service';
import { factory } from '../factory';

jest.mock('../../services/ticket.service', () => ({
  createTicket: jest.fn(),
  getTickets: jest.fn(),
  updateTicket: jest.fn(),
}));

describe('TicketProvider', () => {
  const ticketsMock = factory.ticket.withId.buildList(2);

  const TestComponent = () => {
    const { tickets, createNewTicket, updateTicketById } = useTickets();

    return (
      <>
        <div data-testid="ticket-count">{tickets.length}</div>
        <button data-testid="create-ticket-btn" onClick={async () => await createNewTicket()}>
          Create Ticket
        </button>
        <button data-testid="update-ticket-btn" onClick={async () => await updateTicketById('1', 'closed')}>
          Update Ticket
        </button>
      </>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createTicket as jest.Mock).mockResolvedValue({ _id: '3', client: 'Alice', status: 'open' });
    (updateTicket as jest.Mock).mockResolvedValue('');
    (getTickets as jest.Mock).mockResolvedValue(ticketsMock);
  });

  it('renders the TicketProvider and provides the ticket context', async () => {
    const { getByTestId } = await act(async () => {
      return render(
        <SnackbarProvider>
          <TicketProvider>
            <TestComponent />
          </TicketProvider>
        </SnackbarProvider>
      );
    });

    const ticketCount = getByTestId('ticket-count');
    const createButton = getByTestId('create-ticket-btn');
    const updateButton = getByTestId('update-ticket-btn');

    expect(ticketCount.innerHTML).toEqual('2');

    fireEvent.click(createButton);
    expect(createTicket).toHaveBeenCalledTimes(1);

    fireEvent.click(updateButton);
    expect(updateTicket).toHaveBeenCalledTimes(1);
    expect(updateTicket).toHaveBeenCalledWith('1', 'closed');
  });

  it('loads tickets on component mount', async () => {
    await act(async () => {
      render(
        <SnackbarProvider>
          <TicketProvider>
            <TestComponent />
          </TicketProvider>
        </SnackbarProvider>
      );
    });

    expect(getTickets).toHaveBeenCalledTimes(1);
  });
});
