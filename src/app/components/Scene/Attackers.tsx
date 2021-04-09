import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Spawner from './Spawner';
import { GameContext } from '../../context/store';
import {
  useCurrentGun,
  useCurrentWaveTotalEnemies,
} from '../../hooks/useCurrent';

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
  position: relative;
`;

export default function Attackers({ wave }: Atackers): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  // Needed to update the state of the component when reloading happens.
  const [isReloading, setIsReloading] = useState(false);

  // Custom hook that returns data from useCurrentGun
  const currentGun = useCurrentGun();

  // Needed to maintain the class state inside setTimeout
  const canAttack = useRef(true);

  const attackingAreaRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  //useEffect to manage the reloading of the gun.
  useEffect(() => {
    let reloading: number;

    if (isReloading) {
      reloading = setTimeout(() => {
        canAttack.current = true;
        setIsReloading(false);
        dispatch({ type: 'RELOADED' });
      }, currentGun.timeToReload);
    }

    return () => {
      clearTimeout(reloading);
    };
  }, [state.gameplay.bullets, isReloading, dispatch, currentGun.timeToReload]);

  const handleShotFired = () => {
    dispatch({ type: 'SHOT_FIRED' });

    // If we reach one remaining bullet (that we fired) run the reloading cooldown.
    if (state.gameplay.bullets === 1) {
      canAttack.current = false;
      setIsReloading(true);
      dispatch({ type: 'RELOADING' });
    }
  };

  // Later update to working output from:
  // attackingAreaRef.current.offsetWidth

  return (
    <AttackingArea
      ref={attackingAreaRef}
      canAttack={canAttack.current}
      onClick={handleShotFired}
    >
      {/* I will have to do the days here as well. */}
      <Spawner moveArea={543} />
    </AttackingArea>
  );
}

// When clicking on attacking area, a shot has been fired.
