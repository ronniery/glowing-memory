import { JSX } from "react/jsx-runtime";

import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IconWrapper } from "./Header.styled";

const Header = (): JSX.Element => {
  return (
    <Grid
      p={1.5}
      spacing={2}
      columns={{ xs: 12 }}
      container
      justifyContent="flex-start"
    >
      <Grid item>
        <IconWrapper>
          <EventRepeatIcon fontSize="medium" htmlColor="#1d476f" />
        </IconWrapper>
      </Grid>
      <Grid item display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body1" fontSize={18} sx={{ fontWeight: "bold" }}>
          Timeline
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
