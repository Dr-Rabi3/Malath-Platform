import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import AdminLayout from "./components/templates/AdminLayput";
import AdminService from "./components/pages/AdminService";
import AdminBlog from "./components/pages/AdminBlog";
import Editor from "./components/Organisms/Editor";
import { AuthProvider } from "./store/AuthContext";
import AdminSetting from "./components/pages/AdminSetting";
import ShowService from "./components/pages/ShowService";

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
        path: "dashboard",
        element: <SupportDashboard />,
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
        element: <ComingSoon />,
      },
      {
        path: "service",
        element: <AdminService />,
      },
      {
        path: "service/:serviceId",
        element: <ShowService />,
      },
      {
        path: "blog",
        element: <AdminBlog />,
      },
      {
        path: "add-service",
        element: <ComingSoon />,
      },
      {
        path: "setting",
        element: <AdminSetting />,
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
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
