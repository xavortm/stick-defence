import React from 'react';
import EnemyInterface from '../EnemyInterface';
import { css } from 'styled-components';
import { EnemyBox } from './';
import useEnemyObject from 'app/hooks/useEnemyObject';

// At later point this will could be changed with the different day settings.
const enemyConfig: EnemyInterface = {
  type: 'meele',
  boxSizeWidth: 2,
  boxSizeHeight: 2,
  health: 100,
  bounty: 20,
  dps: 10,
  speed: 7,
  armor: 0, // This will be used at a later point.
};

const MeeleStyles = css`
  background: no-repeat center center;
  background-size: 100% 100%;
  background-image: url('artwork-default/enemyMeele/walking.gif');
`;

export default function Meele({ moveArea, top }): JSX.Element {
  const [handleClick, isDead] = useEnemyObject(enemyConfig);

  return (
    <EnemyBox
      enemyConfig={enemyConfig}
      moveArea={moveArea}
      top={top}
      isDead={isDead}
      onClick={handleClick}
      type="meele"
      styles={MeeleStyles}
    />
  );
}
