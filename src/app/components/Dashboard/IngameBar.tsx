import React from 'react';
import styled from 'styled-components';

interface ComponentInterface {
  label: string;
  counterTotal: number;
  counterCurrent: number;
  isReloading?: boolean;
}

interface BarProps {
  current: number;
  total: number;
}

const BarWrapper = styled.div`
  width: 100%;
  height: 1em;
  background: #ddd;

  // Temporary value
  max-width: 12em;
  margin-right: 1em;
`;

const Bar = styled.div<BarProps>`
  width: ${props => (props.current / props.total) * 100}%;
  height: 100%;

  background: black;
`;

interface IngameBarInterface {
  isReloading: boolean | undefined;
}

const CounterWrapper = styled.div<IngameBarInterface>`
  display: flex;
  width: 100%;
  align-items: center;
  opacity: ${props => (props.isReloading === true ? 0.3 : 1)};

  &:first-child {
    margin-right: 1em;
  }
`;

const CounterLabel = styled.span`
  display: inline-block;
  margin-right: 1em;
`;

export default function IngameBar({
  label,
  counterTotal,
  counterCurrent,
  isReloading,
}: ComponentInterface) {
  return (
    <CounterWrapper isReloading={isReloading}>
      <CounterLabel>{label}</CounterLabel>
      <BarWrapper>
        <Bar current={counterCurrent} total={counterTotal} />
      </BarWrapper>
      <span>
        {counterCurrent} / {counterTotal}
      </span>
    </CounterWrapper>
  );
}
