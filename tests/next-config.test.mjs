import { describe, expect, it } from "bun:test";
import nextConfig from "../next.config.ts";

describe("next config", () => {
  it("should not allow any remote image host", () => {
    expect(nextConfig.images?.remotePatterns ?? []).toEqual([]);
  });

  it("should keep svg optimization disabled", () => {
    expect(nextConfig.images?.dangerouslyAllowSVG).toBe(false);
  });

  it("should not expose the framework header", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });
});
