import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TrafficLightWithEffect } from "./02-useEffect/TrafficLightWithEffect";
import { TasksApp } from "./05-useReducer/TaskApp";
// import { HooksApp } from "./HooksApp";
// import { TrafficLight } from "./01-useState/TrafficLight";
// import { TrafficLightWithHook } from "./02-useEffect/TrafficLightWithHook";
// import { PokemonPage } from "./03-examples/PokemonPage";
// import { FocusScreen } from "./04-useRef/FocusScreen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* {<TrafficLightWithEffect />} */}
    {/* {<TrafficLightWithHook />} */}
    {/* {<PokemonPage />} */}
    {/* {<FocusScreen />} */}
    {<TasksApp />}
  </StrictMode>,
);
