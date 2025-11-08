import React from "react";

interface Props {
  subtitle: string;

  callMyAPI: (value: string) => void;
}
export const MySubTitle = React.memo(({ subtitle, callMyAPI }: Props) => {
  console.log("My subtitle re-render ");
  return (
    <>
      <h6 className="text-2xl ">{subtitle}</h6>
      <button
        className="bg-indigo-500 px-2 py-1 rounded-md cursor-pointer"
        onClick={() => callMyAPI(subtitle)}
      >
        {" "}
        llamar a funcion
      </button>
    </>
  );
});
