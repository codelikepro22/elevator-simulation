import { Action, ActionType, State } from '../types/elevator';

const elevatorReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UPDATE_CURRENT_FLOOR:
      return { ...state, currentFloor: action.payload };
    case ActionType.UPDATE_ELEVATOR_DIRECTION:
      return { ...state, elevatorDirection: action.payload };
    case ActionType.UPDATE_REQUESTED_FLOORS:
      return { ...state, requestedFloors: action.payload };
    default:
      return state;
  }
};

export default elevatorReducer;
