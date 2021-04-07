import React, { useContext, useEffect, useRef, useState } from 'react';
import { EnemyMan } from '../Spawns/';
import { GameContext } from '../../context/store';
import { EnemyManTypes } from '../Spawns/Man';
import Waves from '../../gameConfig/waves';

interface SpawnerInterface {
  moveArea: number;
}

export default function Spawner({ moveArea }: SpawnerInterface) {
  const { state } = useContext(GameContext);
  const enemiesSent = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const [enemiesList, setEnemiesList] = useState<JSX.Element[]>([]);

  // Random numbers are needed to set the TOP value.
  const randomNumbers = Array.from({ length: 200 }, () =>
    Math.floor(Math.random() * 200),
  );

  // @TODO: Refactor at some point by cleaning up if statements and code structure.
  useEffect(() => {
    if (state.gameplay.isPlaying) {
      if (
        Waves[state.gameplay.currentWave].enemies.meele! <= enemiesSent.current
      ) {
        clearInterval(timer.current);
      } else {
        timer.current = setInterval(() => {
          enemiesSent.current++;

          setEnemiesList(old => [
            ...old,
            <EnemyMan
              // Key is irrelevant really as we are not doing anything with it :3
              key={randomNumbers[enemiesSent.current]}
              top={randomNumbers[enemiesSent.current]}
              type="meele"
              moveArea={moveArea}
            />,
          ]);
        }, randomNumbers[enemiesSent.current] * 15);
      }
    } else {
      enemiesSent.current = 0;
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
