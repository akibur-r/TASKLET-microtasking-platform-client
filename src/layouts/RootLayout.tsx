import Footer from "@/components/root/Footer/Footer";
import Navbar from "@/components/root/Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
