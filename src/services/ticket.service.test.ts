/**
 * @jest-environment node
 */
import nock from 'nock';
import { AxiosError } from 'axios';

import { getTickets, createTicket, updateTicket } from './ticket.service';
import { Ticket } from '../models/ticket.model';
import { factory } from '../utils/factory';
import { serverUrl } from '../utils/constants';

describe('Ticket Service', () => {
  test('getTickets retrieves tickets correctly', async () => {
    const mockTickets = factory.ticket.withId.buildList(2);

    nock(serverUrl).get('/tickets').reply(200, { tickets: mockTickets });

    const allTickets = await getTickets();

    expect(allTickets).toEqual(mockTickets);
  });

  test('createTicket creates a ticket correctly', async () => {
    const mockTicket = factory.ticket.withId.build();

    nock(serverUrl).post('/tickets').reply(201, mockTicket);

    const createdTicket = await createTicket(mockTicket as Ticket);

    expect(createdTicket).toEqual(mockTicket);
  });

  test('createTicket skip ticket creation if status are not between 200 and 201', async () => {
    nock(serverUrl).post('/tickets').reply(400, new Error('Invalid Params'));

    try {
      await createTicket({} as Ticket);
    } catch (e) {
      const axiosErr = e as AxiosError;

      expect(axiosErr instanceof AxiosError).toBeTruthy();
      expect(axiosErr.code).toBe('ERR_BAD_REQUEST');
      expect(axiosErr.response?.data).toBe('{}');
      expect(axiosErr.response?.status).toBe(400);
    }
  });

  test('updateTicket updates a ticket correctly', async () => {
    const mockTicket = factory.ticket.withId.build({ status: 'closed' });

    nock(serverUrl).put('/tickets/1').reply(200, mockTicket);

    const updatedTicket = await updateTicket('1', 'closed');

    expect(updatedTicket).toEqual(mockTicket);
  });
});
