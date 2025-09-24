import {
  createBrowserRouter,
  RouterProvider,
  useFetcher,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RegistrationSuccess from "./components/pages/RegistrationSuccess";
import RootLayout from "./components/templates/RootLayout";
import Landing from "./components/pages/Landing";
import AboutUs from "./components/pages/AboutUs";
import Blogs from "./components/pages/Blogs";
import Service from "./components/pages/Service";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import ComingSoon from "./components/pages/ComingSoon";
import AddService from "./components/pages/AddService";
import SupportLayout from "./components/templates/SupportLayout";
import SupportDashboard from "./components/pages/SupportDashboard";
import SupportSettings from "./components/pages/SupportSettings";
import AdminLayout from "./components/templates/AdminLayput";
import AdminService from "./components/pages/AdminService";
import AdminBlog from "./components/pages/AdminBlog";
import Editor from "./components/Organisms/Editor";
import { AuthProvider } from "./store/AuthContext";
import AdminSetting from "./components/pages/AdminSetting";
import ShowService from "./components/pages/ShowService";
import AddUser from "./components/pages/AddUser";
import NotFound from "./components/pages/NotFound";
import AdminAddService from "./components/pages/AdminAddService";
import AdminDashboard from "./components/pages/AdminDashboard";
import Slider from "./components/pages/Slider";
import AddQuestion from "./components/pages/AddQuestion";
import { useEffect } from "react";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "add-service",
        element: <AddService />,
      },
    ],
  },
  {
    path: "support",
    element: <SupportLayout />,
    children: [
      {
        index: true,
        element: <SupportDashboard />,
      },
      {
        path: "settings",
        element: <SupportSettings />,
      },
      {
        path: "service/:serviceId",
        element: <ShowService />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "admin-service",
        element: <SupportDashboard />,
      },
      {
        path: "admin-service/service/:serviceId",
        element: <ShowService />,
      },
      {
        path: "blog",
        element: <AdminBlog />,
      },
      {
        path: "add-service",
        element: <AdminAddService />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "setting",
        element: <AdminSetting />,
      },
      {
        path: "slider",
        element: <Slider />,
      },
      {
        path: "add-question",
        element: <AddQuestion />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/registration-success",
    element: <RegistrationSuccess />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  useEffect(() => {
    // console.log = function () {};
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
