import axios from "axios";

export const fetchNews = async () => {
    const { data } = await axios.get("https://shahzod95.pythonanywhere.com/api/car/news/");
    return data;
  };