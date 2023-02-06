import { Button } from '@mui/material';
import { useElevatorContext } from '../context/ElevatorContext';
import { ActionType } from '../types/elevator';

type Props = {
  floorNo: number;
};

const ElevatorButton = ({ floorNo }: Props) => {
  const {
    state: { requestedFloors },
    dispatch,
  } = useElevatorContext();

  const requestFloor = () => {
    dispatch({
      type: ActionType.UPDATE_REQUESTED_FLOORS,
      payload: { ...requestedFloors, [floorNo]: 'both' },
    });
  };

  return (
    <Button
      variant={requestedFloors[floorNo] === 'both' ? 'contained' : 'outlined'}
      color="warning"
      onClick={requestFloor}
    >
      {floorNo}
    </Button>
  );
};

export default ElevatorButton;
