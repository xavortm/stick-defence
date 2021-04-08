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
  const [enemiesSent, setEnemiesSent] = useState(0);
  const [enemiesList, setEnemiesList] = useState<JSX.Element[]>([]);
  const timer = useRef<ReturnType<typeof setInterval>>();

  // Random numbers are needed to set the TOP value.
  const randomNumbers = Array.from({ length: 200 }, () =>
    Math.floor(Math.random() * 200),
  );

  useEffect(() => {
    // For all the times this component renders but there is no game going on, just
    // skip the meat of it ^^
    if (!state.gameplay.isPlaying) {
      setEnemiesSent(0);
      return undefined;
    }

    // This is the moment when we've sent all the enemies from Meele. Stop doing stuff.
    // @TODO: Later this will be reworked to work with all types.
    if (Waves[state.gameplay.currentWave].enemies.meele! <= enemiesSent) {
      clearInterval(timer.current);
      return undefined;
    }

    timer.current = setInterval(() => {
      setEnemiesSent(enemiesSent + 1);

      setEnemiesList(old => [
        ...old,
        <EnemyMan
          // Key is irrelevant really as we are not doing anything with it :3
          key={enemiesSent}
          // Random top value is needed to make the game interesting visually.
          top={randomNumbers[enemiesSent]}
          // @TODO: Change to pull all current wave enemies
          type="meele"
          moveArea={moveArea}
        />,
      ]);
    }, randomNumbers[enemiesSent] * 15);

    return () => {
      clearInterval(timer.current);
    };
  }, [
    state.gameplay.isPlaying,
    state.gameplay.currentWave,
    randomNumbers,
    moveArea,
    enemiesSent,
  ]);

  return <>{enemiesList}</>;
}
