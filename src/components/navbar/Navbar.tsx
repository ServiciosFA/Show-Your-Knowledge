import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { currentUser, notificationStore, useStore } from "../../store";

const HomeNavbar = () => {
  const userStore = useStore();
  const navigate = useNavigate();
  const notification = notificationStore()
  const logoutHnadler = () => {
    userStore.logout_user();
    notification.success("You have successfully logged out")
    navigate("/");
  };
  const loginHandler = () => {
    navigate("/login");
  };

  const userHandler = () => {
    userStore?.id && navigate(`/person/${userStore.id}/about-me`);
  };

  return (
    <nav className="top-0 z-50 sticky flex justify-between items-center bg-gradient-to-r from-color-primary to-color-secondary p-2 w-full h-16">
      {userStore.name !== "" ? (
        <>
          <h2 className="font-bold text-2xl text-color-text">Home</h2>
          <div className="flex space-x-4">
            <p
              onClick={logoutHnadler}
              className="flex items-center font-bold text-color-text text-xl hover:text-color-primary cursor-pointer"
            >
              Logout
            </p>
            {userStore?.photo ? (
              <img src={userStore.photo}></img>
            ) : (
              <IoPersonCircleOutline
                onClick={userHandler}
                className="w-10 h-10 text-color-text cursor-pointer"
              />
            )}
          </div>
        </>
      ) : (
        <>
          <h2
            onClick={() => navigate("/")}
            className="font-bold text-2xl text-color-text hover:text-color-secondary cursor-pointer"
          >
            Home
          </h2>
          <div className="flex space-x-4">
            <p
              onClick={loginHandler}
              className="flex items-center px-2 font-bold text-color-text text-xl hover:text-color-primary cursor-pointer"
            >
              Login
            </p>
          </div>
        </>
      )}
    </nav>
  );
};

const PersonNavbar = () => {
  const userStore = useStore();
  const currUser = currentUser();
  const navigate = useNavigate();
  const logoutHnadler = () => {
    userStore.logout_user();
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const userHandler = () => {
    userStore?.id && navigate(`/person/${userStore.id}/about-me`);
  };
  return (
    <nav className="top-0 z-50 sticky flex justify-between items-center bg-gradient-to-r from-color-primary to-color-secondary p-2 w-full h-16">
      {currUser.name !== "" ? (
        <>
          <h2 className="font-bold text-2xl text-color-text">
            {currUser.name}
          </h2>
          <div className="flex space-x-4">
            <p
              onClick={logoutHnadler}
              className="flex items-center font-bold text-color-text text-xl hover:text-color-primary cursor-pointer"
            >
              Logout
            </p>
            {userStore?.photo ? (
              <img src={userStore.photo}></img>
            ) : (
              <IoPersonCircleOutline
                onClick={userHandler}
                className="w-10 h-10 text-color-text cursor-pointer"
              />
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-bold text-2xl text-color-text">
            {userStore.name}
          </h2>
          <div className="flex space-x-4">
            <p
              onClick={loginHandler}
              className="flex items-center font-bold text-color-text text-xl hover:text-color-primary cursor-pointer"
            >
              Login
            </p>
            <IoPersonCircleOutline
              onClick={userHandler}
              className="w-10 h-10 text-color-text"
            />
          </div>
        </>
      )}
    </nav>
  );
};

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/") {
    return <HomeNavbar />;
  } else if (pathname.includes("/person")) {
    return <PersonNavbar />;
  } else {
    return null;
  }
};

export default Navbar;
