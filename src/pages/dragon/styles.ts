import styled from "styled-components";

import { flexbox } from "@/styles/abstracts/_mixins";
import { SIZE } from "@/styles/abstracts/_variables";
import { convertPixelToREM } from "@/styles/abstracts/_functions";

export const Container = styled.div`
  padding: ${SIZE._24};
  color: var(--blue-100);

  button {
    ${flexbox()};
    width: auto;
    margin-bottom: ${SIZE._48};

    svg {
      margin-right: ${SIZE._8};
    }
  }

  h1 {
    font-size: ${convertPixelToREM(96)};
    /* color: var(--blue-100); */
  }

  h2 {
    font-size: ${SIZE._32};
    margin-bottom: ${SIZE._16};
  }
`;
