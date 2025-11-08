import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useHeroSummary } from "./useHeroSummary";
import { usePaginatedHero } from "./usePaginatedHero";

vi.mock("../actions/get-heroes-by-page.action", () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePaginatedHero", () => {
  beforeEach(() => {
    mockGetHeroesByPageAction.mockReset();
    queryClient.clear();
  });

  test("should return state loading", () => {
    mockGetHeroesByPageAction.mockResolvedValue({
      total: 0,
      heroes: [],
      pages: 0,
    });
    const requestData = { page: "1", limit: "6", category: "all" };
    const { result } = renderHook(() => usePaginatedHero(requestData), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  test("should return seccess state with data when API call succeeds", async () => {
    const mockHeroesData = { total: 10, heroes: [], pages: 1 };
    mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData);

    const requestData = { page: "1", limit: "6", category: "all" };
    const { result } = renderHook(() => usePaginatedHero(requestData), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalledOnce();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
    expect(result.current.data).toEqual(mockHeroesData);
  });
  test("should call getHeroesByPageActions with arguments", async () => {
    mockGetHeroesByPageAction.mockResolvedValue({
      total: 0,
      heroes: [],
      pages: 0,
    });

    const mockHeroesData = { total: 10, heroes: [], pages: 1 };

    const requestData = { page: "1", limit: "6", category: "all" };

    const { result } = renderHook(() => usePaginatedHero(requestData), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.status).toBe("success");
    expect(mockGetHeroesByPageAction).toHaveBeenCalledOnce();
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 6, "all");
  });
});
