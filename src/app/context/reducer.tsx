import { GunInterface } from '../components/Shop/GunInterface';
import { useCurrentGun } from '../hooks/useCurrent';

export interface shopStateInterface {
  guns: GunInterface[];
}

export interface gameStateInterface {
  gameplay: gameplayInterface;
  shop: {
    guns: GunInterface[];
  };
}

export interface gameplayInterface {
  currentWave: number;
  currentGun: string;

  isPlaying: boolean;
  bullets: number;
  ammo: number;
  isReloading: boolean;
  money: number;
  enemiesKilled: number;
  enemiesKilledTotal: number;
}

export interface actionPayloadInterface {
  type: string;
  payload?: any;
}

export const Reducer = (
  state: gameplayInterface,
  action: actionPayloadInterface,
): gameplayInterface => {
  switch (action.type) {
    case 'NEW_WAVE':
      return {
        ...state,
        currentWave: state.currentWave + 1,
        enemiesKilled: 0,
      };
    case 'START_GAME':
      return { ...state, isPlaying: true, currentWave: 0 };
    case 'END_GAME':
      return { ...state, isPlaying: false };
    case 'RELOADING':
      return { ...state, isReloading: true };
    case 'RELOADED':
      return { ...state, isReloading: false };
    case 'SHOT_FIRED':
      return { ...state, bullets: shoot(state.bullets, state.ammo) };
    case 'ADD_MONEY':
      return { ...state, money: state.money + action.payload };
    case 'KILL_ENEMEY':
      return {
        ...state,
        enemiesKilled: state.enemiesKilled + 1,
        enemiesKilledTotal: state.enemiesKilledTotal + 1,
      };
    default:
      return state;
  }
};

export const Shop = (
  state: shopStateInterface,
  action: actionPayloadInterface,
): shopStateInterface => {
  switch (action.type) {
    case 'SELECT':
      return { ...state };
    default:
      return state;
  }
};

/**
 * Shoot a bullet. Calculates if we should reload or not.
 *
 * @param current Number
 * @param total Number
 * @returns Number
 */
const shoot = (current: number, total: number): number => {
  return current === 1 ? total : current - 1;
};
