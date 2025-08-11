import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { submitContactForm } from "../../api/http";
import darkLogo from "../../assets/icons/dark-logo.svg";

function Contact() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user starts typing
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      setError(t("contact.validation_error"));
      return;
    }

    // if (!user?.token) {
    //   setError(t("contact.auth_error"));
    //   return;
    // }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await submitContactForm(user.token, {
        email: formData.email,
        phoneNumber: formData.phone, // Use phone from form data
        message: formData.message,
      });

      setSuccess(t("contact.success_message"));
      setFormData({ email: "", message: "", phone: "" }); // Reset phone as well
    } catch (err) {
      setError(err.message || t("contact.error_message"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ email: "", message: "", phone: "" }); // Reset phone as well
    setError("");
    setSuccess("");
  };

  return (
    <div className="bg-accent-25 font-main px-6 py-12 flex flex-col gap-8 rounded-[20px] justify-center items-center shadow-custom-gray mt-8">
      {/* Left Section */}
      <div className="flex justify-center items-center gap-5">
        <img src={darkLogo} alt="Logo" className="h-16" />
        <h1 className="text-3xl font-semibold text-neutral-1000 font-main">
          {t("contact.title")}
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8 px-6">
        <div className="flex-1 space-y-6">
          <p className="text-[16px] leading-relaxed text-neutral-950">
            {t("contact.description_line1")}
            {/* <br />
            {t("contact.description_line2")} */}
          </p>

          <div className="space-y-2 text-sm">
            <p className="bg-brand-500/20 text-brand-700 rounded-2xl px-2 py-2 w-fit">
              📍 {t("contact.address")}: 20 Al-Tayaran Street, 1st Floor,
              Apartment 2
            </p>
            <p className="bg-brand-500/20 text-brand-700 rounded-2xl px-2 py-2 w-fit">
              📧 {t("contact.email")}: MalathEgypt@.com
            </p>
            <p className="bg-brand-500/20 text-brand-700 rounded-2xl px-2 py-2 w-fit">
              📞 {t("contact.phone")}: 0222604857
            </p>
            <p className="bg-brand-500/20 text-brand-700 rounded-2xl px-2 py-2 w-fit">
              📱 {t("contact.mobile")}: 01008375583 - 01099134464
            </p>
            <p className="bg-brand-500/20 text-brand-700 rounded-2xl px-2 py-2 w-fit">
              🧾 {t("contact.tax")}: 6820
            </p>
          </div>
        </div>

        {/* Right Section */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm text-neutral-700">
              {t("contact.email_label")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-neutral-700">
              {t("contact.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="01234567890"
              className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-neutral-700">
              {t("contact.message_label")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="6"
              className="w-full border rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
              disabled={loading}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#18103F] hover:bg-[#1e144d] disabled:bg-gray-400 text-white px-6 py-2 rounded-md text-sm flex items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {loading ? t("contact.sending") : t("contact.send")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md text-sm"
            >
              {t("contact.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
