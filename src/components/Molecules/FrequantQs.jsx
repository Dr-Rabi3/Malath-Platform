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
        className="rounded-lg flex items-start w-full border-[0.5px] border-gray-300"
        style={{ boxShadow: "0px 0px 5px 1px rgba(238, 238, 238, 0.87)" }}
      >
        <div className="flex-1 px-5">
          <div
            onClick={() => handleToggle(faq.id)}
            className="flex justify-between items-center cursor-pointer"
          >
            <h3 className="min-h-[50px] flex items-center font-medium font-barlow text-black text-[18px]">
              {faq.question}
            </h3>
            {isActive ? (
              <CloseOutlined className="text-[#000]" />
            ) : (
              <PlusOutlined className="text-[#000]" />
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
                  className={`mt-2 text-[#646A69] text-[16px] leading-relaxed `}
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
      <div className="relative h-[360px] overflow-hidden">
        <div className="absolute h-full w-full z-[-1] bg-gradient-to-r from-[#BA9258] to-[#C9BFB1]">
          <img
            src={serviceBg}
            alt=""
            className="absolute h-full z-[-1] transparent-bg opacity-25"
          />
        </div>
        <div className="z-[10] p-2 w-full h-full flex flex-col justify-center items-center select-none">
          <h1 className="font-barlow font-semibold text-[50px] text-center">
            {t("faq.title", "Frequently Asked Questions")}
          </h1>
          <div className="font-barlow font-regular text-[20px] text-center">
            {t(
              "faq.subtitle",
              "Still you have any questions? Contact our Team via hello@squareup.com"
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 my-[50px] gap-2">
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
