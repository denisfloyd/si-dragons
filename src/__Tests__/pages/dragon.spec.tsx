import React from "react";
import { fireEvent, render, waitFor } from "@/tests/test-utils";
import { mocked } from "jest-mock";
import AxiosMock from "axios-mock-adapter";

import { parseCookies } from "nookies";
import { useRouter } from "next/router";

import { api } from "@/services/apiClient";

import DragonPage, { getServerSideProps } from "@/pages/dragon/[slug]";

const apiMock = new AxiosMock(api);

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(),
  };
});

jest.mock("nookies", () => {
  return {
    parseCookies: jest.fn().mockReturnValue({ "@sidragons.token": "token" }),
  };
});

const dragon = {
  createdAt: "2022-01-12T18:43:42.838Z",
  name: "Charizard",
  type: "Fogo",
  histories: [],
  id: "12",
};

describe("Dragon page component", () => {
  beforeAll(() => {
    apiMock.onGet("/12").reply(200, dragon);
  });

  it("it should render correctly", async () => {
    const { getByText } = render(<DragonPage dragon={dragon} />);

    expect(getByText("Charizard")).toBeTruthy();
    expect(getByText("Tipo: Fogo")).toBeTruthy();
  });

  it("it should loads initial data", async () => {
    const response = await getServerSideProps({
      params: { slug: "12" },
    } as any);

    expect(response).toMatchObject({
      props: {
        dragon: { name: "Charizard", type: "Fogo" },
      },
    });
  });

  it("it should redirect to login if user does not have credentials on inicial data load", async () => {
    const parseCookiesMocked = mocked(parseCookies);
    parseCookiesMocked.mockReturnValueOnce({});

    const response = await getServerSideProps({
      params: { slug: "12" },
    } as any);

    expect(response).toEqual({
      redirect: {
        destination: "/",
        permanent: false,
      },
    });
  });

  it("it should redirect to dashboard if does not find initial data", async () => {
    apiMock.onGet("/12").reply(200, null);

    const response = await getServerSideProps({
      params: { slug: "12" },
    } as any);

    expect(response).toEqual({
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    });
  });

  it("it should be able to click to go back", async () => {
    const useRouterMocked = mocked(useRouter);
    const routerReplaceMocked = jest.fn();
    useRouterMocked.mockReturnValueOnce({
      replace: routerReplaceMocked,
    } as any);

    const { getByTestId } = render(<DragonPage dragon={dragon} />);

    const buttonBack = getByTestId("button-back");

    fireEvent.click(buttonBack);

    await waitFor(() => {
      expect(routerReplaceMocked).toHaveBeenCalledWith("/dashboard");
    });
  });
});
