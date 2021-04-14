import { useContext } from 'react';
import { GameContext } from '../context/store';
import { GunInterface } from '../components/Shop/GunInterface';
import { sumObjects, arrayShuffle } from 'app/utils/helpers';

import { WaveEnemiesInterface, WaveInterface } from '../gameConfig/waves';

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

/**
 * Uses current wave total enemies
 *
 * @todo Memoize as it's practically returning the same thing all the time.
 * @returns current wave total enemies
 */
export function useCurrentWaveTotalEnemies(): number {
  const { state } = useContext(GameContext);
  const enemiesCount = getEnemiesCountAllWaves(state.gameplay.allWaves);

  // Safety check in case something above fails. We only want integers.
  if (
    typeof enemiesCount[state.gameplay.currentWave] === 'undefined' ||
    typeof state.gameplay.allWaves[state.gameplay.currentWave] === 'undefined'
  ) {
    return 0;
  }

  return enemiesCount[state.gameplay.currentWave];
}

/**
 * Uses current wave enemies
 *
 * @returns an Object with the amount of enemies to send per type
 */
export function useCurrentWaveEnemies() {
  const { state } = useContext(GameContext);
  return getEnemiesToSendPerType(state.gameplay.allWaves)[
    state.gameplay.currentWave
  ];
}

// @todo stuff below should be part of the Utils later and only work with params.
// ------------------------------------------------------------------------------

/**
 * Maps enemies count and returns an array with the count of enemies for all waves.
 * @returns enemies count array with number for each wave.
 */
function getEnemiesCountAllWaves(allWaves: WaveInterface[]): number[] {
  let enemiesInWaves: number[] = [];
  let totalEnemiesThisWave: number = 0;

  allWaves.forEach(wave => {
    for (const [key, value] of Object.entries(wave.enemies)) {
      if (typeof value === 'number') totalEnemiesThisWave += value;
    }

    enemiesInWaves.push(totalEnemiesThisWave);
  });

  return enemiesInWaves;
}

/**
 * Randomizes enemies sequence.
 *
 * Has to be run only once though as every time it would return random array,
 * which is terrible for performance.
 * @param waveIndex
 * @returns enemies sequence
 */
export function randomizeEnemiesSequence(
  allWaves: WaveInterface[],
  waveIndex: number,
): string[] {
  let enemiesThisWave = getEnemiesToSendPerType(allWaves)[waveIndex];
  let arrayOfEnemies: string[] = [];

  for (const [key, value] of Object.entries(enemiesThisWave)) {
    arrayOfEnemies = arrayOfEnemies.concat(Array(value).fill(key));
  }

  return arrayShuffle(arrayOfEnemies);
}

/**
 * Maps enemy types count
 *
 * @returns array of all enemies per type for each wave
 */
function getEnemiesToSendPerType(allWaves) {
  let enemiesInWaves: WaveEnemiesInterface[] = [];

  allWaves.forEach((wave, index) => {
    if (index === 0) {
      enemiesInWaves.push(wave.enemies);
      return;
    }

    enemiesInWaves.push(sumObjects(wave.enemies, allWaves[index - 1].enemies));
  });

  return enemiesInWaves;
}
