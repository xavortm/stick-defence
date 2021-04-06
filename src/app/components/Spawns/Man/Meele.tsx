import React, { useContext, useState } from 'react';
import EnemyInterface from '../EnemyInterface';
import styled from 'styled-components';

import { GameContext } from '../../../context/store';
import { GunInterface } from '../../Shop/GunInterface';

// At later point this will could be changed with the different day settings.
const meeleConfig: EnemyInterface = {
  type: 'meele',
  boxSizeWidth: 2,
  boxSizeHeight: 2,
  health: 100,
  armor: 0, // This will be used at a later point.
};

interface EnemyBoxInterface {
  isDead: boolean;
}

const EnemyBox = styled.span<EnemyBoxInterface>`
  display: block;
  width: ${meeleConfig.boxSizeWidth}em;
  height: ${meeleConfig.boxSizeHeight}em;

  // Later to be updated with a sprite.
  background: ${props => (props.isDead ? 'red' : 'blue')};
`;

export default function Meele(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);
  const [health, setHealth] = useState(meeleConfig.health);
  const [armor, setArmor] = useState(meeleConfig.armor);
  const [dead, setDead] = useState(false);

  let currentGun: GunInterface | undefined = state.shop.guns.find(gun => {
    return gun.type === state.gameplay.currentGun;
  });

  let damage = currentGun !== undefined ? currentGun.damage : 0;

  const handleClick = () => {
    // The check here will have to account for armor as well.
    if (health - damage <= 0) {
      setDead(true);
    }

    setHealth(health => health - damage);
  };

  return <EnemyBox isDead={dead} onClick={handleClick} />;
}
