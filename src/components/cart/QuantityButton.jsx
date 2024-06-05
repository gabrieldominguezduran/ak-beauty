import { useState } from "preact/hooks";
import "./styles/quantityButtonStyles.css";

export default function QuantityButton({
  initialQuantity,
  maxQuantity,
  onQuantityChange,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="quantity-button">
      <button onClick={decrement} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={increment} disabled={quantity >= maxQuantity}>
        +
      </button>
    </div>
  );
}
