import React, { useContext } from 'react';
import { EnemyManTypes } from './Man';
import { GameContext } from '../../context/store';

type EnemyProps = {
  /** What type of an enemy should be loaded? */
  type: 'meele' | 'rifle';
};

function EnemyHitbox({ children }) {
  const { state, dispatch } = useContext(GameContext);

  const onClickHandler = () => {
    // Increase the current wave.
    dispatch({
      type: 'NEW_WAVE',
    });

    console.log('it was clicked', state);
  };

  return <button onClick={onClickHandler}>{children}</button>;
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
