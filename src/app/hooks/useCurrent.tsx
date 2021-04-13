import { useContext } from 'react';
import { GameContext } from '../context/store';
import { GunInterface } from '../components/Shop/GunInterface';

import Waves from '../gameConfig/waves';

/**
 * Uses current gun
 * @returns  Object with the current gun structure and data from the store
 */
export function useCurrentGun(): GunInterface {
  const { state } = useContext(GameContext);

  let currentGun: GunInterface | undefined = state.shop.guns.find(gun => {
    return gun.type === state.gameplay.currentGun;
  });

  return currentGun !== undefined
    ? currentGun
    : // Well, this shouldn't really happen as I have a gun always defined
      // and I won't be passing false values, BUT if somehow it happens, it's more or less
      // an easter egg :) If it's my problem, the player will get an overpowered gun.
      {
        type: 'Bunny',
        timeToReload: 0,
        ammo: 10,
        cost: 99999,
        damage: 99999,
      };
}

export function useCurrentWaveTotalEnemies(): number {
  const { state } = useContext(GameContext);
  let totalEnemies = 0;

  if (typeof Waves[state.gameplay.currentWave] === 'undefined') {
    return 0;
  }

  for (const [key, value] of Object.entries(
    Waves[state.gameplay.currentWave].enemies,
  )) {
    if (typeof value === 'number') totalEnemies += value;
  }

  // Safety check in case something above fails. We only want integers.
  if (typeof totalEnemies === 'undefined') {
    return 0;
  }

  return totalEnemies;
}
