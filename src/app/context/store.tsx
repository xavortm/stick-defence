import React, { createContext, useReducer, Dispatch } from 'react';

import {
  Reducer,
  Shop,
  gameStateInterface,
  actionPayloadInterface,
} from './reducer';

import { GunInterface } from '../components/Shop/GunInterface';

const shopState: GunInterface[] = [
  {
    type: 'Pistol',
    timeToReload: 1000,
    ammo: 10,
    cost: 0,
    damage: 50,
  },
];

// This holds the value we get on game start
const initialState: gameStateInterface = {
  gameplay: {
    currentWave: -1,
    currentGun: 'Pistol',
    ammo: 7,
    bullets: 7,
    isPlaying: false,
    isReloading: false,
  },
  shop: {
    guns: shopState,
  },
};

const mainReducer = (
  { gameplay, shop }: gameStateInterface,
  action: actionPayloadInterface,
) => ({
  gameplay: Reducer(gameplay, action),
  shop: Shop(shop, action),
});

const GameProvider: React.FC = ({ children }) => {
  // The state value points to the state object and the dispatch method is
  // the reducer function that manages the state.
  const [state, dispatch] = useReducer(mainReducer, initialState);

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
