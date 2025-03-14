import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const addToCart = (car) => {
    if (cart.some((item) => item.id === car.id)) {
      return;
    }

    setCart([...cart, car]);
  };

  const removeFromCart = (carId) => {
    setCart(cart.filter((item) => item.id !== carId));
  };

  const toggleBasket = () => {
    setIsBasketOpen(!isBasketOpen);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isBasketOpen, toggleBasket }}>
      {children}
    </CartContext.Provider>
  );
};
