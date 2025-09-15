import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;
export const TrafficLightWithEffect = () => {
  const [light, setlight] = useState<TrafficLightColor>("red");
  const [countdown, setCountdown] = useState(5);

  const handleColorChange = (color: TrafficLightColor) => {
    setlight((prev) => color);
  };

  useEffect(() => {
    if (countdown === 0) return;

    const intervalId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
      return;
    };
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) return;

    setCountdown(5);

    if (light === "red") {
      setlight("green");
    } else if (light === "green") {
      setlight("yellow");
    } else {
      setlight("red");
    }

    return () => {
      return;
    };
  }, [countdown, light]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-2xl font-thin">Traffic with Effect</h1>
        <h2 className="text-white text-xl"> {`countdown: ${countdown}`}</h2>
        <div className="w-64 bg-gray-500 rounded-full h-2">
          <div
            className=" bg-blue-500 rounded-full h-2 transition-all duration-500"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <div
            className={`w-32 h-32 ${light === "red" ? colors[light] : "bg-gray-500"} rounded-full`}
          ></div>
          <div
            className={`w-32 h-32 ${light === "yellow" ? colors[light] : "bg-gray-500"} rounded-full`}
          ></div>
          <div
            className={`w-32 h-32 ${light === "green" ? colors[light] : "bg-gray-500"} rounded-full`}
          ></div>
        </div>
      </div>
    </div>
  );
};
