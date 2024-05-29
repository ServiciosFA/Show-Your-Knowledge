import apiClient from "../server";

export const getTecnologias = async () => {
  try {
    const res = await apiClient("api/getTechnologies");
    if (!res) throw new Error("Bad request");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
