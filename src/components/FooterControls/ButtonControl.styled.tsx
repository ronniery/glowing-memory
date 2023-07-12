import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';

export const ButtonLabel = styled(Typography)({
  textTransform: 'capitalize',
  fontWeight: 400,

  '@media (max-width: 599.95px)': {
    fontWeight: 600,
  },
});
