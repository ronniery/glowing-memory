import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';

import TicketBoard from './containers/TicketBoard';
import TicketProvider from './utils/contexts/ticket.context';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <TicketProvider>
        <Container>
          <TicketBoard />
        </Container>
      </TicketProvider>
    </SnackbarProvider>
  );
}

export default App;
