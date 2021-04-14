import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';

import { GameProvider, GameContext } from 'app/context/store';
import Scene from '../Scene/Scene';
import Dashboard from '../Dashboard/Dashboard';
import Welcome from '../Welcome/Welcome';
import Completed from '../GameEnd/Completed';
import Lost from '../GameEnd/Lost';

import internalConfig from 'app/gameConfig/internalConf';
import { wavesSetup } from 'app/gameConfig/waves';

const Game = styled.div`
  background: white;
  width: ${internalConfig.gameWindowWidth + 'px'};
  height: ${internalConfig.gameWindowHeight + 'px'};
  position: relative;
`;

export default function GameWrapper(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    const randomizedArray = [];

    // Prepare the wave for this game run (randomize stuff);
    // @todo - for some reason this doesn't dispatch to the reduced ........
    dispatch({ type: 'PREPARE_WAVES', payload: wavesSetup });
  }, [dispatch, state]);

  return (
    <Game>
      <GameProvider>
        {/* Only visible when the game starts (or on page refresh) */}
        <Welcome />

        <Dashboard />
        <Scene />

        {/* When the end game is reached, open the screen below. */}
        <Completed />
        <Lost />
      </GameProvider>
    </Game>
  );
}
