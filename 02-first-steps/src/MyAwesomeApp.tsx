import type { CSSProperties } from "react";

const firstName = "Joaquin";
const lastName = "Aldunate";

const lista = ["a", "b", "c"];
const isActive = true;

const address = { city: "Santiago", zip: "ABC-123" };

const myStyles: CSSProperties = {
  backgroundColor: "lightblue",
  borderRadius: 10,
  padding: 20,
  marginTop: 30,
};

export function MyAwesomeApp() {
  return (
    <>
      <h1 data-testid="first-name-title">{firstName}</h1>
      <h3>{lastName}</h3>
      <p> {lista.join(", ")}</p>
      <h1>{isActive ? "activo" : "no activo"}</h1>
      <p style={myStyles}>{JSON.stringify(address)}</p>
    </>
  );
}
