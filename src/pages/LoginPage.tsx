import { FormEvent, useState } from "react";
import logo from "../assets/logo-resize.png";
import { Link, useNavigate } from "react-router-dom";
import { getUser, loginUser } from "../helpers/serverUser";
//import { jwtDecode } from "jwt-decode";
import { setClientToken } from "../server";
import { notificationStore, useStore } from "../store";
import Spinner from "../components/ui/Spinner";

//import { jwtDecode } from "jwt-decode";

function LoginPage() {
  const userStore = useStore();
  const navigate = useNavigate();
  const notification = notificationStore();
  const [loading, setLoading] = useState(false);
  const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      
      if(data.name != "AxiosError"){
        const token = data.token;
        if (token) {
          setClientToken(token);
          userStore.login_user(token);
          //const { id } = jwtDecode(token);
          //const idUser = id.toString();
          const dataUser = await getUser();
          userStore.mod_user(dataUser);
          if (dataUser) {
            notification.success("Logueado con exito");
          }
          setLoading(false);
          navigate(`/person/${dataUser.id}/about-me`);
        }
      }else{
        notification.error(data.response.data.message)
      }
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="grid grid-rows-[max-content] min-h-screen">
      <nav className="flex items-center bg-gradient-to-r from-color-primary to-color-secondary px-4 py-1 h-12 lg:h-16">
        <Link to="/" className="flex h-full">
          <img src={logo} alt="logo" />
          <h2 className="flex justify-center items-center pl-6 font-bold font-Kodchasan text-3xl text-color-text">
            SYK
          </h2>
        </Link>
      </nav>
      <main className="flex lg:flex-row flex-col lg:justify-center items-center lg:gap-[200px] bg-color-bg-seconday px-4 lg:px-8 xl:px-14 py-8 lg:py-0">
        <section className="text-center text-color-text lg:text-left">
          <h1 className="[text-shadow:_0_0_10px_#fff,_0_0_20px_#fff,_0_0_30px_#fff] font-LondrinaOutline text-6xl sm:text-7xl lg:text-8xl leading-none">
            CONNECTION IS THE TOOL.
          </h1>
          <h2 className="mt-4 font-Kodchasan text-xl sm:text-2xl xl:text-3xl">
            From idea to team: innovate, showcase, unite.
          </h2>
        </section>
        <section className="lg:m-0 mt-10 pt-12 lg:pt-10 w-full max-w-96 lg:max-w-80 xl:max-w-96">
          <div className="relative bg-color-bg-fourth p-6 rounded-3xl">
            <div className="flex justify-center mb-12 font-Kodchasan text-color-text">
              <img
                src={logo}
                alt="logo"
                className="top-0 absolute h-24 lg:h-20 xl:h-24 translate-y-[-50%] object-contain"
              />
              <div className="pt-10 text-center">
                <h4 className="text-lg xl:text-lg">Sign in</h4>
                <h3 className="font-semibold text-xl xl:text-2xl">
                  Show your Knowledge
                </h3>
              </div>
            </div>
            {loading ? (
              <div className="py-6 h-full">
                <Spinner />
              </div>
            ) : (
              <form onSubmit={loginSubmit} className="text-md xl:text-lg">
                <div className="flex flex-col gap-6 text-color-text">
                  <input
                    className="bg-color-bg-input-primary px-4 rounded-lg"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <input
                    className="bg-color-bg-input-primary px-4 rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <div className="text-color-text">
                    <input type="checkbox" name="checkbox" id="checkbox" />
                    <label className="ml-2 text-base" htmlFor="checkbox">
                      Remember me
                    </label>
                  </div>
                </div>
                <button
                  className="block bg-color-text hover:bg-slate-200 mx-auto mt-16 mb-10 px-20 py-0.5 rounded-xl font-Kodchasan font-semibold text-2xl text-color-bg-fourth"
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}
            <div className="text-center text-color-text">
              Don"t have an account?{" "}
              <Link to="/sign-up" className="font-semibold">
                Register
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;
