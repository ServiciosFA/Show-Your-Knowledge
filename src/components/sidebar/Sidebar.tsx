import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { IoMdPerson, IoMdPhonePortrait } from "react-icons/io";
import { FaBook } from "react-icons/fa6";
import { MdLibraryBooks } from "react-icons/md";
import { PiMedal } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cn } from "../../utils.ts";
import { currentUser } from "../../store.ts";
import apiClient from "../../server.ts";
import { ProjectInput, UserInput } from "../../types/Types.ts";

const HomeSidebar = ({
  setResult,
  setProjecResult,
  setInputUser,
  setInputPro,
}: {
  setResult: (data: Array<UserInput>) => void;
  setProjecResult: (data: Array<ProjectInput>) => void;
  setInputUser: (data: string) => void;
  setInputPro: (data: string) => void;
}) => {
  const [newUserInput, setNewUserInput] = useState<string>("");
  const [newUserInputP, setNewUserInputP] = useState<string>("");

  const getNewUser = async (name: string) => {
    try {
      const res = await apiClient.get(`api/users/search?name=${name}`);

      return res.data;
    } catch (error) {
      console.error("Error al obtener el nuevo usuario:", error);
      return null;
    }
  };

  useEffect(() => {
    if (newUserInput) {
      setProjecResult([]);
      setNewUserInputP("");
      setInputPro("");
      setInputUser(newUserInput);
      getNewUser(newUserInput).then((data) => {
        if (data) {
          setResult(data);
        }
      });
    } else {
      setResult([]);
      setInputUser("");
    }
  }, [setResult, newUserInput, setProjecResult, setInputUser, setInputPro]);

  const getProjects = async (title: string) => {
    try {
      const res = await apiClient.get(`api/projects`);
      const filtro: Array<ProjectInput> = res.data.filter((el: ProjectInput) =>
        el.title.includes(title)
      );

      console.log(filtro);
      return filtro;
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      return null;
    }
  };

  useEffect(() => {
    if (newUserInputP) {
      setNewUserInput("");
      setResult([]);
      setInputUser("");
      setInputPro(newUserInputP);
      getProjects(newUserInputP).then((data) => {
        if (data) {
          setProjecResult(data);
        }
      });
    } else {
      setProjecResult([]);
      setInputPro("");
    }
  }, [newUserInputP, setProjecResult, setResult, setInputPro, setInputUser]);

  return (
    <aside className="bg-gradient-to-b from-color-primary to-color-secondary w-80 min-w-[300px] min-h-[100vh]">
      <div className="gap-5 grid grid-cols-1 grid-rows-auto">
        <Link to="/" className="flex items-center mx-2">
          <img src={logo} alt="logo" className="w-20 h-16" />
          <h2 className="flex justify-center items-center pl-6 font-bold font-Kodchasan text-3xl text-color-text">
            SYK
          </h2>
        </Link>
        <div className="mx-6 mt-12">
          <ul className="mt-3 font-semibold text-color-text text-xl">
            <li className="flex border-color-text mb-2 py-2 p-2 border rounded-lg">
              <input
                type="text"
                placeholder="Search Users"
                value={newUserInput}
                onChange={(event) => {
                  setNewUserInput(event.target.value);
                }}
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  width: "100%",
                  outline: "none",
                }}
              />
              <button
                className="flex justify-between items-center"
                onClick={() => getNewUser(newUserInput)}
              >
                <HiMagnifyingGlass className="w-4 h-4" />
              </button>
            </li>
            <hr className="my-8 text-color-text" />
            <li className="flex border-color-text mb-2 py-2 p-2 border rounded-lg">
              <input
                type="text"
                placeholder="Search Proyects"
                value={newUserInputP}
                onChange={(event) => {
                  setNewUserInputP(event.target.value);
                }}
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  width: "100%",
                  outline: "none",
                }}
              />
              <button
                className="flex justify-between items-center"
                onClick={() => getProjects(newUserInputP)}
              >
                <HiMagnifyingGlass className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

const PersonSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { id } = currentUser();
  return (
    <aside className="bg-gradient-to-b from-color-primary to-color-secondary w-80">
      <div className="gap-5 grid grid-cols-1 grid-rows-auto">
        <Link
          to={`/
        `}
          className="flex items-center mx-2"
        >
          <img src={logo} alt="logo" className="w-20 h-16" />
          <h2 className="flex justify-center items-center pl-6 font-bold font-Kodchasan text-3xl text-color-text">
            SYK
          </h2>
        </Link>
        <div className="mx-6 mt-28">
          <ul className="mt-3 font-semibold text-color-text text-xl">
            <li
              className={cn(
                "hover:bg-[#1666A0] hover:shadow mb-2 h-[40px] px-2 flex items-center rounded transition-all duration-75 cursor-pointer active:scale-95",
                pathname.includes("/about-me") && "bg-[#1666A0]"
              )}
            >
              <Link className="w-full h-[40px]" to={`/person/${id}/about-me`}>
                <div className="flex justify-between items-center w-full h-[40px]">
                  <p>About me</p>
                  <IoMdPerson className="w-5 h-5" />
                </div>
              </Link>
            </li>
            <li
              className={cn(
                "hover:bg-[#1666A0] hover:shadow mb-2 h-[40px] px-2 flex items-center rounded transition-all duration-75 cursor-pointer active:scale-95",
                pathname.includes("/education") && "bg-[#1666A0]"
              )}
            >
              <Link className="w-full h-[40px]" to={`/person/${id}/education`}>
                <div className="flex justify-between items-center w-full h-[40px]">
                  <p>Education</p>
                  <FaBook className="w-5 h-5" />
                </div>
              </Link>
            </li>
            <li
              className={cn(
                "hover:bg-[#1666A0] hover:shadow mb-2 h-[40px] px-2 flex items-center rounded transition-all duration-75 cursor-pointer active:scale-95",
                pathname.includes("/projects") && "bg-[#1666A0]"
              )}
            >
              <Link className="w-full h-[40px]" to={`/person/${id}/projects`}>
                <div className="flex justify-between items-center w-full h-[40px]">
                  <p>Projects</p>
                  <MdLibraryBooks className="w-5 h-5" />
                </div>
              </Link>
            </li>
            <li
              className={cn(
                "hover:bg-[#1666A0] hover:shadow mb-2 h-[40px] px-2 flex items-center rounded transition-all duration-75 cursor-pointer active:scale-95",
                pathname.includes("/experience") && "bg-[#1666A0]"
              )}
            >
              <Link className="w-full h-[40px]" to={`/person/${id}/experience`}>
                <div className="flex justify-between items-center w-full h-[40px]">
                  <p>Experience</p>
                  <PiMedal className="w-5 h-5" />
                </div>
              </Link>
            </li>
            <li
              className={cn(
                "hover:bg-[#1666A0] hover:shadow mb-2 h-[40px] px-2 flex items-center rounded transition-all duration-75 cursor-pointer active:scale-95",
                pathname.includes("/contact-me") && "bg-[#1666A0]"
              )}
            >
              <Link className="w-full h-[40px]" to={`/person/${id}/contact-me`}>
                <div className="flex justify-between items-center w-full h-[40px]">
                  <p>Contact me</p>
                  <IoMdPhonePortrait className="w-6 h-6" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

const Sidebar = ({
  setSearchResults,
  setProjectSearchResults,
  setInputUser,
  setInputPro,
}: {
  setSearchResults: (data: Array<UserInput>) => void;
  setProjectSearchResults: (data: Array<ProjectInput>) => void;
  setInputUser: (data: string) => void;
  setInputPro: (data: string) => void;
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/") {
    return (
      <HomeSidebar
        setResult={setSearchResults}
        setProjecResult={setProjectSearchResults}
        setInputUser={setInputUser}
        setInputPro={setInputPro}
      />
    );
  } else if (pathname.includes("/person")) {
    return <PersonSidebar />;
  } else {
    return null;
  }
};

export default Sidebar;
