import { useStore } from "@nanostores/preact";
import "./styles/quantityButtonStyles.css";
import {
  addCartItem,
  updateCartItemQuantity,
  quantities,
} from "../../stores/cartStore";

export default function QuantityButton({
  initialQuantity,
  maxQuantity,
  itemId,
  itemDetails,
}) {
  const quantityStore = useStore(quantities);
  const quantity = quantityStore[itemId] || initialQuantity;

  const increment = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      if (quantityStore[itemId] !== undefined) {
        updateCartItemQuantity(itemId, newQuantity);
      } else {
        addCartItem({ ...itemDetails, quantity: newQuantity });
      }
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="qty-container">
      <div className="quantity-button">
        <button onClick={decrement} disabled={quantity <= 1}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={increment} disabled={quantity >= maxQuantity}>
          +
        </button>
      </div>
      <span className="stock-qty">
        {maxQuantity === 1
          ? "Last item left"
          : `${maxQuantity - quantity} items left`}
      </span>
    </div>
  );
}
