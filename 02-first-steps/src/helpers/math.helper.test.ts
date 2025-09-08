import { describe, expect, test } from "vitest";
import { add, divide, multiply, substract } from "./math.helper";

describe("add", () => {
  test("should add two positive numbers", () => {
    const result = add(1, 3);
    console.log({ result });

    expect(result).toBe(4);
  });
  test("should add two negative numbers", () => {
    const a = -1;
    const b = -2;
    const result = add(a, b);
    console.log({ result });

    expect(result).toBe(a + b);
  });
});

describe("substract", () => {
  test("should substract two positive numbers", () => {
    const a = 1;
    const b = 2;
    const result = substract(a, b);
    console.log({ result });

    expect(result).toBe(a - b);
  });
  test("should substract two negative numbers", () => {
    const a = -1;
    const b = -2;
    const result = substract(a, b);
    console.log({ result });

    expect(result).toBe(a - b);
  });
});

describe("multiply", () => {
  test("should multiply two positive numbers", () => {
    const a = 1;
    const b = 2;
    const result = multiply(a, b);
    console.log({ result });

    expect(result).toBe(a * b);
  });
  test("should multiply two negative numbers", () => {
    const a = -1;
    const b = -2;
    const result = multiply(a, b);
    console.log({ result });

    expect(result).toBe(a * b);
  });
  test("should give 0 when one of the arguments is 0", () => {
    const a = 0;
    const b = -2;
    const result = multiply(a, b);
    console.log({ result });

    expect(result).toBe(a * b);
  });
  test("should give the division of the arguments", () => {
    const a = 4;
    const b = 2;
    const result = divide(a, b);
    console.log({ result });

    expect(result).toBe(a / b);
  });
});
