import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { withSSRAuth } from "@/utils/withSSRAuth";

import { DragonCard } from "@/components/widgets/DragonCard";
import { Header } from "@/components/widgets/Header";
import ModalEditDragon from "@/components/widgets/ModalEditDragon";
import ModalAddDragon from "@/components/widgets/ModalAddDragon";
import Button from "@/components/elements/Button";
import { Loading } from "@/components/widgets/LoadingState";

import { api } from "@/services/apiClient";
import { queryClient } from "@/services/queryClient";
import { Dragon, getDragons, useDragons } from "@/services/hooks/useDragons";

import Container, { DragonList, ErrorMessage } from "./styles";
import { ToastContext } from "@/contexts/ToastContext";

interface DashboardProps {
  dragons: Dragon[];
}

export default function Dashboard({ dragons }: DashboardProps) {
  const [editingDragon, setEditingDragon] = useState<Dragon>({} as Dragon);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const { addToast } = useContext(ToastContext);

  const { data, isLoading, isFetching, error } = useDragons(dragons);

  const handleUpdateDragon = async (dragon: Dragon) => {
    setIsFetchingData(true);

    const dragonUpdated = {
      ...editingDragon,
      ...dragon,
    };

    await editDragon.mutateAsync(dragonUpdated);
  };

  const editDragon = useMutation(async (dragon: Dragon) => {
    try {
      const response = await api.put(`/${editingDragon.id}`, {
        ...editingDragon,
        ...dragon,
      });

      queryClient.invalidateQueries("dragons");

      return response.data;
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro",
        description: "Ocorreu um erro ao editar o dragão!",
      });
    } finally {
      setIsFetchingData(false);
    }
  });

  const handleAddDragon = async (dragon: Dragon) => {
    setIsFetchingData(true);
    await createDragon.mutateAsync(dragon);
  };

  const createDragon = useMutation(async (dragon: Dragon) => {
    try {
      const response = await api.post(`/`, {
        ...dragon,
      });

      queryClient.invalidateQueries("dragons");

      return response.data;
    } catch (error) {
      addToast({
        type: "error",
        title: "Erro",
        description: "Ocorreu um erro ao criar um novo dragão!",
      });
    } finally {
      setIsFetchingData(false);
    }
  });

  const handleDeleteDragon = async (id: string) => {
    setIsFetchingData(true);
    await deleteDragon.mutateAsync(id);
  };

  const deleteDragon = useMutation(async (id: string) => {
    const response = await api.delete(`/${id}`);
    setIsFetchingData(false);
    queryClient.invalidateQueries("dragons");

    return response.data;
  });

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
    <>
      {(isLoading || isFetchingData || isFetching) && <Loading />}

      <Container>
        <Header />

        {error || !data ? (
          <ErrorMessage>Falha ao obter dados dos usuários {error}</ErrorMessage>
        ) : (
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

        <Button onClick={toggleModal} data-testid="button-add-dragon">
          Adicionar Dragão
        </Button>
      </Container>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const dragons = await getDragons();
  return { props: { dragons } };
});
