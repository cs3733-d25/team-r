import { expect, test, describe } from "vitest";

function sum(a: number, b: number) {
  return a + b;
}

// Use the `test` function to run a test
test("test something", () => {
  expect(1).toBe(1);
});

// Use the `describe` function to group related tests
describe("sum", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("adds 2 + 2 to equal 4", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
