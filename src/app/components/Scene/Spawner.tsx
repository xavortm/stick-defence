import React, { useContext, useEffect } from 'react';

import { GameContext } from 'app/context/store';
import { useCurrentWaveTotalEnemies } from 'app/hooks/useCurrent';
import useSpawnEnemies from 'app/hooks/useSpawnEnemies';

// The Spawner mostly is side effect stuff that manages the game state.
export default function Spawner() {
  const { state, dispatch } = useContext(GameContext);
  const currentWaveTotalEnemies = useCurrentWaveTotalEnemies();

  // Just wrap some react code
  useSpawnEnemies();

  // With this we know that the end has waved and the player cleared it.
  useEffect(() => {
    if (currentWaveTotalEnemies === state.gameplay.enemiesKilled) {
      dispatch({ type: 'END_WAVE' });

      // Once the wave ends, check if the we've reached the final level.
      if (state.gameplay.allWaves.length === state.gameplay.currentWave + 1) {
        dispatch({ type: 'END_GAME' });
      }
    }
  }, [
    dispatch,
    currentWaveTotalEnemies,
    state.gameplay.enemiesKilled,
    state.gameplay.currentWave,
    state.gameplay.allWaves.length,
  ]);

  return <>{state.gameplay.enemiesList}</>;
}
