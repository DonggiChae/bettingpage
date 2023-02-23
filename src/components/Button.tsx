import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  height: 4rem;
  width: 8rem;
  font-size: 1.5rem;

  background: rgb(255, 95, 158);
  &:hover {
    background: rgb(233, 0, 100);
  }
`;

interface Button {
  children: string;
  name?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function Button({ children, onClick, name }: Button) {
  return (
    <ButtonStyle name={name} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
}
