import { Box, ButtonGroup, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { LAST_FLOOR } from '../constants/elevator';
import ElevatorButton from './ElevatorButton';
import Floor from './Floor';

const floors: ReactNode[] = [];
const buttons: ReactNode[] = [];

for (let floorNo = LAST_FLOOR; floorNo >= 0; floorNo--) {
  floors.push(<Floor {...{ floorNo }} key={'floor' + floorNo} />);
  buttons.push(<ElevatorButton floorNo={floorNo} key={`button${floorNo}`} />);
}

const Elevator = () => {
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
