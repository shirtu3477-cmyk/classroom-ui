import axios, { AxiosInstance } from "axios";
import { IClassCreate } from "../pages/Classes/Classes.types";
import { IStudentCreate } from "../pages/Students/Students.types";

class ClassroomApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  getClasses = async () => {
    const response = await this.api.get("/class");
    return response.data;
  };

  createClass = async (data: IClassCreate) => {
    const response = await this.api.post("/class", data);
    return response.data;
  };

  deleteClass = async (id: number) => {
    await this.api.delete(`/class/${id}`);
  };

  createStudent = async (data: IStudentCreate) => {
    const response = await this.api.post("/student", data);
    return response.data;
  };

  getStudents = async () => {
    const response = await this.api.get("/student");
    return response.data;
  };

  deleteStudent = async (id: string) => {
    await this.api.delete(`/student/${id}`);
  };

  assignToClass = async (id: string, classId: number) => {
    const response = await this.api.patch(`/student/${id}`, {
      classId: classId,
    });
    return response.data;
  };

  unAssignClass = async (id: string) => {
    const response = await this.api.patch(`/student/${id}/unassign`);
    return response.data;
  };
}

const classroomApi = new ClassroomApi();
export default classroomApi;
