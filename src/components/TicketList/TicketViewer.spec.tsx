import debounce from '@mui/utils/debounce';
import { render, screen, fireEvent } from '@testing-library/react';

import { useTickets } from '../../utils/contexts/ticket.context';
import TicketViewer from './TicketViewer';
import { Ticket } from '../../models/ticket.model';

jest.mock('../../utils/contexts/ticket.context', () => ({
  useTickets: jest.fn(),
}));

jest.mock('@mui/utils/debounce');

describe('TicketViewer', () => {
  const updateTicketByIdMock = jest.fn();

  const position = 0;
  const ticket = {
    _id: '123',
    client: 'John Doe',
    status: 'open',
    issue: 'Sample issue',
    deadline: new Date('2020/01/01'),
    getFormattedDeadline: jest.fn(() => '2020/01/01'),
    getOppositeStatus: jest.fn(),
    getFlagStatus: jest.fn(),
  };

  beforeEach(() => {
    updateTicketByIdMock.mockClear();
    (useTickets as jest.Mock).mockReturnValue({
      updateTicketById: updateTicketByIdMock,
    });
  });

  it('renders the ticket viewer component correctly', () => {
    render(<TicketViewer ticket={ticket as unknown as Ticket} position={position} />);

    const ticketViewer = screen.getByTestId('ticket-viewer');
    const ticketIndex = screen.getByTestId('ticket-index');
    const ticketDate = screen.getByTestId('ticket-date');
    const ticketSwitcher = screen.getByTestId('ticket-switcher');
    const ticketStatus = screen.getByTestId('ticket-status');
    const ticketMessage = screen.getByTestId('ticket-message');

    expect(ticketViewer).toBeDefined();
    expect(ticketIndex.textContent).toBe(`${position + 1}. ${ticket.client}`);
    expect(ticketDate.textContent).toBe('2020/01/01');
    expect(ticketSwitcher).toBeDefined();
    expect(ticketStatus).toBeDefined();
    expect(ticketMessage.getAttribute('placeholder')).toBe('Message');
    expect(ticketMessage.getAttribute('unselectable')).toBe('on');
    expect((ticketMessage as HTMLTextAreaElement).readOnly).toBeTruthy();
    expect((ticketMessage as HTMLTextAreaElement).value).toBe('Sample issue');
  });

  it('calls updateTicketById with the correct parameters when the switch is toggled', async () => {
    // We had to mock debounce call, to ignore its scheduling execution
    const debounceMock = debounce as jest.Mock<typeof debounce>;
    debounceMock.mockImplementation((func: (...args: any[]) => any) => func);

    render(<TicketViewer ticket={ticket as unknown as Ticket} position={position} />);

    const containerSwitcher = screen.getByTestId('ticket-switcher');
    const ticketSwitcher = containerSwitcher.querySelector('input[type="checkbox"]');

    fireEvent.click(ticketSwitcher as HTMLInputElement);

    expect(updateTicketByIdMock).toHaveBeenCalledTimes(1);
    expect(updateTicketByIdMock).toHaveBeenCalledWith(ticket._id, ticket.getOppositeStatus());
  });
});
