import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';

import IngameBar from './IngameBar';

const UIWrapper = styled.div`
  position: absolute;

  // Always visible on top (unless settings are open).
  top: 0;
  width: 100%;
  height: 100%;

  // This changes only when we open the settings or for inner children that can be interactive.
  pointer-events: none;
`;

const UIIngameBar = styled.div`
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;

  // Theming:
  /* border-bottom: 1px solid #ddd; */
  background: white;
`;

const UIIngameStats = styled.div`
  position: absolute;
  top: 4em;
  right: 1em;
  padding: 1em;

  // Theming:
  /* border: 1px solid #ddd; */
  background: white;

  p {
    margin: 0;
  }
`;

const UIIngameGuns = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  padding: 0 0.5em;

  // Theming:
  /* border-top: 1px solid #ddd; */
  background: white;
`;

const UIGun = styled.span`
  background: #f0f0f0;
  display: inline-block;
  padding: 0.25em 0.5em;
  border-radius: 0.5em;
`;

const UIIngameStatsHeading = styled.h2`
  margin: 0;
  font-size: 1em;
`;

export default function Dashboard(): JSX.Element {
  const { state } = useContext(GameContext);
  // const currentGun = useCurrentGun();

  return (
    <UIWrapper>
      <UIIngameBar>
        <IngameBar
          label="Bullets"
          counterCurrent={state.gameplay.bullets}
          counterTotal={state.gameplay.ammo}
          isReloading={state.gameplay.isReloading}
        />

        <IngameBar
          label="Health"
          counterCurrent={state.gameplay.baseHealth}
          counterTotal={state.gameplay.baseHealthMax}
        />
      </UIIngameBar>

      <UIIngameStats>
        <UIIngameStatsHeading>
          <p>Day {state.gameplay.currentWave}</p>
        </UIIngameStatsHeading>
        <p>Money {state.gameplay.money}</p>
      </UIIngameStats>

      <UIIngameGuns>
        <strong>Guns:</strong>
        <UIGun>Pistol</UIGun>
      </UIIngameGuns>
    </UIWrapper>
  );
}
