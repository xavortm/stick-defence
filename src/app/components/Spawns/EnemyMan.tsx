import React from 'react';

import { EnemyManTypes } from './Man';
import styled, { keyframes } from 'styled-components';

type EnemyProps = {
  /** What type of an enemy should be loaded? */
  type: 'meele' | 'rifle';
  moveArea: number;
};

/**
 * A Generator of enemies of the type "Man".
 * @param { type } 'meele' | 'rifle';
 * @returns JSX - Enemy of the given type.
 */
export default function EnemyMan({ type, moveArea }: EnemyProps): JSX.Element {
  // Will overwrite the default value once we pick an enemy from the props.
  let Enemy: JSX.Element = <></>;

  switch (type) {
    case 'meele':
      Enemy = <EnemyManTypes.Meele time={15} moveArea={moveArea} />;
      break;

    default:
      break;
  }

  return <>{Enemy}</>;
}
