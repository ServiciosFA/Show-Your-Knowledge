import apiClient from "../server";

export const getCategoria = async () => {
  try {
    const res = await apiClient("api/getCategories");
    if (!res) throw new Error("Bad request");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
