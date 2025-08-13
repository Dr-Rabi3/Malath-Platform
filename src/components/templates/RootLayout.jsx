import {
  Outlet,
  useFetcher,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Navbar from "../Organisms/Navbar";
import Footer from "../Organisms/Footer";
import { useAuth } from "../../store/AuthContext";
import { useEffect } from "react";
import { Roles } from "../../utils/roles";
import ScrollToTop from "../atoms/ScrollToTop";
import Home from "../Organisms/Home";

function RootLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const fetcher = useFetcher();
  console.log(fetcher, navigation);
  useEffect(() => {
    // console.log(user);
    if (user.token) {
      if (user.role === Roles.Admin) navigate("/admin");
      else if (user.role === Roles.CusomerService) navigate("/support");
    }
  }, [user]);
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <div className="h-5"></div>
        <Home id="#home" />
        <div className="container max-w-[1360px] m-auto mt-[35px] space-y-[35px]">
          <Outlet />
        </div>
        <div className="h-5"></div>
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
