/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import debounce from "@mui/utils/debounce";

import { Ticket, TicketStatus } from "../../models/ticket.model";
import {
  createTicket,
  getTickets,
  updateTicket,
} from "../../services/ticket.service";
import { factory } from "../factory";

type ContextProps = {
  tickets: Ticket[];
  createNewTicket: (ticket?: Ticket) => Promise<Ticket | undefined>;
  updateTicketById: (tickedId: string, status: TicketStatus) => Promise<void>;
};

export const TicketContext = createContext<ContextProps>({
  tickets: [],
  createNewTicket: async () => ({} as Ticket),
  updateTicketById: async () => {},
});

const TicketProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const createNewTicket = debounce(
    async (ticket?: Ticket): Promise<Ticket | undefined | any> => {
      try {
        const _ticket = ticket ?? factory.ticket.withId.build();
        const createdTicket = await createTicket(_ticket);
        setTickets([...tickets, createdTicket]);
        return createdTicket;
      } catch (err) {
        enqueueSnackbar((err as Error).message, { variant: "error" });
      }
    },
    300
  );

  const updateTicketById = debounce(
    async (ticketId: string, status: TicketStatus) => {
      try {
        const serverTicket = await updateTicket(ticketId, status);
        const updatedTickets = tickets.flatMap((ticket) =>
          ticket._id === ticketId
            ? new Ticket({ ...ticket, ...serverTicket })
            : ticket
        );

        setTickets(updatedTickets);
      } catch (err) {
        enqueueSnackbar((err as Error).message, { variant: "error" });
      }
    },
    300
  );

  const loadAllTickets = async (): Promise<void> => {
    try {
      setTickets(await getTickets());
    } catch (err) {
      enqueueSnackbar((err as Error).message, { variant: "error" });
    }
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
