import axiosBuilder from "axios";

const baseURL = import.meta.env.VITE_API_URL + "/";

export const axios = axiosBuilder.create({
  baseURL,
  withCredentials: true,
});

export const post = async (url: string, { arg }: { arg: any }) => {
  const { data } = await axios.post(url, arg);
  return data;
};

export const put = async (url: string, { arg }: { arg: any }) => {
  const { data } = await axios.put(url, arg);
  return data;
};

export const get = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const patch = async (url: string, { arg }: { arg: any }) => {
  const { data } = await axios.patch(url, arg);
  return data;
};
