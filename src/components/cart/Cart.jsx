import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import { isCartOpen, cartItems, removeCartItem } from "../../stores/cartStore";
import "./cartStyles.css";

const images = import.meta.glob("/src/images/*.{jpeg,jpg,png,gif}");

export default function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  useEffect(() => {
    if ($isCartOpen) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }
  }, [$isCartOpen]);

  return (
    <aside className="cart-slide">
      <button className="close-cart" onClick={() => isCartOpen.set(false)}>
        ×
      </button>
      <ul>
        {Object.values($cartItems).map((cartItem) => {
          const imgSrc = Object.keys(images).find((key) =>
            key.includes(cartItem.image)
          );

          console.log(imgSrc);
          return (
            <li key={cartItem.id}>
              <img src={imgSrc} alt={cartItem.name} width="50" />
              <h3>{cartItem.name}</h3>
              <p>Quantity: {cartItem.quantity}</p>
              <button onClick={() => removeCartItem(cartItem.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      {Object.values($cartItems).length === 0 && <p>Your cart is empty!</p>}
    </aside>
  );
}
