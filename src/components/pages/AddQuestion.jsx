import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../store/AuthContext";

function AddQuestion() {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    questionEn: "",
    questionAr: "",
    answerEn: "",
    answerAr: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Helper to get Accept-Language header
  const getLangHeader = () => {
    const token = user.token;
    return {
      "Accept-Language": i18n.language || "en",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // Fetch all FAQs
  const fetchFaqs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://malathapi.runasp.net/api/Faqs/GetAll", {
        headers: getLangHeader(),
      });
      if (!res.ok)
        throw new Error(t("adminFaq.fetchError", "Failed to fetch FAQs"));
      const data = await res.json();
      if (!Array.isArray(data.data)) {
        setError(
          t("adminFaq.apiArrayError", "API did not return an array of FAQs.")
        );
        setFaqs([]);
        return;
      }
      setFaqs(data.data);
    } catch (err) {
      setError(err.message || t("adminFaq.fetchError", "Error fetching FAQs"));
      setFaqs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
    // eslint-disable-next-line
  }, [i18n.language]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (faqs.length >= 10) {
      setMessage(
        t("adminFaq.maxQuestions", "You can only have up to 10 questions.")
      );
      return;
    }
    // Validate
    if (
      !form.questionEn ||
      !form.questionAr ||
      !form.answerEn ||
      !form.answerAr
    ) {
      setMessage(t("adminFaq.allFieldsRequired", "All fields are required."));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://malathapi.runasp.net/api/Faqs/Add", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getLangHeader() },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error(t("adminFaq.addError", "Failed to add question"));
      setMessage(t("adminFaq.addSuccess", "Question added successfully."));
      setForm({ questionEn: "", questionAr: "", answerEn: "", answerAr: "" });
      fetchFaqs();
    } catch (err) {
      setMessage(
        err.message || t("adminFaq.addError", "Error adding question")
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        t(
          "adminFaq.deleteConfirm",
          "Are you sure you want to delete this question?"
        )
      )
    )
      return;
    setMessage("");
    try {
      const res = await fetch(
        `https://malathapi.runasp.net/api/Faqs/Delete/${id}`,
        {
          method: "DELETE",
          headers: getLangHeader(),
        }
      );
      if (!res.ok)
        throw new Error(t("adminFaq.deleteError", "Failed to delete question"));
      setMessage(t("adminFaq.deleteSuccess", "Question deleted successfully."));
      fetchFaqs();
    } catch (err) {
      setMessage(
        err.message || t("adminFaq.deleteError", "Error deleting question")
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {t("adminFaq.title", "Manage Frequently Asked Questions")}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block font-medium mb-1">
            {t("adminFaq.questionEn", "Question (English)")}
          </label>
          <input
            type="text"
            name="questionEn"
            value={form.questionEn}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            {t("adminFaq.questionAr", "Question (Arabic)")}
          </label>
          <input
            type="text"
            name="questionAr"
            value={form.questionAr}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            {t("adminFaq.answerEn", "Answer (English)")}
          </label>
          <textarea
            name="answerEn"
            value={form.answerEn}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-2"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            {t("adminFaq.answerAr", "Answer (Arabic)")}
          </label>
          <textarea
            name="answerAr"
            value={form.answerAr}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mb-2"
            rows={3}
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex items-center gap-4 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={submitting}
          >
            {submitting
              ? t("adminFaq.adding", "Adding...")
              : t("adminFaq.addBtn", "Add Question")}
          </button>
          {message && <span className="text-sm text-red-600">{message}</span>}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-2">
        {t("adminFaq.currentQuestions", "Current Questions")}
      </h3>
      {loading ? (
        <div>{t("adminFaq.loading", "Loading...")}</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : faqs.length === 0 ? (
        <div>{t("adminFaq.noQuestions", "No questions found.")}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr>
                <th className="px-3 py-2 border-b">#</th>
                <th className="px-3 py-2 border-b">
                  {t("adminFaq.tableQuestion", "Question")}
                </th>
                <th className="px-3 py-2 border-b">
                  {t("adminFaq.tableAnswer", "Answer")}
                </th>
                <th className="px-3 py-2 border-b">
                  {t("adminFaq.tableActions", "Actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq, idx) => (
                <tr key={faq.id || faq.faqId}>
                  <td className="px-3 py-2 border-b text-center">{idx + 1}</td>
                  <td className="px-3 py-2 border-b">{faq.question}</td>
                  <td className="px-3 py-2 border-b">{faq.answer}</td>
                  <td className="px-3 py-2 border-b text-center">
                    <button
                      onClick={() => handleDelete(faq.id || faq.faqId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      {t("adminFaq.deleteBtn", "Delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddQuestion;
