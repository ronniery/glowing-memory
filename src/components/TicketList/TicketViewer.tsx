import { Grid, Typography, Switch } from '@mui/material';
import debounce from '@mui/utils/debounce';

import { TicketClient, TicketStatus, TicketIssue, TicketContent } from './TicketViewer.styled';
import { useTickets } from '../../utils/contexts/ticket.context';
import { Ticket } from '../../models/ticket.model';

export type TicketViewerProps = {
  ticket: Ticket;
  position: number;
};

const TicketViewer: React.FC<TicketViewerProps> = ({ ticket, position }): JSX.Element => {
  const { updateTicketById } = useTickets();
  const debouncedUpdateTicketById = debounce(updateTicketById, 300);

  return (
    <TicketContent data-testid="ticket-viewer" container alignItems="center" justifyContent="space-between">
      <Grid item zeroMinWidth xs={6}>
        <TicketClient data-testid="ticket-index" noWrap title={ticket.client}>
          {position + 1}. {ticket.client}
        </TicketClient>
      </Grid>
      <Grid item xs={2}>
        <Typography data-testid="ticket-date">{ticket.getFormattedDeadline()}</Typography>
      </Grid>
      <Grid item>
        <Switch
          data-testid="ticket-switcher"
          color="success"
          checked={ticket.status === 'open'}
          onChange={async () => {
            await debouncedUpdateTicketById(ticket._id as string, ticket.getOppositeStatus());
          }}
        />
        <TicketStatus data-testid="ticket-status" color={ticket.getFlagStatus()} checked />
      </Grid>
      <Grid item xs={12}>
        <TicketIssue
          data-testid="ticket-message"
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
