import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Input } from "antd";

function CustomPhoneInput({ value, onChange, placeholder, status, ...props }) {
  const handleChange = (phone, meta) => {
    console.log(phone, meta);
      // Pass the phone number to Ant Design's form
      onChange?.(phone);
    };
  return (
    <PhoneInput
      defaultCountry="eg"
      value={value || ""}
      onChange={(phone) => onChange?.(phone)}
      placeholder={placeholder}
      inputComponent={Input}
      inputProps={{
        status: status, // This will handle error states from Ant Design
        style: { width: "100%" },
      }}
      {...props}
    />
  );
}

export default CustomPhoneInput;
