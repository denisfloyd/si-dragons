import styled from "styled-components";
import { flexbox, mediaQuery, setDimensions } from "@/styles/abstracts/_mixins";

import ButtonComponent from "@/components/elements/Button";

import { SIZE, FONT_WEIGHT } from "@/styles/abstracts/_variables";

export const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const Banner = styled.section`
  background-image: url("./banner.png");

  background-size: cover;
  background-position: center;
  width: 50vw;
  height: 100vh;

  ${mediaQuery("max", "md")`
    display: none;
  `}
`;

export const Content = styled.section`
  ${flexbox("column")};
  ${setDimensions("50%", "auto")};
  background-color: var(--gray-600);

  ${mediaQuery("max", "md")`
    width: 100%;

    background: url(./banner.png);
    background-position: bottom;
    background-size: cover;
    background-position-y: top;
  `}
`;

export const Form = styled.form`
  margin: auto;
  ${flexbox("column", "center", "space-between")};
`;

export const InputContainer = styled.div`
  margin-bottom: ${SIZE._24};
  @include flexbox(column);

  label {
    font-weight: ${FONT_WEIGHT.BOLD};
    font-size: ${SIZE._14};
    color: var(--gray-600);
  }

  input {
    margin-top: ${SIZE._8};
  }
`;

export const Button = styled(ButtonComponent)`
  display: block;
  margin: ${SIZE._32} auto;
`;
