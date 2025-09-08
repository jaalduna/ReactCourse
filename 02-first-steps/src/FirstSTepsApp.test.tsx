import { afterEach, describe, expect, test, vi } from "vitest";
import { FirstStepsApp } from "./FirstStepsApp";
import { render, screen } from "@testing-library/react";
import { ItemCounter } from "./shopping-cart/ItemCounter";

const mockItemCounter = vi.fn((props: unknown) => {
  return <div data-testid="ItemCounter" />;
});

vi.mock("./shopping-cart/ItemCounter", () => ({
  ItemCounter: (props: any) => mockItemCounter(props),
}));

describe("FirstStepApp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should match snapshot", () => {
    const { container } = render(<FirstStepsApp />);

    expect(container).toMatchSnapshot();
  });

  test("should render the correct number of ItemsCounter components", () => {
    render(<FirstStepsApp />);
    const itemCounters = screen.getAllByTestId("ItemCounter");
    expect(itemCounters.length).toBe(4);
  });

  test("should render with correct parameters", () => {
    render(<FirstStepsApp />);

    expect(mockItemCounter).toHaveBeenCalledTimes(4);
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "Nintendo",
      quantity: 1,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "ps4",
      quantity: 3,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "ps5",
      quantity: 7,
    });
    expect(mockItemCounter).toHaveBeenCalledWith({
      name: "xbox",
      quantity: 10,
    });
  });
});
