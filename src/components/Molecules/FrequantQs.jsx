import Silk from "../ui/Silk";
import React, { useEffect, useState } from "react";
import { Collapse } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import serviceBg from "../../assets/images/background.png";

const { Panel } = Collapse;

const fetchQuestions = async (lang = "en") => {
  const response = await fetch("https://malathapi.runasp.net/api/Faqs/GetAll", {
    headers: {
      "Accept-Language": lang,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch questions");
  const data = await response.json();
  return data.data; // This will be the array of questions
};

// Example usage:
fetchQuestions("ar") // or "en"
  .then((questions) => {
    console.log(questions);
    // Output: [{id: 1, question: "...", answer: "..."}, ...]
  })
  .catch((err) => {
    console.error(err);
  });

function FrequentQs() {
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchQuestions(i18n.language)
      .then((questions) => {
        setFaqs(questions);
      })
      .catch(() => setFaqs([]))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  const handleToggle = (key) => {
    setActiveKey(key === activeKey ? null : key);
  };
  console.log(faqs);
  const renderFAQItem = (faq, index) => {
    console.log(faq);
    const isActive = activeKey === faq.id;

    return (
      <div
        key={faq.id}
        className="rounded-lg w-full border-[0.5px] border-gray-300"
        style={{ boxShadow: "0px 0px 5px 1px rgba(238, 238, 238, 0.87)" }}
      >
        <div className="flex-1 px-3 sm:px-4 md:px-5 py-3 sm:py-4">
          <div
            onClick={() => handleToggle(faq.id)}
            className="flex justify-between items-center cursor-pointer gap-3 sm:gap-4 flex-wrap"
          >
            <h3 className="flex-1 flex items-center font-medium font-barlow text-black text-base sm:text-lg md:text-xl leading-snug break-words py-2 sm:py-3">
              {faq.question}
            </h3>
            {isActive ? (
              <CloseOutlined className="text-[#000] text-xl sm:text-2xl" />
            ) : (
              <PlusOutlined className="text-[#000] text-xl sm:text-2xl" />
            )}
          </div>

          {/* Animated Answer */}
          <AnimatePresence initial={false}>
            {isActive && faq.answer && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p
                  className={`mt-2 text-[#646A69] text-sm sm:text-base leading-relaxed`}
                >
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] md:min-h-[360px]">
        <div className="absolute inset-0 w-full h-full z-[-1] bg-gradient-to-r from-[#BA9258] to-[#C9BFB1]">
          <img
            src={serviceBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-[-1] transparent-bg opacity-25"
          />
        </div>
        <div className="z-[10] p-4 sm:p-6 w-full min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex flex-col justify-center items-center text-center select-none">
          <h1 className="font-barlow font-semibold text-2xl sm:text-4xl md:text-5xl">
            {t("faq.title", "Frequently Asked Questions")}
          </h1>
          <div className="font-barlow font-regular text-sm sm:text-base md:text-lg max-w-[1000px] px-4 sm:px-8 mt-2 sm:mt-3">
            {t(
              "faq.subtitle",
              "Still you have any questions? Contact our Team via hello@squareup.com"
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 my-8 sm:my-12 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6">
          <div className="w-full">
            {faqs
              .slice(0, faqs.length / 2)
              .map((faq, index) => renderFAQItem(faq, index))}
          </div>
          <div className="w-full">
            {faqs
              .slice(faqs.length / 2)
              .map((faq, index) => renderFAQItem(faq, index + faqs.length / 2))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrequentQs;
