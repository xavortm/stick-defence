import React from 'react';
import styled from 'styled-components';

import { GameProvider } from '../../context/store';
import Scene from '../Scene/Scene';
import Dashboard from '../Dashboard/Dashboard';

import internalConfig from '../../gameConfig/internalConf';

const Game = styled.div`
  background: white;
  width: ${internalConfig.gameWindowWidth + 'px'};
  height: ${internalConfig.gameWindowHeight + 'px'};
  position: relative;
`;

export default function GameWrapper(): JSX.Element {
  return (
    <Game>
      <GameProvider>
        <Dashboard />
        <Scene />
      </GameProvider>
    </Game>
  );
}

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
