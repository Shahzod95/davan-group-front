import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../../context/CarProvider";

const CarDetail = ({ car, isOpen, onClose }) => {
  const { addToCart } = useContext(CartContext);
  if (!car) return null;

  const handleCart = () => {
    addToCart(car);
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-5 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <img
              src={car.image_url}
              alt={car.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-900 mt-3">{car.name}</h3>
            <p className="text-blue-600 font-bold">{car.rental_price}</p>
            <button
              onClick={handleCart}
              className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Cart
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarDetail;
