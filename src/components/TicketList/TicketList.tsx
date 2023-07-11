import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";

import {
  NoTicketContainer,
  TicketContainer,
  TicketSection,
} from "./TicketList.styled";
import TicketViewer from "./TicketViewer";
import { TicketContext } from "../../contexts/ticket.context";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";

const TicketList: React.FC = (): JSX.Element => {
  const { tickets, createNewTicket } = useContext(TicketContext);

  return (
    <TicketContainer
      columns={{ xs: 12 }}
      container
      justifyContent="flex-start"
      alignContent="flex-start"
    >
      {tickets.length === 0 ? (
        <NoTicketContainer item container xs={12} md={6}>
          <Typography fontSize={18}>
            There are no tickets created yet, please click on
            <br /> ➡️
            <Link href="#" onClick={() => createNewTicket()}>
              Create Randomly
            </Link>{" "}
            to create your first ticket!
          </Typography>
        </NoTicketContainer>
      ) : (
        <TicketSection item container xs={12} md={6}>
          {tickets.map((ticket, idx) => (
            <TicketViewer key={uuidv4()} position={idx} ticket={ticket} />
          ))}
        </TicketSection>
      )}

      <Grid item sx={{ display: { xs: "none", md: "block" } }} xs={6} />
    </TicketContainer>
  );
};

export default TicketList;
