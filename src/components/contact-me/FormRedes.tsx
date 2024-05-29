import React, { useState, useRef } from "react";

/*interface FormRedesProps {
  handleCloseModal: () => void;
  linkedIn: string;
  gitHub: string;
  gmail: string;
  cv: string;
}*/

const FormRedes = ({ handleCloseModal }: { handleCloseModal: () => void }) => {
  const [linkedIn, setLinkedIn] = useState("");
  const [gitHub, setGitHub] = useState("");
  const [gmail, setGmail] = useState("");
  const [cv, setCv] = useState("");

  const imagen = useRef<HTMLInputElement>(null);

  const uploadCv = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del botón
    imagen.current?.click();
  };

  return (
    <section className="relative bg-color-bg-contact p-10">
      <button
        onClick={handleCloseModal}
        className="top-0 right-0 absolute mt-2 mr-2 font-Kodchasan font-semibold text-3xl text-color-text"
      >
        X
      </button>
      <h1 className="font-Kodchasan font-semibold text-3xl text-center text-color-text">
        Redes de Contacto
      </h1>
      <form method="dialog" className="text-right flex flex-col gap-5 mt-10">
        <div className="flex items-center gap-6">
          <label
            htmlFor=""
            className="font-semibold text-color-secondary text-xl"
          >
            LinkedIn
          </label>
          <input
            className="bg-color-bg-contact-input px-1 rounded-md w-[20vw] outline-none"
            type="text"
            onChange={(e) => setLinkedIn(e.target.value)}
            value={linkedIn}
          />
        </div>
        <div className="flex items-center gap-9">
          <label
            htmlFor=""
            className="font-semibold text-color-secondary text-xl"
          >
            GitHub
          </label>
          <input
            className="bg-color-bg-contact-input px-1 rounded-md w-[20vw] outline-none"
            type="text"
            onChange={(e) => setGitHub(e.target.value)}
            value={gitHub}
          />
        </div>
        <div className="flex items-center gap-12">
          <label
            htmlFor=""
            className="font-semibold text-color-secondary text-xl"
          >
            Gmail
          </label>
          <input
            className="bg-color-bg-contact-input px-1 rounded-md w-[20vw] outline-none"
            type="text"
            onChange={(e) => setGmail(e.target.value)}
            value={gmail}
          />
        </div>
        <div className="flex items-center gap-[4.7rem]">
          <label
            htmlFor=""
            className="font-semibold text-color-secondary text-xl"
          >
            CV
          </label>
          <button
            onClick={uploadCv}
            className="bg-color-primary px-3 py-2 rounded-md font-Kodchasan font-semibold text-color-text hover:text-color-bg-thirdy"
          >
            Cargar CV
          </button>
          <input
            ref={imagen}
            className="bg-color-bg-contact-input px-1 rounded-md w-[20vw] outline-none"
            type="file"
            hidden
            onChange={(e) => setCv(e.target.value)}
            value={cv}
          />
        </div>
        <button className="mx-auto px-4 py-1 rounded w-fit font-Kodchasan font-semibold bg-color-text-thirdy text-xl hover:text-color-text">
          Guardar
        </button>
      </form>
    </section>
  );
};

export { FormRedes };
