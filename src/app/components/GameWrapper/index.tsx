import React from 'react';
import styled from 'styled-components';

import { GameProvider } from 'app/context/store';
import internalConfig from 'app/gameConfig/internalConf';

import PrepareGame from './PrepareGame';
import Welcome from '../Welcome/Welcome';
import Gameplay from './Gameplay';

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
        <PrepareGame />
        <Gameplay />
        <Welcome />
      </GameProvider>
    </Game>
  );
}
