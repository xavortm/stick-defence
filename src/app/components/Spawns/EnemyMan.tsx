import React, { useContext } from 'react';
import styled from 'styled-components';

import { EnemyManTypes } from './Man';
import { GameContext } from '../../context/store';

type EnemyProps = {
  /** What type of an enemy should be loaded? */
  type: 'meele' | 'rifle';
};

const HitBox = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
`;

function EnemyHitbox({ children }) {
  const { state, dispatch } = useContext(GameContext);

  const onClickHandler = () => {
    // Reduce health of current enemy
  };

  return <HitBox onClick={onClickHandler}>{children}</HitBox>;
}

/**
 * A Generator of enemies of the type "Man".
 * @param { type } 'meele' | 'rifle';
 * @returns JSX - Enemy of the given type.
 */
export default function EnemyMan({ type }: EnemyProps): JSX.Element {
  // Will overwrite the default value once we pick an enemy from the props.
  let Enemy: JSX.Element = <></>;

  switch (type) {
    case 'meele':
      Enemy = <EnemyManTypes.Meele />;
      break;

    default:
      break;
  }

  return <EnemyHitbox>{Enemy}</EnemyHitbox>;
}
