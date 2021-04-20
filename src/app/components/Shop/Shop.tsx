import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';
import Button from '../UI/Button';
import PurchaseOption from './PurchaseOption';

interface ShopInterface {
  visible?: boolean;
}

const ShopWindow = styled.div<ShopInterface>`
  position: absolute;
  display: ${props => (props.visible ? 'block' : 'none')};
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  top: 0;
  padding: 4em;
`;

const ShopInner = styled.div`
  background: white;
  width: 100%;
  height: 100%;
  padding: 2em;
  box-shadow: 0 10px 40px -25px rgba(0, 0, 0, 0.2);
`;

const Header = styled.header`
  border-bottom: 1px solid #ddd;
  padding-bottom: 1em;
  margin-bottom: 1em;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
  }

  button {
    margin-left: 0.5em;
  }
`;

const Heading = styled.h3`
  margin: 0;
`;

const ShopLayout = styled.div`
  display: flex;
`;

const LayoutPrimary = styled.div`
  flex: 0 0 20em;
`;
const LayoutSecondary = styled.div``;

const ShopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1em;
`;

export default function Shop(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  const handleNextWave = () => {
    dispatch({ type: 'START_WAVE' });
  };

  return (
    <ShopWindow visible={!state.gameplay.isPlaying}>
      <ShopInner>
        <Header>
          <h2>Shop: </h2>
          <div>
            <span>${state.gameplay.money} to spend </span>
            <Button solid onClick={handleNextWave}>
              Start next wave
            </Button>
          </div>
        </Header>

        <ShopLayout>
          <LayoutPrimary>
            <Heading>Upgrades</Heading>
            <ShopGrid>
              <PurchaseOption cost={100} label="Ammo" type="ammo" />
              <PurchaseOption
                cost={1000}
                label="Restore base"
                type="baseHealth"
              />
              <PurchaseOption
                cost={state.gameplay.baseHealthMax * 3}
                label="Upgrade base"
                type="baseHealthMax"
              />
            </ShopGrid>
          </LayoutPrimary>
          <LayoutSecondary></LayoutSecondary>
        </ShopLayout>
      </ShopInner>
    </ShopWindow>
  );
}
