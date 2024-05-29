import { LinksContact } from "../contact-me/LinksContact";
import { FormContact } from "./FormContact";

const ContactMe = () => {
  return (
    <main className="flex flex-col flex-grow bg-color-bg-primary px-8 py-1 font-Kodchasan text-white overflow-y-auto">
      <LinksContact />
      <hr className="mx-auto h-px bg-color-text-thirdy" />
      <FormContact />
    </main>
  );
};

export { ContactMe };
