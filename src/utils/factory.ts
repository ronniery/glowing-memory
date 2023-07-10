import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import date from 'date-and-time';

import { Ticket } from '../models/ticket.model';

const ticket = Factory.define<Ticket>(() => {
  const lastDays = date.addDays(new Date(), -2);
  const nextDays = date.addDays(new Date(), 2);

  return new Ticket({
    client: faker.company.name(),
    status: faker.datatype.boolean() ? 'open' : 'closed',
    issue: faker.lorem.lines({ min: 1, max: 3 }),
    deadline: faker.date.between({ from: lastDays, to: nextDays }).toISOString(),
    _id: uuidv4()
  });
});

export const factory = { ticket };
