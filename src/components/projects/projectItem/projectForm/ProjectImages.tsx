import { AiOutlinePlus } from "react-icons/ai";

const ProjectImages = ({ images }: { images: string[] }) => {
  return (
    <ul className="flex gap-2">
      {images.map((imagen: string) => (
        <li
          key={imagen}
          className="border-2 border-color-bg-thirdy hover:border-color-secondary cursor-pointer"
        >
          <img className="w-[150px] h-[100px]" src={imagen}></img>
        </li>
      ))}
      {images.length < 4 ? (
        <div className="flex justify-center items-center border-2 hover:border-color-secondary bg-opacity-30 w-[150px] h-[100px] bg-color-text-thirdy hover:text-color-secondary cursor-pointer">
          <AiOutlinePlus className="w-[100px] h-[50px]" />
        </div>
      ) : (
        ""
      )}
    </ul>
  );
};

export default ProjectImages;
