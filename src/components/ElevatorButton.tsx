import { Button } from '@mui/material';

type Props = {
  floorNo: number;
};

const ElevatorButton = ({ floorNo }: Props) => {
  return (
    <Button variant="outlined" color="warning">
      {floorNo}
    </Button>
  );
};

export default ElevatorButton;
