import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://shahzod95.pythonanywhere.com/api/car/categories/";

const CategoryModal = ({ isOpen, onClose, category }) => {
    const queryClient = useQueryClient();

  const [categoryName, setCategoryName] = useState({
    name: "",
    name_uz: "",
    name_en: "",
    name_ru: "",
  });

  // Kategoriya mavjud bo‘lsa, tahrirlash uchun inputlarni to‘ldirish
  useEffect(() => {
    if (category) {
      setCategoryName({
        name: category.name || "",
        name_uz: category.name_uz || "",
        name_en: category.name_en || "",
        name_ru: category.name_ru || "",
      });
    } else {
      setCategoryName({ name: "", name_uz: "", name_en: "", name_ru: "" });
    }
  }, [category]);

  const handleChange = (lang, value) => {
    setCategoryName((prev) => {
      const updatedData = { ...prev, [lang]: value };

      // `name` maydonini `name_en` ga teng qilish
      if (lang === "name_en") {
        updatedData.name = value;
      }

      return updatedData;
    });
  };

   // Kategoriya qo'shish va yangilash uchun
   const mutation = useMutation({
    mutationFn: async (data) => {
      if (category) {
        // Tahrirlash (PUT)
        return await axios.put(`${API_URL}${category.id}/`, data);
      } else {
        // Yangi qo‘shish (POST)
        return await axios.post(API_URL, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      onClose();
    },
    onError: (error) => {
      console.error("Xatolik:", error);
    },
  });

  const handleSubmit = () => {
    if (!categoryName.name_uz.trim() || !categoryName.name_en.trim() || !categoryName.name_ru.trim()) return;
    mutation.mutate(categoryName);
    setCategoryName({ name: "", name_uz: "", name_en: "", name_ru: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white rounded-2xl shadow-lg p-6 w-96"
      >
        <h2 className="text-lg font-semibold mb-4">{category ? "Kategoriyani Tahrirlash" : "Yangi Kategoriya Qo‘shish"}</h2>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Kategoriya nomi (O‘zbekcha)"
            value={categoryName.name_uz}
            onChange={(e) => handleChange("name_uz", e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Category Name (English)"
            value={categoryName.name_en}
            onChange={(e) => handleChange("name_en", e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Название категории (Русский)"
            value={categoryName.name_ru}
            onChange={(e) => handleChange("name_ru", e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {category ? "Yangilash" : "Saqlash"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryModal;
