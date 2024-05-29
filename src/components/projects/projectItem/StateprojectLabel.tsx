const StateprojectLabel = ({ estado }: { estado: string }) => {
  const classEtiqueta = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-[#8b15b9]";
      case "En progreso":
        return "bg-[#CA2C2C]";
      case "Completado":
        return "bg-[#6B70ED]";
      default:
        return null;
    }
  };
  return (
    <div
      className={`${classEtiqueta(
        estado
      )} flex justify-center items-center  px-3 py-1 rounded-md font-semibold text-color-text/80 text-lg `}
    >
      <p>{estado}</p>
    </div>
  );
};

export default StateprojectLabel;
