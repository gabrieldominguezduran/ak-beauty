import { addCartItem } from "../../stores/cartStore";

export default function AddToCartForm({ item, children }) {
  function addToCart(e) {
    e.preventDefault();
    addCartItem(item);
  }

  return <form onSubmit={addToCart}>{children}</form>;
}
