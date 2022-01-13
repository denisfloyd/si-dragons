import styled from "styled-components";
import { SIZE } from "@/styles/abstracts/_variables";

export const Container = styled.main`
  padding: ${SIZE._32} ${SIZE._32} 0;
`;

export const DragonList = styled.ul`
  display: grid;
  grid-gap: ${SIZE._24};
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  list-style: none;
`;
