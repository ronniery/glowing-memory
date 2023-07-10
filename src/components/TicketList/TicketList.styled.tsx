import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";

import { colors } from "../../utils/constants";

export const TicketContainer = styled(Grid)({
  height: "calc(100% - 126.93px)",
  paddingLeft: "12px",
  paddingRight: "12px",
  "@media (max-width: 599.95px)": {
    height: "calc(100% - 178px)",
  },
});

export const TicketSection = styled(Grid)({
  overflowY: "scroll",
  maxHeight: "100%",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: colors.seashell,
  },
  "&::-webkit-scrollbar-thumb&": {
    background: colors.monsoon,
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: colors.davyGray,
  }
});
