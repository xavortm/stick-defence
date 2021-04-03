import React, { createContext, useReducer, Dispatch } from 'react';

import Reducer from './reducer';
import { gameStateInterface, actionPayloadInterface } from './stateInterface';

// This holds the value we get on game start
const initialState: gameStateInterface = {
  currentWave: 0,
  ammo: 7,
  isPlaying: false,
};

/*
Implement the game state on this level.

The state would include:
{
  currentWave: number,
  isPlaying: boolean,
  baseHealth: number,
  wallHealth: number,
  resources: number, // the money the player earns
  currentGun: string,

  // Shop system (can be a separate store)
  shop: {
    guns: {
      [
        type: string,
        shots: number,
        reloadTime: number,
        fireRate: number,
        damageBoost: number
      ]
    },
    craftsman: number,
    shooters: number,
    turrets: number,
    baseTier: number,
    wallTier: number
  }
}
*/

const GameProvider: React.FC = ({ children }) => {
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
