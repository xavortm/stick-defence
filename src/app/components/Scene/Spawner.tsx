import React, { useContext, useEffect, useRef, useState } from 'react';
import { EnemyMan } from '../Spawns/';
import { GameContext } from '../../context/store';
import { EnemyManTypes } from '../Spawns/Man';
import Waves from '../../gameConfig/waves';

interface SpawnerInterface {
  moveArea: number;
}

export default function Spawner({ moveArea }: SpawnerInterface) {
  const { state, dispatch } = useContext(GameContext);
  const enemiesSent = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const [enemiesList, setEnemiesList] = useState<JSX.Element[]>([]);
  const randomNumbers = Array.from({ length: 200 }, () =>
    Math.floor(Math.random() * 200),
  );

  useEffect(() => {
    if (state.gameplay.isPlaying) {
      console.log(
        Waves[state.gameplay.currentWave].enemies.meele,
        enemiesSent.current,
      );

      if (
        Waves[state.gameplay.currentWave].enemies.meele! < enemiesSent.current
      ) {
        clearInterval(timer.current);
        enemiesSent.current = 0;
      } else {
        timer.current = setInterval(() => {
          enemiesSent.current++;

          setEnemiesList(old => [
            ...old,
            <EnemyMan
              // Math.random() * (200 - 1) + 1
              top={randomNumbers[enemiesSent.current]}
              type="meele"
              moveArea={moveArea}
            />,
          ]);
        }, 200);
      }
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [
    state.gameplay.isPlaying,
    state.gameplay.currentWave,
    randomNumbers,
    moveArea,
  ]);

  return <>{enemiesList}</>;
}
