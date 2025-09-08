import { ItemCounter } from "./shopping-cart/ItemCounter";

interface ItemInCart {
  productName: string;
  quantity: number;
}

const itemInCart: ItemInCart[] = [
  { productName: "Nintendo", quantity: 1 },
  { productName: "ps4", quantity: 3 },
  { productName: "ps5", quantity: 7 },
  { productName: "xbox", quantity: 10 },
];

export function FirstStepsApp() {
  return (
    // this is an object
    <>
      <h1>Carrito de compras</h1>
      {itemInCart.map(({ productName, quantity }) => (
        <ItemCounter key={productName} name={productName} quantity={quantity} />
      ))}
    </>
  );
}
