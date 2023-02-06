// direction of the elevator
export type Direction = 'up' | 'down';
/* 
this decides which floor to be served depending on the direction of the elevator
requested floor with "up" will be served when the state of elevator direction is "up"
requested floor with "down" will be served when the state of elevator direction is "down"
requested floor with "both" will be served all time because it is called through 
"elevator inner buttons"
*/
export type RequestedFloors = { [key: number]: Direction | 'both' };

// saves state or behavior of the elevator
export type State = {
  currentFloor: number;
  elevatorDirection: Direction;
  requestedFloors: RequestedFloors;
};

export enum ActionType {
  UPDATE_CURRENT_FLOOR,
  UPDATE_ELEVATOR_DIRECTION,
  UPDATE_REQUESTED_FLOORS,
}

export type Action =
  | {
      type: ActionType.UPDATE_CURRENT_FLOOR;
      payload: number;
    }
  | {
      type: ActionType.UPDATE_ELEVATOR_DIRECTION;
      payload: Direction;
    }
  | {
      type: ActionType.UPDATE_REQUESTED_FLOORS;
      payload: RequestedFloors;
    };
