import React, { FormEvent, useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../utils";
import logo from "../../assets/logo-resize.png";
import {
  deleteExperience,
  saveExperience,
  updateExperience,
} from "../../helpers/serverExperience";
import { useStore } from "../../store";
import Spinner from "../ui/Spinner";

interface IFormData {
  role: string;
  company: string;
  country: string;
  agreementType: string;
  isAgreed: boolean;
  from: string;
  to: string;
}

export const FormExp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const fechaHoy = `${year}-${month}-${day}`;
  const navigate = useNavigate();

  const userStore = useStore();
  const [yaEnvio, setYaEnvio] = useState(false);
  const [badDate, setBadDate] = useState(false);
  const [agreeIsOpen, setAgreeIsOpen] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    role: "",
    company: "",
    country: "",
    agreementType: "Type of Agreement",
    isAgreed: false,
    from: "",
    to: "",
  });
  const [toValue, setToValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const location = useLocation();
  const service = location.state?.element;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        role: service.role,
        company: service.company,
        country: service.country,
        agreementType: service.contract,
        isAgreed: false,
        from: "",
        to: "",
      });
    }
  }, [service]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setBadDate(false);
  };

  const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const year = new Date(value);
    const nowDate = new Date();
    setBadDate(false);

    if (year.getFullYear() > 1000 && year < nowDate) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const eliminarCard = async () => {
    setLoading(true);
    await deleteExperience(service.id);
    setLoading(false);
    navigate(`/person/${userStore.id}/experience`);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.agreementType !== "Type of Agreement") {
      setYaEnvio(false);
      if (formData.isAgreed) {
        console.log("el sigue trabajando");
        setBadDate(false);
        const datos = {
          role: formData.role,
          startDate: formData.from,
          endDate: formData.isAgreed ? "1111-11-11" : formData.to,
          company: formData.company,
          country: formData.country,
          contract: formData.agreementType,
        };
        setLoading(true);
        if (service) {
          const data = await updateExperience(service.id, datos);

          if (data) {
            setFormData({
              role: "",
              company: "",
              country: "",
              agreementType: "Type of Agreement",
              isAgreed: false,
              from: "",
              to: "",
            });
          }
          navigate(`/person/${userStore.id}/experience`);
        } else {
          const data = await saveExperience(datos);

          if (data) {
            setFormData({
              role: "",
              company: "",
              country: "",
              agreementType: "Type of Agreement",
              isAgreed: false,
              from: "",
              to: "",
            });
          }
          navigate(`/person/${userStore.id}/experience`);
        }
      } else {
        if (new Date(fromValue) < new Date(toValue)) {
          setBadDate(false);
          const datos = {
            role: formData.role,
            startDate: formData.from,
            endDate: formData.isAgreed ? "1111-11-11" : formData.to,
            company: formData.company,
            country: formData.country,
            contract: formData.agreementType,
          };

          if (service) {
            const data = await updateExperience(service.id, datos);

            if (data) {
              setFormData({
                role: "",
                company: "",
                country: "",
                agreementType: "Type of Agreement",
                isAgreed: false,
                from: "",
                to: "",
              });
            }

            navigate(`/person/${userStore.id}/experience`);
          } else {
            const data = await saveExperience(datos);

            if (data) {
              setFormData({
                role: "",
                company: "",
                country: "",
                agreementType: "Type of Agreement",
                isAgreed: false,
                from: "",
                to: "",
              });
            }
            navigate(`/person/${userStore.id}/experience`);
          }
        } else {
          setBadDate(true);
          console.log();
        }
      }
    } else {
      setYaEnvio(true);
    }
    setLoading(false);
  };

  const handleListItemClick = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      agreementType: value,
    }));
    setAgreeIsOpen(false);
  };

  if (loading) return <Spinner />;

  return (
    <form
      className="relative flex flex-col items-center gap-5 bg-[#FA00D2] bg-opacity-[12%] pb-6 rounded-[25px] w-[481px]"
      onSubmit={handleSubmit}
    >
      <img
        src={logo}
        alt="Know your Knowledge Logo"
        className="top-[-100px] absolute w-40"
      />
      <button
        onClick={() => navigate(-1)}
        className="top-3 left-[-110px] absolute flex justify-center items-center gap-3 bg-color-bg-thirdy py-2 pr-3 pl-2 rounded-md text-white hover:text-color-secondary cursor-pointer"
      >
        <IoChevronBackSharp className="bg" />
        <p className="">Back</p>
      </button>
      <h1 className="mt-[92px] mb-[10px] text-2xl text-white">
        Add an Experience
      </h1>
      <input
        required
        className="bg-[#3C1F41] pl-[15px] rounded-[10px] w-[374px] h-[36px] font-semibold text-white outline-none"
        type="text"
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        placeholder="Role"
      />
      <input
        required
        className="bg-[#3C1F41] pl-[15px] rounded-[10px] w-[374px] h-[36px] font-semibold text-white outline-none"
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        placeholder="Company"
      />
      <input
        required
        className="bg-[#3C1F41] pl-[15px] rounded-[10px] w-[374px] h-[36px] font-semibold text-white outline-none"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder="Country"
      />
      <div className="relative group active:scale-[.99] transition-all duration-75">
        <input
          required
          className="flex items-center bg-[#3C1F41] pl-[15px] rounded-[10px] w-[374px] h-[36px] font-semibold text-start text-white cursor-pointer outline-none"
          placeholder="Type of Agreement"
          value={formData.agreementType}
          onClick={() => setAgreeIsOpen(!agreeIsOpen)}
          name="AgreeType"
          type="button"
        ></input>
        {yaEnvio && formData.agreementType === "Type of Agreement" && (
          <p className="mt-2 text-red-700">*This field is required.</p>
        )}
        {agreeIsOpen && (
          <ul className="top-11 absolute flex flex-col gap-3 bg-[#3C1F41] py-3 rounded-[10px] w-[374px]">
            <li
              className="pl-[15px] font-semibold text-white cursor-pointer"
              onClick={() => handleListItemClick("full-time")}
            >
              Full-Time
            </li>
            <li
              className="pl-[15px] font-semibold text-white cursor-pointer"
              onClick={() => handleListItemClick("part-time")}
            >
              Part-Time
            </li>
            <li
              className="pl-[15px] font-semibold text-white cursor-pointer"
              onClick={() => handleListItemClick("contract")}
            >
              Contract
            </li>
          </ul>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "top-1 right-2 absolute",
            agreeIsOpen && "rotate-180 top-3"
          )}
          width="24"
          height="17"
          viewBox="0 0 24 17"
          fill="none"
        >
          <path
            d="M11.3539 14.3539L7.72886 11.7862C7.67886 11.7507 7.64152 11.7125 7.61686 11.6714C7.59219 11.6303 7.57952 11.5859 7.57886 11.5382C7.57886 11.4438 7.62486 11.3612 7.71686 11.2903C7.80886 11.2195 7.92952 11.1841 8.07886 11.1841H15.6789C15.8289 11.1841 15.9499 11.2195 16.0419 11.2903C16.1339 11.3612 16.1795 11.4438 16.1789 11.5382C16.1789 11.5619 16.1289 11.6445 16.0289 11.7862L12.4039 14.3539C12.3205 14.4129 12.2372 14.4542 12.1539 14.4778C12.0705 14.5014 11.9789 14.5132 11.8789 14.5132C11.7789 14.5132 11.6872 14.5014 11.6039 14.4778C11.5205 14.4542 11.4372 14.4129 11.3539 14.3539Z"
            fill="white"
          />
        </svg>
      </div>
      <label className="flex items-center gap-4 w-[374px] font-semibold text-[#989595]">
        <input
          className="w-[20px] h-[20px]"
          type="checkbox"
          name="isAgreed"
          checked={formData.isAgreed}
          onChange={handleInputChange}
        />
        Do you still working here?
      </label>
      <div className="flex flex-col items-center w-[374px]">
        <div className="flex justify-between w-[374px]">
          <div className="flex flex-col">
            <span className="mb-1 ml-2 text-white">From:</span>
            <input
              required
              min="1900-01-01"
              max={fechaHoy}
              className="bg-[#3C1F41] px-[10px] py-[3px] rounded-[10px] text-white outline-none"
              type="date"
              name="from"
              value={fromValue}
              onChange={(e) => {
                setFromValue(e.target.value);
                handleInputDate(e);
              }}
              placeholder="From"
            />
          </div>

          {!formData.isAgreed && (
            <div className="flex flex-col">
              <span className="mb-1 ml-2 text-white">To:</span>
              <input
                required
                min="1900-01-01"
                max={fechaHoy}
                className="bg-[#3C1F41] px-[10px] py-[3px] rounded-[10px] text-white outline-none"
                type="date"
                name="to"
                value={toValue}
                onChange={(e) => {
                  setToValue(e.target.value);
                  handleInputDate(e);
                }}
                placeholder="To"
              />
            </div>
          )}
        </div>
        {badDate && (
          <span className="mt-3 text-red-700">*Enter a valid date</span>
        )}
      </div>

      <button
        className="bg-white mt-3 transition-all duration-75 active:scale-95 rounded-[15px] w-[104px] h-[36px] font-semibold"
        type="submit"
      >
        Save
      </button>
      {service && (
        <button
          type="button"
          onClick={eliminarCard}
          className="right-12 bottom-8 absolute flex justify-center items-center bg-red-500 hover:bg-red-600 rounded-sm w-[26px] h-[26px] text-white transition-all duration-75"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
      )}
    </form>
  );
};
