import { Navigate, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import useUserStore from "../../store/userStore";
import useModalStore from "../../store/modalStore";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

function ProtectedRoute() {
  const { isConnected } = useUserStore();
  const { isSidebarOpen, setIsSidebarOpen } = useModalStore();
  const location = useLocation();

  const isInvoice = location.pathname === "/invoice";

  useEffect(() => {
    setIsSidebarOpen(window.innerWidth >= 1024);
  }, [setIsSidebarOpen]);

  if (!isConnected) {
    return <Navigate to="/signin" replace />;
  }
/* Reward box */

 

  return (
    <div className="relative h-screen overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-no-repeat bg-cover bg-center  rotate-180" />

      {/* Dark + blur overlay */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[12px] " />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {!isInvoice && <Navbar />}

        <div className="flex flex-1 overflow-hidden">
          {!isInvoice && isSidebarOpen && <SideBar />}

          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute;
