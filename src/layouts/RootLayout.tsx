import Footer from "@/components/root/Footer/Footer";
import Navbar from "@/components/root/Navbar/Navbar";
import RootBackground from "@/components/shared/RootBackground/RootBackground";
import { Outlet, ScrollRestoration } from "react-router";
import { Toaster } from "sonner";

const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <RootBackground />
      <div className="min-h-screen flex flex-col relative font-primary">
        <Navbar />
        <div className="flex-1 scroll-mt-6">
          <Outlet />
        </div>
      </div>
      <Footer />

      <Toaster position="top-right" richColors />
    </>
  );
};

export default RootLayout;
