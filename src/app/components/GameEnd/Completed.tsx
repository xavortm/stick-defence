import React, { useContext } from 'react';
import styled from 'styled-components';

import { GameContext } from '../../context/store';

interface StyledGameCompletedInterface {
  visible?: boolean;
}

const StyledGameCompleted = styled.div<StyledGameCompletedInterface>`
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

export default function Completed(): JSX.Element {
  const { state } = useContext(GameContext);

  return (
    <StyledGameCompleted visible={state.gameplay.isGameCompleted}>
      <h2>Congratulations!</h2>
      <p>
        You have completed the game and reached the final wave{' '}
        {state.gameplay.currentWave + 1}
      </p>
    </StyledGameCompleted>
  );
}
