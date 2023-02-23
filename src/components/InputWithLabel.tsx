import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1.5rem;
  color: White;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid black;
  outline: none;
  border-radius: 5px;
  line-height: 4rem;
  font-size: 2.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

interface Label {
  children: string;
  label: string;
  onChange?: (e: any) => void;
}
export default function InputWithLabel({ children, label, ...rest }: Label) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input {...rest} value={children} />
    </Wrapper>
  );
}
