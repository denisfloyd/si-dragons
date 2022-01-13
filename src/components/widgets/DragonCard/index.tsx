import { FiEdit3, FiTrash } from "react-icons/fi";

import { Dragon } from "@/services/hooks/useDragons";

interface DragonCardProps {
  dragon: Dragon;
  handleEditDragon: (dragon: Dragon) => void;
  handleDelete?: (id: number) => void;
}

import { Container } from "./styles";

export const DragonCard: React.FC<DragonCardProps> = ({
  dragon,
  handleDelete,
  handleEditDragon,
}) => {
  const setEditingDragon = () => {
    handleEditDragon(dragon);
  };

  return (
    <Container>
      <section className="body">
        <h2>{dragon.name}</h2>
        <p>{dragon.type}</p>
      </section>
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
            // onClick={() => handleDeleteProps(dragon.id)}
            data-testid={`remove-dragon-${dragon.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};
