import { JSX } from "react/jsx-runtime";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Grid from "@mui/material/Grid";

const FooterControls = (): JSX.Element => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item>
          <Button
            variant="contained"
            size="medium"
            endIcon={<ChevronRightIcon />}
          >
            Create Randomly
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="medium"
            endIcon={<ChevronRightIcon />}
          >
            Create New
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FooterControls;
