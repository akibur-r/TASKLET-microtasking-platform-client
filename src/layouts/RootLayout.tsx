import Footer from "@/components/root/Footer/Footer";
import Navbar from "@/components/root/Navbar/Navbar";
import RootBackground from "@/components/shared/RootBackground/RootBackground";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <RootBackground />
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        <div className="flex-1 scroll-mt-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
