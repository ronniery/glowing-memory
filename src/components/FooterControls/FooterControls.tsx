import { JSX } from 'react/jsx-runtime';
import Grid from '@mui/material/Grid';

import ButtonControl from './ButtonControl';
import { ExpandableGrid } from './FooterControls.styled';
import { useContext } from 'react';
import { TicketContext } from '../../utils/contexts/ticket.context';

const FooterControls = (): JSX.Element => {
  const { createNewTicket } = useContext(TicketContext);

  return (
    <Grid p={1.5} spacing={2} columns={{ xs: 12 }} container justifyContent="flex-end" role="footer-controls">
      <ExpandableGrid item zeroMinWidth>
        <ButtonControl label="Create Randomly" fullWidth onClick={() => createNewTicket()} />
      </ExpandableGrid>
      <ExpandableGrid item zeroMinWidth>
        <ButtonControl
          label="Create New"
          fullWidth
          onClick={() => alert("I'm just compounding the layout. In fact, I'm doing nothing 😄")}
        />
      </ExpandableGrid>
    </Grid>
  );
};

export default FooterControls;
