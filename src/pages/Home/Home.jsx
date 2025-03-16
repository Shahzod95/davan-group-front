import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import AboutUs from '../../components/AboutUs/AboutUs'
import Cars from '../../components/Cars/Cars'
import Partners from '../../components/Partners/Partners'
import ContactUs from '../../components/ContactUs/ContactUs'
import Footer from '../../components/Footer/Footer'

import { FaClock, FaArrowRight, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import Basket from '../../components/Basket/Basket'

export const Home = () => {

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 50; // 50px pastga tushirish uchun
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      // targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <AboutUs />
      <Cars />
      <HowItWorks />

      <Partners />

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0,0,0,0.7)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8">
              Contact our team today to discuss your equipment rental needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                onClick={(e) => handleScroll(e, '#contact')}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-md text-lg transition-colors inline-flex items-center justify-center"
              >
                Request a Quote
                <FaArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="tel:+998993800000" 
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-8 rounded-md text-lg transition-colors inline-flex items-center justify-center"
              >
                Call Us Now
                <FaPhone className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaPhone className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">(+998) (99) 380 00 00</p>
              <p className="text-gray-600 mb-2">(+998) (99) 335 40 04</p>
              <p className="text-gray-600">24/7 Support Available</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaMapMarkerAlt className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">city. Navoiy</p>
              <p className="text-gray-600">st. Memorlar 83</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaClock className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hours</h3>
              <p className="text-gray-600 mb-2">Mon-Fri: 7am - 6pm</p>
              <p className="text-gray-600">Sat: 8am - 4pm</p>
            </div>
          </div>
        </div>
      </section>

      <ContactUs />
      <Footer />
      <Basket />
    </div>
  )
}
