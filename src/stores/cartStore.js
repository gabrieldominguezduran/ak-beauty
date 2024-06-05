import { atom, map } from "nanostores";

export const isCartOpen = atom(false);

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} image_public
 * @property {number} quantity
 * @property {number} stock_quantity
 */

/** @type {import('nanostores').MapStore<Record<string, CartItem>>} */
export const cartItems = map({});

export function addCartItem({ id, name, image, image_public, stock_quantity }) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    });
  } else {
    cartItems.setKey(id, {
      id,
      name,
      image,
      image_public,
      stock_quantity,
      quantity: 1,
    });
  }
}

export const removeCartItem = (id) => {
  cartItems.set(
    Object.fromEntries(
      Object.entries(cartItems.get()).filter(([key]) => key !== String(id))
    )
  );
};

export const updateCartItemQuantity = (id, newQuantity) => {
  const item = cartItems.get()[id];
  if (item) {
    cartItems.setKey(id, {
      ...item,
      quantity: newQuantity,
    });
  }
};
