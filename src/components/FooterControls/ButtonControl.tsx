import Button, { ButtonProps } from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { ButtonLabel } from './ButtonControl.styled';

type ButtonControlProps = ButtonProps & { label: string };

const ButtonControl: React.FC<ButtonControlProps> = (props): JSX.Element => {
  const { label, ...restProps } = props;

  return (
    <Button
      {...restProps}
      variant="contained"
      size="medium"
      endIcon={<ChevronRightIcon />}
      data-testid="button-control"
    >
      <ButtonLabel>{label}</ButtonLabel>
    </Button>
  );
};

export default ButtonControl;
