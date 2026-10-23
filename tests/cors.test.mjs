import { describe, expect, it } from "bun:test";

process.env.NEXT_PUBLIC_CORS_ORIGIN = "https://site.example.org";

const { addCorsHeaders, corsPreflight } = await import("../src/lib/cors.ts");
const { NextResponse } = await import("next/server");

describe("subscription plans cors", () => {
  it("should reflect only the configured origin", () => {
    const response = addCorsHeaders(NextResponse.json({}));

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("https://site.example.org");
    expect(response.headers.get("Vary")).toBe("Origin");
  });

  it("should not allow credentialed cross-origin reads of the public endpoint", () => {
    const response = addCorsHeaders(NextResponse.json({}));

    expect(response.headers.has("Access-Control-Allow-Credentials")).toBe(false);
  });

  it("should answer the preflight without credentials and with a narrow method list", () => {
    const response = corsPreflight();

    expect(response.status).toBe(204);
    expect(response.headers.has("Access-Control-Allow-Credentials")).toBe(false);
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe("GET, OPTIONS");
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe("Content-Type");
  });
});
