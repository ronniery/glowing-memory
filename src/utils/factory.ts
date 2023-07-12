import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import date from 'date-and-time';

import { Ticket } from '../models/ticket.model';

const withId = Factory.define<Ticket>(() => {
  const lastDays = date.addDays(new Date(), -2);
  const nextDays = date.addDays(new Date(), 2);

  return new Ticket({
    client: faker.company.name(),
    status: faker.datatype.boolean() ? 'open' : 'closed',
    issue: faker.lorem.sentence({ min: 26, max: 40 }),
    deadline: faker.date.between({ from: lastDays, to: nextDays }).toISOString(),
    _id: uuidv4(),
  });
});

const withoutId = Factory.define<Omit<Ticket, '_id'>>(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...ticket } = withId.build();
  return new Ticket(ticket);
});

const ticket = { withId, withoutId };

export const factory = { ticket };
