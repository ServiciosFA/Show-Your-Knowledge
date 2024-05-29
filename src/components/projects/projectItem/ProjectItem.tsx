import { useEffect, useState } from "react";
import { Participante, Project } from "../../../types/Types";
import { getProject } from "../../../helpers/serverProjects";
import ListComponent from "./ListComponent";
import { useNavigate, useParams } from "react-router-dom";
import renderTechnologyIcon from "../../../functions/renderIcon";
import StateprojectLabel from "./StateprojectLabel";
import PanelprojectButton from "./PanelprojectButton";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../../ui/Modal";
import NewRequest from "./NewRequest";
import { IoMdNotifications } from "react-icons/io";
import ListRequest from "./ListRequest";
import NoProjectitem from "./NoProjectitem";
import { IoChevronBackSharp } from "react-icons/io5";
import AddParticipante from "./projectForm/AddParticipante";
import { currentUser, useStore } from "../../../store";
import { getParticipipants } from "../../../helpers/serverParticipants";
import image1 from "/public/imagenSYK1.png";
import image2 from "/public/imagenSYK2.png";
import image3 from "/public/imagenSYK3.png";
import image4 from "/public/imagenSYK4.png";
import { getRequest } from "../../../helpers/serverSolicitud";
import Spinner from "../../ui/Spinner";
import { capitalizeFirstLetter } from "../../../functions/stringFuntions";

const ProjectItem = () => {
  const [currentPhoto, setCurrentphoto] = useState(0);
  const imagenes = [image1, image2, image3, image4];
  const [showModalNewrequest, setShowModalNewrequest] = useState(false);
  const [showModalRequests, setshowModalRequests] = useState(false);
  const navigate = useNavigate();
  const user = useStore();
  const currentUserdata = currentUser();
  const [requestCount, setRequestCount] = useState(0);
  const [project, setProject] = useState<Project>();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const [participants, setParticipants] = useState<Participante[]>(
    project ? project?.participants : []
  );
  const [showParticipantes, setShowparticipipantes] = useState(false);

  const toogleModalParticipantes = () => {
    setShowparticipipantes((prev) => !prev);
  };

  const toogleModalNewrequest = () => {
    setShowModalNewrequest((prev) => !prev);
  };

  const toogleModalRequests = () => {
    setshowModalRequests((prev) => !prev);
  };

  const formHandler = () => {
    navigate("form", { state: { project } });
  };

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      const dataProject = await getProject(params.pId?.toString() || "1");
      if (dataProject) {
        const dataParticipants = await getParticipipants(dataProject.data.id);
        console.log(dataParticipants);
        const updatedParticipants = dataParticipants.map(
          ({
            developer_name,
            developer_photo,
            developer_id,
            ...rest
          }: {
            developer_name: string;
            developer_photo: string;
            developer_id: string;
          }) => ({
            ...rest,
            name: developer_name,
            photo: developer_photo,
            id: developer_id,
          })
        );

        setParticipants(updatedParticipants);
        setProject(dataProject.data);
        const requestData = await getRequest();
        setRequestCount(requestData?.length);
        setLoading(false);
      }
    };
    fetchProject();
  }, [params.pId]);

  if (loading) return <Spinner />;
  if (!project) return <NoProjectitem />;

  const zeroRequest = 0;
  return (
    <div className="relative flex flex-col flex-grow gap-2 bg-custom-image bg-cover bg-no-repeat bg-center px-36 pt-6 min-h-[91.3vh] font-Kodchasan text-color-text">
      <div
        onClick={() => navigate(-1)}
        className="top-[2.7rem] left-6 absolute flex justify-center items-center gap-1 bg-color-bg-thirdy p-2 rounded-md hover:text-color-secondary cursor-pointer"
      >
        <IoChevronBackSharp className="bg" />
        <p className="">Back</p>
      </div>
      {/*Caracteristicas de projecto*/}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl">{capitalizeFirstLetter(project.title)}</h1>
            <p className="mt-[0.35rem] text-amber-400">
              {project.categories[project?.categories.length - 1]}
            </p>
            {currentUserdata.id == user.id && (
              <div onClick={formHandler}>
                <AiFillEdit className="text-2xl hover:text-color-secondary cursor-pointer" />
              </div>
            )}
          </div>
          <StateprojectLabel estado={project.status} />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-4 pl-6">
            <ListComponent
              title={"Tecnologies"}
              items={project.technologies}
              renderItem={renderTechnologyIcon}
              project={project}
              showModal={() => {}}
            />
            <ListComponent
              title={"Participants"}
              items={participants}
              renderItem={(participant) =>
                participant?.photo ? (
                  <img src={participant.photo} alt={participant.name} />
                ) : (
                  <div className="text-xl">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                )
              }
              project={project}
              showModal={() => {
                toogleModalParticipantes();
              }}
            />
          </div>
          {project.status === "Pendiente" && user.id === currentUserdata?.id ? (
            <div
              className={`flex justify-center items-center gap-2  cursor-pointer `}
            >
              <div
                onClick={!zeroRequest ? toogleModalRequests : undefined}
                className={`flex justify-center items-center ${
                  zeroRequest
                    ? "hover:cursor-default"
                    : "hover:text-color-secondary"
                }`}
              >
                <p className={`px-3 py-1 `}>Requests</p>
                <div className="relative">
                  <IoMdNotifications className="text-2xl" />
                  {requestCount && requestCount > 0 ? (
                    <p className="top-0 right-[-5px] absolute bg-color-primary rounded-full w-4 h-4 text-center text-xs">
                      {requestCount}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <PanelprojectButton
              showModal={toogleModalNewrequest}
              estado={project.status}
              idOwner={"2"}
            />
          )}
        </div>
      </div>
      <hr className="my-6"></hr>
      {/*Foto y descripcion */}
      <div className="flex justify-center gap-3 max-h-[350px]">
        {/*Fotos*/}
        <div className="flex flex-col justify-center items-center gap-2 border-2 border-color-secondary bg-color-bg-thirdy p-3 border-solid rounded-lg w-1/2">
          <div className="flex justify-center items-center w-full h-full max-h-[250px] object-contain">
            {!project.image ? (
              <img
                className="w-max-[400px] h-full"
                src={imagenes[currentPhoto]}
                alt=""
              ></img>
            ) : (
              <img
                className="w-max-[400px] h-full"
                src={imagenes[currentPhoto]}
                alt=""
              ></img>
              /*<div
                onClick={formHandler}
                className="flex items-center w-max-[400px] h-[10rem] cursor-pointer"
              >
                <p className="bg-color-bg-fourth hover:bg-color-primary p-2 rounded-md text-color-text text-xl">
                  Add image +
                </p>
              </div>*/
            )}
          </div>
          <ul className="flex justify-center items-center gap-2 bg-color-bg-thirdy p-2 w-full h-full max-h-[70px]">
            {imagenes.map((item: string, index: number) => (
              <li
                key={index}
                onClick={() => setCurrentphoto(index)}
                onMouseOver={() => setCurrentphoto(index)}
                className={
                  currentPhoto === index
                    ? "flex-0.8 cursor-pointer border-2 relative border-color-primary"
                    : "flex-0.8 cursor-pointer relative"
                }
              >
                <img className="w-[100px] h-[60px]" src={item} alt=""></img>
                <div
                  className={
                    currentPhoto !== index
                      ? "absolute inset-0 bg-gray-500 bg-opacity-0 backdrop-blur-sm"
                      : ""
                  }
                ></div>
              </li>
            ))}
          </ul>
        </div>
        {/*Descripcion*/}
        <div className="flex flex-col gap-3 bg-color-bg-thirdy p-3 rounded-lg w-2/5 max-h-[370px]">
          <h1 className="text-2xl text-amber-300">Description</h1>
          <div className="flex items-center p-1 h-full text-base overflow-y-auto">
            <p className="h-full text-base">
              {capitalizeFirstLetter(project?.description)}
            </p>
          </div>
        </div>
      </div>

      {showModalNewrequest && (
        <Modal close={toogleModalNewrequest}>
          <NewRequest close={toogleModalNewrequest} id={project.id} />
        </Modal>
      )}

      {showModalRequests && (
        <Modal close={toogleModalRequests}>
          <ListRequest close={toogleModalRequests} />
        </Modal>
      )}
      {showParticipantes && (
        <AddParticipante
          addParticipant={(value: Participante) =>
            setParticipants((prevState: Participante[]) => [
              ...prevState,
              value,
            ])
          }
          onCancel={() => setShowparticipipantes(false)}
        />
      )}
    </div>
  );
};

export default ProjectItem;
