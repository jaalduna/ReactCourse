interface Props {
  countdown: number;
  percentage: number;
  greenLight: string;
  redLight: string;
  yellowLight: string;
}
import { useEffect, useState } from "react";

const colors = {
  red: "bg-red-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
};

type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = (): Props => {
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
      handleColorChange("green");
    } else if (light === "green") {
      handleColorChange("yellow");
    } else {
      handleColorChange("red");
    }

    return () => {
      return;
    };
  }, [countdown, light]);

  return {
    countdown,
    light,
    colors,

    //computed
    percentage: (countdown / 5) * 100,
    greenLight: light === "green" ? colors[light] : "bg-gray-500",
    redLight: light === "red" ? colors[light] : "bg-gray-500",
    yellowLight: light === "yellow" ? colors[light] : "bg-gray-500",
  };
};
