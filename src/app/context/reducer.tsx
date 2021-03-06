import { GunInterface } from '../components/Shop/GunInterface';
import { WaveInterface } from 'app/gameConfig/waves';

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
  ammo: number;
  bullets: number;
  money: number;

  isPlaying: boolean;
  isWaveEnded: boolean;
  isReloading: boolean;
  isGameCompleted: boolean;
  isGameLost: boolean;

  attackersMoveArea: number;
  enemiesKilled: number;
  enemiesKilledTotal: number;
  allWaves: WaveInterface[];
  enemiesList: JSX.Element[];

  baseHealth: number;
  baseHealthMax: number;
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
    case 'PREPARE_WAVES':
      return { ...state, allWaves: action.payload };
    case 'START_WAVE':
      return {
        ...state,
        currentWave: state.currentWave + 1,
        enemiesKilled: 0,
        isPlaying: true,
      };
    case 'END_WAVE':
      return { ...state, isPlaying: false, enemiesList: [] };
    case 'RELOADING':
      return { ...state, isReloading: true };
    case 'RELOADED':
      return { ...state, isReloading: false };
    case 'SHOT_FIRED':
      return { ...state, bullets: shoot(state.bullets, state.ammo) };
    case 'ADD_MONEY':
      return { ...state, money: state.money + action.payload };
    case 'END_GAME':
      return { ...state, isGameCompleted: true, isPlaying: false };
    case 'LOST_GAME':
      return { ...state, isGameLost: true, isPlaying: false };
    case 'DAMAGE_BASE':
      return {
        ...state,
        baseHealth: state.baseHealth -= action.payload,
      };
    case 'UPGRADE_AMMO':
      return {
        ...state,
        ...action.payload,
      };
    case 'REMOVE_ENEMEY':
      return {
        ...state,
        enemiesList: state.enemiesList.slice(state.enemiesList.length - 1, 1),
      };
    case 'SPAWN_ENEMEY':
      return {
        ...state,
        enemiesList: [...state.enemiesList, action.payload],
      };
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
