import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { GameProvider, GameContext } from '../../context/store';
import Scene from '../Scene/Scene';
import Dashboard from '../Dashboard/Dashboard';
import Welcome from '../Welcome/Welcome';

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
        {/* Only visible when the game starts (or on page refresh) */}
        <Welcome />

        <Dashboard />
        <Scene />
      </GameProvider>
    </Game>
  );
}
