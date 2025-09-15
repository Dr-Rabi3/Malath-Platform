import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { submitContactForm } from "../../api/http";
import contactus from "../../assets/images/contactus.png";
function Contact() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    phone: "",
    fullName: "",
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
      setFormData({ email: "", message: "", phone: "", fullName: "" }); // Reset all fields
    } catch (err) {
      setError(err.message || t("contact.error_message"));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ email: "", message: "", phone: "", fullName: "" }); // Reset all fields
    setError("");
    setSuccess("");
  };

  return (
    <div className="font-main px-4 sm:px-6 flex flex-col lg:flex-row gap-6 lg:gap-8 rounded-[20px] justify-between">
      {/* Left Section */}
      <div className="flex-1 order-2 lg:order-1">
        <div className="flex flex-col gap-10 sm:gap-12 max-w-xl w-full">
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl !font-thin text-neutral-1000 font-main">
              {t("contact.title")}
            </h1>
            <p className="text-[16px] font-thin text-[#646A69]">
              {t("contact.description_line1")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 space-y-8">
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
              <label className="block mb-1 text-sm text-[#1D1F1E]">
                {t("contact.email_label")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-[#1D1F1E]">
                {t("contact.fullName")}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-[#1D1F1E]">
                {t("contact.message_label")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                className="w-full border rounded-[20px] px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
                disabled={loading}
              />
            </div>

            <div className="w-full">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1D1D1D] hover:bg-[#1D1D1D] disabled:bg-gray-400 text-white px-6 py-4 font-thin flex justify-center items-center gap-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loading ? t("contact.sending") : t("contact.send")}
              </button>
              {/* <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-6 py-2 rounded-md text-sm"
              >
                {t("contact.cancel")}
              </button> */}
            </div>
          </form>
        </div>
      </div>
      <div className="relative rounded-[20px] overflow-hidden order-1 lg:order-2 w-full lg:w-1/3 min-h-[240px] sm:min-h-[320px] lg:min-h-[480px]">
        <img
          src={contactus}
          alt="contactus"
          className="w-full h-full object-cover"
        />
        <div className="flex flex-wrap gap-2 sm:gap-x-3 text-xs sm:text-sm absolute bottom-4 left-4 right-4">
          <p className="bg-[#E0D4C2] text-[#9A743C] font-thin rounded-2xl px-2 py-2 w-fit max-w-full">
            📍 {t("contact.address")}: 20 Al-Tayaran Street, 1st Floor,
            Apartment 2
          </p>
          <p className="bg-[#E0D4C2] text-[#9A743C] font-thin rounded-2xl px-2 py-2 w-fit max-w-full">
            📧 {t("contact.email")}: MalathEgypt@.com
          </p>
          <p className="bg-[#E0D4C2] text-[#9A743C] font-thin rounded-2xl px-2 py-2 w-fit max-w-full">
            📞 {t("contact.phone")}: 0222604857
          </p>
          <p className="bg-[#E0D4C2] text-[#9A743C] font-thin rounded-2xl px-2 py-2 w-fit max-w-full">
            📱 {t("contact.mobile")}: 01008375583 - 01099134464
          </p>
          <p className="bg-[#E0D4C2] text-[#9A743C] font-thin rounded-2xl px-2 py-2 w-fit max-w-full">
            🧾 {t("contact.tax")}: 6820
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
