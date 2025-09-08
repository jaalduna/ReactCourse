import { describe, expect, test } from "vitest";
import { ItemCounter } from "./ItemCounter";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ItemCounter", () => {
  test("should render with default values", () => {
    const name = "Test item";
    render(<ItemCounter name={name} />);
    screen.debug();

    expect(screen.getByText(name)).toBeDefined();
  });
  test("should render with default quantity", () => {
    const name = "Test item";
    const quantity = 10;
    render(<ItemCounter name={name} quantity={quantity} />);
    screen.debug();

    expect(screen.getByText(quantity)).toBeDefined();
  });

  test("should increate counter when +1 button is pressed", () => {
    const name = "Test item";
    const quantity = 10;
    render(<ItemCounter name={name} quantity={quantity} />);

    const [buttonAdd, buttonSubstract] = screen.getAllByRole("button");
    fireEvent.click(buttonAdd);

    expect(screen.getByText("11")).toBeDefined();
  });
  test("should decreate counter when +1 button is pressed", () => {
    const name = "Test item";
    const quantity = 5;
    render(<ItemCounter name={name} quantity={quantity} />);

    const [, buttonSubstract] = screen.getAllByRole("button");
    fireEvent.click(buttonSubstract);

    expect(screen.getByText("4")).toBeDefined();
  });
  test("should not decreate counter when -1 button is pressed", () => {
    const name = "Test item";
    const quantity = 1;
    render(<ItemCounter name={name} quantity={quantity} />);

    const [, buttonSubstract] = screen.getAllByRole("button");
    fireEvent.click(buttonSubstract);

    expect(screen.getByText("1")).toBeDefined();
  });
  test("should change to red when counter is 1", () => {
    const name = "Test item";
    const quantity = 1;
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe("red");
  });
  test("should change to black when counter not 1", () => {
    const name = "Test item";
    const quantity = 2;
    render(<ItemCounter name={name} quantity={quantity} />);

    const itemText = screen.getByText(name);

    expect(itemText.style.color).toBe("black");
  });
});
