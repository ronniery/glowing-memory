export type TicketStatus = 'open' | 'closed';

export interface Ticket {
  _id: string | object;
  client: string;
  issue: string;
  status: TicketStatus;
  deadline: string;
}