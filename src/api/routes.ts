import axios from "axios";
import { api } from "../config";
export const ApiRoutes = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
};
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export async function login(email: string, password: string) {
  const response = await axios.post(`${api.host}/auth/login/`, {
    email,
    password,
  });
  return response.data;
}

export async function register(input: any) {
  const response = await axios.post(`${api.host}/auth/register/`, input);
  return response.data;
}

export async function getPets() {
  const response = await axios.get(`${api.host}/pets`, {
    headers: {
      "x-access-token": localStorage.token,
    },
  });
  return response.data;
}
