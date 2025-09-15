import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("api", () => {
  test("should keep its original configs", () => {
    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");

    expect(giphyApi.defaults.params).toStrictEqual({
      lang: "es",
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
