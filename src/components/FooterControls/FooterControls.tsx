import { JSX } from 'react/jsx-runtime';
import debounce from '@mui/utils/debounce';
import Grid from '@mui/material/Grid';

import ButtonControl from './ButtonControl';
import { ExpandableGrid } from './FooterControls.styled';
import { useTickets } from '../../utils/contexts/ticket.context';

const FooterControls = (): JSX.Element => {
  const { createNewTicket } = useTickets();
  const debouncedCreateNewTicket = debounce(createNewTicket, 300);

  return (
    <Grid p={1.5} spacing={2} columns={{ xs: 12 }} container justifyContent="flex-end" role="footer-controls">
      <ExpandableGrid item zeroMinWidth>
        <ButtonControl label="Create Randomly" fullWidth onClick={() => debouncedCreateNewTicket()} />
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
