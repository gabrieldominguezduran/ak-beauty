import { atom, map } from "nanostores";

export const isCartOpen = atom(false);

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {number} quantity
 */

/** @type {import('nanostores').MapStore<Record<string, CartItem>>} */
export const cartItems = map({});

export function addCartItem({ id, name, image }) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(id, { id, name, image, quantity: 1 });
  }
}

// Update the `removeCartItem` function in your cart store
export const removeCartItem = (id) => {
  cartItems.set(
    Object.fromEntries(
      Object.entries(cartItems.get()).filter(([key]) => key !== id)
    )
  );
};
