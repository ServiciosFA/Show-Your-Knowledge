export interface AboutmeType {
  name: string;
  nickname: string;
  about: string;
  rol: string;
  stack: string[];
  projects: Project[];
  description: string;
  github: string;
  id: string;
  lastname: string;
  linkedin: string;
  mail: string;
  photo: string;
}

export interface UserInput {
  id: string;
  name: string;
  lastname: string;
  mail: string;
  description: string;
  linkedIn: string;
  github: string;
  photo: string;
  nickname: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  stack: Tecnologia[];
  email: string;
  description: string;
  linkedIn: string;
  github: string;
  photo: string;
  experience: Experience[];
  projects: Project[];
  nickname: string;
  education: Education[];
}

export interface Tecnologia {
  id: number;
  name: string;
  component: string;
}

/*{"id": 6,
  "name": "Lucas",
  "lastname": "Fernandez",
  "mail": "Lucas@example.com",
  "description": null,"linkedin": null,
  "github": null,
  "photo": "https://source.boringavatars.com/beam/120/Elizabeth%20Cady?colors=264653,2a9d8f,e9c46a,f4a261,e76f51",
  "nickname": null}*/

export interface Participante {
  id: number;
  name: string;
  lastname: string;
  nickname: string;
  mail: string;
  github: string;
  photo: string;
  linkedin: string;
  description: string;
}

export interface ProjectCards {
  id: string;
  title: string;
  description: string;
  participants: Participante[];
  image: string;
  technologies: string[];
  repository: string;
  deploy: string;
  categories: string[];
  status_id: string;
  requests: [];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  participants: Participante[];
  image: string;
  technologies: string[];
  repository: string;
  deploy: string;
  categories: string[];
  status: string;
  requests: [];
}

export interface ProjectInput {
  id: string;
  creator_id: string
  title: string;
  description: string;
  participants: Participante[];
  image: string;
  technologies: string[];
  repository: string;
  deploy: string;
  categories: string[];
  status: string;
  requests: [];
}

export interface ErrorResponse {
  name: string;
  response?: {
    data: {
      message: string;
    };
  };
}

export interface Technology {
  id: number;
  name: string;
}

export interface Rol {
  id: string;
  name: string;
}
export interface Categoria {
  id: string;
  name: string;
}

export interface Request {
  roles: Rol[];
  id: string;
  idUser: string;
  comentario: string;
}

export interface Link {
  red: string;
  img: string;
}

export interface SignUpData {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ContactData {
  name: string;
  subject: string;
  coment: string;
}

export interface Experience {
  role: string;
  start_date: string;
  end_date: string;
  company: string;
  country: string;
  contract: string;
}

export interface Education {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
  country: string;
}

export interface RegisterData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
