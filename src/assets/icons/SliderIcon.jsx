export const SliderIcon = ({className, color}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 7V17C18 17.62 17.98 18.17 17.91 18.66C17.62 21.29 16.38 22 13 22H11C7.62 22 6.38 21.29 6.09 18.66C6.02 18.17 6 17.62 6 17V7C6 6.38 6.02 5.83 6.09 5.34C6.38 2.71 7.62 2 11 2H13C16.38 2 17.62 2.71 17.91 5.34C17.98 5.83 18 6.38 18 7Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17C6 17.62 6.02 18.17 6.09 18.66C5.95 18.67 5.82 18.67 5.67 18.67H5.33C2.67 18.67 2 18 2 15.33V8.66999C2 5.99999 2.67 5.32999 5.33 5.32999H5.67C5.82 5.32999 5.95 5.32999 6.09 5.33999C6.02 5.82999 6 6.37999 6 6.99999V17Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 8.66999V15.33C22 18 21.33 18.67 18.67 18.67H18.33C18.18 18.67 18.05 18.67 17.91 18.66C17.98 18.17 18 17.62 18 17V6.99999C18 6.37999 17.98 5.82999 17.91 5.33999C18.05 5.32999 18.18 5.32999 18.33 5.32999H18.67C21.33 5.32999 22 5.99999 22 8.66999Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );


};