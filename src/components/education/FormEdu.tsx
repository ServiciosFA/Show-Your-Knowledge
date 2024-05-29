import React, { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import logo from "../../assets/logo-resize.png";
import {
  deleteEducation,
  saveEducation,
  updateEducation,
} from "../../helpers/serverEducation";
import { useStore } from "../../store";
import Spinner from "../ui/Spinner";

interface IFormData {
  institute: string;
  carrer: string;
  country: string;
  isAgreed: boolean;
  from: string;
  to: string;
}

export const FormEdu = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const fechaHoy = `${year}-${month}-${day}`;
  const navigate = useNavigate();

  const userStore = useStore();
  const [badDate, setBadDate] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    institute: "",
    carrer: "",
    country: "",
    isAgreed: false,
    from: "",
    to: "",
  });
  const [toValue, setToValue] = useState("");
  const [fromValue, setFromValue] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const service = location.state?.elemento;

  useEffect(() => {
    if (service) {
      setFormData({
        institute: service.institution,
        carrer: service.degree,
        country: service.country,
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.isAgreed) {
      setBadDate(false);

      const datos = {
        degree: formData.carrer,
        institution: formData.institute,
        startDate: formData.from,
        endDate: formData.isAgreed ? "1111-11-11" : formData.to,
        country: formData.country,
      };
      setLoading(true);
      if (service) {
        const data = await updateEducation(service.id, datos);

        if (data) {
          setFormData({
            institute: "",
            carrer: "",
            country: "",
            isAgreed: false,
            from: "",
            to: "",
          });
        }

        navigate(`/person/${userStore.id}/education`);
      } else {
        const data = await saveEducation(datos);

        if (data) {
          setFormData({
            institute: "",
            carrer: "",
            country: "",
            isAgreed: false,
            from: "",
            to: "",
          });
        }

        navigate(`/person/${userStore.id}/education`);
      }
    } else {
      if (new Date(fromValue) < new Date(toValue)) {
        setBadDate(false);
        const datos = {
          degree: formData.carrer,
          institution: formData.institute,
          startDate: formData.from,
          endDate: formData.isAgreed ? "1111-11-11" : formData.to,
          country: formData.country,
        };

        if (service) {
          const data = await updateEducation(service.id, datos);

          if (data) {
            setFormData({
              institute: "",
              carrer: "",
              country: "",
              isAgreed: false,
              from: "",
              to: "",
            });
          }

          navigate(`/person/${userStore.id}/education`);
        } else {
          const data = await saveEducation(datos);

          if (data) {
            setFormData({
              institute: "",
              carrer: "",
              country: "",
              isAgreed: false,
              from: "",
              to: "",
            });
          }
          navigate(`/person/${userStore.id}/education`);
        }
      } else {
        setBadDate(true);
      }
    }
    setLoading(true);
  };

  const eliminarCard = async () => {
    setLoading(true);
    await deleteEducation(service.id);
    setLoading(false);
    navigate(`/person/${userStore.id}/education`);
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
        Add your Education
      </h1>
      <input
        required
        className="bg-[#3C1F41] pl-[15px] rounded-[10px] w-[374px] h-[36px] font-semibold text-white outline-none"
        type="text"
        name="institute"
        value={formData.institute}
        onChange={handleInputChange}
        placeholder="Institute"
      />
      <input
        required
        className="bg-[#3C1F41] pl-[15px] rounded-[10px] w-[374px] h-[36px] font-semibold text-white outline-none"
        type="text"
        name="carrer"
        value={formData.carrer}
        onChange={handleInputChange}
        placeholder="Carrer"
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
      <label className="flex items-center gap-4 w-[374px] font-semibold text-[#989595]">
        <input
          className="w-[20px] h-[20px]"
          type="checkbox"
          name="isAgreed"
          checked={formData.isAgreed}
          onChange={handleInputChange}
        />
        Do you still studying?
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
