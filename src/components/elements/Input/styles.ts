import styled, { css } from "styled-components";
import { FONT_WEIGHT, SIZE } from "@/styles/abstracts/_variables";
import { convertPixelToREM } from "@/styles/abstracts/_functions";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 0 ${SIZE._16};
  height: ${convertPixelToREM(40)};
  width: 100%;
  min-width: 16rem;
  border-radius: 3px;
  background-color: var(--white);

  border: 2px solid var(--gray-300);
  color: var(--gray-600);

  display: flex;
  align-items: center;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.09);

  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid var(--blue-300);
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: var(--blue-300);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: 0;
    color: var(--gray-600);

    &::placeholder {
      color: var(--gray-300);
    }
  }

  svg {
    margin-right: ${SIZE._16};
  }
`;

export const Label = styled.label`
  display: block;

  font-size: ${SIZE._14};
  font-weight: ${FONT_WEIGHT.BOLD};
  margin: ${SIZE._8} 0;
  color: var(--white);
`;

export const Error = styled.span`
  color: var(--red-400);
`;