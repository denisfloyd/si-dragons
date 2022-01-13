import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { IoMdBackspace } from "react-icons/io";

import Button from "@/components/elements/Button";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: auto;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Page_404: React.FC = () => {
  return (
    <Container>
      <h1>Você parece perdido 😅</h1>
      <span>Clique em voltar para ir para a tela inicial ou Login</span>

      <Link href="/dashboard" passHref={true}>
        <Button>
          <IoMdBackspace />
          Voltar
        </Button>
      </Link>
    </Container>
  );
};

export default Page_404;
