import { useContext } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "jest-mock";

import AxiosMock from "axios-mock-adapter";

import { destroyCookie, parseCookies } from "nookies";

import { AuthProvider, AuthContext, useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

import { apiLogin } from "@/services/apiClient";

import Router from "next/router";
import { waitFor } from "@testing-library/dom";

const apiMock = new AxiosMock(apiLogin);

jest.mock("next/router");

jest.mock("jwt-decode", () => {
  return jest.fn().mockReturnValue({
    username: "admin",
  });
});

const mockedDestroyCookie = destroyCookie as jest.Mock;
jest.mock("nookies", () => {
  return {
    setCookie: jest.fn(),
    parseCookies: jest.fn().mockReturnValue({ "@sidragons.token": null }),
    destroyCookie: jest.fn(),
  };
});

const addToastMocked = jest.fn();
const mocketUseToast = useToast as jest.Mock;
jest.mock("../../contexts/ToastContext");

describe("AuthContext Context", () => {
  beforeEach(() => {
    apiMock.reset();

    mocketUseToast.mockReturnValue({
      addToast: addToastMocked,
    });
  });

  it("it should to load a session user", async () => {
    const mockedParseCookies = mocked(parseCookies);
    mockedParseCookies.mockReturnValueOnce({
      "@sidragons.token": "131a131a131a131a131a131a131a",
    });

    const { result, waitForNextUpdate } = renderHook(
      () => useContext(AuthContext),
      {
        wrapper: AuthProvider,
      }
    );

    waitForNextUpdate();

    expect(result.current.user).toEqual("admin");
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("it should be able to login", async () => {
    const useRouterMocked = mocked(Router.push);
    useRouterMocked.mockReturnValue({} as any);

    apiMock
      .onPost("/users/sessions")
      .reply(200, { data: { token: "131a131a131a131a" } });

    const { result, waitForNextUpdate } = renderHook(useAuth, {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signIn({ username: "admin", password: "admin" });
    });

    await waitForNextUpdate();

    expect(result.current.user).toEqual("admin");
    expect(result.current.isAuthenticated).toBe(true);
    expect(useRouterMocked).toHaveBeenCalledWith("/dashboard");
  });

  it("it should not be able to login with wrong credentials", async () => {
    apiMock
      .onPost("/users/sessions")
      .reply(401, { data: { message: "Invalid credentials" } });

    let renderHookResult: any;

    try {
      const { result } = renderHook(useAuth, {
        wrapper: AuthProvider,
      });

      renderHookResult = result.current;

      act(() => {
        result.current.signIn({ username: "wrong", password: "wrong" });
      });
    } catch (e) {
      await waitFor(() => {
        expect(addToastMocked).toHaveBeenCalled();
        expect(renderHookResult.user).toBe("");
        expect(renderHookResult.isAuthenticated).toBe(false);
        expect(addToastMocked).toHaveBeenCalledWith({
          type: "error",
          title: "Erro na autenticação",
          description:
            "Ocorreu um erro ao tentar realizar a autenticação. Verifique o usuário e/ou senha!",
        });
      });
    }
  });

  it("it should be able to logout", async () => {
    const useRouterMocked = mocked(Router.push);
    useRouterMocked.mockReturnValue({} as any);

    const { result } = renderHook(() => useContext(AuthContext), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(mockedDestroyCookie).toHaveBeenCalled();
    expect(useRouterMocked).toHaveBeenCalledWith("/");
  });
});
