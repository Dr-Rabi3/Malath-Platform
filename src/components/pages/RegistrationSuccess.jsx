import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import darkLogo from "../../assets/icons/dark-logo.svg";

function RegistrationSuccess() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-accent-25">
      <div className="container max-w-[600px] bg-white flex flex-col items-center p-8 md:p-12 justify-center shadow-lg rounded-lg gap-8 w-full">
        {/* Logo */}
        <div className="mb-4">
          <img
            src={darkLogo}
            alt="dark logo"
            className="h-[80px] sm:h-[100px] md:h-[120px]"
          />
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950">
            {t("registration.success.title", "Registration Successful!")}
          </h1>
          <p className="text-lg text-neutral-600 max-w-md">
            {t(
              "registration.success.message",
              "Your account has been created successfully. You can now log in to access your account and start using our services."
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Link
            to="/login"
            className="flex-1 bg-neutral-950 hover:bg-neutral-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors duration-200"
          >
            {t("registration.success.loginButton", "Login Now")}
          </Link>
          <Link
            to="/"
            className="flex-1 bg-transparent hover:bg-neutral-100 text-neutral-950 font-medium py-3 px-6 rounded-lg border border-neutral-300 text-center transition-colors duration-200"
          >
            {t("registration.success.homeButton", "Go to Home")}
          </Link>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-neutral-500 max-w-md">
          <p>
            {t(
              "registration.success.additionalInfo",
              "If you have any questions or need assistance, please don't hesitate to contact our support team."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegistrationSuccess;
