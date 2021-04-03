import React from 'react';
import styled from 'styled-components';

interface ShopInterface {
  visible?: boolean;
}

const ShopWindow = styled.div<ShopInterface>`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

export default function Shop({ visible }: ShopInterface): JSX.Element {
  return <ShopWindow visible={visible}>This is the shop</ShopWindow>;
}
