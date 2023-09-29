import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  const addToCart = (order) => {
    const { timestamp, ...others } = order;
    const newCart = [...cart, others];
    setCart(newCart);
    console.log(newCart);
  };

  const removeFromCart = (order) => {
    const newCart = cart.filter((item) => item.product.id !== order.id);
    setCart(newCart);
  };

  const resetCart = () => {
    setCart([]);
  };

  const editProductQuantity = ({ id, quantity }) => {
    
    const newCart = cart.map((item) => {
      if (item.product.id == id) {
        return { ...item, quantity, totalPrice: quantity * item.price };
      } else {
        return item;
      }
    });
  };
  const addProductQuantity = (id) => {
    
    const newCart = cart.map((item) => {
      if (item.product.id == id) {
        const newQty = parseInt(item.quantity) + 1;
        return { ...item, quantity: newQty, totalPrice: newQty * item.product.price };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };
  const subtractProductQuantity = (id) => {
    const newCart = cart.map((item) => {
      if (item.product.id == id) {
        const newQty = parseInt(item.quantity) - 1;
        return { ...item, quantity: newQty, totalPrice: newQty * item.product.price };
      } else {
        return item;
      }
    });
    setCart(newCart);
  };

  const payload = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      editProductQuantity,
      addProductQuantity,
      subtractProductQuantity,
      resetCart,
    }),
    [cart]
  );
  return (
    <CartContext.Provider value={payload}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
