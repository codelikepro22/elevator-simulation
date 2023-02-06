import { Box, ButtonGroup, Stack, Typography } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { LAST_FLOOR } from '../constants/elevator';
import { useElevatorContext } from '../context/ElevatorContext';
import { ActionType, Direction } from '../types/elevator';
import ElevatorButton from './ElevatorButton';
import Floor from './Floor';

const floors: ReactNode[] = [];
const buttons: ReactNode[] = [];

for (let floorNo = LAST_FLOOR; floorNo >= 0; floorNo--) {
  floors.push(<Floor {...{ floorNo }} key={'floor' + floorNo} />);
  buttons.push(<ElevatorButton floorNo={floorNo} key={`button${floorNo}`} />);
}

let openingTimeout: NodeJS.Timeout;
let changingTimeout: NodeJS.Timeout;

const Elevator = () => {
  const {
    state,
    state: { requestedFloors, currentFloor, elevatorDirection },
    dispatch,
  } = useElevatorContext();

  /*
  this will be invoked every time the elevator reaches a floor to check
  if the person on the way of the elevator (up, down) or this floor has been
  already requested via the inner buttons, so the doors will open for 3 seconds
  */
  const checkOpening = () => {
    return new Promise((resolve, reject) => {
      if (
        requestedFloors[currentFloor] === elevatorDirection ||
        requestedFloors[currentFloor] === 'both'
      ) {
        //resetting the timer if there is old one counting (avoiding many timers)
        clearTimeout(openingTimeout);
        openingTimeout = setTimeout(() => {
          /*after 3 seconds the doors close and we remove 
          this floor from the requested floors because it has just been served
          */
          const tempRequestedFloors = requestedFloors;
          delete tempRequestedFloors[currentFloor];
          dispatch({
            type: ActionType.UPDATE_REQUESTED_FLOORS,
            payload: tempRequestedFloors,
          });
          resolve(null);
        }, 3000);
      } else {
        resolve(null);
      }
    });
  };

  /* 
  as long  as there is still a requested floors the elevator will
   keep moving (up or down) every (one) second to serve the remaining requests on its way
  */
  const changeFloor = (direction: Direction) => {
    return new Promise((resolve, reject) => {
      clearTimeout(changingTimeout);
      changingTimeout = setTimeout(() => {
        if (direction === 'up') {
          dispatch({
            type: ActionType.UPDATE_CURRENT_FLOOR,
            payload: currentFloor + 1,
          });
          resolve(null);
        } else {
          dispatch({
            type: ActionType.UPDATE_CURRENT_FLOOR,
            payload: currentFloor - 1,
          });
          resolve(null);
        }
      }, 1000);
    });
  };

  // this useEffect will be triggered every time there is a change in the elevator State
  useEffect(() => {
    const handleState = async () => {
      const requestedFloorsNumbers = Object.keys(requestedFloors);

      await checkOpening();

      if (requestedFloorsNumbers.length > 0) {
        // in the way up there is still upper floor not served(continue up to serve it)
        if (elevatorDirection === 'up') {
          if (
            requestedFloorsNumbers.find(
              (floorNo) => Number(floorNo) > currentFloor
            )
          ) {
            await changeFloor('up');
          } else {
            dispatch({
              type: ActionType.UPDATE_ELEVATOR_DIRECTION,
              payload: 'down',
            });
          }
        } else {
          // in the way down there is still lower floor not served(continue down to serve it)
          if (
            requestedFloorsNumbers.find(
              (floorNo) => Number(floorNo) < currentFloor
            )
          ) {
            await changeFloor('down');
          } else {
            dispatch({
              type: ActionType.UPDATE_ELEVATOR_DIRECTION,
              payload: 'up',
            });
          }
        }
      }
    };
    handleState();
  }, [state]);
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
