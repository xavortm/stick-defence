import React, { useContext, useState, useEffect, useRef } from 'react';
import EnemyInterface from '../EnemyInterface';
import styled, { keyframes } from 'styled-components';

import { GameContext } from '../../../context/store';
import { useCurrentGun } from '../../../hooks/useCurrent';

// At later point this will could be changed with the different day settings.
const meeleConfig: EnemyInterface = {
  type: 'meele',
  boxSizeWidth: 2,
  boxSizeHeight: 2,
  health: 100,
  bounty: 20,
  dps: 10,
  armor: 0, // This will be used at a later point.
};

interface EnemyBoxInterface {
  isDead: boolean;
  moveArea: number;
  time: number;
  top: number;
}

const moveHorizintal = (x: number) => keyframes`
    0% {
        transform : translateX(0px) 
    }
    100% {
        transform : translateX(${x}px)
    }
`;

const EnemyBox = styled.span<EnemyBoxInterface>`
  display: block;
  position: absolute;
  width: ${meeleConfig.boxSizeWidth}em;
  height: ${meeleConfig.boxSizeHeight}em;

  // Later to be updated with a sprite.
  background: ${props => (props.isDead ? 'red' : 'blue')};
  pointer-events: ${props => (props.isDead ? 'none' : 'all')};
  top: ${props => props.top}px;

  animation: ${props => moveHorizintal(props.moveArea)} ${props => props.time}s
    linear;
  animation-fill-mode: both;
  animation-play-state: ${props => (props.isDead ? 'paused' : 'playing')};
`;

export default function Meele({ moveArea, time, top }): JSX.Element {
  const { dispatch } = useContext(GameContext);
  const [health, setHealth] = useState(meeleConfig.health);
  const [dead, setDead] = useState(false);
  const shooringInterval = useRef(0);
  // const [armor, setArmor] = useState(meeleConfig.armor);

  const currentGun = useCurrentGun();

  useEffect(() => {
    if (dead) {
      return;
    }

    const timer = setTimeout(() => {
      // Every 1 second, deal damage to the base.
      shooringInterval.current = setInterval(() => {
        dispatch({ type: 'DAMAGE_BASE', payload: 10 });
      }, 1000);
    }, time * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(shooringInterval.current);
    };
  }, [time, dead, dispatch]);

  const handleClick = () => {
    // The check here will have to account for armor as well.
    if (health - currentGun.damage <= 0) {
      setDead(true);

      // Keep global state of how many enemies were killed.
      dispatch({ type: 'KILL_ENEMEY' });

      // Increment money to global state here:
      dispatch({
        type: 'ADD_MONEY',
        payload: meeleConfig.bounty,
      });
    }

    setHealth(health => health - currentGun.damage);
  };

  return (
    <EnemyBox
      time={time}
      moveArea={moveArea}
      top={top}
      isDead={dead}
      onClick={handleClick}
    />
  );
}
