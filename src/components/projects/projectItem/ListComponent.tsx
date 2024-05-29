import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { Participante, Project } from "../../../types/Types";
import { ProjectCards } from "../../../types/Types";
import { currentUser, useStore } from "../../../store";

interface ListComponentProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  project: ProjectCards | Project;
  showModal: () => void;
}

function ListComponent<T extends Participante | string>({
  title,
  items,
  renderItem,
  project,
  showModal,
}: ListComponentProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const currUser = currentUser();
  const userStore = useStore();
  const formHandler = () => {
    if (location.pathname.includes("/person"))
      navigate(`form`, { state: { project } });
    else showModal();
  };

  return (
    <div className="flex">
      {title !== "" && <p className="pr-4 text-xl">{title}</p>}
      <ul className="flex flex-wrap gap-3">
        {items?.map((item, index) => {
          const key = typeof item === "string" ? item : item.id + index;
          {
            if (index < 4)
              return (
                <Link
                  to={
                    (item as Participante).id
                      ? `/person/${(item as Participante).id}/about-me`
                      : ""
                  }
                  className="flex justify-center items-center hover:border-2 hover:border-color-secondary bg-violet-600 rounded-full w-[40px] h-[40px] hover:cursor-pointer overflow-hidden"
                  key={key}
                >
                  {renderItem(item)}
                </Link>
              );
          }
        })}
      </ul>
      {currUser?.id == userStore?.id &&
        (!items || !(items[0] as Participante) || items.length === 0) && (
          <div className="flex flex-wrap gap-3">
            {!location.pathname.includes("form") && (
              <div
                onClick={formHandler}
                className="flex justify-center items-center hover:border-2 hover:border-color-secondary bg-violet-600 rounded-full w-[40px] h-[40px] hover:cursor-pointer overflow-hidden"
              >
                <CiCirclePlus className="bg-color-text text-5xl text-color-bg-primary"></CiCirclePlus>
              </div>
            )}
          </div>
        )}
    </div>
  );
}

export default ListComponent;
