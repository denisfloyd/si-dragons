type Dragon = {
  id: string;
  name: string;
  type: string;
};

interface DragonCardProps {
  dragon: Dragon;
}

import { Container } from "./styles";

export const DragonCard: React.FC<DragonCardProps> = ({ dragon }) => {
  return (
    <Container>
      <span>{dragon.id}</span>
      <h3>{dragon.name}</h3>
    </Container>
  );
};
