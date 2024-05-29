import { FaGithub } from "react-icons/fa";
import { GrDeploy } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const PanelprojectButton = ({
  estado,
  showModal,
  idOwner,
}: {
  estado: string;
  showModal: () => void;
  idOwner: string;
}) => {
  const renderPanel = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return (
          <div className="flex justify-center items-start">
            <button
              onClick={showModal}
              className="bg-color-text px-3 py-1 rounded-md text-color-bg-seconday text-lg"
            >
              Apply
            </button>
          </div>
        );
      case "En progreso":
        return (
          <div className="flex justify-center items-start gap-3 pt-2">
            <NavLink
              to={idOwner ? `/person/${idOwner}/contact-me` : ""}
              className="bg-color-text px-3 py-1 rounded-md text-color-bg-seconday text-lg"
            >
              Contact
            </NavLink>
          </div>
        );
      case "Completado":
        return (
          <div className="flex justify-center items-start gap-4 pt-2">
            <button className="bg-color-text px-3 py-3 rounded-full text-3xl text-color-bg-seconday hover:text-color-secondary">
              <FaGithub className="" />
            </button>
            <button className="bg-color-text px-3 py-3 rounded-full text-3xl text-color-bg-seconday hover:text-color-secondary">
              <GrDeploy />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderPanel(estado)}</>;
};

export default PanelprojectButton;
