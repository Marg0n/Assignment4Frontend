import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="flex justify-center !flex-wrap items-center w-full h-[calc(100vh-150px)]">
      <Outlet />
    </div>
  );
};

export default AdminDashboardLayout;
