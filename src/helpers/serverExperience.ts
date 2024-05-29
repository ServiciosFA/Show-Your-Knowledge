import apiClient from "../server";

export interface experiences {
    id: number,
    developer_id: number,
    role: string,
    start_date: string,
    end_date: string,
    company: string,
    country: string,
    contract: string
}

export interface AddExperiences {
  role: string,
  startDate: string,
  endDate: string,
  company: string,
  country: string,
  contract: string
}

export const getExperience = async () => {
    try {
      const data = await apiClient.get(`api/user/profile/experience`);
      if (!data) throw new Error("bad request");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

export const saveExperience = async (datas: AddExperiences) => {
    try {
      const data = await apiClient.post(`api/user/profile/experience`, datas, {
        withCredentials: true,
      });
      if (!data) throw new Error("bad request");
      return data;
    } catch (error) {
      console.error(error);
    }
};

export const updateExperience = async (id: string, datas: AddExperiences) => {
  try {
    const data = await apiClient.put(`api/user/profile/experience/${id}`, datas, {
      withCredentials: true,
    });
    if (!data) throw new Error("bad request");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const data = await apiClient.delete(`api/user/profile/experience/${id}`);
    if (!data) throw new Error("bad request");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getEUser = async (id:string) => {
  try {
    const data = await apiClient.get(`api/user/profile/${id}`);
    if (!data) throw new Error("bad request");
    return data;
  } catch (error) {
    console.error(error);
  }
};