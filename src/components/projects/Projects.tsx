import CardProjects from "../ui/cardProyects";
import { useEffect, useState } from "react";
import { SlDocs } from "react-icons/sl";
import { IoIosAddCircleOutline } from "react-icons/io";
import ListComponent from "../projects/projectItem/ListComponent";
import renderTechnologyIcon from "../../functions/renderIcon";
import { ProjectCards } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import {
  /*getCurrentProject,*/ getCurrentuser,
} from "../../helpers/serverUser";
import { currentUser, useStore } from "../../store";
import Spinner from "../ui/Spinner";

const Projects = () => {
  const navigate = useNavigate();
  const currUser = currentUser();
  const userStore = useStore();
  const [projects, setProjects] = useState<ProjectCards[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projectsData = await getCurrentuser(currUser.id);
        /* const projectCompartidos = await getCurrentProject();
        console.log(projectsData.projects);
        console.log(projectCompartidos);*/
        if (projectsData) {
          setProjects(projectsData.projects);
          /*setProjects((prev) => [...prev, projectCompartidos]);*/
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchProject();
  }, [currUser.id]);

  return (
    <div className="flex flex-col flex-grow to-color-bg-thirdy bg-gradient-to-r from-color-bg-primary p-4 h-fit h-min-full">
      <div className="items-center gap-2 p-8">
        <div className="">
          <h1 className="font-bold font-Kodchasan text-3xl text-white">
            Your Projects <SlDocs className="inline-block size-6" />
          </h1>
        </div>
        <div className="flex flex-row items-center gap-2 pt-4">
          <h2 className="font-Kodchasan text-lg text-white">Sort by: </h2>
          <select className="flex justify-center items-center border-2 border-white mt-1 rounded-lg w-52 h-8 text-color-bg-primary">
            <option className="hidden font-Kodchasan text-start" disabled>
              Category
            </option>
            <option value="1">Technologies</option>
            <option value="2">Participants</option>
            <option value="3">Status</option>
          </select>
          {currUser.id == userStore.id && (
            <div className="flex justify-center items-center">
              <button
                className="flex bg-color-bg-thirdy hover:bg-color-secondary px-4 py-2 rounded-2xl font-bold text-white"
                onClick={() => {
                  navigate(`/project/new`, { state: {} });
                }}
              >
                <h3 className="flex justify-center items-center gap-2 text-center">
                  New Project
                  <IoIosAddCircleOutline className="inline-block justify-center size-6" />
                </h3>
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        id="Separador"
        className="bg-white shadow-2xl shadow-white mx-auto w-10/12 h-0.5"
      ></div>
      {loading ? (
        <div className="flex flex-wrap justify-center items-center gap-10 p-8 w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 p-8 w-full">
          {projects.length > 0 ? (
            projects.map((project) => (
              <CardProjects
                project={project}
                key={project.id}
                title={project.title}
                description="Participants"
                imageUrl={project.image}
                initialStatus={project.status_id}
                childrenItem={
                  <ListComponent
                    title=""
                    items={project.technologies}
                    renderItem={renderTechnologyIcon}
                    project={project}
                    showModal={() => {}}
                  />
                }
                childrenPerson={
                  <ListComponent
                    title=""
                    items={project.participants}
                    project={project}
                    renderItem={(participant) =>
                      participant?.photo ? (
                        <img src={participant.photo} alt={participant.name} />
                      ) : (
                        <div className="text-xl">
                          {participant.name.charAt(0).toUpperCase()}
                        </div>
                      )
                    }
                    showModal={() => {}}
                  />
                }
              />
            ))
          ) : (
            <>
              {currUser.id !== userStore.id && (
                <div className="flex flex-col justify-center items-center w-full">
                  <span className="mt-12 font-semibold text-[42px] text-[rgb(202,202,202)]">
                    This User do not have any Projects added yet
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="mt-6 text-[rgb(202,202,202)]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Projects;
