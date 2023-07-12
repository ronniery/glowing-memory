import { JSX } from 'react/jsx-runtime';

import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IconWrapper } from './Header.styled';
import { colors } from '../../utils/constants';

const Header = (): JSX.Element => {
  return (
    <Grid p={1.5} spacing={2} columns={{ xs: 12 }} container justifyContent="flex-start" role="heading">
      <Grid item>
        <IconWrapper>
          <EventRepeatIcon data-testid="header-icon" fontSize="medium" htmlColor={colors.chathamsBlue} />
        </IconWrapper>
      </Grid>
      <Grid item display="flex" justifyContent="center" alignItems="center">
        <Typography data-testid="header-title" variant="body1" fontSize={18} sx={{ fontWeight: 'bold' }}>
          Timeline
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
