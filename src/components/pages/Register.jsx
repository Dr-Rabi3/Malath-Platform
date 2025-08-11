import RegisterForm from "../Organisms/RegisterFrom";
import photo from '../../assets/images/Rectangle 23.png';

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="container max-w-[1100px] bg-accent-25 flex flex-col md:flex-row p-4 md:p-10 justify-between shadow-md gap-5 md:gap-10 w-full">
        <RegisterForm className="w-full" />
        <img
          src={photo}
          alt="login photo"
          className=" w-full max-w-xs md:max-w-md lg:max-w-lg  hidden md:block self-center"
        />
      </div>
    </div>
  );
}

export default Register;