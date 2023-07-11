import React, { ReactNode, useEffect } from "react";
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
  createNewTicket: async () => Promise.resolve({} as Ticket),
  updateTicketById: async () => {},
});

const TicketProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = React.useState<Ticket[]>([]);

  const createNewTicket = async (
    ticket: Ticket = factory.ticket.build()
  ): Promise<Ticket> => {
    const createdTicket = await createTicket(ticket);
    setTickets([...tickets, createdTicket]);
    return createdTicket;
  };

  const updateTicketById = async (ticketId: string, status: TicketStatus) => {
    return updateTicket(ticketId, status);
  };

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
