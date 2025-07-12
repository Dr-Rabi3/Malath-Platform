import LoginFrom from "../Organisms/LoginFrom";
import photo from "../../assets/images/Rectangle 23.png";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../../store/AuthContext";

function Login() {
  const user = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, message: loginAlert } = location.state || {};
  useEffect(() => {
    if (from) {
      messageApi.open({ type: "warning", content: loginAlert });
    }
    if (user.token) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (from) navigate(from);
      else navigate("/user/dashboard");
    }
  }, [user, from, loginAlert, navigate]);
  return (
    <>
      {/* {contextHolder} */}
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
        <div className="container max-w-[1100px] bg-accent-25 flex flex-col md:flex-row p-4 md:p-10 justify-between shadow-md gap-5 md:gap-10 w-full">
          <LoginFrom className="w-full" />
          <img
            src={photo}
            alt="login photo"
            className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto hidden md:block self-center"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
