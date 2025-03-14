import { useContext } from "react";
import { CartContext } from "../../context/CarProvider";

import { GoTrash } from "react-icons/go";

const Basket = () => {
  const { cart, isBasketOpen, toggleBasket, removeFromCart } = useContext(CartContext);

  if (!isBasketOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 relative">
        <button onClick={toggleBasket} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <span>{item.name}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">
                  <GoTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Basket;
