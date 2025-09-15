import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act, renderHook } from "@testing-library/react";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.currentGifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("perro");
    });

    expect(result.current.currentGifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("perro");
    });

    expect(result.current.currentGifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("perro");
    });

    expect(result.current.currentGifs.length).toBe(10);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("esto es un error"),
    );

    await act(async () => {
      await result.current.handleTermClicked("perro");
    });

    expect(result.current.currentGifs.length).toBe(10);
  });
  test("should not return not more than 8 previousTerms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    const n = 10;
    const arr = Array.from({ length: n }, (_, i) => `val${i + 1}`);

    await act(async () => {
      for (const item of arr) {
        await result.current.handleSearch(item);
      }
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual(
      Array.from({ length: 8 }, (_, i) => `val${10 - i}`),
    );
  });
  test("should not change previousTerms when handleSearch is called with empty value", async () => {
    const { result } = renderHook(() => useGifs());

    const getGifsByQuerySpyOn = vi
      .spyOn(gifActions, "getGifsByQuery")
      .mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("term1");
    });
    await act(async () => {
      await result.current.handleSearch("term2");
    });
    await act(async () => {
      await result.current.handleSearch("");
    });
    expect(getGifsByQuerySpyOn).toBeCalledTimes(2);
  });

  test("should not change previousTerms when handleSearch is called with an existing value ", async () => {
    const { result } = renderHook(() => useGifs());

    const getGifsByQuerySpyOn = vi
      .spyOn(gifActions, "getGifsByQuery")
      .mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("term1");
    });
    await act(async () => {
      await result.current.handleSearch("term1");
    });
    expect(getGifsByQuerySpyOn).toBeCalledTimes(1);
  });
});
