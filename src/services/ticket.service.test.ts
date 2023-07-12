import axios, { AxiosHeaders, AxiosRequestConfig, AxiosResponseTransformer, InternalAxiosRequestConfig } from 'axios';
import { getTickets, createTicket, updateTicket } from './ticket.service';
import { Ticket, TicketStatus } from '../models/ticket.model';
import { factory } from '../utils/factory';

describe('Ticket Service', () => {
  const mockAxios = axios as jest.Mocked<typeof axios>;

  const mockTransformResponse = (response: Ticket | Ticket[], options: AxiosRequestConfig<unknown> | undefined) => {
    const axiosFunctionTransformer = options?.transformResponse as AxiosResponseTransformer;
    const transformResponse = axiosFunctionTransformer.bind({} as InternalAxiosRequestConfig);
    transformResponse(JSON.stringify({ tickets: response }), {} as AxiosHeaders);

    return Promise.resolve({ data: response })
  }

  afterEach(() => {
    mockAxios.create.mockReturnThis();
    mockAxios.get.mockReset();
    mockAxios.post.mockReset();
    mockAxios.put.mockReset();
  });

  test('getTickets retrieves tickets correctly', async () => {
    const mockTickets = factory.ticket.withId.buildList(2)

    mockAxios.get
      .mockImplementationOnce((_url, options) =>
        mockTransformResponse(mockTickets, options)
      );

    const allTickets = await getTickets();

    expect(allTickets).toEqual(mockTickets);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('/tickets', expect.any(Object));
  });

  test('createTicket creates a ticket correctly', async () => {
    const mockTicket = factory.ticket.withId.build();

    mockAxios.post
      .mockImplementationOnce((_url, _data, options) =>
        mockTransformResponse(mockTicket, options)
      )

    const createdTicket = await createTicket(mockTicket as Ticket);

    expect(createdTicket).toEqual(mockTicket);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(mockAxios.post).toHaveBeenCalledWith('/tickets', mockTicket, expect.any(Object));
  });

  // test.skip('updateTicket updates a ticket correctly', async () => {
  //   const ticketId = '1';
  //   const mockTicket = factory.ticket.withId.build({ _id: ticketId, status: 'closed' });
  //   const newStatus: TicketStatus = 'closed';

  //   // const mockTicket = { _id: ticketId, issue: 'Ticket 1', client: 'Client 1', status: newStatus, deadline: '2023-07-31' };

  //   const expectedTicket = new Ticket(mockTicket);

  //   mockAxios.put
  //     .mockResolvedValueOnce({ data: JSON.stringify(expectedTicket) });

  //   const updatedTicket = await updateTicket(ticketId, newStatus);

  //   expect(updatedTicket).toEqual(expectedTicket);
  //   expect(mockAxios.put).toHaveBeenCalledTimes(1);
  //   expect(mockAxios.put).toHaveBeenCalledWith(`/tickets/${ticketId}`, { status: newStatus }, expect.any(Object));
  // });;
});
