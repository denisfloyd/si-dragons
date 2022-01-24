import React, { useRef } from "react";
import * as Yup from "yup";

import { Form } from "./styles";
import { FormHandles } from "@unform/core";

import { Dragon } from "@/services/hooks/useDragons";

import getValidationsErrors from "@/utils/getValidationErrors";

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
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Nome obrigatório")
          .min(5, "O nome deve ter no mínimo 5 caracteres"),
        type: Yup.string()
          .required("Tipo obrigatório")
          .min(2, "O tipo deve ter no mínimo 2 caracteres"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      handleUpdateDragon(data);
      setIsOpen();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }

   
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingDragon}>
        <h1>Editar Dragão</h1>

        <Input name="name" placeholder="Nome do dragão" />
        <Input name="type" placeholder="Tipo do dragão" />

        <Button type="submit" data-testid="edit-dragon-button-modal">
          Editar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;