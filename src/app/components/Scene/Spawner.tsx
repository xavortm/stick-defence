import React, { useContext, useEffect, useState } from 'react';

import { GameContext } from 'app/context/store';
import { useCurrentWaveTotalEnemies } from 'app/hooks/useCurrent';
import useSpawnEnemies from 'app/hooks/useSpawnEnemies';

// The Spawner mostly is side effect stuff that manages the game state.
export default function Spawner() {
  const { state, dispatch } = useContext(GameContext);
  const currentWaveTotalEnemies = useCurrentWaveTotalEnemies();

  const spawnedEnemies = useSpawnEnemies();
  const [enemiesList, setEnemiesList] = useState<JSX.Element[]>([]);

  // With this we know that the end has waved and the player cleared it.
  useEffect(() => {
    if (currentWaveTotalEnemies === state.gameplay.enemiesKilled) {
      dispatch({ type: 'END_WAVE' });
      setEnemiesList([]);

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

  useEffect(() => {
    setEnemiesList(spawnedEnemies);
  }, [spawnedEnemies]);

  return <>{enemiesList}</>;
}
