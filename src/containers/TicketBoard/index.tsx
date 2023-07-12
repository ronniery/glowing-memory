import { JSX } from 'react/jsx-runtime';

import { PageContainer } from './index.styled';
import FooterControls from '../../components/FooterControls/FooterControls';
import Header from '../../components/Header/Header';
import TicketList from '../../components/TicketList/TicketList';

const TicketBoard = (): JSX.Element => {
  return (
    <PageContainer data-testid="ticket-board">
      <Header />
      <TicketList />
      <FooterControls />
    </PageContainer>
  );
};

export default TicketBoard;
