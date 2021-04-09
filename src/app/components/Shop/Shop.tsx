import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';

interface ShopInterface {
  visible?: boolean;
}

const ShopWindow = styled.div<ShopInterface>`
  position: absolute;
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  top: 0;
  padding: 4em;
`;

const ShopInner = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  padding: 2em;
  box-shadow: 0 10px 40px -25px rgba(0, 0, 0, 0.2);
`;

export default function Shop(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  const handleNextWave = () => {
    dispatch({ type: 'START_WAVE' });
  };

  return (
    <ShopWindow visible={!state.gameplay.isPlaying}>
      <ShopInner>
        <button onClick={handleNextWave}>Start next wave</button>
      </ShopInner>
    </ShopWindow>
  );
}
