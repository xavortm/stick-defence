import { GunInterface } from '../components/Shop/GunInterface';

export interface shopStateInterface {
  guns: GunInterface[];
}

export interface gameplayInterface {
  currentWave: number;
  ammo: number;
  isPlaying: boolean;
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
