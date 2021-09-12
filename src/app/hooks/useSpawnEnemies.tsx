import React, { useContext, useEffect, useRef } from 'react';
import { GameContext } from '../context/store';
import { EnemyMan } from '../components/Spawns/';
import {
  useCurrentWaveTotalEnemies,
  useRandomizedCurrentWaveEnemies,
} from './useCurrent';

export default function useSpawnEnemies() {
  const { state, dispatch } = useContext(GameContext);
  const currentWaveTotalEnemies: number = useCurrentWaveTotalEnemies();
  const currentWaveEnemies = useRandomizedCurrentWaveEnemies();
  const enemiesSent = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!state.gameplay.isPlaying) {
      return;
    }

    timer.current = setInterval(() => {
      if (currentWaveTotalEnemies <= enemiesSent.current) {
        clearInterval(timer.current);
        enemiesSent.current = 0;
        return;
      }

      dispatch({
        type: 'SPAWN_ENEMEY',
        payload: (
          <EnemyMan
            key={enemiesSent.current}
            top={Math.floor(Math.random() * 200)}
            type={currentWaveEnemies[enemiesSent.current]}
            moveArea={state.gameplay.attackersMoveArea}
          />
        ),
      });

      enemiesSent.current++;

      // As currentWave increases, the value below (15) must decrease.
    }, Math.floor(Math.random() * 200) * 15);

    return () => {
      clearInterval(timer.current);
    };
  }, [
    state.gameplay.isPlaying,
    state.gameplay.attackersMoveArea,
    enemiesSent,
    currentWaveTotalEnemies,
    currentWaveEnemies,
    dispatch,
  ]);
}
