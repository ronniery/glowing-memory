import React, { ReactNode, useEffect } from "react";
import debounce from "@mui/utils/debounce";

import { Ticket, TicketStatus } from "../models/ticket.model";
import {
  createTicket,
  getTickets,
  updateTicket,
} from "../services/ticket.service";
import { factory } from "../utils/factory";

type ContextProps = {
  tickets: Ticket[];
  createNewTicket: (ticket?: Ticket) => Promise<Ticket>;
  updateTicketById: (tickedId: string, status: TicketStatus) => Promise<void>;
};

export const TicketContext = React.createContext<ContextProps>({
  tickets: [],
  createNewTicket: async () => ({} as Ticket),
  updateTicketById: async () => {},
});

const TicketProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);

  const createNewTicket = debounce(async (ticket?: Ticket): Promise<Ticket> => {
    const _ticket = ticket ?? factory.ticket.withoutId.build();
    const createdTicket = await createTicket(_ticket);
    setTickets([...tickets, createdTicket]);
    return createdTicket;
  }, 300);

  const updateTicketById = debounce(
    async (ticketId: string, status: TicketStatus) => {
      const serverTicket = await updateTicket(ticketId, status);
      const updatedTickets = tickets.flatMap((ticket) =>
        ticket._id === ticketId
          ? new Ticket({ ...ticket, ...serverTicket })
          : ticket
      );

      setTickets(updatedTickets);
    },
    300
  );

  const loadAllTickets = async (): Promise<void> => {
    setTickets(await getTickets());
  };

  useEffect(() => {
    loadAllTickets();
  }, []);

  return (
    <TicketContext.Provider
      value={{ tickets, createNewTicket, updateTicketById }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;
