import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomSearch } from "./CustomSearch";
import * as customSearchActions from "./CustomSearch";

describe("CustomSearch", () => {
  test("CustomSearch is rendered", () => {
    const { container } = render(<CustomSearch onQuery={() => {}} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    expect(input).toBeDefined();
    expect((input as HTMLInputElement).placeholder).toBe("buscar");
    expect(button).toBeDefined();
    expect(button.innerHTML).toBe("Buscar");
    expect(container).toMatchSnapshot();
  });

  test("should call onQuery with the correct value after 700ms", async () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });

    // await new Promise((resolve) => setTimeout(resolve, 701));

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should be called only once with with the last value (debounce)", async () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith("test");
    });
  });

  test("should call onQuery when click with the input value", () => {
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "t" } });
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith("t");
  });

  test("The input should has the correct placeholder value", () => {
    const placeholder = "custom search";
    const onQuery = vi.fn();
    render(<CustomSearch onQuery={onQuery} placeholder={placeholder} />);

    const input = screen.getByRole("textbox");
    expect((input as HTMLInputElement).placeholder).toBe(placeholder);
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });

  test("should call handleSearch when key Enter", () => {
    const onQuery = vi.fn();
    const { container } = render(<CustomSearch onQuery={onQuery} />);

    const input = screen.getByPlaceholderText("buscar");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onQuery).toBeCalledTimes(1);
  });
});
