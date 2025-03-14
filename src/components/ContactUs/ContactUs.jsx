import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData); // Backendga jo‘natish uchun o‘rniga console.log
    setFormData({ name: '', email: '', message: '' }); // Formani tozalash
  };

  return (
    <section id='contact' className="py-8 md:py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6 md:mb-8">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kontakt ma'lumotlari */}
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">Get in Touch</h3>
            <p className="text-sm md:text-base text-gray-700">
              Have questions or suggestions? Feel free to reach out to us!
            </p>
            <ul className="space-y-4 text-sm md:text-base text-gray-700">
              <li>
                <span className="font-medium">Email:</span> furqat.ergashev@davangroup.uz
              </li>
              <li>
                <span className="font-medium">Phone:</span> 
                <p>(+998) (99) 380 8000</p>
                <p>(+998) (99) 335 4004</p>
              </li>
              <li>
                <span className="font-medium">Address:</span> City Navoiy, street Memorlar 83
              </li>
            </ul>
          </div>

          {/* Forma */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm md:text-base font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                  placeholder="Your Message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-300 text-sm md:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;