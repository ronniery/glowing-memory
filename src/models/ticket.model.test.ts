import { Ticket } from './ticket.model';
import date from 'date-and-time';

describe('Ticket', () => {
  test('constructor sets properties correctly', () => {
    const json = {
      _id: '1',
      issue: 'Test issue',
      client: 'Test client',
      status: 'open',
      deadline: new Date('2023-07-31'),
    };

    const ticket = new Ticket(json);

    expect(ticket._id).toBe('1');
    expect(ticket.issue).toBe('Test issue');
    expect(ticket.client).toBe('Test client');
    expect(ticket.status).toBe('open');
    expect(ticket.deadline).toEqual(new Date('2023-07-31'));
  });

  test('constructor does not sets _id property when it is not present', () => {
    const json = {
      issue: 'Test issue',
      client: 'Test client',
      status: 'open',
      deadline: new Date('2023-07-31'),
    };

    const ticket = new Ticket(json);

    expect(ticket).not.toHaveProperty('_id');
    expect(ticket.issue).toBe('Test issue');
    expect(ticket.client).toBe('Test client');
    expect(ticket.status).toBe('open');
    expect(ticket.deadline).toEqual(new Date('2023-07-31'));
  });

  test('getFlagStatus returns correct status', () => {
    const today = new Date();

    const expiredTicket = new Ticket({
      issue: 'Expired Ticket',
      client: 'Client',
      status: 'open',
      deadline: date.addDays(today, -1),
    });
    expect(expiredTicket.getFlagStatus()).toBe('error');

    const validTicket = new Ticket({
      issue: 'Valid Ticket',
      client: 'Client',
      status: 'open',
      deadline: date.addDays(today, 1),
    });
    expect(validTicket.getFlagStatus()).toBe('warning');

    const closedTicket = new Ticket({
      issue: 'Closed Ticket',
      client: 'Client',
      status: 'closed',
      deadline: date.addDays(today, 1),
    });
    expect(closedTicket.getFlagStatus()).toBe('success');
  });

  test('getOppositeStatus returns opposite status', () => {
    const ticket = new Ticket({
      issue: 'Test issue',
      client: 'Test client',
      status: 'open',
      deadline: new Date('2023-07-31'),
    });

    expect(ticket.getOppositeStatus()).toBe('closed');
  });

  test('getFormattedDeadline returns formatted deadline', () => {
    const ticket = new Ticket({
      issue: 'Test issue',
      client: 'Test client',
      status: 'open',
      deadline: new Date('2023-07-31'),
    });

    const formattedDeadline = date.format(new Date('2023-07-31'), 'DD/MM/YYYY');
    expect(ticket.getFormattedDeadline()).toBe(formattedDeadline);
  });
});
