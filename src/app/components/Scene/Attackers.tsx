import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EnemyMan } from '../Spawns/';
import { GameContext } from '../../context/store';

interface Atackers {
  wave: number;
}

interface AttackingStylesInterface {
  canAttack: boolean;
}

const AttackingArea = styled.div<AttackingStylesInterface>`
  height: 18em;
  width: 100%;
  pointer-events: ${props => (props.canAttack ? 'all' : 'none')};
`;

export default function Attackers({ wave }: Atackers): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  // Needed to update the state of the component when reloading happens.
  const [isReloading, setIsReloading] = useState(false);

  // Needed to maintain the class state inside setTimeout
  const canAttack = useRef(true);

  useEffect(() => {
    let reloading: number;
    const reloadingTime = 500; // Later to be updated from state

    if (isReloading) {
      reloading = setTimeout(() => {
        canAttack.current = true;
        setIsReloading(false);
        dispatch({ type: 'RELOADED' });
      }, reloadingTime);
    }

    return () => {
      clearTimeout(reloading);
    };
  }, [state.gameplay.bullets, isReloading, dispatch]);

  const handleShotFired = () => {
    dispatch({ type: 'SHOT_FIRED' });

    // If we reach one remaining bullet (that we fired) run the reloading cooldown.
    if (state.gameplay.bullets === 1) {
      canAttack.current = false;
      setIsReloading(true);
      dispatch({ type: 'RELOADING' });
    }
  };

  return (
    <AttackingArea canAttack={canAttack.current} onClick={handleShotFired}>
      {/* I will have to do the days here as well. */}
      <EnemyMan type="meele" />
    </AttackingArea>
  );
}

// When clicking on attacking area, a shot has been fired.
