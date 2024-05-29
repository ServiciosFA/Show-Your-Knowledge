import apiClient from "../server";
import { Participante } from "../types/Types";

export const getNewpartipants = async (name: string) => {
  try {
    const res = await apiClient.get(`api/users/search?name=${name}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addParticipants = async (participant: Participante) => {
  try {
    const res = await apiClient.post("", { participant });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getParticipipants = async (projectId: number) => {
  try {
    const res = await apiClient.get(
      `api/projects/${"" + projectId}/participants`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
