import Logo from "../../assets/signUp/Logo.png";
import { Link } from "react-router-dom";
import { FormSignUp } from "./FormSignUp";
import { HeaderForm } from "../headerForm/headerForm";

const SignUp = () => {
  return (
    <>
      <HeaderForm />
      <main className="flex justify-center items-start bg-color-bg-seconday pt-48 h-screen">
        <Link
          to={"/"}
          className="top-[7rem] left-[5rem] absolute font-semibold text-color-text text-xl"
        >
          <span className="mr-2">
            <i className="bi-arrow-left bi"></i>
          </span>
          Home
        </Link>
        <div className="flex flex-col items-center bg-color-bg-fourth px-[3rem] py-[3rem] rounded-md">
          <img
            src={Logo}
            alt="Logo de la aplicacion"
            className="absolute w-[10rem] transform -translate-x-2 -translate-y-40"
          />
          <div className="flex flex-col items-center pb-6">
            <p className="font-semibold text-color-text">Sign Up for</p>
            <h1 className="text-2xl text-color-text">Show Your Knowledge</h1>
          </div>
          <FormSignUp />
        </div>
      </main>
    </>
  );
};

export { SignUp };
