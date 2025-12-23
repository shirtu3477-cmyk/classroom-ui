import axios, { AxiosInstance } from "axios";
import { IClassCreate } from "../pages/Classes/Classes.types";
import { IStudentCreate } from "../pages/Students/Students.types";

class ClassroomApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      // baseURL: import.meta.env.VITE_SERVER_URL,
      baseURL: 'https://smartbase-handover.dev.digital.idf.il/api',
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  getClasses = async () => {
    try {
      const response = await this.api.get("/class");
      return response.data;
    } catch (e) {
      return axios.isAxiosError(e) && { error: e.message, status: e.status };
    }
  };

  createClass = async (data: IClassCreate) => {
    try {
      const response = await this.api.post("/class", data);
      return response.data;
    } catch (e) {
      return (
        axios.isAxiosError(e) && {
          error: e.message,
          status: e.status,
        }
      );
    }
  };

  deleteClass = async (id: number) => {
    try {
      await this.api.delete(`/class/${id}`);
    } catch (e) {
      return (
        axios.isAxiosError(e) && {
          error: e.message,
          status: e.status,
        }
      );
    }
  };

  createStudent = async (data: IStudentCreate) => {
    try {
      const response = await this.api.post("/student", data);
      return response.data;
    } catch (e) {
      return (
        axios.isAxiosError(e) && {
          error: e.message,
          status: e.status,
        }
      );
    }
  };

  getStudents = async () => {
    try {
      const response = await this.api.get("/student");
      return response.data;
    } catch (e) {
      return axios.isAxiosError(e) && { error: e.message, status: e.status };
    }
  };

  deleteStudent = async (id: string) => {
    try {
      await this.api.delete(`/student/${id}`);
    } catch (e) {
      return (
        axios.isAxiosError(e) && {
          error: e.message,
          status: e.status,
        }
      );
    }
  };

  assignToClass = async (id: string, classId: number) => {
    try {
      const response = await this.api.patch(`/student/${id}`, {
        classId: classId,
      });
      return response.data;
    } catch (e) {
      return (
        axios.isAxiosError(e) && {
          error: e.message,
          status: e.status,
        }
      );
    }
  };

  unAssignClass = async (id: string) => {
    try {
      const response = await this.api.patch(`/student/${id}/unassign`);
      return response.data;
    } catch (e) {
      return (
        axios.isAxiosError(e) && {
          error: e.message,
          status: e.status,
        }
      );
    }
  };
}

const classroomApi = new ClassroomApi();
export default classroomApi;
