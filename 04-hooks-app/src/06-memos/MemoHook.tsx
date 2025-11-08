// useCallback : memorizar funciones y evitar que se redefinan
import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle";
import { MySubTitle } from "./ui/MySubTitle";

const handleMyAPICall = (subTitle: string) => {
  console.log("call my API - ", subTitle);
};

export const MemoHook = () => {
  const [title, setTitle] = useState("Hola");
  const [subTitle, setSubTitle] = useState("Mundo");

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="font-thin text-2xl text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubTitle subtitle={subTitle} callMyAPI={handleMyAPICall} />
      <button
        onClick={() => setTitle("Hello")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer "
      >
        Cambiar titulo
      </button>
      <button
        onClick={() => setSubTitle("World")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer "
      >
        Cambiar subtitulo
      </button>
    </div>
  );
};
