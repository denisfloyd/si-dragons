import styled from "styled-components";

import { flexbox } from "@/styles/abstracts/_mixins";
import { SIZE } from "@/styles/abstracts/_variables";

export const Container = styled.li`
  ${flexbox("column", "stretch")};
  background: var(--gray-100);
  border-radius: 8px;

  section.body {
    padding: ${SIZE._24};
    flex: 1;

    h2 {
      color: var(--gray-600);
    }

    p {
      color: var(--gray-600);

      margin-top: ${SIZE._16};
    }

    cursor: pointer;
  }

  section.footer {
    ${flexbox()}

    padding: ${SIZE._20} ${SIZE._32};
    background: var(--blue-300);
    border-radius: 0px 0px 8px 8px;

    div.icon-container {
      display: flex;

      button {
        background: var(--white);
        padding: ${SIZE._10};
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        &:hover {
          background: var(--gray-100);
        }

        svg {
          color: var(--gray-600);
        }

        & + button {
          margin-left: ${SIZE._8};
        }
      }
    }
  }
`;
