import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";
import { defaultAllowedOrigins } from "vite";

import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";
import { gipySearchResponseMock } from "../../mock-data/giphy.response.data";

describe("get-gifs-by-query", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });
  // test("should return a list of gifs", async () => {
  //   const gifs = await getGifsByQuery("perro");
  //
  //   const [gif1] = gifs; //get the first gif of the gifs array
  //
  //   //this is one way of check types
  //   expect(gif1.id).toBeTypeOf("string");
  //   expect(gif1.url).toBeTypeOf("string");
  //   expect(gif1.title).toBeTypeOf("string");
  //   expect(gif1.width).toBeTypeOf("number");
  //   expect(gif1.height).toBeTypeOf("number");
  //
  //   //this is another more concise
  //   expect(gif1).toEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //     height: expect.any(Number),
  //   });
  // });
  //
  test("should return a list of gifs 2", async () => {
    //install npm install   axios-mock-adapter --save-dev

    mock.onGet("/search").reply(200, gipySearchResponseMock);

    const gifs = await getGifsByQuery("perro");

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
    });

    expect(gifs.length).toBe(10);
  });

  test("should return an empty list of gifs if query is empty ", async () => {
    //install npm install   axios-mock-adapter --save-dev

    // mock.onGet("/search").reply(200, gipySearchResponseMock);

    mock.restore(); //this restore the real instance of Axios, not the mock. Usefull if we want to use the real Axios in this particular test
    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should should handle error when the API return error", async () => {
    //add an spy on console.error to remove large report on the test report
    const consoleSpyMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/search").reply(400, {
      data: {
        message: "bad request",
      },
    });

    const gifs = await getGifsByQuery("perro");

    expect(gifs.length).toBe(0);
    expect(consoleSpyMock).toHaveBeenCalled();
  });
});
