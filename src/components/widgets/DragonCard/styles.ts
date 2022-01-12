import { flexbox } from "@/styles/abstracts/_mixins";
import styled from "styled-components";

export const Container = styled.div`
  ${flexbox("column", "flex-start", "flex-start")};
  border: 1px solid var(--orange-100);
  background-color: var(--gray-100);
`;
