import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

import { colors } from "../../utils/constants";

export const TicketContent = styled(Grid)({
  borderRadius: "8px",
  backgroundColor: colors.hawkesBlues,
  height: "fit-content",
  marginBottom: "10px",
  paddingRight: "12px",
  paddingLeft: "12px",
  paddingBottom: "12px",
});

export const TicketClient = styled(Typography)({
  fontWeight: 700,
});

export const TicketStatus = styled(Radio)({
  pointerEvents: "none",
});

export const TicketIssue = styled("textarea")({
  overflow: "hidden",
  width: "calc(100% - 12px)",
  borderRadius: "8px",
  border: "thin solid transparent",
  height: "55px",
  pointerEvents: "none",
  fontFamily: "arial",
  userSelect: "none",
  fontSize: "17px",
  marginTop: "0px",
  padding: "5px",
  resize: "none",

  "&::placeholder": {
    fontFamily: "arial",
  },
});
