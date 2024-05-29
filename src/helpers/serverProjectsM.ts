import { Project } from '../types/Types';

export const getProjects = async (): Promise<Project[]> => {
    try {
      const res = await fetch(`http://localhost:3000/project`); // Cambiar la ruta según tu API
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      return data as Project[];
    } catch (error) {
      console.error(error);
      return [];
    }
  };