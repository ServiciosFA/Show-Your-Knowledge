import GitHub from "../../assets/Github.png";
import LinkedIn from "../../assets/LinkdedIn.png";
import Gmail from "../../assets/Gmail.png";
import CV from "../../assets/CV.png";
import { Link } from "../../types/Types";
import { ModalRedes } from "./ModalRedes";
import { useRef } from "react";
import { FormRedes } from "./FormRedes";
import { CiCirclePlus } from "react-icons/ci";

const LINKS_REDES: Link[] = [
  {
    red: "GitHub",
    img: GitHub,
  },
  {
    red: "LinkedIn",
    img: LinkedIn,
  },
  {
    red: "Gmail",
    img: Gmail,
  },
  {
    red: "CV",
    img: CV,
  },
];

const LinksContact = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    if (modalRef.current) {
      //modalRef.current.open();
    }
  };
  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <>
      {
        <ModalRedes
          ref={modalRef}
          open={handleOpenModal}
          close={handleCloseModal}
        >
          <FormRedes handleCloseModal={handleCloseModal} />
        </ModalRedes>
      }
      <section className="flex flex-col gap-6 pt-4">
        <h1 className="font-semibold text-3xl">Networks</h1>

        <ul className="flex gap-4 mt-8">
          {LINKS_REDES.map((link, index) => (
            <li
              key={index}
              className="flex items-center gap-1 hover:border-color-text bg-color-bg-thirdy px-5 py-3 border border-transparent rounded-xl w-fit font-semibold text-2xl text-color-text-thirdy transition-all duration-250 cursor-pointer"
            >
              <img className="w-8 h-8" src={link.img} alt={link.red} />
              <p className="text-base">{link.red}</p>
            </li>
          ))}
          <button
            onClick={handleOpenModal}
            className="flex justify-around items-center bg-color-secondary rounded-full w-[3rem] h-[3rem] self-center"
          >
            <CiCirclePlus className="text-5xl"></CiCirclePlus>
          </button>
        </ul>
      </section>
    </>
  );
};

export { LinksContact };
