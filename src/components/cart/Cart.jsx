import { useStore } from "@nanostores/preact";
import { useEffect } from "preact/hooks";
import {
  isCartOpen,
  cartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../../stores/cartStore";
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

  const handleQuantityChange = (itemId, newQuantity) => {
    console.log("New quantity:", newQuantity);
    updateCartItemQuantity(itemId, newQuantity);
  };

  return (
    <aside className="cart-slide">
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
              <h3 className="item-name">{cartItem.name}</h3>
              <div className="qty-container">
                <QuantityButton
                  initialQuantity={cartItem.quantity}
                  maxQuantity={cartItem.stock_quantity}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(cartItem.id, newQuantity)
                  }
                />
                <span className="stock-qty">
                  {cartItem.stock_quantity === 1
                    ? "Last item left"
                    : `${
                        cartItem.stock_quantity - cartItem.quantity
                      } items left`}
                </span>
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
    </aside>
  );
}
