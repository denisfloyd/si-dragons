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
import ModalAddDragon from "@/components/widgets/ModalAddDragon";
import Button from "@/components/elements/Button";

export default function Dashboard() {
  const [editingDragon, setEditingDragon] = useState<Dragon>({} as Dragon);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
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

  const handleAddDragon = async (dragon: Dragon) => {
    const newDragon = {
      ...editingDragon,
      ...dragon,
    };

    await createDragon.mutateAsync(newDragon);
  };

  const createDragon = useMutation(
    async (dragon: Dragon) => {
      const response = await api.post(`/`, {
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

  const handleDeleteDragon = async (id: string) => {
    await deleteDragon.mutateAsync(id);
  };

  const deleteDragon = useMutation(
    async (id: string) => {
      const response = await api.delete(`/${id}`);

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dragons");
      },
    }
  );

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
              handleDelete={handleDeleteDragon}
              handleEditDragon={handleEditDragon}
            />
          ))}
        </DragonList>
      )}

      <ModalAddDragon
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddDragon={handleAddDragon}
      />

      <ModalEditDragon
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingDragon={editingDragon}
        handleUpdateDragon={handleUpdateDragon}
      />

      <Button onClick={toggleModal}>Adicionar Drãgão</Button>
    </Container>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const dragons = await getDragons();
  return { props: { dragons } };
});
