import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

function ProtectedRoute({ children, allowedRoles }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const isAuthenticated = Boolean(user?.token);
  const userRole = user?.role;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, message: t("please_login_first") }}
      />
    );
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.includes(userRole);
    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
