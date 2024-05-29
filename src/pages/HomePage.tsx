import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";
const LazyHome = lazy(() => import("../components/home/Home"));
const LazyOutlet = lazy(() =>
  import("react-router-dom").then((module) => ({ default: module.Outlet }))
);
import { useState } from "react";
import { ProjectInput, UserInput } from "../types/Types";
import Spinner from "../components/ui/Spinner";

const HomePage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [inputPro, setInputPro] = useState("")
  const [inputUser, setInputUser] = useState("")
  const [searchResults, setSearchResults] = useState<Array<UserInput>>([]);
  const [projectSearchResults, setProjectSearchResults] = useState<Array<ProjectInput>>([]);
  console.log(searchResults);
  
  return (
    <div className="flex bg-color-bg-thirdy h-screen">
      <Sidebar setSearchResults={setSearchResults} setProjectSearchResults={setProjectSearchResults} setInputUser={setInputUser} setInputPro={setInputPro}/>
      <div className="relative flex flex-col flex-grow bg-color-bg-thirdy w-full h-full min-h-fit overflow-y-auto">
        <Navbar />
        <Suspense
          fallback={<Spinner/>}
        >
          {pathname === "/" ? <LazyHome search={searchResults} projectz={projectSearchResults} inputUser={inputUser} inputPro={inputPro}/> : <LazyOutlet />}
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
