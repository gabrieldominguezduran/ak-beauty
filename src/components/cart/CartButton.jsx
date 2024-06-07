import { useStore } from "@nanostores/preact";
import { isCartOpen, cartItems } from "../../stores/cartStore";
import "./styles/cartStyles.css";

export default function CartButton() {
  const $isCartOpen = useStore(isCartOpen);
  const $cartItems = useStore(cartItems);

  const totalItems = Object.values($cartItems).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="cart">
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      <button className="cart-btn" onClick={() => isCartOpen.set(!$isCartOpen)}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  );
}
