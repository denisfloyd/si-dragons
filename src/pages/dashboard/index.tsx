import { useState } from "react";
import { withSSRAuth } from "@/utils/withSSRAuth";

import { Dragon, getDragons, useDragons } from "@/services/hooks/useDragons";
import { DragonCard } from "@/components/widgets/DragonCard";
import { Header } from "@/components/widgets/Header";

import { Container, DragonList } from "./styles";
import { api } from "@/services/apiClient";
import { useMutation } from "react-query";
import { queryClient } from "@/services/queryClient";
import ModalEditDragon from "@/components/widgets/ModalEditDragon";

export default function Dashboard() {
  const [editingDragon, setEditingDragon] = useState<Dragon>({} as Dragon);

  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const { data, isLoading, isFetching, error } = useDragons();

  const handleUpdateDragon = async (dragon: Dragon) => {
    const dragonUpdated = {
      ...editingDragon,
      ...dragon,
    };

    await editDragon.mutateAsync(dragonUpdated);
  };

  const editDragon = useMutation(
    async (dragon: Dragon) => {
      const response = await api.put(`/${editingDragon.id}`, {
        ...editingDragon,
        ...dragon,
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dragons");
      },
    }
  );

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditDragon = (dragon: Dragon) => {
    setEditingDragon(dragon);
    setEditModalOpen(true);
  };

  return (
    <Container>
      <Header />
      {data && (
        <DragonList>
          {data.map((dragon) => (
            <DragonCard
              key={dragon.id}
              dragon={dragon}
              // handleDelete={() => {}),
              handleEditDragon={handleEditDragon}
            />
          ))}
        </DragonList>
      )}

      <ModalEditDragon
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingDragon={editingDragon}
        handleUpdateDragon={handleUpdateDragon}
      />
    </Container>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const dragons = await getDragons();
  return { props: { dragons } };
});
