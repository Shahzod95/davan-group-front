import { useContext, useState } from "react";
import { CartContext } from "../../context/CarProvider";
import { GoTrash } from "react-icons/go";
import { IoClose } from "react-icons/io5";


const Basket = () => {
  const { cart, isBasketOpen, toggleBasket, removeFromCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  if (!isBasketOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[60vw] max-h-[60vh] p-5 relative overflow-hidden">
        <button
          onClick={toggleBasket}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <ul className="space-y-2 mb-4 pr-4 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center gap-2 border-b pb-2">
                    <img src={item.image_url} alt={item.name} className="w-8 h-8" />
                    <span className="flex-1">{item.name}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">
                      <GoTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              ></textarea>
              <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700 transition-all">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
