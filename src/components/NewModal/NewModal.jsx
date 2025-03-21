import { useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Text from "@tiptap/extension-text";
import { IoClose, IoCloudUpload, IoLink } from "react-icons/io5";
import LanguageTabs from "../LanguageTabs/LanguageTabs";
import { Input } from "../Input/Input";
import { ImageUploader } from "../ImageUploader/ImageUploader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://shahzod95.pythonanywhere.com/api/car/news/";

const initialData = {
  title: "",
  title_uz: "",
  title_en: "",
  title_ru: "",
  image_url: null,
  text: "",
  text_uz: "",
  text_en: "",
  text_ru: "",
};

export function NewsModal({ isOpen, onClose, news }) {
  const [formData, setFormData] = useState(initialData);
  const [language, setLanguage] = useState("uz");
  const [uploadMethod, setUploadMethod] = useState("file");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (news) {
        // Tahrirlash (PUT)
        return await axios.put(`${API_URL}${news.id}/`, data, {
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
      queryClient.invalidateQueries(["news"]);
      onClose();
    },
    onError: (error) => {
      console.error("Xatolik:", error);
    },
  });
  if (!isOpen) return null;


  const handleImageUpload = (file, type) => {
    if (file) {
        setFormData((prev) => ({ ...prev, [type]: file }));
      }
  };

  const isSaveCarEnabled = () => {
    return (
        formData.title_uz.trim() !== "" &&
        formData.title_en.trim() !== "" &&
        formData.title_ru.trim() !== "" &&
        formData.image_url !== null &&
        formData.text_uz.trim() !== "" &&
        formData.text_en.trim() !== "" &&
        formData.text_ru.trim() !== "" 
    );
  };

  const toggleUploadMethod = () => {
    setUploadMethod((prev) => (prev === "file" ? "url" : "file"));
    setFormData((prev) => ({ ...prev, image_url: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Forma yuborilishining oldini olish
    console.log("DATAAAA ", formData)
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title_en);
    formDataToSend.append("title_uz", formData.title_uz);
    formDataToSend.append("title_en", formData.title_en);
    formDataToSend.append("title_ru", formData.title_ru);
    
    if (formData.image_url) {
      formDataToSend.append("image_url", formData.image_url);
    } 
  
    formDataToSend.append("text", formData.text_en);
    formDataToSend.append("text_uz", formData.text_uz);
    formDataToSend.append("text_en", formData.text_en);
    formDataToSend.append("text_ru", formData.text_ru);
  
    mutation.mutate(formDataToSend, {
      onSuccess: () => {
        setFormData(initialData); // State ni tozalash
        onClose(); // Modalni yopish
      }
    });
  };
  

  console.log("Data ", formData)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-20 p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{"Create News"}</h2>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              title="Close"
            >
              <IoClose className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
            <LanguageTabs language={language} setLanguage={setLanguage} />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {`Title ${language}`}
              </label>
              <Input
                type="text"
                placeholder={`Title (${language.toUpperCase()})`}
                value={formData[`title_${language}`] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [`title_${language}`]: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <button
                  type="button"
                  onClick={toggleUploadMethod}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {uploadMethod === "file" ? (
                    <>
                      <IoLink className="w-4 h-4" />
                      Switch to URL
                    </>
                  ) : (
                    <>
                      <IoCloudUpload className="w-4 h-4" />
                      Switch to Upload
                    </>
                  )}
                </button>
              </div>

              {uploadMethod === "file" ? (
                <div className="w-full">
                <label className="block font-semibold">Upload Image</label>
                <ImageUploader
                    imageType="image_url"
                    imageSrc={formData.image_url || null}
                    onImageUpload={(file) => handleImageUpload(file, "image_url")}
                />
                </div>
              ) : (
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      imageUrl: e.target.value,
                    }))
                  }
                  placeholder="Enter image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {`Content ${language}`}
              </label>
              <div className="h-36 rounded-lg border">
                <textarea
                  className="w-full h-full p-2 rounded-lg focus:outline-none"
                  placeholder={`Content (${language.toUpperCase()})`}
                  value={formData[`text_${language}`] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [`text_${language}`]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 mt-2">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`
                    px-4 
                    py-2 
                    transition-colors
                    text-white
                    rounded-md
                    ${
                        isSaveCarEnabled()
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-gray-500 hover:bg-gray-500"
                      }
                `}
              >
                Save News
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
