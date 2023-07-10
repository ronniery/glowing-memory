import { JSX } from "react/jsx-runtime";
import Grid from "@mui/material/Grid";

import ButtonControl from "./ButtonControl";
import { ExpandableGrid } from "./FooterControls.styled";

const FooterControls = (): JSX.Element => {
  return (
    <Grid
      p={1.5}
      spacing={2}
      gridAutoColumns={{ xs: 12 }}
      container
      justifyContent="flex-end"
    >
      <ExpandableGrid item zeroMinWidth>
        <ButtonControl label="Create Randomly" fullWidth />
      </ExpandableGrid>
      <ExpandableGrid item zeroMinWidth>
        <ButtonControl label="Create New" fullWidth />
      </ExpandableGrid>
    </Grid>
  );
};

export default FooterControls;
