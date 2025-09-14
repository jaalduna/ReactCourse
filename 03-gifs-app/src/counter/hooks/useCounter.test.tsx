import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  const defaultInitValue = 10;
  test("should initialize with default values of defaultInitValue", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(defaultInitValue);
  });

  test("should initialize with value 20", () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test("should increment counter when handleAdd is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(11);
  });
  test("should substract counter when handlesubstract is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleSubstract();
    });

    expect(result.current.counter).toBe(9);
  });
  test("should reset counter when handleReset is called", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(defaultInitValue + 1);

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(defaultInitValue);
  });
  test("should reset counter when handleReset is called with initial value 20", () => {
    const { result } = renderHook(() => useCounter(20));

    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(21);
    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(20);
  });
});
