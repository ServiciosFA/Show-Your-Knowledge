import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCards, ProjectInput } from "../../types/Types";
import emptyImage from "../../assets/emptyImage.jpg";
import image1 from "/public/imagenSYK3.png";
import { capitalizeFirstLetter } from "../../functions/stringFuntions";

interface CardProjectsProps {
  project: ProjectCards | ProjectInput;
  title: string;
  description: string;
  imageUrl: string;
  initialStatus: string;
  childrenItem: React.ReactNode;
  childrenPerson: React.ReactNode;
}

const CardProjects: React.FC<CardProjectsProps> = ({
  project,
  title,
  description,
  imageUrl,
  initialStatus,
  childrenItem,
  childrenPerson,
}) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getStatus = () => {
      switch (initialStatus) {
        case "1":
          setStatus("En progreso");
          break;
        case "3":
          setStatus("Pendiente");
          break;
        case "2":
          setStatus("Completado");
          break;
        case "En progreso":
          setStatus("En progreso");
          break;
        case "Completado":
          setStatus("Completado");
          break;
        case "Pendiente":
          setStatus("Pendiente");
          break;
        default:
          setStatus("Pendiente");
          break;
      }
    };
    getStatus();
  }, [initialStatus]);

  const getStatusColor = () => {
    switch (status) {
      case "Completado":
        return "bg-[#6B70ED]";
      case "Pendiente":
        return "bg-[#8E2A79]";
      case "En progreso":
        return "bg-[#CA2F2C]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Link
      to={project && `/project/${project.id}`}
      className="flex flex-col border-2 border-color-bg-thirdy bg-[#2b1944]/50 shadow hover:shadow-md hover:shadow-slate-800 rounded-lg w-[280px] max-w-[324px] max-h-[340px] transform transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.01]"
    >
      <div className="overflow-hidden basis-3/5">
        {imageUrl ? (
          <div className="flex justify-center items-center">
            <img className="object-contain" src={image1} />
          </div>
        ) : (
          <div className="flex justify-center items-center border-2 rounded-md">
            <img className="object-contain" src={emptyImage} />
          </div>
        )}
      </div>
      <div className="justify-center px-2 py-1 basis-2/3 card-body grow">
        <h5 className="font-Kodchasan text-ellipsis text-nowrap text-white overflow-x-hidden">
          {capitalizeFirstLetter(title)}
        </h5>
        <div className="py-2 rounded-xl">
          <div className="flex justify-start items-center -space-x-0.5">
            {childrenItem}
          </div>
        </div>
        <p className="mr-3 font-Kodchasan text-ellipsis text-nowrap text-white overflow-x-hidden">
          {description}
        </p>
        <div className="py-2 rounded-xl">
          <div className="flex justify-start items-center -space-x-0.5">
            {childrenPerson}
          </div>
        </div>
      </div>
      <div className={`grow basis-1 ${getStatusColor()} rounded-b-md`}>
        <p className="mr-3 font-bold font-Kodchasan text-color-text text-end">
          {status}
        </p>
      </div>
    </Link>
  );
};
export default CardProjects;
