import { GunInterface } from '../components/Shop/GunInterface';

export interface shopStateInterface {
  guns: GunInterface[];
}

export interface gameplayInterface {
  currentWave: number;
  ammo: number;
  isPlaying: boolean;
  bullets: number;
  isReloading: boolean;
}

export interface gameStateInterface {
  gameplay: gameplayInterface;
  shop: {
    guns: GunInterface[];
  };
}

export interface actionPayloadInterface {
  type: String;
}

export const Reducer = (
  state: gameplayInterface,
  action: actionPayloadInterface,
): gameplayInterface => {
  switch (action.type) {
    case 'NEW_WAVE':
      return { ...state, currentWave: state.currentWave + 1 };
    case 'START_GAME':
      return { ...state, isPlaying: true };
    case 'END_GAME':
      return { ...state, isPlaying: false };
    case 'RELOADING':
      return { ...state, isReloading: true };
    case 'RELOADED':
      return { ...state, isReloading: false };
    case 'SHOT_FIRED':
      return { ...state, bullets: shoot(state.bullets, state.ammo) };
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
