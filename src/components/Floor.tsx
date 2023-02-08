import { Box, IconButton, Stack, Typography } from '@mui/material';
import { LAST_FLOOR } from '../constants/elevator';
import { useElevatorContext } from '../context/ElevatorContext';
import { ActionType, Direction } from '../types/elevator';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

type Props = {
  floorNo: number;
};

const Floor = ({ floorNo }: Props) => {
  const {
    state: { currentFloor, elevatorDirection, requestedFloors },
    dispatch,
  } = useElevatorContext();

  const requestElevator = (direction: Direction) => {
    dispatch({
      type: ActionType.UPDATE_REQUESTED_FLOORS,
      payload: { ...requestedFloors, [floorNo]: direction },
    });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Stack>
        <IconButton
          disabled={floorNo === LAST_FLOOR}
          onClick={() => requestElevator('up')}
        >
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: `15px solid ${
                requestedFloors[floorNo] === 'up' ? '#ed6c02' : 'black'
              }`,
              opacity: floorNo === LAST_FLOOR ? '0.26' : '1',
            }}
          ></Box>
        </IconButton>
        <IconButton
          disabled={floorNo === 0}
          onClick={() => requestElevator('down')}
        >
          <Box
            sx={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `15px solid ${
                requestedFloors[floorNo] === 'down' ? '#ed6c02' : 'black'
              }`,
              opacity: floorNo === 0 ? '0.26' : '1',
            }}
          ></Box>
        </IconButton>
      </Stack>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: '31%',
            height: '21%',
            backgroundColor: 'black',
            color: '#ed6c02',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Orbitron',
          }}
        >
          <Typography sx={{ fontFamily: 'Orbitron', fontSize: '0.8rem' }}>
            {currentFloor}
          </Typography>
          {elevatorDirection === 'up' ? (
            <ArrowUpward fontSize="small" />
          ) : (
            <ArrowDownward fontSize="small" />
          )}
        </Box>
        <Box
          sx={{
            width: 90,
            height: 90,
            backgroundColor:
              floorNo === currentFloor
                ? requestedFloors[floorNo] === elevatorDirection ||
                  requestedFloors[floorNo] === 'both'
                  ? '#ed6c02'
                  : '#13B38B'
                : '#4D4D68',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            borderRadius: 4,
          }}
        >
          {floorNo}
        </Box>
      </Box>
    </Box>
  );
};

export default Floor;
