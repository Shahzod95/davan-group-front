import { useState } from 'react';
import { motion } from 'framer-motion';
import CarDetail from '../CarDetail/CarDetail';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from "../../store/fetchCategories";
import { fetchCars } from '../../store/fetchCars';
import { Loader } from '../Loader/Loader';

const Cars = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCars, setVisibleCars] = useState(6);
  const [selectedCar, setSelectedCar] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const {
  data: categories,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});

const {
  data: cars,
  isLoading: isCarLoading,
  isError: isCarError
} = useQuery({
  queryKey: ['cars'],
  queryFn: fetchCars
})

const allCategories = categories ? [{ id: "all", name: "All", name_en: "All", name_uz: "Hammasi", name_ru: "Все" }, ...categories] : [];

const handleOpenModal = (car) => {
  setSelectedCar(car);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
};



  const carsData = [
    { id: 1, name: 'Toyota Camry', category: 'Sedan', price: '$25,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 2, name: 'Honda CR-V', category: 'SUV', price: '$30,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 3, name: 'Porsche 911', category: 'Sports', price: '$120,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 4, name: 'Tesla Model 3', category: 'Electric', price: '$45,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 5, name: 'BMW X5', category: 'SUV', price: '$60,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 6, name: 'Audi A4', category: 'Sedan', price: '$40,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 7, name: 'Ford Mustang', category: 'Sports', price: '$55,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 8, name: 'Nissan Leaf', category: 'Electric', price: '$35,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
    { id: 9, name: 'Mercedes GLE', category: 'SUV', price: '$70,000', image: 'https://i.pinimg.com/736x/3c/c8/ff/3cc8ffe8d4b9adc21234fdd7d1614cd3.jpg' },
  ];

  const filteredCars = selectedCategory === 'All'
    ? carsData
    : carsData.filter(car => car.category === selectedCategory);

  const displayedCars = cars?.slice(0, visibleCars);

  const handleLoadMore = () => {
    setVisibleCars(prev => prev + 3);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  return (
    <motion.section 
        className="py-8 md:py-12 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        id='collection'
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 md:mb-8">
          Our Cars Collection
        </h2>

        {
          isLoading ? (
            <div>
              <Loader />
            </div>
          ) : isError ? (
            <div>
              <h4>Something Error</h4>
            </div>
          ) : (  
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 md:mb-8">
            {/* Kategoriyalar */}
            {allCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setVisibleCars(6);
                }}
                className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          )
        }


        {/* Mashina kartochkalari */}
        {
          isCarLoading ? (
            <div>
            <Loader />
          </div> 
          ) : isCarError ? (
            <div>
              <h4>Something Error</h4>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedCars?.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <img
                    src={car.image_url}
                    alt={car.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{car.name}</h3>
                    <p className="text-blue-600 font-bold mt-1 sm:mt-2 text-sm sm:text-base">{car.rental_price}{" "} so'm</p>
                    <button
                        onClick={() => handleOpenModal(car)} 
                        className="mt-2 sm:mt-4 w-full bg-orange-600 text-white py-1 sm:py-2 text-sm sm:text-base rounded-md hover:bg-orange-700 transition duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        }

        {/* Load More tugmasi */}
        {visibleCars < filteredCars.length && (
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={handleLoadMore}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-orange-600 text-white text-sm sm:text-base rounded-lg hover:bg-orange-700 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <CarDetail car={selectedCar} isOpen={isModalOpen} onClose={handleCloseModal} />
    </motion.section>
  );
};

export default Cars;