import { useContext } from "react";
import { Grid, Typography, Switch } from "@mui/material";

import {
  TicketClient,
  TicketStatus,
  TicketIssue,
  TicketContent,
} from "./TicketViewer.styled";
import { Ticket } from "../../models/ticket.model";
import { TicketContext } from "../../utils/contexts/ticket.context";

export type TicketViewerProps = {
  ticket: Ticket;
  position: number;
};

const TicketViewer: React.FC<TicketViewerProps> = ({
  ticket,
  position,
}): JSX.Element => {
  const { updateTicketById } = useContext(TicketContext);

  return (
    <TicketContent data-testid="ticket-viewer" container alignItems="center" justifyContent="space-between">
      <Grid item zeroMinWidth xs={6}>
        <TicketClient noWrap title={ticket.client}>
          {position + 1}. {ticket.client}
        </TicketClient>
      </Grid>
      <Grid item xs={2}>
        <Typography>{ticket.getFormattedDeadline()}</Typography>
      </Grid>
      <Grid item>
        <Switch
          color="success"
          checked={ticket.status === "open"}
          onChange={() => {
            updateTicketById(ticket._id, ticket.getOppositeStatus());
          }}
        />
        <TicketStatus color={ticket.getFlagStatus()} checked />
      </Grid>
      <Grid item xs={12}>
        <TicketIssue
          placeholder="Message"
          readOnly
          unselectable="on"
          defaultValue={ticket.issue}
        />
      </Grid>
    </TicketContent>
  );
};

export default TicketViewer;
