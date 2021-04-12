import React from 'react';
import styled from 'styled-components';

interface ButtonStyledInterface {
  solid?: boolean;
}

interface ButtonInterface {
  solid?: boolean;
  onClick: any;
  children: JSX.Element | string;
}

const StyledButton = styled.button<ButtonStyledInterface>`
  border: 1px solid black;
  background: ${props => (props.solid ? 'black' : 'white')};
  color: ${props => (props.solid ? 'white' : 'black')};
  padding: 0.75em 1.25em;
  display: inline-block;
  cursor: pointer;
`;

export default function Button({ children, onClick, solid }: ButtonInterface) {
  return (
    <StyledButton solid={solid} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
