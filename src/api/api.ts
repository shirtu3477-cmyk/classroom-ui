import axios from "axios";

const classroom = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default classroom;

export const getClasses = async () => {
  try {
    const response = await classroom.get("/class");
    return response.data;
  } catch (e) {
    return axios.isAxiosError(e) && { error: e.message, status: e.status };
  }
};

export const createClass = async (data: {
  classId: number;
  name: string;
  maxSeats: number;
}) => {
  try {
    const response = await classroom.post("/class", data);
    return response.data;
  } catch (e) {
    return axios.isAxiosError(e) && { error: e.response?.data.error, status: e.status };
  }
}

export const deleteClass = async (id: number) => {
  try {
    const response = await classroom.delete(`/class/${id}`);
  } catch (e) {
    return axios.isAxiosError(e) && { error: e.response?.data.error, status: e.status };
  }
};
