import { JSX } from "react/jsx-runtime";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Header = (): JSX.Element => {
  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Box>
            <EventRepeatIcon fontSize="medium" />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="h5">Timeline</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
