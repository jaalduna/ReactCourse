//useMemo allow to dont call heavy function
import { useCounter } from "@/03-examples/useCounter";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
  console.time("heavy stuff started");

  for (let index = 0; index < iterationNumber; index++) {
    console.log("ahi vamos...");
  }

  console.timeEnd("Heavy Stuff ended");
};
export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);
  const { counter: counter2, increment: increment2 } = useCounter(10);

  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);
  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl"> Memo - useMemo</h1>
      <hr />

      <h4>counter: {counter}</h4>
      <h4>counter2: {counter2}</h4>

      <button
        className="bg-blue-500 text-white rounded-md cursor-pointer px-4 py-2"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white rounded-md cursor-pointer px-4 py-2"
        onClick={increment2}
      >
        +1 counter2
      </button>
    </div>
  );
};
