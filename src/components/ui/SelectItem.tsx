import { Rol } from "../../types/Types";

const SelectItem = ({
  roles,
  setRols,
}: {
  roles: Rol[];
  setRols: (value: string) => void;
}) => {
  return (
    <select
      className="text-colo-primary text-lg focus:outline-none"
      onChange={(event) => {
        setRols(event.target.value);
      }}
    >
      <option className="text-colo-primary" value="">
        --Please choose a rol--
      </option>
      {roles?.map((item: Rol, index: number) => (
        <option
          className="text-colo-primary"
          key={item.id + index}
          value={item.name}
        >
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectItem;
