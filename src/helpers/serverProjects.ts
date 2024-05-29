import apiClient from "../server";
import { Project } from "../types/Types";

export const getProject = async (id: string) => {
  try {
    const res = await apiClient.get(`api/projects/${id}`);
    if (!res) throw new Error();

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getProjects = async () => {
  try {
    const res = await apiClient.get(`api/user/projects/created`);
    if (!res) throw new Error();

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const createProject = async (project: object) => {
  try {
    const res = await apiClient.post(`api/projects`, project);
    if (!res) throw new Error();

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const setProject = async ({ technologies, ...project }: Project) => {
  const proyecto = { ...project, project_technology: technologies };
  const {
    title,
    description,
    image,
    repository,
    deploy,
    status,
    categories,
    project_technology,
  } = proyecto;
  try {
    const res = await apiClient.put(`api/projects/${parseInt(project.id)}`, {
      title,
      description,
      image,
      repository,
      deploy,
      status,
      categories,
      project_technology,
    });
    if (!res) throw new Error();

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
