import { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../context/store';
import EnemyInterface from 'app/components/Spawns/EnemyInterface';
import { useCurrentGun } from './useCurrent';

export default function useEnemyObject(enemyConfig: EnemyInterface) {
  const [dead, setDead] = useState(false);
  const shootingInterval = useRef(0);
  const [health, setHealth] = useState(enemyConfig.health);
  const { dispatch } = useContext(GameContext);
  const currentGun = useCurrentGun();

  useEffect(() => {
    let timer;

    if (dead) {
      clearTimeout(timer);
      clearInterval(shootingInterval.current);
      return;
    }

    timer = setTimeout(() => {
      // Every 1 second, deal damage to the base.
      shootingInterval.current = setInterval(() => {
        dispatch({ type: 'DAMAGE_BASE', payload: 10 });
      }, 1000);
    }, enemyConfig.speed * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(shootingInterval.current);
    };
  }, [dead, dispatch, enemyConfig.speed]);

  const handleClick = () => {
    // The check here will have to account for armor as well.
    if (health - currentGun.damage <= 0) {
      setDead(true);

      // Keep global state of how many enemies were killed.
      dispatch({ type: 'KILL_ENEMEY' });

      // Increment money to global state here:
      dispatch({
        type: 'ADD_MONEY',
        payload: enemyConfig.bounty,
      });
    }

    setHealth(health => health - currentGun.damage);
  };

  // Not the best way to approach this but it works.
  // @see https://fettblog.eu/typescript-react-typeing-custom-hooks/
  return [handleClick, dead] as const;
}
