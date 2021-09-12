import { useEffect, useContext } from 'react';
import { wavesSetup } from 'app/gameConfig/waves';
import { GameContext } from '../../context/store';
const PrepareGame = () => {
  const { dispatch } = useContext(GameContext);

  useEffect(() => {
    // const randomizedArray = [];

    // Prepare the wave for this game run (randomize stuff);
    // @todo - for some reason this doesn't dispatch to the reduced ........
    dispatch({ type: 'PREPARE_WAVES', payload: wavesSetup });
  }, [dispatch]);

  return null;
};

export default PrepareGame;
