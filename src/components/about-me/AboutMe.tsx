import { useEffect, useState } from "react";
import { AboutmeType } from "../../types/Types";
import { getCurrentuser } from "../../helpers/serverUser";
import { useParams } from "react-router-dom";
import { currentUser, useStore } from "../../store";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { lazy } from "react";
import Spinner from "../ui/Spinner";

const ModalAboutme = lazy(() => import("./ModalAboutme"));

const AboutMe = () => {
  const [about, setAbout] = useState<AboutmeType>();
  const [modalAbout, setModalabout] = useState(false);
  const currentUserdata = currentUser();
  const url = useParams();
  const user = useStore();
  const isUser = user.id === about?.id;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentuser = async () => {
      setLoading(true);
      if (url.pId) {
        const currentuser = await getCurrentuser(url.pId);
        setAbout(currentuser);

        currentUserdata?.setCurrentuser({
          name: currentuser.name,
          id: currentuser.id,
        });
      }
      setLoading(false);
    };
    fetchCurrentuser();
  }, [modalAbout, url.pId]);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="flex-grow px-6 w-full h-full font-Kodchasan text-white">
      <section className="flex gap-5 py-12 text-2xl">
        {about?.photo ? (
          <img
            className="rounded-full w-40 h-40"
            src={about?.photo}
            alt="Foto de perfil de "
          />
        ) : (
          <div className="bg-color-text rounded-full w-40 h-40">
            <IoPersonCircleOutline className="w-40 h-40 text-color-bg-primary" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-5xl">{about && about.name}</h2>

            {isUser && (
              <div>
                <AiFillEdit
                  onClick={() => setModalabout(true)}
                  className="text-4xl hover:text-color-secondary cursor-pointer"
                />
              </div>
            )}
          </div>

          {about?.nickname ? (
            <span className="text-white/60">@{about && about.nickname}</span>
          ) : isUser ? (
            <span className="text-base text-color-secondary">
              Add a Nickname
            </span>
          ) : (
            <span className="text-base text-color-secondary">No nickname</span>
          )}
          <p>Rol</p>
          {about?.rol ? (
            <p>{about?.rol}</p>
          ) : isUser ? (
            <p className="text-base text-color-secondary">Add a role</p>
          ) : (
            <p className="text-base text-color-secondary">No role</p>
          )}
          <ul className="flex flex-wrap items-center gap-4 max-w-full">
            {about?.stack.length !== 0 ? (
              about?.stack.map((stack) => (
                <li
                  key={stack}
                  className="bg-color-secondary p-1 rounded-md text-sm"
                >
                  {stack}
                </li>
              ))
            ) : isUser ? (
              <p className="text-base text-color-secondary">Add a stack</p>
            ) : (
              <p className="text-base text-color-secondary">No stack</p>
            )}
          </ul>
        </div>
      </section>
      <section className="bg-[#262323] px-12 py-9 rounded-[20px] text-2xl">
        <h2 className="mb-9 text-4xl text-center">About Me</h2>
        {about?.description ? (
          <p>{about?.description}</p>
        ) : (
          <p className="text-center text-color-secondary">No description</p>
        )}
      </section>

      {modalAbout && (
        <ModalAboutme
          stack={about?.stack ? about?.stack : []}
          nickName={about?.nickname ? about?.nickname : ""}
          close={setModalabout}
          setAbout={setAbout}
        ></ModalAboutme>
      )}
    </div>
  );
};
export default AboutMe;
