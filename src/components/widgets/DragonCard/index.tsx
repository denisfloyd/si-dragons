import { FiEdit3, FiTrash } from "react-icons/fi";

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
  const setEditingDragon = () => {
    // handleEditDragon(dragon);
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
            className="icon"
            // onClick={setEditingFood}
            data-testid={`edit-dragon-${dragon.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
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
