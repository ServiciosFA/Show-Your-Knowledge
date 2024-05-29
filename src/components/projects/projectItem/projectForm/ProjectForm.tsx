import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Categoria, Tecnologia } from "../../../../types/Types";
import { getCategoria } from "../../../../helpers/serverCategorias";
import ListComponent from "../ListComponent";
import renderTechnologyIcon from "../../../../functions/renderIcon";
import { AiOutlinePlus } from "react-icons/ai";
import { getTecnologias } from "../../../../helpers/serverTecnologias";
import ButtonPanel from "../../../ui/ButtonPanel";
import image1 from "/public/imagenSYK1.png";
import AddTecnologia from "./AddTecnologia";
import ProjectImages from "./ProjectImages";
import { IoChevronBackSharp } from "react-icons/io5";
import { createProject, setProject } from "../../../../helpers/serverProjects";
import { currentUser } from "../../../../store";
import Spinner from "../../../ui/Spinner";

const ProjectForm = () => {
  const location = useLocation();
  const project = location.state.project;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(project ? project?.title : "");
  const [description, setDescription] = useState<string>(
    project ? project?.description : ""
  );
  const [status, setStatus] = useState(
    project?.status ? project?.status : "Pendiente"
  );

  const [category, setCategory] = useState(
    project?.categories[project?.categories.length - 1]
      ? project?.categories[project?.categories.length - 1]
      : "E-commerce"
  );
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies
  );
  const [repository, setRepository] = useState(project?.repository);
  const [deploy, setDeploy] = useState(project?.deploy);

  const [showTecnologias, setShowtecnologias] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>();
  const [allTecnologias, setTecnologias] = useState<Tecnologia[]>();

  const toogleModalTecnologias = () => {
    setShowtecnologias((prev) => !prev);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      const data = await getCategoria();
      setCategorias(data);
    };
    const fetchTecnologias = async () => {
      const data = await getTecnologias();
      setTecnologias(data);
      setLoading(false);
    };
    fetchCategorias();
    fetchTecnologias();
  }, []);

  const { id } = currentUser();

  const estados = ["En progreso", "Pendiente", "Completado"];
  const editProjectHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!project) {
      setLoading(true);
      await createProject({
        title,
        description,
        status,
      });
      navigate(`/person/${id}/projects`);
    } else {
      setLoading(true);

      await setProject({
        id: project.id,
        title,
        description,
        status,
        image: image1,
        repository,
        deploy,
        categories: [category],
        technologies,
        participants: [],
        requests: [],
      });
      navigate(`/person/${id}/projects`);
    }
    setLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <div className="relative flex flex-grow justify-center items-center bg-color-bg-thirdy py-10 min-h-[91.3vh] text-color-text overflow-y-auto">
      <div
        onClick={() => navigate(-1)}
        className="top-[2.7rem] left-6 absolute flex justify-center items-center gap-1 bg-color-bg-thirdy p-2 rounded-md hover:text-color-secondary cursor-pointer"
      >
        <IoChevronBackSharp className="bg" />
        <p className="">Back</p>
      </div>
      <form
        onSubmit={editProjectHandler}
        className="flex flex-col gap-4 bg-color-bg-thirdy px-36 w-[50rem] h-full font-Kodchasan text-color-text"
      >
        <div className="flex flex-col gap-4 p-2">
          {!project && <p className="pb-10 text-3xl">Create your project</p>}
          {/*TITLE */}
          <div className="flex flex-col">
            <label>Title</label>
            <input
              className="p-1 rounded-md text-color-bg-primary focus:outline-none"
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></input>
          </div>
          {/*DESCRIPTION */}
          <div className="flex flex-col">
            <label>Description</label>
            <textarea
              className="p-1 rounded-md h-12 text-color-bg-primary focus:outline-none resize-none"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          {/*ESTADO*/}
          <div className="flex flex-col">
            <label>State</label>
            <select
              className="text-color-primary text-lg focus:outline-none p-1 rounded-md"
              required
              value={status ? status : "Pendiente"}
              onChange={(event) => setStatus(event.target.value)}
            >
              {estados.map((estado) => (
                <option
                  key={estado}
                  className="text-colo-primary"
                  value={estado}
                >
                  {estado}
                </option>
              ))}
            </select>
          </div>
          {project && (
            <div className="flex flex-col gap-3">
              {/*CATEGORIA */}
              <div className="flex flex-col">
                <label>Category</label>
                <select
                  className="text-color-bg-primary text-lg focus:outline-none p-1 rounded-md"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                >
                  <option className="text-color-bg-primary" value="" disabled>
                    --Please choose a Category--
                  </option>
                  {categorias?.map((item: Categoria) => (
                    <option
                      className="text-color-bg-primary"
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*IMAGENES */}
              <p>Images</p>
              {project?.imagenes ? (
                <div>
                  <ProjectImages images={project.imagenes} />
                </div>
              ) : (
                <div className="bg-opacity-30 w-[150px] h-[100px] bg-color-text-thirdy hover:text-color-secondary cursor-pointer">
                  <AiOutlinePlus className="w-[150px] h-[100px]"></AiOutlinePlus>
                </div>
              )}
              {/*TECNOLOGIAS*/}
              <p>Technologies</p>
              <div className="flex justify-between items-center gap-3">
                <div className="flex flex-col gap-1">
                  {technologies && (
                    <div className="border-2 border-color-secondary p-2 rounded-lg">
                      <ListComponent
                        title={""}
                        items={technologies}
                        renderItem={renderTechnologyIcon}
                        project={project}
                        showModal={() => {}}
                      />
                    </div>
                  )}
                </div>
                <div
                  onClick={toogleModalTecnologias}
                  className="border-2 border-color-text-secondary hover:border-color-secondary p-[8px] rounded-full hover:text-color-secondary"
                >
                  <AiOutlinePlus className="text-2xl cursor-pointer" />
                </div>
              </div>
              {technologies?.length === 0 && (
                <label className="text-color-secondary text-sm">
                  At least one technology is needed
                </label>
              )}
              {/*PARTICIPANTES*/}

              {/*REPOSITORY*/}
              <div className="flex flex-col">
                <label htmlFor="repository">Repository</label>
                <input
                  id="repository"
                  className="p-1 rounded-md text-color-bg-primary focus:outline-none"
                  value={repository}
                  onChange={(event) => {
                    setRepository(event.target.value);
                  }}
                ></input>
              </div>
              {/*DEPLOY*/}
              <div className="flex flex-col">
                <label>Deploy</label>
                <input
                  className="p-1 rounded-md text-color-bg-primary focus:outline-none"
                  value={deploy}
                  onChange={(event) => setDeploy(event.target.value)}
                  required
                ></input>
              </div>
              {/*BUTTON PANEL*/}
            </div>
          )}
          <ButtonPanel
            onCancel={() => {
              navigate(-1);
            }}
            onSuccess={() => {
              editProjectHandler;
            }}
            disabled={technologies?.length === 0}
            cancel={"Cancel"}
            success={"Save"}
          />
        </div>
      </form>
      {showTecnologias && (
        <AddTecnologia
          tecnologias={allTecnologias}
          onClose={() => setShowtecnologias(false)}
          addTecnologia={(value: string) => {
            if (!technologies.includes(value)) {
              setTechnologies((prevstate) => [...prevstate, value]);
            }
          }}
        />
      )}
    </div>
  );
};

export default ProjectForm;
