import { create } from "zustand";
import { Education, Experience, Project, Tecnologia } from "./types/Types";
import { toast } from "react-toastify";

export type userStore = {
  id: string | null;
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
  token: string;
  login_user: (token: string) => void;
  logout_user: () => void;
  mod_user: (data: userStore) => void;
  update_user: (data: userStore) => void;
};

export const useStore = create<userStore>()((set) => ({
  id: null,
  name: "",
  lastname: "",
  stack: [],
  email: "",
  description: "",
  linkedIn: "",
  github: "",
  photo: "",
  experience: [],
  projects: [],
  nickname: "",
  education: [],
  token: "",
  login_user: (token: string) => {
    set({
      token: token,
    });
  },
  logout_user: () => {
    set({
      id: "",
      name: "",
      lastname: "",
      stack: [],
      email: "",
      description: "",
      linkedIn: "",
      github: "",
      photo: "",
      experience: [],
      projects: [],
      nickname: "",
      education: [],
    });
  },
  mod_user: (data: userStore) => {
    set({
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      description: data.description,
    });
  },
  update_user: (data: userStore) => {
    set({
      name: data.name,
      lastname: data.lastname,
      description: data.description,
      nickname: data.nickname,
      stack: data.stack
    });
  },
}));

type CurrentuserStore = {
  name: string;
  id: string;
  setCurrentuser: (data: CurrentUserdata) => void;
};

type CurrentUserdata = {
  name: string;
  id: string;
};

export const currentUser = create<CurrentuserStore>()((set) => ({
  name: "",
  id: "",
  setCurrentuser: (data: CurrentUserdata) => {
    set({
      name: data.name,
      id: data.id,
    });
  },
}));

type NotificationStore = {
  success: (message: string) => void;
  error: (message: string) => void;
  normal: (message: string) => void;
  advertencia: (message: string) => void;
};

export const notificationStore = create<NotificationStore>()(() => ({
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  normal: (message: string) => {
    toast(message);
  },
  advertencia: (message: string) => {
    toast.warning(message);
  },
}));
