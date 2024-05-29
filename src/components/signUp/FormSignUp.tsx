import { useForm } from "react-hook-form";
import { SignUpData } from "../../types/Types";
import { signupUser } from "../../helpers/serverUser";
import { FormEvent, useState } from "react";
import Spinner from "../ui/Spinner";
import { notificationStore } from "../../store";

const FormSignUp = () => {
  const [loading, setLoading] = useState(false);
  const notification = notificationStore();
  const inputStyle =
    "w-[20rem] rounded-md py-1 px-2 text-color-text bg-color-bg-input-primary font-semibold placeholder-color-text outline-none";
  const buttonStyle =
    "mt-4 bg-color-text text-color-bg-seconday text-2xl w-52 rounded-2xl text-center pb-[0.3rem] mx-auto border border-color-text transition duration-250 ease-in-out hover:bg-color-bg-input-primary hover:text-color-text hover:border-color-text";

  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<SignUpData>({
    mode: "all",
  });

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const values = getValues();
    const {
      name,
      lastName: lastname,
      email,
      password,
      confirmPassword,
    } = values;
    try {
      await signupUser({ name, lastname, email, password, confirmPassword });
      setLoading(false);
      const res = await signupUser({ name, lastname, email, password, confirmPassword });
      
      if(res == "201"){
        notification.success("The user has been registered, please return to log in");
      }else{
        notification.error("SOMETHING GOES WRONG!");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
        console.log(error);
        notification.error("An error has occurred");
    }
  };

  if (loading) return <Spinner />;
  return (
    <form action="" className="flex flex-col gap-5" onSubmit={submitHandler}>
      <input
        {...register("name", { required: true })}
        type="text"
        className={inputStyle}
        placeholder="Name"
        name="name"
      />

      <input
        {...register("lastName", { required: true })}
        type="text"
        className={inputStyle}
        placeholder="LastName"
        name="lastName"
      />

      <input
        {...register("userName", { required: true })}
        type="text"
        className={inputStyle}
        placeholder="User Name"
        name="userName"
      />

      <input
        {...register("email", {
          required: true,
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        })}
        type="text"
        className={inputStyle}
        placeholder="gmail.com"
        name="email"
      />
      {errors.email && (
        <div className="text-center text-color-text">
          {errors.email.type === "required" && (
            <p>El campo email es requerido</p>
          )}
          {errors.email.type === "pattern" && (
            <p>El correo electrónico no es válido</p>
          )}
        </div>
      )}

      <input
        {...register("password", { required: true })}
        type="password"
        className={inputStyle}
        placeholder="Password"
        name="password"
      />
      {errors.password && (
        <div className="font-semibold text-center text-color-text">
          {errors.password?.type === "required" && (
            <p>El campo contraseña es requerido</p>
          )}
        </div>
      )}

      <input
        {...register("confirmPassword", {
          required: true,
          validate: (value: string) =>
            value === getValues("password") || "Las contraseñas no coinciden",
        })}
        type="password"
        className={inputStyle}
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <div className="text-center text-color-text">
          <p>{errors.confirmPassword.message}</p>
        </div>
      )}
      <button type="submit" className={buttonStyle}>
        Register
      </button>
    </form>
  );
};
export { FormSignUp };
