import Meele from './Meele';
import Rifle from './Rifle';
import styled, { keyframes } from 'styled-components';
import EnemyInterface from '../EnemyInterface';

interface EnemyBoxInterface {
  isDead: boolean;
  moveArea: number;
  top: number;
  enemyConfig: EnemyInterface;
  type: string;
}

const moveHorizintal = (x: number) => keyframes`
  0% {
      transform : translateX(0px) 
  }
  100% {
      transform : translateX(${x}px)
  }
`;

export const EnemyBox = styled.span<EnemyBoxInterface>`
  display: block;
  position: absolute;
  width: ${props => props.enemyConfig.boxSizeWidth}em;
  height: ${props => props.enemyConfig.boxSizeHeight}em;

  pointer-events: ${props => (props.isDead ? 'none' : 'all')};
  top: ${props => props.top}px;

  animation: ${props => moveHorizintal(props.moveArea)}
    ${props => props.enemyConfig.speed}s linear;
  animation-fill-mode: both;
  animation-play-state: ${props => (props.isDead ? 'paused' : 'playing')};
`;

export const EnemyManTypes = { Meele, Rifle };
