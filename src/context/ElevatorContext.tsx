import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, State } from '../types/elevator';
import elevatorReducer from './elevatorReducer';

const initialState: State = {
  currentFloor: 0,
  elevatorDirection: 'up',
  requestedFloors: {},
};

type ContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
};

const Context = createContext<ContextValue>({
  state: initialState,
  dispatch: () => {},
});

export const useElevatorContext = () => {
  return useContext(Context);
};

const ElevatorContext = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(elevatorReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ElevatorContext;
