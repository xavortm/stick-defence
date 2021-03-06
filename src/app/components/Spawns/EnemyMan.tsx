import React from 'react';

import { EnemyManTypes } from './Man';

type EnemyProps = {
  /** What type of an enemy should be loaded? */
  type: string;
  moveArea: number;
  top: number;
};

/**
 * A Generator of enemies of the type "Man".
 * @param { type } 'meele' | 'rifle';
 * @returns JSX - Enemy of the given type.
 */
export default function EnemyMan({
  top,
  type,
  moveArea,
}: EnemyProps): JSX.Element {
  // Will overwrite the default value once we pick an enemy from the props.
  let Enemy: JSX.Element = <></>;

  switch (type) {
    case 'meele':
      Enemy = <EnemyManTypes.Meele top={top} moveArea={moveArea} />;
      break;

    case 'rifle':
      Enemy = <EnemyManTypes.Rifle top={top} moveArea={moveArea} />;
      break;

    default:
      break;
  }

  return <>{Enemy}</>;
}
