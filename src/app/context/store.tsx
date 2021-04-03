import React, { createContext, useReducer, Dispatch } from 'react';

import Reducer from './reducer';
import { gameStateInterface, actionPayloadInterface } from './stateInterface';

// This holds the value we get on game start
const initialState: gameStateInterface = {
  currentWave: 0,
  ammo: 7,
};

const GameProvider = ({ children }) => {
  // The state value points to the state object and the dispatch method is
  // the reducer function that manages the state.
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

const GameContext = createContext<{
  state: gameStateInterface;
  dispatch: Dispatch<actionPayloadInterface>;
}>({
  state: initialState,
  dispatch: () => null,
});

export { GameProvider, GameContext };
