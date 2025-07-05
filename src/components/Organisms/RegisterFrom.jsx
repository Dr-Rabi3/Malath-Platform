import From from "../Molecules/Form";
import darkLogo from "../../assets/icons/dark-logo.svg"

function RegisterForm({ className }) {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full px-2 sm:px-6 ${className}`}
    >
      <div className="mb-4">
        <img
          src={darkLogo}
          alt="dark logo"
          className="h-[100px] sm:h-[140px] md:h-[180px]"
        />
      </div>
      <From
        action="register"
        types={["password", "email", "confirm-password", "nameEn", "nameAr", "phone", "whatsapp"]}
      />
    </div>
  );
}

export default RegisterForm;
