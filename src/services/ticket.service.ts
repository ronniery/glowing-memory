import axios from 'axios';

import { Ticket, TicketStatus } from '../models/ticket.model';

const api = axios.create({
  baseURL: 'http://localhost:46000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  timeout: 1000
});

const getTickets = async (): Promise<Ticket[]> => {
  const { data } = await api.get('/tickets', {
    transformResponse: (data: string): Ticket[] => {
      const { tickets = [] }: { tickets: Record<string, string>[] } = JSON.parse(data) ?? {};

      return tickets.map(ticket => new Ticket(ticket));
    }
  });

  return data;
}

const createTicket = async (ticket: Omit<Ticket, '_id'>): Promise<Ticket> => {
  const { data } = await api.post('/tickets', ticket, {
    transformResponse: (data: string, _headers: Record<string, unknown>, status: number | undefined): Ticket | string => {
      if ([200, 201].includes(status as number)) {
        return new Ticket(JSON.parse(data) ?? {});
      }

      return data;
    }
  });

  return data;
}

const updateTicket = async (ticketId: string, status: TicketStatus): Promise<Ticket> => {
  const { data } = await api.put(`/tickets/${ticketId}`, { status }, {
    transformResponse: (data: string): Ticket => {
      return new Ticket(JSON.parse(data) ?? {});
    }
  });

  return data;
}

export { getTickets, createTicket, updateTicket };