import { assert, describe, expect, test } from "vitest";
import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";
import { getHeroAction } from "./get-hero.action";
import { AxiosError } from "axios";

describe("getHeroAction", () => {
  test("should fetch hero data and return with complete image url", async () => {
    const idSlug = "1";

    const resultData = await getHeroAction(idSlug);

    expect(resultData).toBeDefined();
    expect(resultData).toHaveProperty(
      "image",
      `${import.meta.env.VITE_API_URL}/images/${idSlug}.jpeg`,
    );
  });

  test("should throw and error if hero is not found", async () => {
    const idSlug = "non-existing-id";

    const result = await getHeroAction(idSlug).catch((error) => {
      expect(error).toHaveProperty("response.status", 404);
      expect(error.message).toBe("Request failed with status code 404");
    });

    expect(result).toBeUndefined();
  });
});
