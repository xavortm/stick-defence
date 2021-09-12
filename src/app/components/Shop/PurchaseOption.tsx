import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../context/store';
import { StyledButton } from '../UI/Button';

interface UpgradeTypeInterface {
  visible?: boolean;
}

interface PurchaseButtonInterface {
  asset: string;
}

const Cost = styled.div`
  color: purple;
`;

const PurchaseButton = styled.button<PurchaseButtonInterface>`
  width: 6em;
  height: 6em;
  text-indent: -999em;
  background-color: transparent;
  background-size: 3em 3em;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('/artwork-default/shop/${props => props.asset}.png');

  appearance: none;
  border: none;
  border: 1px solid #ddd;
`;

const Tooltip = styled.div`
  position: absolute;
  display: none;
  left: calc(100% + 1em);
  top: 0;

  strong {
    display: block;
  }

  span {
    display: block;
  }
`;

const UpgradeType = styled.div<UpgradeTypeInterface>`
  pointer-events: ${props => (props.visible ? 'all' : 'none')};
  opacity: ${props => (props.visible ? '1' : '.5')};
  margin-bottom: 0.5em;
  position: relative;

  ${StyledButton} {
    padding: 0.5em;
    width: 4em;
    height: 4em;
  }

  &:hover {
    ${Tooltip} {
      display: block;
      width: 15em;
      background: black;
      color: white;
      padding: 1em;
      z-index: 1;
    }
  }
`;

export default function PurchaseOption({ cost, label, type }) {
  const { state, dispatch } = useContext(GameContext);
  let value: number;

  switch (type) {
    case 'ammo':
      value = state.gameplay.ammo + 1;
      break;
    case 'baseHealth':
      value = state.gameplay.baseHealthMax;
      break;
    case 'baseHealthMax':
      value = state.gameplay.baseHealthMax * 2;
      break;
    default:
      break;
  }

  return (
    <UpgradeType visible={state.gameplay.money > cost}>
      <Tooltip>
        <strong>{label}:</strong>
        <span>You have: {state.gameplay[type]}</span>
      </Tooltip>
      <PurchaseButton
        asset={type}
        onClick={() =>
          dispatch({
            type: 'UPGRADE_' + type.toUpperCase(),
            payload: {
              [type]: value,
              money: state.gameplay.money - cost,
            },
          })
        }
      >
        Buy
      </PurchaseButton>
      <Cost>${cost}</Cost>
    </UpgradeType>
  );
}
