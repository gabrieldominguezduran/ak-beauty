import { atom, map } from "nanostores";

export const isCartOpen = atom(false);

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} image_public
 * @property {number} price
 * @property {number} quantity
 * @property {number} stock_quantity
 */

/** @type {import('nanostores').MapStore<Record<string, CartItem>>} */
export const cartItems = map({});
export const quantities = map({});

export function addCartItem({
  id,
  name,
  image,
  image_public,
  price,
  stock_quantity,
  quantity = 1,
}) {
  const existingEntry = cartItems.get()[id];
  if (existingEntry) {
    const newQuantity = existingEntry.quantity + quantity;
    cartItems.setKey(id, {
      ...existingEntry,
      quantity: newQuantity,
    });
    updateQuantity(id, newQuantity);
  } else {
    cartItems.setKey(id, {
      id,
      name,
      image,
      image_public,
      price,
      stock_quantity,
      quantity,
    });
    quantities.setKey(id, quantity);
  }
}

export const removeCartItem = (id) => {
  cartItems.set(
    Object.fromEntries(
      Object.entries(cartItems.get()).filter(([key]) => key !== String(id))
    )
  );
  quantities.setKey(id, 0);
};

export const updateCartItemQuantity = (id, newQuantity) => {
  const item = cartItems.get()[id];
  if (item) {
    cartItems.setKey(id, {
      ...item,
      quantity: newQuantity,
    });
    updateQuantity(id, newQuantity);
  }
};

export const updateQuantity = (id, newQuantity) => {
  quantities.setKey(id, newQuantity);
};
