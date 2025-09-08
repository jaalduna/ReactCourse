import { describe, expect, test } from "vitest";
import { MyAwesomeApp } from "./MyAwesomeApp";
import { render, screen } from "@testing-library/react";

describe("MyAwesomeApp", () => {
  test("should render first and last name", () => {
    const { container } = render(<MyAwesomeApp />);
    screen.debug();

    const h1 = container.querySelector("h1");
    expect(h1?.innerHTML).toContain("Joaquin");
    const h3 = container.querySelector("h3");
    expect(h3?.innerHTML).toContain("Aldunate");
  });

  test("should render first and last name - screen", () => {
    render(<MyAwesomeApp />);

    const h1 = screen.getByTestId("first-name-title");
  });

  test("should match snapshot", () => {
    const { container } = render(<MyAwesomeApp />);
    expect(container).toMatchSnapshot();
  });
});
