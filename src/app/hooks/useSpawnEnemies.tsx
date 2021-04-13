import React, { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../context/store';
import { EnemyMan } from '../components/Spawns/';
import Waves from '../gameConfig/waves';

export default function useSpawnEnemies() {
  const { state } = useContext(GameContext);

  const [enemiesList, setEnemiesList] = useState<JSX.Element[]>([]);
  const [enemiesSent, setEnemiesSent] = useState(0);
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
      return;
    }

    // This is the moment when we've sent all the enemies from Meele. Stop doing stuff.
    // @TODO: Later this will be reworked to work with all types.
    if (Waves[state.gameplay.currentWave].enemies.meele! <= enemiesSent) {
      clearInterval(timer.current);
      return;
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
          moveArea={state.gameplay.attackersMoveArea}
        />,
      ]);

      // As currentWave increases, the value below (15) must decrease.
    }, randomNumbers[enemiesSent] * 15);

    return () => {
      clearInterval(timer.current);
    };
  }, [
    state.gameplay.isPlaying,
    state.gameplay.currentWave,
    state.gameplay.attackersMoveArea,
    randomNumbers,
    enemiesSent,
  ]);

  return enemiesList;
}
