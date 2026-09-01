import { describe, expect, it } from "vitest";

import { consumeRateLimit } from "./consume-rate-limit";

const HOUR = 60 * 60 * 1000;

describe("consumeRateLimit", () => {
  it("allows three submissions and refuses the fourth", () => {
    const now = Date.now();
    const results = [0, 1, 2, 3].map((index) =>
      consumeRateLimit("first-caller", now + index),
    );

    expect(results).toEqual([true, true, true, false]);
  });

  it("lets the caller through again once the window has passed", () => {
    const now = Date.now();

    [0, 1, 2].forEach((index) =>
      consumeRateLimit("second-caller", now + index),
    );

    expect(consumeRateLimit("second-caller", now + HOUR + 1)).toBe(true);
  });

  it("counts each caller separately", () => {
    const now = Date.now();

    [0, 1, 2].forEach((index) => consumeRateLimit("third-caller", now + index));

    expect(consumeRateLimit("fourth-caller", now)).toBe(true);
  });
});
