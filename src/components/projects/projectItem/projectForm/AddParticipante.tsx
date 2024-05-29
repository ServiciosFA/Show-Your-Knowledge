import ButtonPanel from "../../../ui/ButtonPanel";
import Modal from "../../../ui/Modal";
import { Participante } from "../../../../types/Types";
import { useEffect, useState } from "react";
import { getNewpartipants } from "../../../../helpers/serverParticipants";
import { GrClose } from "react-icons/gr";

const AddParticipante = ({
  onCancel,
  addParticipant,
}: {
  onCancel: () => void;
  addParticipant: (value: Participante) => void;
}) => {
  const [newParticipantInput, setNewparticipantInput] = useState<string>("");
  const [newParticipants, setNewparticipants] = useState<Participante[]>([]);
  const [currentParticipant, setCurrentParticipant] = useState<Participante>();

  useEffect(() => {
    const fetchParticipante = async () => {
      if (newParticipantInput) {
        const newParticpipantdata = await getNewpartipants(newParticipantInput);
        setNewparticipants(newParticpipantdata);
      }
    };
    fetchParticipante();
  }, [newParticipantInput]);

  const addParticipante = async (user: Participante) => {
    /*const res = await addParticipants(user);
    console.log(res);*/
    console.log(user);
  };

  return (
    <Modal close={onCancel}>
      <div className="relative flex flex-col justify-center items-center gap-8 bg-color-bg-primary p-6 rounded-md w-80 h-80 font-Kodchasan">
        <GrClose
          onClick={() => {
            onCancel();
          }}
          className="top-2 right-2 absolute text-xl hover:text-color-secondary cursor-pointer"
        />
        <p className="text-xl">Add participant</p>
        <div className="relative flex flex-col">
          <input
            className="p-1 rounded-md text-color-bg-primary outline-none"
            type="search"
            placeholder="Search user"
            value={newParticipantInput}
            onChange={(event) => {
              setNewparticipantInput(event.target.value);
            }}
          ></input>

          {newParticipants && newParticipants.length !== 0 && (
            <ul className="bg-color-text h-28 overflow-y-auto">
              {newParticipants.map((newParticipan) => (
                <li
                  onClick={() => {
                    setCurrentParticipant(newParticipan);
                    setNewparticipantInput("");
                    setNewparticipants([]);
                  }}
                  className="p-2 text-color-bg-primary"
                  key={newParticipan.id}
                >
                  <p>{newParticipan.name + " " + newParticipan.lastname}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {currentParticipant && (
          <div className="flex gap-2 border-2 border-color-secondary p-4 rounded-md">
            <p>{currentParticipant.name}</p>
            {currentParticipant.photo && (
              <img className="w-6 h-6" src={currentParticipant.photo}></img>
            )}
          </div>
        )}
        <ButtonPanel
          onCancel={onCancel}
          onSuccess={() => {
            /*if (currentParticipant) {
              addParticipant(currentParticipant);
            }*/
            if (currentParticipant) {
              addParticipante(currentParticipant);
              addParticipant(currentParticipant);
              setCurrentParticipant(undefined);
            }
          }}
          cancel={"Cancel"}
          success={"Add"}
          disabled={false}
        />
      </div>
    </Modal>
  );
};

export default AddParticipante;
