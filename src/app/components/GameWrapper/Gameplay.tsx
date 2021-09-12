import React, { useContext } from 'react';
import { GameContext } from 'app/context/store';
import Scene from '../Scene/Scene';
import Dashboard from '../Dashboard/Dashboard';
import Completed from '../GameEnd/Completed';
import Lost from '../GameEnd/Lost';

export default function Gameplay() {
  const { state } = useContext(GameContext);

  return state.gameplay.allWaves.length > 0 ? (
    <>
      <Dashboard />
      <Scene />

      {/* When the end game is reached, open the screen below. */}
      <Completed />
      <Lost />
    </>
  ) : null;
}
