import { TbBrandTypescript } from "react-icons/tb";

import { FaHtml5, FaReact, FaNodeJs, FaSass } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { SiExpress, SiTailwindcss, SiReactrouter } from "react-icons/si";

const renderTechnologyIcon = (tecnologia: string) => {
  switch (tecnologia) {
    case "HTML":
      return <FaHtml5 className="text-3xl" />;
    case "Tailwind":
      return <SiTailwindcss className="text-3xl" />;
    case "Typescript":
      return <TbBrandTypescript className="text-3xl" />;
    case "reactrouter":
      return <SiReactrouter className="text-3xl" />;
    case "React":
      return <FaReact className="text-3xl" />;
    case "Sass":
      return <FaSass className="text-3xl" />;
    case "NodeJs":
      return <FaNodeJs className="text-3xl" />;
    case "ExpressJs":
      return <SiExpress className="text-3xl" />;
    case "MongoDB":
      return <DiMongodb className="text-3xl" />;
    case "Javascript":
      return;
    case "Java":
      return <></>;
    case "Cobol":
      return <></>;
    case "Angular":
      return <></>;
    case "Figma":
      return <></>;
    case "SpringBoot":
      return <></>;
    case "Cloudinary":
      return <></>;

    default:
      return null;
  }
};

/*Javascript
c++
c#
Java
Python
VueJs
SpringBoot
Cloudinary
Supabase
NodeJs
ExpressJs
NestJs
Django
Php
Larabel
MySql
PostgreSql
MongoDB
Doker
Redux
GrapthQL
Bootstrap
Adobe XD
Google Cloud
Apollo
Bulma
Svelte
Asp.net
Ruby*/

export default renderTechnologyIcon;
