import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";

import { TicketContainer, TicketSection } from "./TicketList.styled";
import TicketViewer from "./TicketViewer";
import { TicketContext } from "../../contexts/ticket.context";

const TicketList: React.FC = (): JSX.Element => {
  const { tickets } = useContext(TicketContext);

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
