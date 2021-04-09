import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';

interface WelcomeWrapperInterface {
  visible: boolean;
}

const WelcomeWrapper = styled.div<WelcomeWrapperInterface>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  /* opacity: 0.5; */
  z-index: 10;
  text-align: center;
  color: white;
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;

  a {
    color: yellow;
  }
`;

const WelcomeTitle = styled.h1`
  margin: 0;
`;

const StartGame = styled.button`
  border: none;
  background: white;
  color: black;
  font-weight: bold;
  appearance: none;
  display: inline-block;
  padding: 0.75em 1em;
  font-size: 1.25em;
  cursor: pointer;
  align-self: center;
  margin-top: 2em;
`;

export default function Welcome() {
  const { state, dispatch } = useContext(GameContext);

  const handleGameStart = () => {
    dispatch({ type: 'START_WAVE' });
  };

  return (
    <WelcomeWrapper
      visible={!state.gameplay.isPlaying && state.gameplay.currentWave === -1}
    >
      <WelcomeTitle>Stick Defence</WelcomeTitle>
      <p>
        v0.0.1 | Developed by Alex Dimitrov{' '}
        <a href="https://twitter.com/xavortm" target="_blank" rel="noreferrer">
          @xavortm
        </a>
      </p>

      <StartGame onClick={handleGameStart}>Start Game</StartGame>
    </WelcomeWrapper>
  );
}
