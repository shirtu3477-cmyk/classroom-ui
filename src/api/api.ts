import axios from "axios";
import { IClassCreate } from "../pages/Classes/Classes.types";
import { IStudentCreate } from "../pages/Students/Students.types";

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

export const createClass = async (data: IClassCreate) => {
  try {
    const response = await classroom.post("/class", data);
    return response.data;
  } catch (e) {
    return (
      axios.isAxiosError(e) && {
        error: e.response?.data.error,
        status: e.status,
      }
    );
  }
};

export const deleteClass = async (id: number) => {
  try {
    await classroom.delete(`/class/${id}`);
  } catch (e) {
    return (
      axios.isAxiosError(e) && {
        error: e.response?.data.error,
        status: e.status,
      }
    );
  }
};

export const createStudent = async (data: IStudentCreate) => {
  try {
    const response = await classroom.post("/student", data);
    return response.data;
  } catch (e) {
    return (
      axios.isAxiosError(e) && {
        error: e.response?.data.error,
        status: e.status,
      }
    );
  }
};

export const getStudents = async () => {
  try {
    const response = await classroom.get("/student");
    return response.data;
  } catch (e) {
    return axios.isAxiosError(e) && { error: e.message, status: e.status };
  }
};

export const deleteStudent = async (id: string) => {
  try {
    await classroom.delete(`/student/${id}`);
  } catch (e) {
    return (
      axios.isAxiosError(e) && {
        error: e.response?.data.error,
        status: e.status,
      }
    );
  }
};

export const assignToClass = async (id: string, classId: number) => {
  try {
    const response = await classroom.patch(`/student/${id}`, { classId: classId });
    return response.data
  } catch (e) {
    return (
      axios.isAxiosError(e) && {
        error: e.response?.data.error,
        status: e.status,
      }
    );
  }
};
