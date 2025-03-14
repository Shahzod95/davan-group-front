import { motion } from "framer-motion";
import { FaSearch, FaPhone, FaCheckCircle, FaTruck } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaSearch className="h-8 w-8" />,
    title: "1. Browse Equipment",
    description: "Explore our extensive range of construction equipment",
  },
  {
    id: 2,
    icon: <FaPhone className="h-8 w-8" />,
    title: "2. Get a Quote",
    description: "Contact us for pricing and availability information",
  },
  {
    id: 3,
    icon: <FaCheckCircle className="h-8 w-8" />,
    title: "3. Confirm Rental",
    description: "Complete the rental agreement and schedule delivery",
  },
  {
    id: 4,
    icon: <FaTruck className="h-8 w-8" />,
    title: "4. Start Working",
    description: "Receive your equipment and begin your project",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Renting construction equipment has never been easier
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="text-center"
              variants={stepVariants}
              custom={index}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
