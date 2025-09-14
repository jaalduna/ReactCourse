import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("customHeader", () => {
  test("Should render the title correctly", () => {
    render(<CustomHeader title="my title" description="my description" />);

    const title = screen.getByRole("heading", { level: 1 }).innerHTML;
    expect(title).contains("my title");
  });
  test("Should render the description", () => {
    const desc = "my description";
    render(<CustomHeader title="my title" description={desc} />);

    const p = screen.getByRole("paragraph").innerHTML;
    // const p = screen.getByText(desc).innerHTML;

    expect(p).equal(desc);
  });
  test("Should not render the description when not provided", () => {
    const { container } = render(<CustomHeader title="my title" />);

    const p = container.querySelector("p");
    expect(p).toBeNull();
  });
});
