import React from "react";
import { useTransition } from "react-spring";

import Toast from "@/components/elements/Toast";

import { ToastMessage } from "@/contexts/ToastContext";

import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithtransictions = useTransition(messages, {
    keys: (message) => message.id,
    from: { right: "-120%", opacity: 0 },
    enter: { right: "0%", opacity: 1 },
    leave: { right: "-120%", opacity: 0 },
  });

  return (
    <Container>
      {messagesWithtransictions((style, item) => (
        <Toast key={item.id} style={style} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
