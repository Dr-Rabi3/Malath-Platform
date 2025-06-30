import { Outlet } from "react-router-dom";
import Navbar from "../Organisms/Navbar";
import Footer from "../Organisms/Footer";

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="h-5"></div>
      <Outlet />
      <div className="h-5"></div>
      <Footer/>
    </>
  );
}

export default RootLayout;
