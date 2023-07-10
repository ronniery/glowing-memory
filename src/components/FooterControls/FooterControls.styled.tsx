import Grid from "@mui/material/Grid";
import styled from "@emotion/styled";

export const ExpandableGrid = styled(Grid)(() => ({
  "@media (max-width: 599.95px)": {
    width: "100%",
  },
}));
