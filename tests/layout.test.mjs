import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const appDir = new URL("../src/app", import.meta.url).pathname;

function collectSources(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return collectSources(path);
    return /\.(tsx|ts|jsx|js)$/.test(name) ? [path] : [];
  });
}

describe("root layout", () => {
  const layout = readFileSync(join(appDir, "layout.tsx"), "utf8");

  it("should not mount the in-page editing messenger", () => {
    expect(layout).not.toContain("VisualEditsMessenger");
  });

  it("should not post messages to every origin", () => {
    expect(layout).not.toContain("data-target-origin");
  });

  it("should not load scripts from an external origin in any app file", () => {
    for (const file of collectSources(appDir)) {
      const source = readFileSync(file, "utf8");
      expect({ file, external: /<Script[^>]*\ssrc=["']https?:/s.test(source) }).toEqual({
        file,
        external: false,
      });
    }
  });
});
