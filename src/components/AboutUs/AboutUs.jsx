import bgImage from "../../assets/background.jpg"
const AboutUs = () => {
  return (
    <section id="about" className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 md:mb-8">
          About Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Rasm */}
          <div className="order-2 md:order-1">
            <img
              src={bgImage}
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Matn va ma'lumot */}
          <div className="order-1 md:order-2 space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Who We Are
            </h3>
            <p className="text-sm md:text-base text-gray-700">
              DAVAN GROUP NAVOIY is a company founded in 2013. The mainactivity of our company is the provision of special equipment services.
            </p>
            <ul className="space-y-4 text-sm md:text-base text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✔</span>
                We have been growing and developing fro more than 8 years.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✔</span>
                We have a large fleet of contruction machinery for rent, which is maintained in excellent technical condition.
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">✔</span>
                The distinctive features of our company are: reliability, honesty quality and efficiency.
              </li>
            </ul>
            {/* <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition duration-300 text-sm md:text-base">
              Learn More
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;