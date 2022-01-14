import { FiEdit3, FiTrash } from "react-icons/fi";

import { Dragon } from "@/services/hooks/useDragons";

interface DragonCardProps {
  dragon: Dragon;
  handleEditDragon: (dragon: Dragon) => void;
  handleDelete: (id: string) => void;
}

import { Container } from "./styles";
import Link from "next/link";

export const DragonCard: React.FC<DragonCardProps> = ({
  dragon,
  handleDelete: handleDeleteProps,
  handleEditDragon,
}) => {
  const setEditingDragon = () => {
    handleEditDragon(dragon);
  };

  return (
    <Container data-testid="dragon-card">
      <Link href={`/dragon/${dragon.id}`} passHref={true}>
        <section className="body">
          <h2>{dragon.name}</h2>
          <p>{dragon.type}</p>
        </section>
      </Link>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            onClick={setEditingDragon}
            data-testid={`edit-dragon-${dragon.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            onClick={() => handleDeleteProps(dragon.id)}
            data-testid={`remove-dragon-${dragon.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};
