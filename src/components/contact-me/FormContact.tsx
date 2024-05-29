import { ContactData } from "../../types/Types";
import { useState } from "react";
const FormContact = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [coment, setComent] = useState("");

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact: ContactData = {
      name: name,
      subject: subject,
      coment: coment,
    };
    console.log(contact);

    setName("");
    setSubject("");
    setComent("");
  };

  return (
    <section className="flex mt-4 p-4">
      <div className="border-2 border-color-secondary px-20 py-5 rounded-2xl w-full h-fit">
        <h1 className="font-semibold text-4xl text-center text-color-text">
          Contact Me
        </h1>
        <form
          action=""
          className="flex flex-col gap-4 mt-6 text-color-bg-primary"
          onSubmit={handleContact}
        >
          <div className="flex items-center gap-11">
            <label htmlFor="" className="font-semibold text-color-text text-xl">
              Name
            </label>
            <input
              className="bg-color-bg-contact-input p-1 rounded-md w-[20vw] outline"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <label htmlFor="" className="font-semibold text-color-text text-xl">
              Subject
            </label>
            <input
              className="bg-color-bg-contact-input p-1 rounded-md w-[20vw] outline"
              value={subject}
              type="text"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="flex items-start gap-6">
            <label htmlFor="" className="font-semibold text-color-text text-xl">
              Coment
            </label>
            <textarea
              className="bg-color-bg-contact-input p-1 rounded-md w-[50vw] h-[10rem] outline resize-none"
              value={coment}
              onChange={(e) => setComent(e.target.value)}
            />
          </div>
          <button className="bg-color-bg-contact-input mx-auto py-1 rounded-xl w-40 hover:w-48 font-semibold transition-all duration-250">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};
export { FormContact };
