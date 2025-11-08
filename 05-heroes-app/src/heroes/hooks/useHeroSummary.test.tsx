import { afterEach, describe, expect, test, vi } from "vitest";
import { useHeroSummary } from "./useHeroSummary";
import { renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";
import type { SummaryInformationResponse } from "../types/summary-information.response";

vi.mock("../actions/get-summary.action", () => ({
  getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

const tanStackCustomProvider = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useHeroSummary", () => {
  //reset mocks after each test
  afterEach(() => {
    mockGetSummaryAction.mockReset();
  });
  test("should return the initial state (isLoading)", () => {
    mockGetSummaryAction.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  test("sholud return sucess state with data when API call succeeds", async () => {
    const mockedSummaryData = {
      totalHeroes: 10,
      strongestHero: { id: "1", name: "superman" },
      smartestHero: { id: "2", name: 'batman"' },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValue(mockedSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);
  });
  test("should return error state when API call fails ", async () => {
    const mockError = new Error("Failed to fetch summary ");

    mockGetSummaryAction.mockRejectedValueOnce(mockError);
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(mockError);
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);
    expect(result.current.error?.message).toBe("Failed to fetch summary ");
    // console.log(result);
  });
});
