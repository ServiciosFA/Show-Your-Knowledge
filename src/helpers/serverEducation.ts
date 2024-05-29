import apiClient from "../server";

export interface educations {
    id: number,
    degree: string,
    institution: string,
    start_date: string,
    end_date: string,
    country: string
}

export interface AddEducations {
    degree: string,
    institution: string,
    startDate: string,
    endDate: string,
    country: string
  }

export const getEducation = async () => {
    try {
      const data = await apiClient.get(`api/user/profile/education`);
      if (!data) throw new Error("bad request");
      return data;
    } catch (error) {
      console.error(error);
    }
  };

export const saveEducation = async (datas: AddEducations) => {
    try {
      const data = await apiClient.post(`api/user/profile/education`, datas, {
        withCredentials: true,
      });
      if (!data) throw new Error("bad request");
      return data;
    } catch (error) {
      console.error(error);
    }
};

export const updateEducation = async (id: string, datas: AddEducations) => {
  try {
    const data = await apiClient.put(`api/user/profile/education/${id}`, datas, {
      withCredentials: true,
    });
    if (!data) throw new Error("bad request");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEducation = async (id: string) => {
  try {
    const data = await apiClient.delete(`api/user/profile/education/${id}`);
    if (!data) throw new Error("bad request");
    return data;
  } catch (error) {
    console.error(error);
  }
};