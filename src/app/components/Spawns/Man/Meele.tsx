import React from 'react';
import EnemyInterface from '../EnemyInterface';
import styled from 'styled-components';

// At later point this will could be changed with the different day settings.
const meeleConfig: EnemyInterface = {
  type: 'meele',
  boxSizeWidth: 2,
  boxSizeHeight: 2,
  health: 100,
  armor: 0,
};

const EnemyBox = styled.span`
  display: inline-block;
  width: ${meeleConfig.boxSizeWidth}em;
  height: ${meeleConfig.boxSizeHeight}em;

  // Later to be updated with a sprite.
  background: red;
`;

function MeeleEnemy(): JSX.Element {
  return <EnemyBox></EnemyBox>;
}

export default function Meele(): JSX.Element {
  return <MeeleEnemy />;
}
