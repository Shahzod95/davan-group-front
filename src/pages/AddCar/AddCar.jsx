import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../components/Input/Input";
import { SelectValue } from "../../components/SelectValue/SelectValue";
import { Select } from "../../components/Select/Select";
import { SelectTrigger } from "../../components/SelectTrigger/SelectTrigger";
import { SelectContent } from "../../components/SelectContent/SelectContent";
import { SelectItem } from "../../components/SelectItem/SelectItem";
import { Button } from "../../components/Button/Button";
import { ImageUploader } from "../../components/ImageUploader/ImageUploader";
import LanguageTabs from "../../components/LanguageTabs/LanguageTabs";
import { fetchCategories } from "../../store/fetchCategories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const API_URL = "https://shahzod95.pythonanywhere.com/api/car/cars/";

const initialData = {
  name: "",
  name_uz: "",
  name_en: "",
  name_ru: "",
  image_url: null,
  logo_url: null,
  category: null,
  rental: false,
  rental_price: 0,
  characteristics: {},
  characteristics_uz: {},
  characteristics_en: {},
  characteristics_ru: {},
};

const initialChar = {
  en: "",
  ru: "",
  uz: "",
};

export default function AddCarModal({ isOpen, onClose, car }) {
  const queryClient = useQueryClient();
  const [language, setLanguage] = useState("uz");
  const [newCharValues, setNewCharValues] = useState(initialChar);
  const [carData, setCarData] = useState(initialData);

  useEffect(() => {
    if (car && typeof car === "object") {
      setCarData((prev) => ({
        ...prev,
        ...car,
      }));
    } else {
      setCarData(initialData);
    }
  }, [car]);
  


  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (car) {
        // Tahrirlash (PUT)
        return await axios.put(`${API_URL}${car.id}/`, data, {
          headers:  {'Content-Type': "multipart/form-data"}
        });
      } else {
      // Yangi qo‘shish (POST)
      return await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      onClose();
    },
    onError: (error) => {
      console.error("Xatolik:", error);
    },
  });

  const handleCharacteristicChange = (key, value) => {
    setCarData((prevData) => ({
      ...prevData,
      [`characteristics_${language}`]: {
        ...prevData[`characteristics_${language}`],
        [key]: value,
      },
    }));
  };

  const handleNewCharChange = (e) => {
    setNewCharValues((prevValues) => ({
      ...prevValues,
      [language]: e.target.value,
    }));
  };

  const addCharacteristic = () => {
    if (Object.values(newCharValues).every((value) => value.trim() !== "")) {
      // Kalit generatsiya qilish (birinchi kiritilgan til bo‘yicha)
      const firstLang = Object.keys(newCharValues)[0];
      const generatedKey = newCharValues[firstLang]
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w\s]/gi, "");

      setCarData((prevData) => {
        const updatedData = { ...prevData };

        // Har bir til uchun xarakteristikani qo‘shish
        Object.entries(newCharValues).forEach(([lang, value]) => {
          updatedData[`characteristics_${lang}`] = {
            ...updatedData[`characteristics_${lang}`],
            [generatedKey]: value,
          };
        });

        return updatedData;
      });

      setNewCharValues(initialChar); // Inputni tozalash
    }
  };

  const removeCharacteristic = (key) => {
    setCarData((prevData) => {
      const updatedData = { ...prevData };

      Object.keys(prevData).forEach((langKey) => {
        if (langKey.startsWith("characteristics_")) {
          const updatedCharacteristics = { ...prevData[langKey] };
          delete updatedCharacteristics[key];

          updatedData[langKey] =
            Object.keys(updatedCharacteristics).length === 0
              ? {}
              : updatedCharacteristics;
        }
      });

      return updatedData;
    });

    setNewCharValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[key];
      return updatedValues;
    });
  };

  const handleImageUpload = (file, type) => {
    setCarData({ ...carData, [type]: file });
  };

  const isSaveCarEnabled = () => {
    return (
      carData.name_uz.trim() !== "" &&
      carData.name_en.trim() !== "" &&
      carData.name_ru.trim() !== "" &&
      carData.image_url !== null &&
      carData.logo_url !== null &&
      carData.category !== null &&
      carData.rental_price > 0 &&
      Object.keys(carData.characteristics_uz).length > 0 &&
      Object.keys(carData.characteristics_en).length > 0 &&
      Object.keys(carData.characteristics_ru).length > 0
    );
  };

  const isAddDisabled = Object.values(newCharValues).some(
    (value) => !value.trim()
  );

  const handleSubmit = () => {
    // if (
    //   !carData.name_uz.trim() ||
    //   !carData.name_en.trim() ||
    //   !carData.name_ru.trim() ||
    //   !carData.image ||
    //   !carData.logo ||
    //   !carData.category ||
    //   Object.keys(carData.characteristics_uz).length === 0 ||
    //   Object.keys(carData.characteristics_en).length === 0 ||
    //   Object.keys(carData.characteristics_ru).length === 0
    // )
    //   return;

    // FormData yaratish

    const formData = new FormData();
    formData.append("name", carData.name_en);
    formData.append("name_uz", carData.name_uz);
    formData.append("name_en", carData.name_en);
    formData.append("name_ru", carData.name_ru);
    formData.append(
      "category",
      String(carData.category.id || carData.category)
    );
    formData.append("rental_price", carData.rental_price);
    formData.append("rental", carData.rental);
    formData.append(
      "characteristics",
      JSON.stringify(carData.characteristics_en)
    );
    formData.append(
      "characteristics_uz",
      JSON.stringify(carData.characteristics_uz)
    );
    formData.append(
      "characteristics_en",
      JSON.stringify(carData.characteristics_en)
    );
    formData.append(
      "characteristics_ru",
      JSON.stringify(carData.characteristics_ru)
    );
    if (carData.image_url) {
      formData.append("image_url", carData.image_url);
    }
    if (carData.logo_url) {
      formData.append("logo_url", carData.logo_url);
    }
    mutation.mutate(formData);
    setCarData(initialData);
    onClose();
  };

  console.log("Data ", carData);

  return (
    <AnimatePresence>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white p-6 rounded-lg shadow-lg max-w-2xl max-h-[90vh] w-full overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold">Add Car</h2>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-4 mb-4">
              <div>
                <label className="block font-semibold">Upload Image</label>
                <ImageUploader
                  imageType="image_url"
                  imageSrc={carData.image_url || null}
                  onImageUpload={(file) => handleImageUpload(file, "image_url")}
                />
              </div>

              <div>
                <label className="block font-semibold">Upload Logo</label>
                <ImageUploader
                  imageType="logo_url"
                  imageSrc={carData.logo_url || null}
                  onImageUpload={(file) => handleImageUpload(file, "logo_url")}
                />
              </div>
            </div>

            <LanguageTabs language={language} setLanguage={setLanguage} />

            <hr className="my-4" />

            {/* Modal Content */}

            <div className="my-4">
              <Input
                type="text"
                placeholder={`Name (${language.toUpperCase()})`}
                value={carData[`name_${language}`] || ""}
                onChange={(e) =>
                  setCarData({
                    ...carData,
                    [`name_${language}`]: e.target.value,
                  })
                }
              />
            </div>
            <hr className="my-4" />

            <select
              id="countries"
              className="border border-gray-300 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:border-gray-600  dark:focus:border-blue-500"
              value={carData.category || ""}
              onChange={(e) =>
                setCarData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option selected>Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category[`name_${language}`]}
                </option>
              ))}
            </select>
            <hr className="my-4" />
            <div className="my-4">
              <label className="block font-semibold">Rental Price</label>
              <Input
                type="number"
                placeholder="Enter rental price"
                value={carData.rental_price}
                onChange={(e) =>
                  setCarData({
                    ...carData,
                    rental_price: Number(e.target.value),
                  })
                }
              />
            </div>

            <hr className="my-4" />
            <div className="space-y-2 my-1">
              <h3 className="font-semibold">
                Characteristics ({language.toUpperCase()})
              </h3>
              {Object.entries(carData[`characteristics_${language}`] || {}).map(
                ([key, value]) => (
                  <div key={key} className="flex gap-4">
                    <Input placeholder="Key" value={key} disabled />
                    <Input
                      placeholder="Value"
                      value={value}
                      onChange={(e) =>
                        handleCharacteristicChange(key, e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeCharacteristic(key)}
                      className="text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                )
              )}

              {/* Yangi xususiyat qo‘shish formasi */}
              <div className="flex gap-4">
                <Input
                  placeholder="Yangi xarakteristika"
                  value={newCharValues[language] || ""}
                  onChange={handleNewCharChange}
                />
                <Button
                  onClick={addCharacteristic}
                  className={`px-3 ${
                    isAddDisabled
                      ? "bg-gray-500 hover:bg-gray-500"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
                  disabled={isAddDisabled}
                >
                  <FaPlus />
                </Button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={onClose} className="bg-gray-300 p-2">
                Cancel
              </Button>
              <Button
                className={`w-full ${
                  isSaveCarEnabled()
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-500 hover:bg-gray-500"
                }`}
                disabled={!isSaveCarEnabled()}
                onClick={handleSubmit}
              >
                {car ? "Yangilash" : "Saqlash"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
