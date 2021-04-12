import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';
import Button from '../UI/Button';

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

export default function PurchaseOption({ cost, label, type }) {
  const { state, dispatch } = useContext(GameContext);

  return (
    <UpgradeType visible={state.gameplay.money > cost}>
      <strong>{label}:</strong>
      <span>{state.gameplay[type]}</span>
      <Button
        onClick={() =>
          dispatch({
            type: 'UPGRADE_' + type.toUpperCase(),
            payload: {
              [type]: state.gameplay[type] + 1,
              money: state.gameplay.money - cost,
            },
          })
        }
      >
        +
      </Button>
      <span>-${cost}</span>
    </UpgradeType>
  );
}
