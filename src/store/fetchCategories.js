import axios from "axios";

export const fetchCategories = async () => {
    const { data } = await axios.get("https://shahzod95.pythonanywhere.com/api/car/categories/");
    return data;
  };