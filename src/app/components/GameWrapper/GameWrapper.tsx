import React from 'react';
import styled from 'styled-components';

import Scene from '../Scene/Scene';
import Dashboard from '../Dashboard/Dashboard';

import internalConfig from '../../gameConfig/internalConf';

const Game = styled.div`
  background: white;
  width: ${internalConfig.gameWindowWidth + 'px'};
  height: ${internalConfig.gameWindowHeight + 'px'};
`;

console.log(internalConfig.gameWindowWidth);

export default function GameWrapper(): JSX.Element {
  return (
    <Game>
      <Dashboard />
      <Scene />
    </Game>
  );
}
