import { sum } from "#utils/sum.js";
import { describe, expect, it } from "vitest";

describe("Sum function", () => {
  it("Should add 2 positive numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
