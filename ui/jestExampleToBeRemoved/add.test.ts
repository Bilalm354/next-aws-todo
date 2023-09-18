import { add } from "./add";
import { describe, expect, it } from "@jest/globals";

describe(('add'), () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});