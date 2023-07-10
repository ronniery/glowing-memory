import { JSX } from "react/jsx-runtime";
import { PageContainer } from "./index.styled";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const TicketBoard = (): JSX.Element => {
  return (
    <PageContainer>
      <Header />
      Testing
      <Footer />
    </PageContainer>
  );
};

export default TicketBoard;
