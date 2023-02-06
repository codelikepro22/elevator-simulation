import { Box, ButtonGroup, Stack, Typography } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { LAST_FLOOR } from '../constants/elevator';
import { useElevatorContext } from '../context/ElevatorContext';
import ElevatorButton from './ElevatorButton';
import Floor from './Floor';

const floors: ReactNode[] = [];
const buttons: ReactNode[] = [];

for (let floorNo = LAST_FLOOR; floorNo >= 0; floorNo--) {
  floors.push(<Floor {...{ floorNo }} key={'floor' + floorNo} />);
  buttons.push(<ElevatorButton floorNo={floorNo} key={`button${floorNo}`} />);
}

const Elevator = () => {
  const { state, dispatch } = useElevatorContext();
  useEffect(() => {
    console.log('state:', state, 'dispatch:', dispatch);
  }, [state, dispatch]);
  return (
    <Box sx={{ display: 'flex', gap: 10 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#13B38B', pb: 1 }}>
          Buttons
        </Typography>
        <ButtonGroup orientation="vertical">{buttons}</ButtonGroup>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#13B38B', pb: 1 }}>
          Floors
        </Typography>
        <Stack gap={1}>{floors}</Stack>
      </Box>
    </Box>
  );
};

export default Elevator;
