import { gameStateInterface, actionPayloadInterface } from './stateInterface';

const Reducer = (
  state: gameStateInterface,
  action: actionPayloadInterface,
): gameStateInterface => {
  switch (action.type) {
    case 'NEW_WAVE':
      return { ...state, currentWave: state.currentWave + 1 };
    default:
      return state;
  }
};

export default Reducer;
