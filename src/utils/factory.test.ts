import { factory } from './factory';

describe('Ticket Factories', () => {
  test('withId factory creates a ticket with an ID', () => {
    const ticket = factory.ticket.withId.build();

    expect(ticket._id).toBeDefined();
    expect(typeof ticket._id).toBe('string');
    expect(ticket.client).toBeDefined();
    expect(ticket.status).toBeDefined();
    expect(ticket.issue).toBeDefined();
    expect(ticket.deadline).toBeDefined();
  });

  test('withoutId factory creates a ticket without an ID', () => {
    const ticket = factory.ticket.withoutId.build();

    expect(ticket).not.toHaveProperty('_id');
    expect(ticket.client).toBeDefined();
    expect(ticket.status).toBeDefined();
    expect(ticket.issue).toBeDefined();
    expect(ticket.deadline).toBeDefined();
  });
});
