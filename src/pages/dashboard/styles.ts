import styled from "styled-components";
import { SIZE } from "@/styles/abstracts/_variables";

export const Container = styled.main`
  padding: ${SIZE._32};
  height: 100vh;
  position: relative;
  overflow: overlay;

  & > button {
    position: absolute;
    top: 20px;
    width: auto;
    right: 2rem;
  }
`;

export const DragonList = styled.ul`
  display: grid;
  grid-gap: ${SIZE._24};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  list-style: none;
`;
