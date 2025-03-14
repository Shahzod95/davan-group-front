import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/SideBar/SideBar";

const Dashboard = () => {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-5 bg-gray-100">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

export default Dashboard