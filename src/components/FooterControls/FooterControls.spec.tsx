import { render, screen, fireEvent } from '@testing-library/react';
import debounce from '@mui/utils/debounce';
import FooterControls from './FooterControls';

const createNewTicket: jest.Mock = jest.fn();
jest.mock('../../utils/contexts/ticket.context', () => ({
  useTickets: () => ({ createNewTicket }),
}));

jest.mock('@mui/utils/debounce');

describe('FooterControls', () => {
  beforeEach(() => {
    createNewTicket.mockReset();
  });

  it('renders the footer controls correctly', async () => {
    render(<FooterControls />);

    const [createRandomlyButton, createNewButton] = await screen.findAllByTestId('button-control');

    expect(createRandomlyButton).toBeTruthy();
    expect(createNewButton).toBeTruthy();
  });

  it('calls createNewTicket when "Create Randomly" button is clicked', async () => {
    // We had to mock debounce call, to ignore its scheduling execution
    const debounceMock = debounce as jest.Mock<typeof debounce>;
    debounceMock.mockImplementation((func: (...args: any[]) => any) => func);

    render(<FooterControls />);

    const [createRandomlyButton] = await screen.findAllByTestId('button-control');

    fireEvent.click(createRandomlyButton);

    expect(createNewTicket).toHaveBeenCalledTimes(1);
  });

  it('shows an alert when "Create New" button is clicked', async () => {
    global.alert = jest.fn();

    render(<FooterControls />);

    const [, createNewButton] = await screen.findAllByTestId('button-control');

    fireEvent.click(createNewButton);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledWith("I'm just compounding the layout. In fact, I'm doing nothing 😄");
  });
});
