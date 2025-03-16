import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../../context/CarProvider";
import { IoCloseOutline } from "react-icons/io5";

const CarDetail = ({ car, isOpen, onClose }) => {
  const { addToCart } = useContext(CartContext);
  if (!car) return null;

  const handleCart = () => {
    addToCart(car);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-md shadow-2xl max-w-2xl w-full p-6 relative max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition"
            >
              <IoCloseOutline />
            </button>

            {/* Car Image */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-full h-full bg-black/30 rounded-xl z-10"></div>
              <img
                src={car.image_url || "/default-car.jpg"}
                alt={car.name}
                className="w-full h-60 object-contain rounded-xl shadow-md"
              />

              <span className="absolute top-2 left-2 z-20 bg-orange-600 text-white text-sm font-bold px-3 py-1 rounded-lg shadow">
                {car.rental_price ? `${car.rental_price} so'm` : "N/A"}
              </span>
              <img
                src={car?.logo_url}
                className="absolute right-2 bottom-2 z-30 w-24"
                alt={car?.name}
              />
            </div>

            <div className="mt-4">
            </div>
            {/* Car Information */}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-gray-900">{car.name}</h3>
            </div>

            {/* Characteristics */}
            {car.characteristics && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Characteristics:</h4>
                <ul className="text-gray-600">
                  {Object.entries(car.characteristics).map(([key, value]) => (
                    <li key={key} className="bg-gray-100 p-2 rounded-lg shadow-sm mb-2">
                      <span className="font-medium capitalize text-gray-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleCart}
              className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition shadow-lg"
            >
              Add to Cart
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarDetail;
