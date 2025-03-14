import { motion } from 'framer-motion';

const Partners = () => {
  // Namuna sifatida partner logolari (haqiqiy logolarni URL bilan almashtirishingiz mumkin)
  const partners = [
    'https://placehold.co/150x50?text=Partner1',
    'https://placehold.co/150x50?text=Partner2',
    'https://placehold.co/150x50?text=Partner3',
    'https://placehold.co/150x50?text=Partner4',
    'https://placehold.co/150x50?text=Partner5',
    'https://placehold.co/150x50?text=Partner6',
  ];

  // Slider uchun logolarni ikki marta takrorlaymiz (cheksiz effekt uchun)
  const doubledPartners = [...partners, ...partners];


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section 
        className="py-8 md:py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 md:mb-8">
          Our Partners
        </h2>

        {/* Slider */}
        <div className="overflow-hidden">
          <div className="flex animate-slide whitespace-nowrap">
            {doubledPartners.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8"
              >
                <img
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="h-10 sm:h-12 md:h-14 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Partners;