import React, { useContext } from 'react';
import styled from 'styled-components';

import { GameContext } from '../../context/store';
import Attackers from './Attackers';
import Defenders from './Defenders';
import Shop from '../Shop/Shop';

const SceneWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 3em;
`;

const SceneAttackers = styled.div`
  flex: 1 1 auto;

  // Needed to define the area where enemies can spawn and move.
  display: flex;
  align-items: flex-end;

  // Leaves space for the gun picker.
  padding-bottom: 3em;
`;

const SceneDefenders = styled.div`
  flex: 0 0 16em;

  // A debugging value.
  border-left: 1px solid #ddd;
`;

export default function Scene(): JSX.Element {
  // const { state } = useContext(GameContext);

  return (
    <SceneWrapper>
      <SceneAttackers>
        <Attackers wave={0} />
      </SceneAttackers>

      <SceneDefenders>
        <Defenders />
      </SceneDefenders>

      <Shop />
    </SceneWrapper>
  );
}

/*

Waves manager:
1. Show game start message
2. -> Start wave 1; Run timer;
3. -> End wave 1; Stop timer;
4. -> Open shop; (default view)
repeat -> ones;

Meaning, while timer is running, a day elapses and the player plays the game.
When the timer hits 0 (or base health drops to 0) the shop opens.

*/
