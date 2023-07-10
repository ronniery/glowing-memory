import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";

import { TicketContainer, TicketSection } from "./TicketList.styled";
import { Ticket } from "../../models/interfaces/ticket.interface";
import { factory } from "../../utils/factory";
import TicketViewer from "./TicketViewer";

const TicketList: React.FC = (): JSX.Element => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(factory.ticket.buildList(15));
  }, []);

  return (
    <TicketContainer columns={{ xs: 12 }} container justifyContent="flex-start">
      <TicketSection container xs={12} md={6}>
        {tickets.map((ticket, idx) => (
          <TicketViewer key={uuidv4()} position={idx} ticket={ticket} />
        ))}
      </TicketSection>
      <Grid item sx={{ display: { xs: "none", md: "block" } }} xs={6} />
    </TicketContainer>
  );
};

export default TicketList;
