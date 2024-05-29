import apiClient from "../server";

export const sendRequest = async (id: number, request: object) => {
  try {
    const res = await apiClient.post(`api/projects/${id}/join`, request);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRequest = async () => {
  try {
    const res = await apiClient.get("api/projects/pending-requests");
    if (!res) throw new Error("Bad request");

    return res.data;
  } catch (error) {
    console.error();
  }
};

export const acceptRequest = async (resquestId: number) => {
  try {
    const res = await apiClient.put(`api/requests/${"" + resquestId}/accept`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const rejectRequest = async (resquestId: number) => {
  try {
    const res = await apiClient.put(`api/requests/${"" + resquestId}/reject`);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
