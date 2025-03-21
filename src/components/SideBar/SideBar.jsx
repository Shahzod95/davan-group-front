import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
      <div className="w-64 bg-gray-800 h-screen text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Davan Group</h2>
        <ul className="flex flex-col">
          <NavLink to={'/dashboard'} className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">Cars</NavLink>
          <NavLink to={'/category'} className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">Category</NavLink>
          <NavLink to={'/news'} className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer">News</NavLink>
        </ul>
      </div>
    );
  };

export default Sidebar