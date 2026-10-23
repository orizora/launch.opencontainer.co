import { describe, expect, it } from "bun:test";
import apiClient from "../src/lib/axios-client.ts";

// Ağa çıkmadan, isteğe uygulanan nihai yapılandırmayı yakalar.
async function captureConfig(method, url, data, requestConfig = {}) {
  let captured;
  await apiClient.request({
    method,
    url,
    data,
    ...requestConfig,
    adapter: async (config) => {
      captured = config;
      return { data: {}, status: 200, statusText: "OK", headers: {}, config };
    },
  });
  return captured;
}

describe("api client", () => {
  it("should not send credentials on a cross-origin contact post", async () => {
    const config = await captureConfig("post", "/web/contact", { email: "a@example.com" });

    expect(config.withCredentials).toBeFalsy();
  });

  it("should not send credentials on a plain read", async () => {
    const config = await captureConfig("get", "/web/subscription-plans");

    expect(config.withCredentials).toBeFalsy();
  });

  it("should send credentials only when a request opts in", async () => {
    const config = await captureConfig("get", "/web/profile", undefined, { withCredentials: true });

    expect(config.withCredentials).toBe(true);
  });
});
