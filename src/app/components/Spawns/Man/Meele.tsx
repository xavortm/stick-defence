import React, { useContext } from 'react';
import EnemyInterface from '../EnemyInterface';
import styled from 'styled-components';

import { GameContext } from '../../../context/store';

// At later point this will could be changed with the different day settings.
const meeleConfig: EnemyInterface = {
  type: 'meele',
  boxSizeWidth: 2,
  boxSizeHeight: 2,
  health: 100,
  armor: 0,
};

const EnemyBox = styled.span`
  display: block;
  width: ${meeleConfig.boxSizeWidth}em;
  height: ${meeleConfig.boxSizeHeight}em;

  // Later to be updated with a sprite.
  background: blue;
`;

export default function Meele(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  const handleClick = () => {
    console.log(state.shop);
  };

  return <EnemyBox onClick={handleClick} />;
}
