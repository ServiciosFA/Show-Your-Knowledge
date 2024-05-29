import { useEffect, useState } from "react";
import { getRoles } from "../../../helpers/serverRoles";
import SelectItem from "../../ui/SelectItem";
import { sendRequest } from "../../../helpers/serverSolicitud";

interface Rol {
  name: string;
  id: string;
}

const NewSolicitud = ({ close, id }: { close: () => void; id: string }) => {
  /* Id
Roles
Comentario
Usuario*/
  const [roles, setRoles] = useState<Rol[]>();

  const [description, setDescription] = useState<string>("");
  const [rol, setRol] = useState<string>();

  useEffect(() => {
    const fetchRoles = async () => {
      const listRol = await getRoles();
      setRoles(listRol);
    };
    fetchRoles();
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const requestData = await sendRequest(parseInt(id), {
      comment: description,
      role: rol,
    });
    console.log(requestData);
    close();
  };

  return (
    <div className="flex flex-col justify-center gap-14 bg-color-bg-seconday p-2 rounded-md w-1/2 h-fit">
      <p className="text-3xl text-center">New Request</p>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-6 bg-color-bg-seconday p-2 rounded-md w-full text-color-bg-primary"
      >
        <div className="flex flex-col gap-2 mt-2 w-full">
          <label className="text-lg">Primary Rol</label>
          {roles && (
            <SelectItem
              roles={roles}
              setRols={(value: string) => setRol(value)}
            />
          )}
        </div>
        <div className="flex flex-col w-full">
          <label className="">Description</label>
          <textarea
            className="p-2 text-color-bg-primary text-lg resize-none focus:outline-none rounded-md"
            placeholder="Write your request..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 self-end">
          <button
            onClick={close}
            className="border-2 border-color-text bg-color-bg-seconda px-2 py-1 rounded-md text-color-text text-xl"
          >
            Cancel
          </button>
          <button className="bg-color-text px-2 py-1 rounded-md text-color-bg-seconday text-xl">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSolicitud;
