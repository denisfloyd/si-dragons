import { useContext } from "react";

import { AuthContext } from "@/contexts/AuthContext";

import { Container } from "./styles";
import Button from "@/components/elements/Button";

export const Header: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <div>
        <h1>Usuário: {user}</h1>
        <Button onClick={signOut} data-testid="button-logout">
          Sign out
        </Button>
      </div>
    </Container>
  );
};
