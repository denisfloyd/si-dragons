import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import { convertPixelToREM } from '@/styles/abstracts/_functions';
import { SIZE } from '@/styles/abstracts/_variables';

interface ContainerProps {
  type?: "success" | "error" | "info";
  hasDescription: number;
}

const toastTypeVariation = {
  info: css`
    background: var(--blue-100);
    color: var(--blue-300);
  `,
  success: css`
    background: var(--green-100);
    color: var(--green-400);
  `,
  error: css`
    background: var(--red-50);
    color: var(--red-400);
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  width: ${convertPixelToREM(360)};

  position: relative;
  padding: ${SIZE._16} ${SIZE._32} ${SIZE._16} ${SIZE._16};
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  margin: ${convertPixelToREM(30)} ${convertPixelToREM(30)} ${SIZE._8};

  display: flex;

  & + div {
    margin-top: ${SIZE._8};
  }

  ${(props) => toastTypeVariation[props.type || "info"]};

  svg {
    margin: ${SIZE._4} ${SIZE._12} 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: ${SIZE._4};
      font-size: ${SIZE._14};
      opacity: 0.8;
      line-height: 18px;
    }
  }

  button {
    position: absolute;
    right: 0;
    top: ${SIZE._12};
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
