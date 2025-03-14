import { useState } from "react";
import uzFlag from "../../assets/UZ.png";
import ruFlag from "../../assets/ru.png";
import enFlag from "../../assets/GB.png";

const LanguageTabs = ({ language, setLanguage }) => {

  return (
    <div className="bg-gray-100 rounded-lg inline-block p-1">
      <div className="flex space-x-2">
        <button
          className={`flex items-center px-3 py-1 border rounded-lg text-gray-600 font-bold transition-all ${
            language === "uz" ? "bg-white text-black border-blue-600" : "border-gray-300"
          }`}
          onClick={() => setLanguage("uz")}
        >
          <img src={uzFlag} alt="uz_flag" className="w-6 h-4 mr-2" /> O'zbek
        </button>
        <button
          className={`flex items-center px-3 py-1 border rounded-lg text-gray-600 font-bold transition-all ${
            language === "ru" ? "bg-white text-black border-blue-600" : "border-gray-300"
          }`}
          onClick={() => setLanguage("ru")}
        >
          <img src={ruFlag} alt="ru_flag" className="w-6 h-4 mr-2" /> Русский
        </button>
        <button
          className={`flex items-center px-3 py-1 border rounded-lg text-gray-600 font-bold transition-all ${
            language === "en" ? "bg-white text-black border-blue-600" : "border-gray-300"
          }`}
          onClick={() => setLanguage("en")}
        >
          <img src={enFlag} alt="en_flag" className="w-6 h-4 mr-2" /> English
        </button>
      </div>
    </div>
  );
};

export default LanguageTabs;
