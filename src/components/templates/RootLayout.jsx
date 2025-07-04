import { Outlet } from "react-router-dom";
import Navbar from "../Organisms/Navbar";
import Footer from "../Organisms/Footer";

function RootLayout() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="h-5"></div>
        <div className="container max-w-[1360px] m-auto space-y-[35px]">
          <Outlet />
        </div>
        <div className="h-5"></div>
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
