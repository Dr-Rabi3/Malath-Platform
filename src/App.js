import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RootLayout from "./components/templates/RootLayout";
import Landing from "./components/pages/Landing";
import AboutUs from "./components/pages/AboutUs";
import Blogs from "./components/pages/Blogs";
import Service from "./components/pages/Service";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import ComingSoon from "./components/pages/ComingSoon";
import { AuthProvider } from "./components/store/AuthContext";

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
        element: <ComingSoon />,
      },
      {
        path: "blogs",
        element: <ComingSoon />,
      },
      {
        path: "service",
        element: <ComingSoon />,
      },
      {
        path: "contact",
        element: <ComingSoon />,
      },
      {
        path: "profile",
        element: <ComingSoon />,
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
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
