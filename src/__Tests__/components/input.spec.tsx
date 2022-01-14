import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import { Input } from "../../components/elements/Input";

jest.mock("@unform/core", () => {
  return {
    useField() {
      return {
        fieldName: "username",
        defaultValue: "",
        error: ["Error Teste"],
        registerField: jest.fn(),
      };
    },
  };
});

describe("Input Component", () => {
  it("should be to handler an input", () => {
    const { getByPlaceholderText } = render(
      <Input name="username" placeholder="Usuário" />
    );

    expect(getByPlaceholderText("Usuário")).toBeTruthy();
  });

  it("should render show errors", async () => {
    const { getByText } = render(
      <Input name="username" placeholder="Usuário" />
    );

    const spanContainer = getByText("Error Teste");

    expect(spanContainer).toBeTruthy();
  });
});
