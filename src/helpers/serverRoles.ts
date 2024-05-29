import apiClient from "../server";

export const getRoles = async () => {
  try {
    const res = await apiClient.get("api/getRoles");
    if (!res) throw new Error("bad request");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
