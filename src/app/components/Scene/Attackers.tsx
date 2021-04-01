import React from 'react';
import styled from 'styled-components';

import Waves from '../../gameConfig/waves';
import { EnemyMan } from '../Spawns/';

interface Atackers {
  wave: number;
}

const AttackingArea = styled.div`
  height: 18em;
  width: 100%;
`;

export default function Attackers({ wave }: Atackers): JSX.Element {
  return (
    <AttackingArea>
      {/* I will have to do the days here as well. */}
      <EnemyMan type="meele" />
    </AttackingArea>
  );
}
