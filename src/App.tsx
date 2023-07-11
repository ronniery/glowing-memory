import TicketBoard from "./containers/TicketBoard";
import Container from "@mui/material/Container";
import TicketProvider from "./contexts/ticket.context";

function App() {
  return (
    <TicketProvider>
      <Container>
        <TicketBoard />
      </Container>
    </TicketProvider>
  );
}

export default App;
