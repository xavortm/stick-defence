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
  const { state } = useContext(GameContext);

  return (
    <Game>
      <GameProvider>
        {state.isPlaying ? null : <Welcome />}
        <Dashboard />
        <Scene />
      </GameProvider>
    </Game>
  );
}
