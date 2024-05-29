/*ENDPOINT: api/register  
CAMPOS OBLIGATORIOS: name, lastname, email, password, confirmPassword 
ESPERO DEL BODY: 
 {     
"name": "string",    
"lastname": "string",   
"email": "string",    
 "password": "string",    
 "confirmPassword": "string" }*/

import apiClient from "../server";
import { LoginData, RegisterData } from "../types/Types";

export const signupUser = async (registerData: RegisterData) =>  {
  try {
    const data = await apiClient.post("api/register", registerData);
    if (!data) throw new Error("bad request");
    return data.status;
  } catch (error) {
    return error
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const res = await apiClient.post("api/login", loginData, {
      withCredentials: true,
    });
    if (!res) throw new Error("bad request");

    return res.data;
  } catch (error) { 
    return "SOMETHING GOES WRONG!"
  }
};

export const getUser = async () => {
  try {
    const res = await apiClient.get(`api/user/profile`);
    if (!res) throw new Error("bad request");
    return res.data;
  } catch (error) {
    console.error(error);
    
  }
};

export const getCurrentuser = async (userId: string) => {
  try {
    const res = await apiClient.get(`api/user/profile/${userId}`);
    if (!res) throw new Error(" Bad request");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentProject = async () => {
  try {
    const res = await apiClient.get(`api/user/projects/participating`);
    if (!res) throw new Error(" Bad request");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const setCurrentuser = async (userData: object) => {
  try {
    const res = await apiClient.put(`api/user/profile/`, userData);
    if (!res) throw new Error(" Bad request");

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
