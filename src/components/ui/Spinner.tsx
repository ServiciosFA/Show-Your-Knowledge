const Spinner = () => {
  /*const styles = () => {
    switch (type) {
      case "Small":
        return "bg-[#8b15b9]";
      case "Normal":
        return "bg-[#CA2C2C]";
      case "Large":
        return "bg-[#6B70ED]";
      default:
        return null;
    }
  };*/
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border-color-primary border-t-2 border-b-2 rounded-full w-32 h-32 animate-spin"></div>
    </div>
  );
};

export default Spinner;
