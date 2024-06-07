import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import { isCartOpen, cartItems, removeCartItem } from "../../stores/cartStore";
import QuantityButton from "./QuantityButton";
import "./styles/cartStyles.css";
import "../../styles/global.css";

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
      <div className="cart-container">
        <button className="close-cart" onClick={() => isCartOpen.set(false)}>
          ×
        </button>
        <div className="cart-logo">
          <img className="cart-img" src="/images/logo_pink.png" alt="Logo" />
        </div>
        <ul>
          {Object.values($cartItems).map((cartItem) => {
            return (
              <li key={cartItem.id}>
                <img
                  className="item-img"
                  src={cartItem.image_public}
                  alt={cartItem.name}
                />
                <div className="item-info">
                  <p className="item-name">{cartItem.name}</p>
                  <p className="item-price">
                    <span>Total: </span>
                    {cartItem.price * cartItem.quantity} zl
                  </p>
                </div>
                <div className="qty-container">
                  <QuantityButton
                    initialQuantity={cartItem.quantity}
                    maxQuantity={cartItem.stock_quantity}
                    itemId={cartItem.id}
                    itemDetails={cartItem}
                  />
                </div>
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
        {Object.values($cartItems).length > 0 && (
          <button className="checkout-btn">Check out</button>
        )}
        {Object.values($cartItems).length === 0 && (
          <p className="empty-text">Your cart is empty!</p>
        )}
      </div>
    </aside>
  );
}
