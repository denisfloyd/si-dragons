import React from "react";
import { fireEvent, render, screen, waitFor } from "@/tests/test-utils";
import AxiosMock from "axios-mock-adapter";

import Dashboard, { getServerSideProps } from "@/pages/dashboard";

import { api } from "@/services/apiClient";

const apiMock = new AxiosMock(api);

const dragons = [
  {
    createdAt: "2022-01-12T17:28:45.889Z",
    name: "Artic Blank Dragons",
    type: "Super Ice Cold 90",
    histories: [],
    id: "7",
  },
  {
    createdAt: "2022-01-12T18:43:42.838Z",
    name: "Charizard",
    type: "Fogo",
    histories: [],
    id: "12",
  },
];

jest.mock("nookies", () => {
  return {
    parseCookies: jest.fn().mockReturnValue({ "@sidragons.token": "token" }),
  };
});

describe("Dashboard component", () => {
  beforeAll(() => {
    apiMock.onGet("?sortBy=name").reply(200, [...dragons]);
    apiMock.onPost().reply(200);
    apiMock.onPut().reply(200);
    apiMock.onDelete().reply(200);
  });

  it("it should render correctly", async () => {
    const { getByText, getByTestId } = render(
      <Dashboard dragons={[...dragons]} />
    );

    expect(getByText("Charizard")).toBeTruthy();
    expect(getByText("Artic Blank Dragons")).toBeTruthy();

    const buttonAddDragon = getByTestId("button-add-dragon");

    expect(buttonAddDragon).toBeTruthy();
  });

  it("it should loads initial data", async () => {
    const response = await getServerSideProps({} as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          dragons: [...dragons],
        },
      })
    );
  });

  it("it should be able to create a new Dragon", async () => {
    const { getByText, findByText } = render(
      <Dashboard dragons={[...dragons]} />
    );

    fireEvent.click(screen.getByTestId("button-add-dragon"));

    apiMock
      .onGet("?sortBy=name")
      .reply(200, [
        ...dragons,
        { name: "Teste", type: "Teste tipo", id: "13" },
      ]);

    await waitFor(() => {
      expect(findByText("Novo Dragão")).toBeTruthy();

      const inputName: HTMLInputElement =
        screen.getByPlaceholderText("Nome do dragão");
      const inputType: HTMLInputElement =
        screen.getByPlaceholderText("Tipo do dragão");

      fireEvent.change(inputName, { target: { value: "Teste" } });
      fireEvent.change(inputType, {
        target: { value: "Teste tipo" },
      });

      expect(inputName.value).toBe("Teste");

      const buttonAdd = screen.getByTestId("add-dragon-button-modal");
      fireEvent.click(buttonAdd);
    });

    await waitFor(() => {
      const modalAddHeader = screen.queryByText("Novo Dragão");
      expect(modalAddHeader).not.toBeInTheDocument();

      expect(getByText("Teste")).toBeTruthy();
      expect(getByText("Teste tipo")).toBeTruthy();
    });
  });

  it("it should be able to edit a Dragon", async () => {
    const { getByText } = render(<Dashboard dragons={[...dragons]} />);

    await waitFor(
      () => {
        fireEvent.click(screen.getByTestId("edit-dragon-7"));
      },
      { timeout: 200 }
    );

    const editedDragons = [...dragons];
    editedDragons.shift();
    editedDragons.unshift({
      name: "Teste Edit Dragão",
      type: "Teste tipo",
      id: "7",
      createdAt: "2022-01-12T17:28:45.889Z",
      histories: [],
    });

    apiMock.onGet("?sortBy=name").reply(200, editedDragons);

    await waitFor(() => {
      expect(getByText("Editar Dragão")).toBeTruthy();

      const inputName: HTMLInputElement =
        screen.getByPlaceholderText("Nome do dragão");

      expect(inputName.value).toContain("Artic Blank Dragons");

      fireEvent.change(inputName, {
        target: { value: "Teste Edit Dragão" },
      });

      expect(inputName.value).toContain("Teste Edit Dragão");

      const buttonAdd = screen.getByTestId("edit-dragon-button-modal");
      fireEvent.click(buttonAdd);
    });

    await waitFor(() => {
      const modalEditHeader = screen.queryByText("Editar Dragão");
      expect(modalEditHeader).not.toBeInTheDocument();

      expect(getByText("Teste Edit Dragão")).toBeTruthy();
      expect(screen.queryByText("Artic Blank Dragons")).not.toBeInTheDocument();
    });
  });

  it("it should be able to delete a dragon", async () => {
    const { getAllByTestId } = render(<Dashboard dragons={[...dragons]} />);

    apiMock.onGet("?sortBy=name").reply(200, [...dragons.slice(0, 1)]);

    await waitFor(
      () => {
        fireEvent.click(screen.getByTestId("remove-dragon-7"));
      },
      { timeout: 200 }
    );

    const dragonCards = getAllByTestId("dragon-card");
    expect(dragonCards.length).toBe(1);
  });
});
