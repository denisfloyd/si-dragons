import { useRef } from "react";

import { FormHandles } from "@unform/core";

import * as Yup from "yup";

import { Dragon } from "@/services/hooks/useDragons";
import Modal from "@/components/elements/Modal";
import { Input } from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import getValidationsErrors from "@/utils/getValidationErrors";

import { Form } from "./styles";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddDragon: (data: Dragon) => void;
}

const ModalAddDragon: React.FC<ModalAddFoodProps> = ({
  isOpen,
  setIsOpen,
  handleAddDragon,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: Dragon) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        type: Yup.string().required("Tipo obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      handleAddDragon(data);
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Dragão</h1>

        <Input name="name" placeholder="Nome do dragão" />
        <Input name="type" placeholder="Tipo do dragão" />

        <Button type="submit" data-testid="add-dragon-button-modal">
          Adicionar
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalAddDragon;
