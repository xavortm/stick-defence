import React from 'react';
import EnemyInterface from '../EnemyInterface';

import { EnemyBox } from './';
import useEnemyObject from 'app/hooks/useEnemyObject';

// At later point this will could be changed with the different day settings.
const enemyConfig: EnemyInterface = {
  type: 'rifle',
  boxSizeWidth: 2,
  boxSizeHeight: 2,
  health: 150,
  bounty: 50,
  dps: 20,
  speed: 12,
  armor: 0, // This will be used at a later point.
};

export default function Rifle({ moveArea, top }): JSX.Element {
  const [handleClick, isDead] = useEnemyObject(enemyConfig);

  return (
    <EnemyBox
      enemyConfig={enemyConfig}
      moveArea={moveArea}
      top={top}
      isDead={isDead}
      onClick={handleClick}
      type="rifle"
    />
  );
}
