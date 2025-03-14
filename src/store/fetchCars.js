import axios from "axios";

export const fetchCars = async () => {
    const { data } = await axios.get("https://shahzod95.pythonanywhere.com/api/car/cars/");
    return data;
  };