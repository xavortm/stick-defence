import React from 'react';
import styled from 'styled-components';
import { EnemyMan } from '../Spawns/';

interface Atackers {
  wave: number;
}

const AttackingArea = styled.div`
  height: 18em;
  width: 100%;
`;

const handleShotFired = () => {
  console.log('a shot was fired');
};

export default function Attackers({ wave }: Atackers): JSX.Element {
  return (
    <AttackingArea onClick={handleShotFired}>
      {/* I will have to do the days here as well. */}
      <EnemyMan type="meele" />
    </AttackingArea>
  );
}

// When clicking on attacking area, a shot has been fired.
