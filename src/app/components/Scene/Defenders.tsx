import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../context/store';

export default function Defenders(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    if (state.gameplay.baseHealth <= 0) {
      dispatch({ type: 'LOST_GAME' });
    }
  }, [dispatch, state.gameplay.baseHealth]);
  return <div></div>;
}

/*
The defenders is the simplest one as it doesn't have to do anything really aside
from rendering the tiers of defence + some animations at later point. It's visuals
come mostly from the shop purchases. It's irrelevant to waves as well.
*/
