import { useState } from "react";
import { Technology } from "../../../../types/Types";
import ButtonPanel from "../../../ui/ButtonPanel";
import Modal from "../../../ui/Modal";
import { GrClose } from "react-icons/gr";

const AddTecnologia = ({
  tecnologias,
  onClose,
  addTecnologia,
}: {
  tecnologias: Technology[] | undefined;
  onClose: () => void;
  addTecnologia: (value: string) => void;
}) => {
  const [currentTechnology, setCurrentTechnology] = useState<string>("HTML");

  return (
    <Modal close={onClose}>
      <div className="relative flex flex-col items-center gap-8 bg-color-bg-primary p-6 rounded-md w-96 h-60 font-Kodchasan">
        <GrClose
          onClick={() => {
            onClose();
          }}
          className="top-2 right-2 absolute text-2xl text-color-text hover:text-color-secondary cursor-pointer"
        />
        <p className="text-xl">Tecnologies</p>
        <select
          className="px-3 py-1 rounded-md w-full text-color-bg-primary"
          value={currentTechnology}
          onChange={(event) => setCurrentTechnology(event.target.value)}
        >
          {tecnologias?.map((tecnologia: Technology) => (
            <option>{tecnologia.name}</option>
          ))}
        </select>
        <ButtonPanel
          onCancel={onClose}
          onSuccess={() => {
            addTecnologia(currentTechnology);
          }}
          cancel={"Cancel"}
          success={"Add"}
          disabled={false}
        />
      </div>
    </Modal>
  );
};

export default AddTecnologia;
