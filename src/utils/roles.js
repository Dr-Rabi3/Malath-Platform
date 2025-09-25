export const Roles = {
  CusomerService: "CustomerService",
  Admin: "Admin",
  User: "User",
};

export const getLocalizedRole = (role, language) => {
  const isArabic =
    typeof language === "string" && language.toLowerCase().startsWith("ar");
  if (!isArabic) return role;

  const roleToArabicMap = {
    Admin: "مسؤول",
    User: "مستخدم",
    CustomerService: "خدمة العملاء",
  };

  return roleToArabicMap[role] || role;
};
