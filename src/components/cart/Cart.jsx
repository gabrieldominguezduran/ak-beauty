import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import { isCartOpen, cartItems, removeCartItem } from "../../stores/cartStore";
import "./cartStyles.css";

export default function Cart() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);
  console.log($cartItems);
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
          return (
            <li key={cartItem.id}>
              <img src={cartItem.image_public} alt={cartItem.name} width="50" />
              <h3>{cartItem.name}</h3>
              <p>Quantity: {cartItem.quantity}</p>
              <button
                className="trash-btn"
                onClick={() => removeCartItem(cartItem.id)}
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </li>
          );
        })}
      </ul>
      {Object.values($cartItems).length === 0 && <p>Your cart is empty!</p>}
    </aside>
  );
}
