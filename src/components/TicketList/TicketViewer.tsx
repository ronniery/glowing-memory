import { Grid, Typography, Switch } from "@mui/material";
import date from "date-and-time";

import {
  TicketClient,
  TicketStatus,
  TicketIssue,
  TicketContent,
} from "./TicketViewer.styled";
import { Ticket } from "../../models/interfaces/ticket.interface";

export type TicketViewerProps = {
  ticket: Ticket;
  position: number;
};

const TicketViewer: React.FC<TicketViewerProps> = ({
  ticket,
  position,
}): JSX.Element => {
  return (
    <TicketContent container alignItems="center" justifyContent="space-between">
      <Grid item zeroMinWidth xs={6}>
        <TicketClient noWrap title={ticket.client}>
          {position + 1}. {ticket.client}
        </TicketClient>
      </Grid>
      <Grid item xs={2}>
        <Typography>
          {date.format(new Date(ticket.deadline), "DD/MM/YYYY")}
        </Typography>
      </Grid>
      <Grid item>
        <Switch color="success" />
        <TicketStatus color="warning" checked />
      </Grid>
      <Grid xs={12}>
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
