export const Earth = ({ className, color = "#211A4D" }) => {
  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12.5C2 18.023 6.477 22.5 12 22.5C17.523 22.5 22 18.023 22 12.5C22 6.977 17.523 2.5 12 2.5C6.477 2.5 2 6.977 2 12.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9999 2.54999C12.9999 2.54999 15.9999 6.49999 15.9999 12.5C15.9999 18.5 12.9999 22.45 12.9999 22.45M10.9999 22.45C10.9999 22.45 7.99988 18.5 7.99988 12.5C7.99988 6.49999 10.9999 2.54999 10.9999 2.54999M2.62988 16H21.3699M2.62988 8.99999H21.3699"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
