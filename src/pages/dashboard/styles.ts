import styled from "styled-components";
import { SIZE } from "@/styles/abstracts/_variables";

const Container = styled.main`
  padding: ${SIZE._32};
  height: 100vh;
  position: relative;
  overflow: overlay;

  & > button {
    position: fixed;
    top: 2rem;
    width: auto;
    right: 2rem;

    background-color: var(--orange-100);
    &:hover {
      background: var(--orange-200);
    }
  }
`;

export default Container;

export const DragonList = styled.ul`
  display: grid;
  grid-gap: ${SIZE._24};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  list-style: none;
`;

export const ErrorMessage = styled.h1`
  color: var(--red-500);
  text-align: center;
`;