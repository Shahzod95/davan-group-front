import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {

  const navItems = [
    { id: 1, text: "Home", path: "#hero" },
    { id: 2, text: "About", path: "#about" },
    { id: 3, text: "Collection", path: "#collection" },
    { id: 4, text: "How it works", path: "#how-it-works" },
    { id: 5, text: "Our partners", path: "#our-partners" },
    { id: 6, text: "Contact", path: "#contact" },
  ];

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
    <footer className="bg-gray-800 text-gray-300 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kompaniya haqida */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white">About Us</h3>
            <p className="text-sm md:text-base">
              We are a company dedicated to providing amazing experiences and top-quality services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition duration-300">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition duration-300">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigatsiya */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              {
                navItems.map((item) => (
                  <li key={item.id}>
                <a 
                  href={item.path}
                  onClick={(e) => handleScroll(e, item.path)} 
                  className="hover:text-white transition duration-300">
                    {item.text}
                  </a>
              </li>
                ))
              }
            </ul>
          </div>

          {/* Kontaktlar */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>Email: furqat.ergashev@davangroup.uz</li>
              <li>Phone: <p>(+998) (99) 380 8000</p>
              <p>(+998) (99) 335 4004</p></li>
              <li>Address: City Navoiy, street Memorlar 83</li>
            </ul>
          </div>

          {/* Qo‘shimcha ma'lumot */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white">Newsletter</h3>
            <p className="text-sm md:text-base">Subscribe to our newsletter for updates.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md text-gray-900 text-sm md:text-base focus:outline-none"
              />
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-300 text-sm md:text-base">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Pastki qism */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} Davan Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;