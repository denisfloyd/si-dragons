import styled from "styled-components";
import { flexbox } from "@/styles/abstracts/_mixins";
import { SIZE } from "@/styles/abstracts/_variables";

export const Container = styled.header`
  div {
    ${flexbox("column", "flex-start", "flex-start")}
  }

  button {
    width: auto;
    padding: 0;
    background: transparent;
    height: auto;
    margin: ${SIZE._16} 0 ${SIZE._32};
    outline: none;

    &:hover {
      background: transparent;
    }
  }
`;
