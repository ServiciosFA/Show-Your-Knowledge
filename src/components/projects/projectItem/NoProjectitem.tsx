import { GoAlert } from "react-icons/go";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NoProjectitem = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-grow justify-center items-center gap-2 bg-color-bg-primary px-36 pt-4 min-h-[91.3vh] font-Kodchasan text-color-text">
      <div
        onClick={() => navigate(-1)}
        className="top-[2.7rem] left-6 absolute flex justify-center items-center gap-1 bg-color-bg-thirdy p-2 rounded-md hover:text-color-secondary cursor-pointer"
      >
        <IoChevronBackSharp className="bg" />
        <p className="">Back</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <GoAlert className="text-3xl" />
        <h1 className="text-3xl text-center">The project does not exist.</h1>
      </div>
    </div>
  );
};

export default NoProjectitem;
