import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';
import Button from '../UI/Button';

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
`;

const Heading = styled.h3`
  margin: 0;
`;

interface UpgradeTypeInterface {
  visible?: boolean;
}

const UpgradeType = styled.div<UpgradeTypeInterface>`
  display: flex;
  align-items: center;
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
  opacity: ${props => (props.visible ? '1' : '.5')};

  strong {
    flex: 0 8em;
  }

  span {
    text-align: right;
    flex: 1 0 3em;
    margin-right: 1em;

    &:last-child {
      margin-right: 0;
      margin-left: 1em;
    }
  }
`;

const ShopLayout = styled.div`
  display: flex;
`;

const LayoutPrimary = styled.div`
  flex: 0 0 20em;
`;
const LayoutSecondary = styled.div``;

export default function Shop(): JSX.Element {
  const { state, dispatch } = useContext(GameContext);

  const handleNextWave = () => {
    dispatch({ type: 'START_WAVE' });
  };

  return (
    <ShopWindow visible={!state.gameplay.isPlaying}>
      <ShopInner>
        <Header>
          <h2>Shop - ${state.gameplay.money} available</h2>
          <Button solid onClick={handleNextWave}>
            Start next wave
          </Button>
        </Header>

        <ShopLayout>
          <LayoutPrimary>
            <Heading>Upgrades</Heading>

            <UpgradeType visible={state.gameplay.money > 100}>
              <strong>Ammo:</strong>
              <span>{state.gameplay.ammo}</span>
              <Button
                onClick={() =>
                  dispatch({
                    type: 'UPGRADE_AMMO',
                    payload: {
                      ammo: state.gameplay.ammo + 1,
                      money: state.gameplay.money - 100,
                    },
                  })
                }
              >
                +
              </Button>
              <span>-$100</span>
            </UpgradeType>
          </LayoutPrimary>
          <LayoutSecondary></LayoutSecondary>
        </ShopLayout>
      </ShopInner>
    </ShopWindow>
  );
}
