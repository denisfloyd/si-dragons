import styled from "styled-components";
import { Form as Unform } from "@unform/web";
import { SIZE } from "@/styles/abstracts/_variables";

export const Form = styled(Unform)`
  div {
    margin-top: ${SIZE._24};
  }

  h1 {
    font-weight: 500;
    font-size: ${SIZE._32};
    line-height: 36px;
    text-align: center;
  }
`;
