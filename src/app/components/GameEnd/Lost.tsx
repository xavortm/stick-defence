import React, { useContext } from 'react';
import styled from 'styled-components';

import { GameContext } from '../../context/store';

interface StyledGameLostInterface {
  visible?: boolean;
}

const StyledGameLost = styled.div<StyledGameLostInterface>`
  display: ${props => (props.visible ? 'flex' : 'none')};

  background: white;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default function Lost(): JSX.Element {
  const { state } = useContext(GameContext);

  return (
    <StyledGameLost visible={state.gameplay.isGameLost}>
      <h2>Game Over!</h2>
      <p>You have lost the game on level {state.gameplay.currentWave}</p>
    </StyledGameLost>
  );
}
