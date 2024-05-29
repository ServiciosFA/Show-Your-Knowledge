import CardProjects from "../ui/cardProyects";
import ButtonCircle from "../ui/buttonCircle";
import { ProjectCards, ProjectInput, UserInput } from "../../types/Types";
import participantImage from "/src/assets/Imagens/personas/perfil01.avif";
import imagenFalsa from "../../assets/img/imgFalsa-AnyEraser.png";
import { Link } from "react-router-dom";
import ListComponent from "../projects/projectItem/ListComponent";
import renderTechnologyIcon from "../../functions/renderIcon";

const Home = ({
  search,
  projectz,
  inputUser,
  inputPro,
}: {
  search: Array<UserInput>;
  projectz: Array<ProjectInput>;
  inputUser: string;
  inputPro: string;
}) => {
  const proyectos: ProjectCards[] = [
    {
      id: "1",
      technologies: [],
      repository: "",
      title: "Show your Knowledge",
      deploy: "",
      participants: [],
      categories: ["Portafolio digital"],
      description: "Digital Portfolio",
      image: "/public/imagenSYK4.png",
      status_id: "1",
      requests: [],
    },
    {
      id: "2",
      technologies: [],
      repository: "",
      title: "Trabajo Listo",
      deploy: "",
      participants: [],
      categories: ["Portafolio digital"],
      description: "Contratar y Dar Servicios",
      image: "/public/imagenSYK1.png",
      status_id: "2",
      requests: [],
    },
    {
      id: "3",
      technologies: [],
      repository: "",
      title: "Fut Match",
      deploy: "",
      participants: [],
      categories: ["Portafolio digital"],
      description: "Organizá un partido en 1 segundo",
      image: "/public/imagenSYK2.png",
      status_id: "3",
      requests: [],
    },
    {
      id: "3",
      technologies: [],
      repository: "",
      title: "Vida Verde",
      deploy: "",
      participants: [],
      categories: ["Portafolio digital"],
      description: "Recetas Verdes para tu Salud",
      image: "/public/imagenSYK3.png",
      status_id: "2",
      requests: [],
    },
  ];

  return (
    <main className="flex flex-col items-center bg-color-bg-thirdy min-h-screen">
      {inputUser.length > 0 || inputPro.length > 0 ? (
        <div className="flex flex-col mt-12 pb-12 w-[95%]">
          {inputUser.length > 0 ? (
            <>
              {search && search.length > 0 ? (
                <>
                  <h1 className="mb-3 font-semibold text-[32px] text-amber-300">
                    Users
                  </h1>
                  <div className="flex flex-wrap gap-5 w-[100%]">
                    {search.map((el) => (
                      <Link
                        to={`/person/${el.id}/about-me`}
                        key={el.id}
                        className="flex hover:outline-2 flex-col hover:outline overflow-hidden active:scale-95 bg-slate-700 p-3 hover:outline-slate-200 rounded-md w-[300px] h-[175px] transition-all duration-75"
                      >
                        <div className="flex gap-3">
                          <img
                            src={el.photo ? el.photo : imagenFalsa}
                            className="w-[80px]"
                            alt={`Foto de perfil de ${el.name}`}
                          />
                          <p className="font-semibold text-lg text-slate-500">
                            {el.nickname && `@${el.nickname}`}
                          </p>
                        </div>
                        <h2 className="mt-2 font-semibold text-slate-100 text-xl">
                          {el.name} {el.lastname}
                        </h2>
                        <p className="mt-1 text-lg text-slate-400 italic">
                          {el.mail}
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center gap-3 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="text-[rgb(68,61,81)]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
                  </svg>
                  <h1 className="font-semibold text-[40px] text-[rgb(68,61,81)]">
                    There's not users with that name
                  </h1>
                </div>
              )}
            </>
          ) : (
            <>
              {projectz && projectz.length > 0 ? (
                <>
                  <h1 className="mb-3 font-semibold text-[32px] text-amber-300">
                    Projects
                  </h1>
                  <div className="flex flex-wrap gap-5 w-[100%]">
                    {projectz.map((el) => (
                      <CardProjects
                        key={el.id}
                        project={el}
                        title={el.title}
                        description={el.description}
                        imageUrl={el.image}
                        initialStatus={el.status}
                        childrenItem={
                          <ListComponent
                            title=""
                            items={el?.technologies}
                            renderItem={renderTechnologyIcon}
                            project={el}
                            showModal={() => {}}
                          />
                        }
                        childrenPerson={
                          <ListComponent
                            title=""
                            items={el.participants}
                            project={el}
                            renderItem={(participant) =>
                              participant?.photo ? (
                                <img
                                  src={participant.photo}
                                  alt={participant.name}
                                />
                              ) : (
                                <div className="text-xl">
                                  {participant.name
                                    ? participant.name.charAt(0).toUpperCase()
                                    : "."}
                                </div>
                              )
                            }
                            showModal={() => {}}
                          />
                        }
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex justify-center items-center gap-3 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="text-[rgb(68,61,81)]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
                  </svg>
                  <h1 className="font-semibold text-[40px] text-[rgb(68,61,81)]">
                    There's not projects with that name
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="flex flex-col mt-12 w-[95%]">
            <h1 className="font-semibold text-[32px] text-amber-300">
              New Releases
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              {proyectos.map((el, index) => (
                <CardProjects
                  key={index}
                  title={el.title}
                  description={el.description}
                  imageUrl={el.image}
                  initialStatus={el.status_id}
                  project={el}
                  childrenItem={[
                    <ButtonCircle
                      number={1}
                      item={
                        <svg className="size-5" viewBox="-52.5 0 361 361">
                          <g>
                            <path
                              d="M127.843868,360.087912 L23.6617143,331.166242 L0.445186813,70.7657143 L255.554813,70.7657143 L232.31367,331.125451 L127.843868,360.087912 L127.843868,360.087912 Z"
                              fill="#264DE4"
                            ></path>
                            <path
                              d="M212.416703,314.546637 L232.277802,92.0573187 L128,92.0573187 L128,337.950242 L212.416703,314.546637 L212.416703,314.546637 Z"
                              fill="#2965F1"
                            ></path>
                            <path
                              d="M53.6685714,188.636132 L56.530989,220.572835 L128,220.572835 L128,188.636132 L53.6685714,188.636132 L53.6685714,188.636132 Z"
                              fill="#EBEBEB"
                            ></path>
                            <path
                              d="M47.917011,123.994725 L50.8202198,155.932132 L128,155.932132 L128,123.994725 L47.917011,123.994725 L47.917011,123.994725 Z"
                              fill="#EBEBEB"
                            ></path>
                            <path
                              d="M128,271.580132 L127.860044,271.617407 L92.2915165,262.013187 L90.0177582,236.54189 L57.957978,236.54189 L62.4323516,286.687648 L127.853011,304.848879 L128,304.808088 L128,271.580132 L128,271.580132 Z"
                              fill="#EBEBEB"
                            ></path>
                            <path
                              d="M60.4835165,0 L99.1648352,0 L99.1648352,16.1758242 L76.6593407,16.1758242 L76.6593407,32.3516484 L99.1648352,32.3516484 L99.1648352,48.5274725 L60.4835165,48.5274725 L60.4835165,0 L60.4835165,0 Z"
                              fill="#000000"
                            ></path>
                            <path
                              d="M106.901099,0 L145.582418,0 L145.582418,14.0659341 L123.076923,14.0659341 L123.076923,16.8791209 L145.582418,16.8791209 L145.582418,49.2307692 L106.901099,49.2307692 L106.901099,34.4615385 L129.406593,34.4615385 L129.406593,31.6483516 L106.901099,31.6483516 L106.901099,0 L106.901099,0 Z"
                              fill="#000000"
                            ></path>
                            <path
                              d="M153.318681,0 L192,0 L192,14.0659341 L169.494505,14.0659341 L169.494505,16.8791209 L192,16.8791209 L192,49.2307692 L153.318681,49.2307692 L153.318681,34.4615385 L175.824176,34.4615385 L175.824176,31.6483516 L153.318681,31.6483516 L153.318681,0 L153.318681,0 Z"
                              fill="#000000"
                            ></path>
                            <path
                              d="M202.126769,188.636132 L207.892396,123.994725 L127.889582,123.994725 L127.889582,155.932132 L172.892132,155.932132 L169.98611,188.636132 L127.889582,188.636132 L127.889582,220.572835 L167.216527,220.572835 L163.509451,261.992791 L127.889582,271.606857 L127.889582,304.833407 L193.362286,286.687648 L193.842637,281.291956 L201.347516,197.212132 L202.126769,188.636132 L202.126769,188.636132 Z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </svg>
                      }
                      color="blue"
                      type="tecnologia"
                    />,
                    <ButtonCircle
                      number={2}
                      item={
                        <svg
                          className="size-5"
                          width="80px"
                          height="80px"
                          viewBox="0 0 32 32"
                        >
                          <path
                            d="M6 28L4 3H28L26 28L16 31L6 28Z"
                            fill="#E44D26"
                          />
                          <path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529" />
                          <path
                            d="M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z"
                            fill="white"
                          />
                        </svg>
                      }
                      color="blue"
                      type="tecnologia"
                    />,
                  ]}
                  childrenPerson={
                    <ButtonCircle
                      number={1}
                      color="black"
                      item={<img src={participantImage} />}
                      type="participantes"
                    />
                  }
                />
              ))}
            </div>
          </div>
          <div className="mt-3 w-[95%]">
            <h2 className="font-semibold text-[32px] text-amber-300">
              Most popular
            </h2>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              {proyectos.map((project, index) => (
                <CardProjects
                  key={index}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.image}
                  initialStatus={project.status_id}
                  project={project}
                  childrenItem={[
                    <ButtonCircle
                      number={1}
                      item={
                        <svg className="size-5" viewBox="-52.5 0 361 361">
                          <g>
                            <path
                              d="M127.843868,360.087912 L23.6617143,331.166242 L0.445186813,70.7657143 L255.554813,70.7657143 L232.31367,331.125451 L127.843868,360.087912 L127.843868,360.087912 Z"
                              fill="#264DE4"
                            ></path>
                            <path
                              d="M212.416703,314.546637 L232.277802,92.0573187 L128,92.0573187 L128,337.950242 L212.416703,314.546637 L212.416703,314.546637 Z"
                              fill="#2965F1"
                            ></path>
                            <path
                              d="M53.6685714,188.636132 L56.530989,220.572835 L128,220.572835 L128,188.636132 L53.6685714,188.636132 L53.6685714,188.636132 Z"
                              fill="#EBEBEB"
                            ></path>
                            <path
                              d="M47.917011,123.994725 L50.8202198,155.932132 L128,155.932132 L128,123.994725 L47.917011,123.994725 L47.917011,123.994725 Z"
                              fill="#EBEBEB"
                            ></path>
                            <path
                              d="M128,271.580132 L127.860044,271.617407 L92.2915165,262.013187 L90.0177582,236.54189 L57.957978,236.54189 L62.4323516,286.687648 L127.853011,304.848879 L128,304.808088 L128,271.580132 L128,271.580132 Z"
                              fill="#EBEBEB"
                            ></path>
                            <path
                              d="M60.4835165,0 L99.1648352,0 L99.1648352,16.1758242 L76.6593407,16.1758242 L76.6593407,32.3516484 L99.1648352,32.3516484 L99.1648352,48.5274725 L60.4835165,48.5274725 L60.4835165,0 L60.4835165,0 Z"
                              fill="#000000"
                            ></path>
                            <path
                              d="M106.901099,0 L145.582418,0 L145.582418,14.0659341 L123.076923,14.0659341 L123.076923,16.8791209 L145.582418,16.8791209 L145.582418,49.2307692 L106.901099,49.2307692 L106.901099,34.4615385 L129.406593,34.4615385 L129.406593,31.6483516 L106.901099,31.6483516 L106.901099,0 L106.901099,0 Z"
                              fill="#000000"
                            ></path>
                            <path
                              d="M153.318681,0 L192,0 L192,14.0659341 L169.494505,14.0659341 L169.494505,16.8791209 L192,16.8791209 L192,49.2307692 L153.318681,49.2307692 L153.318681,34.4615385 L175.824176,34.4615385 L175.824176,31.6483516 L153.318681,31.6483516 L153.318681,0 L153.318681,0 Z"
                              fill="#000000"
                            ></path>
                            <path
                              d="M202.126769,188.636132 L207.892396,123.994725 L127.889582,123.994725 L127.889582,155.932132 L172.892132,155.932132 L169.98611,188.636132 L127.889582,188.636132 L127.889582,220.572835 L167.216527,220.572835 L163.509451,261.992791 L127.889582,271.606857 L127.889582,304.833407 L193.362286,286.687648 L193.842637,281.291956 L201.347516,197.212132 L202.126769,188.636132 L202.126769,188.636132 Z"
                              fill="#FFFFFF"
                            ></path>
                          </g>
                        </svg>
                      }
                      color="blue"
                      type="tecnologia"
                    />,
                    <ButtonCircle
                      number={2}
                      item={
                        <svg
                          className="size-5"
                          width="80px"
                          height="80px"
                          viewBox="0 0 32 32"
                        >
                          <path
                            d="M6 28L4 3H28L26 28L16 31L6 28Z"
                            fill="#E44D26"
                          />
                          <path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529" />
                          <path
                            d="M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z"
                            fill="white"
                          />
                        </svg>
                      }
                      color="blue"
                      type="tecnologia"
                    />,
                  ]}
                  childrenPerson={
                    <ButtonCircle
                      number={1}
                      color="black"
                      item={<img src={participantImage} />}
                      type="participantes"
                    />
                  }
                />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
