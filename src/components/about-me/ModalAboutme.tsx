import { FormEvent, useEffect, useState } from "react";
import ButtonPanel from "../ui/ButtonPanel";
import Modal from "../ui/Modal";
import { AboutmeType, Technology, Tecnologia } from "../../types/Types";
import { getTecnologias } from "../../helpers/serverTecnologias";
import { IoIosCloseCircle } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { notificationStore, useStore } from "../../store";
import { getCurrentuser, setCurrentuser } from "../../helpers/serverUser";

const ModalAboutme = ({
  close,
  stack,
  nickName,
  setAbout
}: {
  close: (data: boolean) => void;
  stack: string[];
  nickName: string;
  setAbout: (data: AboutmeType) => void
}) => {
  const [tecnologias, setTecnologias] = useState<Tecnologia[]>();
  const [currentTechnology, setCurrentTechnology] = useState<string>("HTML");
  const user = useStore();
  const [name, setName] = useState(user?.name);
  const [nickname, setNickname] = useState(nickName);
  const [lastname, setLastname] = useState(user?.lastname);
  const [description, setDescription] = useState(user?.description);
  const [technologies, setTechnologies] = useState<string[]>(stack);

  const notification = notificationStore()
  useEffect(() => {
    const fetchTecnologias = async () => {
      const data = await getTecnologias();
      setTecnologias(data);
    };

    fetchTecnologias();
  }, []);

  const aboutmeHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ name, nickname, lastname, description, technologies });
    const data = await setCurrentuser({
      name,
      nickname,
      lastname,
      description,
      stack: technologies,
    });
    console.log(data);
    if(data){
      notification.success("Profile updated successfully")
      if(user.id){
        const currentuser = await getCurrentuser(user.id);
        setAbout(currentuser);
      }
      close(false)
    }
  };
  const deleteHnadler = (currentitem: string) => {
    setTechnologies(technologies.filter((item) => item !== currentitem));
  };

  return (
    <Modal close={() => close(false)}>
      <form
        onSubmit={aboutmeHandler}
        className="relative flex flex-col gap-5 bg-color-bg-primary p-8 rounded-md w-[50%] h-[95%]"
      >
        <GrClose
          onClick={() => {
            close(false);
          }}
          className="top-2 right-2 absolute text-xl hover:text-color-secondary cursor-pointer"
        />
        <h1 className="text-3xl">Edit your profile</h1>
        <input
          type="text"
          className="p-2 rounded-md text-color-bg-primary"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        ></input>
        <input
          type="text"
          className="p-2 rounded-md text-color-bg-primary"
          placeholder="Lastname"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          required
        ></input>
        <input
          type="text"
          className="p-2 rounded-md text-color-bg-primary"
          placeholder="Nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
        ></input>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="p-2 rounded-md text-color-bg-primary outline-none resize-none"
        ></textarea>
        <div className="flex items-center gap-8 bg-color-bg-primary p-6 rounded-md font-Kodchasan">
          <div className="flex flex-col items-center w-full">
            <div className="flex gap-2 w-full">
              <select
                className="px-3 py-1 rounded-md w-full text-color-bg-primary"
                value={currentTechnology}
                onChange={(event) => setCurrentTechnology(event.target.value)}
              >
                {tecnologias?.map((tecnologia: Technology) => (
                  <option key={tecnologia.id}>{tecnologia.name}</option>
                ))}
              </select>
              <p
                onClick={() => {
                  if (!technologies.find((item) => item === currentTechnology))
                    setTechnologies((prev) => [currentTechnology, ...prev]);
                }}
                className="border-2 border-color-bg-contact-input px-2 py-1 rounded-md cursor-pointer"
              >
                Add
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl">Stack</p>
          <ul className="flex flex-wrap gap-2 w-[95%]">
            {technologies.map((tecnologia) => (
              <li
                key={tecnologia}
                onClick={() => deleteHnadler(tecnologia)}
                className="relative bg-color-secondary p-1 rounded-md text-sm cursor-pointer"
              >
                {tecnologia}
                <div className="top-[-3px] right-[-3px] absolute flex justify-center items-center rounded-full w-3 h-3 overflow-hidden">
                  <IoIosCloseCircle className="bg-black text-color-bg-contact-input text-sm" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-4 bottom-4 absolute">
            <ButtonPanel
              onCancel={() => close(false)}
              onSuccess={() => console.log("asd")}
              cancel={"Cancel"}
              success={"Add"}
              disabled={false}
            />
        </div>
        
      </form>
    </Modal>
  );
};

export default ModalAboutme;
