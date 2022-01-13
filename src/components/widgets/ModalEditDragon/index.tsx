import React, { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import { FormHandles } from "@unform/core";

import { Dragon } from "@/services/hooks/useDragons";

import Modal from "@/components/elements/Modal";
import Button from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateDragon: (data: Dragon) => void;
  editingDragon: Dragon;
}

const ModalEditFood: React.FC<ModalEditFoodProps> = ({
  isOpen,
  setIsOpen,
  handleUpdateDragon,
  editingDragon,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: Dragon) => {
    handleUpdateDragon(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingDragon}>
        <h1>Editar Dragon</h1>

        <Input name="name" placeholder="Nome do dragão" />
        <Input name="type" placeholder="Tipo do dragão" />

        <Button type="submit" data-testid="edit-food-button">
          Editar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
