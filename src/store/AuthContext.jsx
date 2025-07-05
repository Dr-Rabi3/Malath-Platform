import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { registerUser, loginUser, refreshTokenAPI } from "@/api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    role: null,
    token: null,
    refreshToken: null,
    email: null,
    firstName: null,
    lastName: null,
    profileImageUrl: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setUserData = (personData) => {
    if (personData) {
      // console.log(personData);
      Cookies.set("malath_email", personData.email, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("malath_firstName", personData.firstName, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("malath_lastName", personData.lastName, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("malath_profileImageUrl", personData.profileImageUrl, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      setUser((prev) => ({
        ...prev,
        email: personData.email,
        firstName: personData.firstName,
        lastName: personData.lastName,
        profileImageUrl: personData.profileImageUrl,
      }));
    }
  };

  const loginWithCredentials = async (email, password) => {
    setLoading(true);
    setError(null);
    console.log(email, password);
    try {
      const data = await loginUser(email, password);

      // Decode the JWT token to get user info
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));

      const userData = {
        userId: data.id,
        role: data.lastRole,
        token: data.token,
        refreshToken: data.refreshToken,
        email: data.email || email,
        name: data.name || "",
        profileImageUrl: data.profileImageUrl || null,
      };

      login(userData);

      return { success: true, data: userData };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };
  const registerWithCredentials = async (userData) => {
    setLoading(true);
    setError(null);
    // console.log(userData);
    try {
      // Validate required fields
      const requiredFields = [
        "fullNameAr",
        "fullNameEn",
        "mobileNumber",
        "email",
        "password",
        "confirmPassword",
      ];
      const missingFields = requiredFields.filter((field) => !userData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      if (userData.password !== userData.confirmPassword) {
        throw new Error("Password and confirm password do not match");
      }

      const userId = await registerUser(userData);

      login({
        userId,
        role: null, // Role will be set after first login
        token: null, // Token will be set after first login
        refreshToken: null, // Refresh token will be set after first login
        email: userData.email,
        name: userData.name,
        profileImageUrl: null,
      });

      return { success: true, data: { userId } };
    } catch (error) {
      setError({ message: error.message, errors: error.errors });
      return { success: false, message: error.message, errors: error.errors };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const oldRefreshToken = Cookies.get("malath_refreshToken");
      if (!oldRefreshToken) {
        console.warn("No refresh token found, logging out...");
        logout();
        return null;
      }

      const data = await refreshTokenAPI(oldRefreshToken);

      if (data.token && data.refreshToken) {
        Cookies.set("malath_token", data.token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("malath_refreshToken", data.refreshToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        setUser((prevUser) => ({
          ...prevUser,
          token: data.token,
          refreshToken: data.refreshToken,
        }));

        return { accessToken: data.token, refreshToken: data.refreshToken };
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
    return null;
  };

  const checkToken = async () => {
    const token = Cookies.get("malath_token");
    const userId = Cookies.get("malath_userId");
    const role = Cookies.get("malath_role");
    const refreshTokenCookie = Cookies.get("malath_refreshToken");
    const email = Cookies.get("malath_email");
    const name = Cookies.get("malath_name");
    const profileImageUrl = Cookies.get("malath_profileImageUrl");

    if (!token || !userId || !role) {
      console.warn("Missing authentication data, logging out...");
      logout();
      return;
    }

    try {
      // Decode token (Assuming JWT)
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = tokenPayload.exp * 1000 < Date.now();

      if (isExpired) {
        console.log("Token expired, attempting refresh...");
        const newTokens = await refreshToken();
        if (!newTokens) throw new Error("Failed to refresh token");
      }

      login({
        userId,
        role,
        token,
        refreshToken: refreshTokenCookie,
        email,
        name,
        profileImageUrl,
      });
    } catch (error) {
      console.error("Error decoding token, logging out...");
      logout();
    }
  };

  useEffect(() => {
    checkToken();

    const interval = setInterval(async () => {
      const token = Cookies.get("malath_token");
      if (token) {
        try {
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const timeLeft = tokenPayload.exp * 1000 - Date.now();

          // Refresh token if it expires in less than 1 minute
          if (timeLeft < 60000) {
            console.log("Token about to expire, refreshing...");
            await refreshToken();
          }
        } catch (error) {
          console.error("Error decoding token in interval, logging out...");
          logout();
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const login = ({
    userId,
    role,
    token,
    refreshToken,
    email,
    name,
    profileImageUrl,
  }) => {
    Cookies.set("malath_token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("malath_refreshToken", refreshToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("malath_userId", userId, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("malath_role", role, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });

    // Save user profile data in cookies
    if (email) {
      Cookies.set("malath_email", email, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    }
    if (name) {
      Cookies.set("malath_name", name, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    }
    if (profileImageUrl) {
      Cookies.set("malath_profileImageUrl", profileImageUrl, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    }

    setUser((prevUser) => ({
      ...prevUser,
      userId,
      role,
      token,
      refreshToken,
      email: email || prevUser.email,
      name: name || prevUser.name,
      profileImageUrl: profileImageUrl || prevUser.profileImageUrl,
    }));
    console.warn("User logged in");
  };

  const logout = () => {
    Cookies.remove("malath_token");
    Cookies.remove("malath_refreshToken");
    Cookies.remove("malath_userId");
    Cookies.remove("malath_role");
    Cookies.remove("malath_email");
    Cookies.remove("malath_firstName");
    Cookies.remove("malath_lastName");
    Cookies.remove("malath_profileImageUrl");
    setUser({
      userId: null,
      role: null,
      token: null,
      refreshToken: null,
      email: null,
      firstName: null,
      lastName: null,
      profileImageUrl: null,
    });
    console.warn("User logged out.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        setUserData,
        loginWithCredentials,
        registerWithCredentials,
        loading,
        error,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
