import React, { useContext } from 'react';
import styled from 'styled-components';
import { EnemyMan } from '../Spawns/';
import { GameContext } from '../../context/store';

interface Atackers {
  wave: number;
}

const AttackingArea = styled.div`
  height: 18em;
  width: 100%;
`;

export default function Attackers({ wave }: Atackers): JSX.Element {
  const { dispatch } = useContext(GameContext);

  const handleShotFired = () => {
    dispatch({ type: 'SHOT_FIRED' });
  };

  return (
    <AttackingArea onClick={handleShotFired}>
      {/* I will have to do the days here as well. */}
      <EnemyMan type="meele" />
    </AttackingArea>
  );
}

// When clicking on attacking area, a shot has been fired.
